// components/TranscriptProcessor.jsx
'use client';

import { useState, useRef } from 'react';
import { processTranscript, generateSummary, saveTranscriptAndSummary } from '@/lib/transcriptProcessor';

export default function TranscriptProcessor() {
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [apiKey, setApiKey] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const processedTranscript = processTranscript(text);
      setTranscript(processedTranscript);
    } catch (err) {
      setError(`Error processing transcript: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextInput = (e) => {
    try {
      const processedTranscript = processTranscript(e.target.value);
      setTranscript(processedTranscript);
    } catch (err) {
      setError(`Error processing transcript: ${err.message}`);
    }
  };

  const handleGenerateSummary = async () => {
    if (!transcript) {
      setError('Please upload or enter a transcript first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const options = { summaryLength };
      const summaryResult = await generateSummary(transcript, apiKey, options);
      setSummary(summaryResult);
    } catch (err) {
      setError(`Error generating summary: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!transcript || !summary) {
      setError('Please generate a summary first');
      return;
    }

    if (!meetingTitle) {
      setError('Please enter a meeting title');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get authentication token from your app's state management
      const token = localStorage.getItem('authToken'); // Example, use your actual auth method

      const meetingData = {
        title: meetingTitle,
        meetId: `meet-${Date.now()}`, // Generate a unique ID
        startTime: new Date().toISOString(),
        transcript: {
          raw: transcript.fullText,
          segments: transcript.segments
        },
        summary: {
          text: summary.summary,
          keyPoints: summary.keyPoints,
          actionItems: summary.actionItems.map(item => ({ description: item })),
          decisions: summary.decisions,
          summaryType: summaryLength
        }
      };

      const result = await saveTranscriptAndSummary(
        meetingData,
        '/api/meetings', // Your API endpoint
        token
      );

      alert('Meeting transcript and summary saved successfully!');
    } catch (err) {
      setError(`Error saving data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-slate-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Upload Transcript</h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2">Meeting Title</label>
        <input
          type="text"
          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
          placeholder="e.g. Q3 Product Roadmap Planning"
        />
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4 justify-between items-start sm:items-center">
          <div className="flex gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors font-medium text-sm flex items-center gap-2"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              Upload Text File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Detail Level:</label>
            <select
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value)}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-[#0b0c10] text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500/50 focus:outline-none"
            >
              <option value="short">Brief overview</option>
              <option value="medium">Standard depth</option>
              <option value="long">Highly detailed</option>
            </select>
          </div>
        </div>

        <textarea
          className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-xl h-64 font-mono text-sm leading-relaxed bg-slate-50 dark:bg-[#0b0c10] focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-y"
          placeholder="Paste your raw meeting transcript here...&#10;&#10;e.g.&#10;Alice 10:02&#10;Alright let's get started on the design review.&#10;&#10;Bob 10:03&#10;Sounds good. I've updated the mocks."
          onChange={handleTextInput}
        ></textarea>
      </div>

      {transcript && (
        <div className="mb-8 p-4 bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 rounded-xl">
          <h3 className="font-semibold text-teal-900 dark:text-teal-400 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
            Parsed Transcript Details
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-teal-800 dark:text-teal-500">
            <li className="flex flex-col"><span className="text-teal-600/70 dark:text-teal-600 text-xs font-medium uppercase tracking-wider mb-1">Participants</span> {transcript.speakers.length} Identified</li>
            <li className="flex flex-col"><span className="text-teal-600/70 dark:text-teal-600 text-xs font-medium uppercase tracking-wider mb-1">Talk Segments</span> {transcript.segments.length} Chunks</li>
            <li className="flex flex-col"><span className="text-teal-600/70 dark:text-teal-600 text-xs font-medium uppercase tracking-wider mb-1">Length</span> {transcript.fullText.length.toLocaleString()} Chars</li>
          </ul>
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleGenerateSummary}
          className="bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm flex items-center gap-2"
          disabled={isLoading || !transcript}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
          )}
          {isLoading ? 'Abstracting Content...' : 'Generate AI Summary'}
        </button>

        {summary && (
          <button
            onClick={handleSave}
            className="bg-slate-900 dark:bg-slate-700 text-white px-6 py-2.5 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors font-medium shadow-sm flex items-center gap-2"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
            Save Meeting
          </button>
        )}
      </div>

      {summary && (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0b0c10] shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            AI Meeting Results
          </h2>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-widest uppercase mb-3 opacity-60">Executive Summary</h3>
            <div className="whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed text-lg bg-slate-50 dark:bg-slate-800/30 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50">
              {summary.summary}
            </div>
          </div>

          {summary.keyPoints && summary.keyPoints.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-widest uppercase mb-3 opacity-60">Key Takeaways</h3>
              <ul className="space-y-3">
                {summary.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/20 p-3 rounded-lg border border-slate-100 dark:border-slate-800/50">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {summary.actionItems && summary.actionItems.length > 0 && (
            <div className="mb-8 p-5 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
              <h3 className="text-sm font-bold text-orange-800 dark:text-orange-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                Action Items
              </h3>
              <ul className="space-y-2">
                {summary.actionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-orange-900 dark:text-orange-300/90 leading-relaxed">
                    <span className="text-orange-400 dark:text-orange-600 font-bold mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {summary.decisions && summary.decisions.length > 0 && (
            <div className="p-5 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Decisions Made
              </h3>
              <ul className="space-y-2">
                {summary.decisions.map((decision, i) => (
                  <li key={i} className="flex items-start gap-2 text-blue-900 dark:text-blue-300/90 leading-relaxed">
                    <span className="text-blue-400 dark:text-blue-600 font-bold mt-0.5">↳</span> {decision}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
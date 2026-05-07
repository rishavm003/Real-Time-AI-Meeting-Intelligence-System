'use client';
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function MeetingDetails() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher(`/api/meetings/${id}`)
      .then(setMeeting)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!meeting) return <div className="p-8 text-center">Meeting not found</div>;

  const summary = meeting.summary;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{meeting.title}</h1>
        <p className="text-gray-500">{new Date(meeting.createdAt).toLocaleString()}</p>
      </div>

      {summary && (
        <div className="mb-12 bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">AI Summary</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{summary.overview}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Key Points</h3>
              <ul className="list-disc list-inside text-gray-700">
                {JSON.parse(summary.keyPoints).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Decisions</h3>
              <ul className="list-disc list-inside text-gray-700">
                {JSON.parse(summary.decisions).map((decision, i) => (
                  <li key={i}>{decision}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-4">Action Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm font-bold text-blue-900">
                    <th className="pb-2">Owner</th>
                    <th className="pb-2">Task</th>
                    <th className="pb-2">Deadline</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {JSON.parse(summary.actionItems).map((item, i) => (
                    <tr key={i} className="border-t border-blue-100">
                      <td className="py-2">{item.owner}</td>
                      <td className="py-2">{item.task}</td>
                      <td className="py-2">{item.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <button 
            onClick={() => navigator.clipboard.writeText(summary.overview)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Copy Summary
          </button>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-4">Full Transcript</h2>
        <div className="bg-white border rounded-lg p-6 whitespace-pre-wrap text-gray-700 leading-relaxed max-h-96 overflow-y-auto">
          {meeting.transcript}
        </div>
      </div>
    </div>
  );
}

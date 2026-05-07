import axios from 'axios';

export function processTranscript(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    let speakers = new Set();
    let segments = [];

    let currentSpeaker = 'Unknown';
    let currentText = '';

    for (let line of lines) {
        const match = line.match(/^([A-Za-z \-\.]+)(?:\d{1,2}:\d{2})?$/);
        if (match && match[1].length < 25 && !line.includes(':')) {
            if (currentText.trim() !== '') {
                segments.push({ speaker: currentSpeaker, text: currentText.trim() });
                speakers.add(currentSpeaker);
            }
            currentSpeaker = match[1].trim();
            currentText = '';
        } else {
            currentText += ' ' + line;
        }
    }

    if (currentText.trim() !== '') {
        segments.push({ speaker: currentSpeaker, text: currentText.trim() });
        speakers.add(currentSpeaker);
    }

    return {
        speakers: Array.from(speakers),
        segments: segments,
        fullText: text
    };
}

export async function generateSummary(transcript, apiKey, options) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

        // We send the segments directly to our backend which handles the Gemini API logic using the key in standard .env
        const response = await axios.post(`${baseUrl}/summarize`, transcript.segments, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data.summary;
    } catch (error) {
        if (error.response) {
            throw new Error(`Server Error: ${error.response.data.error || error.response.statusText}`);
        }
        throw new Error('Failed to connect to backend server. Make sure it is running.');
    }
}

export async function saveTranscriptAndSummary(meetingData, endpoint, token) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000';
        const response = await axios.post(baseUrl + endpoint, meetingData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to save meeting data');
    }
}

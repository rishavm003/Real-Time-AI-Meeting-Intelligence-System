const API_URL = 'http://localhost:8787'; // Cloudflare Worker local address or production URL

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarise') {
    handleSummarise(request.transcript, sendResponse);
    return true; // Keep channel open for async response
  }
});

async function handleSummarise(transcript, sendResponse) {
  try {
    const { token } = await chrome.storage.local.get('token');
    if (!token) throw new Error('Please login first');

    // 1. Save Meeting
    const saveRes = await fetch(`${API_URL}/api/meetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: `Meeting - ${new Date().toLocaleString()}`,
        transcript
      })
    });
    const { id } = await saveRes.json();

    // 2. Trigger Summary
    const summaryRes = await fetch(`${API_URL}/api/summary/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await summaryRes.json();

    sendResponse({ success: true, data: result });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}
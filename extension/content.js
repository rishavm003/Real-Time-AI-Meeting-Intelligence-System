let transcript = [];
let isRecording = false;

// Watch for captions
const setupObserver = () => {
  const targetNode = document.querySelector('.a4cQT') || document.querySelector('[jsname="tgaKEf"]');
  if (!targetNode) {
    setTimeout(setupObserver, 2000);
    return;
  }

  const observer = new MutationObserver((mutations) => {
    if (!isRecording) return;
    
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          const speaker = node.querySelector('.zs7s8d')?.innerText || "Unknown";
          const text = node.querySelector('.VbkSUe')?.innerText || node.innerText;
          
          if (text) {
            const entry = { speaker, text, timestamp: new Date().toISOString() };
            transcript.push(entry);
            chrome.storage.local.set({ currentTranscript: transcript });
            updateSidebar(entry);
          }
        });
      }
    });
  });

  observer.observe(targetNode, { childList: true, subtree: true });
};

const updateSidebar = (entry) => {
  const feed = document.getElementById('meet-brief-feed');
  if (feed) {
    const div = document.createElement('div');
    div.className = 'mb-2 p-2 bg-gray-100 rounded';
    div.innerHTML = `<strong>${entry.speaker}:</strong> ${entry.text}`;
    feed.appendChild(div);
    feed.scrollTop = feed.scrollHeight;
  }
};

// Inject Sidebar
const injectSidebar = () => {
  const sidebar = document.createElement('div');
  sidebar.id = 'meet-brief-sidebar';
  sidebar.innerHTML = `
    <div style="position: fixed; right: 0; top: 0; width: 300px; height: 100%; background: white; z-index: 10000; box-shadow: -2px 0 5px rgba(0,0,0,0.1); display: flex; flex-direction: column; font-family: sans-serif;">
      <div style="padding: 1rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
        <h2 style="margin: 0; font-size: 1.2rem;">Meet Brief</h2>
        <button id="close-sidebar" style="border: none; background: none; cursor: pointer;">✕</button>
      </div>
      <div id="meet-brief-feed" style="flex: 1; overflow-y: auto; padding: 1rem;"></div>
      <div style="padding: 1rem; border-top: 1px solid #eee; display: flex; flex-direction: column; gap: 0.5rem;">
        <button id="toggle-record" style="padding: 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Start Recording</button>
        <button id="summarise-now" style="padding: 0.5rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Summarise Now</button>
      </div>
    </div>
  `;
  document.body.appendChild(sidebar);

  document.getElementById('toggle-record').onclick = (e) => {
    isRecording = !isRecording;
    e.target.innerText = isRecording ? 'Stop Recording' : 'Start Recording';
    e.target.style.background = isRecording ? '#10b981' : '#ef4444';
  };

  document.getElementById('summarise-now').onclick = async () => {
    const btn = document.getElementById('summarise-now');
    btn.disabled = true;
    btn.innerText = 'Summarising...';
    
    const { currentTranscript } = await chrome.storage.local.get('currentTranscript');
    const fullText = currentTranscript.map(t => `${t.speaker}: ${t.text}`).join('\n');
    
    chrome.runtime.sendMessage({ action: 'summarise', transcript: fullText }, (response) => {
      btn.disabled = false;
      btn.innerText = 'Summarise Now';
      if (response.success) {
        alert('Summary saved! Check your dashboard.');
      } else {
        alert('Error: ' + response.error);
      }
    });
  };

  document.getElementById('close-sidebar').onclick = () => {
    sidebar.remove();
  };
};

injectSidebar();
setupObserver();
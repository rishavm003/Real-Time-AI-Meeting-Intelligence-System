const axios = require('axios');

/**
 * Generate summary using Gemini API
 * @param {string} transcript - Meeting transcript text
 * @param {string} summaryLength - 'short', 'medium', or 'long'
 * @returns {Promise<Object>} Summary result object
 */
const generateSummary = async (transcript, summaryLength = 'medium') => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  const model = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  let promptPrefix = "";
  switch (summaryLength) {
    case "short":
      promptPrefix = "Provide a concise summary (3-5 bullet points) of the key points:";
      break;
    case "long":
      promptPrefix = "Provide a detailed summary including context, key points, decisions, and action items:";
      break;
    default:
      promptPrefix = "Summarize this meeting transcript, including key points, decisions, and action items:";
  }

  const prompt = `
${promptPrefix}

Return your response ONLY as a strictly valid JSON object with the following exact keys, and no markdown wrapping or code blocks:
{
  "summary": "An overarching summary of the meeting",
  "keyPoints": ["point 1", "point 2"],
  "actionItems": ["action 1", "action 2"],
  "decisions": ["decision 1"]
}

Transcript:
${transcript}
  `;

  try {
    const startTime = Date.now();
    const response = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2048,
        topP: 0.8
      }
    });

    const processingTime = Date.now() - startTime;

    if (response.data.candidates && response.data.candidates[0].content.parts[0].text) {
      let resultText = response.data.candidates[0].content.parts[0].text.trim();
      
      // Clean up markdown if present
      if (resultText.startsWith('\`\`\`json')) {
        resultText = resultText.replace(/^\`\`\`json/m, '').replace(/\`\`\`$/m, '').trim();
      } else if (resultText.startsWith('\`\`\`')) {
        resultText = resultText.replace(/^\`\`\`/m, '').replace(/\`\`\`$/m, '').trim();
      }

      const parsed = JSON.parse(resultText);
      return {
        ...parsed,
        aiMetadata: {
          modelUsed: model,
          processingTime
        }
      };
    } else {
      throw new Error('Invalid response from AI');
    }
  } catch (error) {
    console.error('AI Service Error:', error.response?.data || error.message);
    throw new Error('Failed to generate summary with AI');
  }
};

module.exports = {
  generateSummary
};

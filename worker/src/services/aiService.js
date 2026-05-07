import axios from 'axios';

export class AIService {
  constructor(env) {
    this.nvidiaApiKey = env.NVIDIA_API_KEY;
    this.agentRouterApiKey = env.AGENT_ROUTER_API_KEY;
  }

  async generateSummary(transcript) {
    const prompt = `
You are a meeting analyst. Return ONLY valid JSON, no markdown.
Analyse this transcript and return:
{
  "overview": "string",
  "key_points": ["string"],
  "decisions": ["string"],
  "action_items": [{ "owner": "string", "task": "string", "deadline": "string" }]
}
Transcript: ${transcript}
    `;

    try {
      // Primary: NVIDIA NIM
      return await this.callNVIDIA(prompt);
    } catch (error) {
      console.error('NVIDIA NIM failed, falling back to AgentRouter:', error.message);
      return await this.callAgentRouter(prompt);
    }
  }

  async callNVIDIA(prompt) {
    const response = await axios.post(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        model: 'meta/llama-3.1-70b-instruct',
        messages: [
          { role: 'system', content: 'You are a meeting analyst. Return ONLY valid JSON, no markdown.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 1024,
      },
      {
        headers: {
          'Authorization': `Bearer ${this.nvidiaApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let content = response.data.choices[0].message.content.trim();
    // Remove markdown code blocks if AI fails to follow "ONLY valid JSON"
    if (content.startsWith('```')) {
      content = content.replace(/```json|```/g, '').trim();
    }
    return JSON.parse(content);
  }

  async callAgentRouter(prompt) {
    // Implement AgentRouter fallback if needed
    // For now, throwing error to show fallback logic
    throw new Error('AgentRouter fallback not implemented yet');
  }
}

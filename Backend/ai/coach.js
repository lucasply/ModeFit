const axios = require('axios');

async function getAIResponse(goal, meals, workouts) {
  const apiKey = process.env.GeminiAPI;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `
You are a fitness coach. The user’s current goal is "${goal}".
Meals logged: ${meals}
Workouts logged: ${workouts}
Provide a friendly coaching response.
Format the response in the following sections:
1. Meal Analysis
2. Workout Analysis
3. Action Steps
4. One Overall Tip
Use markdown format with bold headings.
  `;

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, body);
    const message = response.data.candidates[0].content.parts[0].text;
    return message;
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getAIResponse };

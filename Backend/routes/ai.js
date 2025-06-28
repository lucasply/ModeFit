const express = require('express');
const router = express.Router();
const { getAIResponse } = require('../ai/coach');

router.post('/', async (req, res) => {
  console.log('Received request for AI coach advice:', req.body);

  const { goal, meals, workouts } = req.body;
  try {
    const response = await getAIResponse(goal, meals, workouts);
    res.json({ message: response });
  } catch (err) {
    console.error('AI error:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

module.exports = router;

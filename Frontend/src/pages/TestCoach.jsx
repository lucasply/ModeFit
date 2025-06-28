import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

export default function TestCoach() {
    const [goal, setGoal] = useState('Gain Weight Fast');
    const [meals, setMeals] = useState('');
    const [workouts, setWorkouts] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const getAdvice = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/ai', {
            goal,
            meals,
            workouts,
            });
            setResponse(res.data.message);
        } catch (err) {
            setResponse('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>AI Fitness Coach</h2>

            <input
            placeholder="Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            />

            <textarea
            placeholder="Meals"
            value={meals}
            onChange={(e) => setMeals(e.target.value)}
            />

            <textarea
            placeholder="Workouts"
            value={workouts}
            onChange={(e) => setWorkouts(e.target.value)}
            />

            <button onClick={getAdvice}>Get Coach Advice</button>

            {loading ? <ClipLoader color="#36d7b7" size={50} /> : <ReactMarkdown>{response}</ReactMarkdown>}
        </div>
    );
}

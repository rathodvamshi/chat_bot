// C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\backend\server.js
const express = require('express');
const { spawn } = require('child_process');
const Chat = require('./models/Chat');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/chat', async (req, res) => {
  console.log('Received request:', req.body);
  const { message } = req.body;

  if (!message) {
    console.log('No message provided');
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const pythonScriptPath = '../ml/predict.py';
    // Use the correct Python 3.12 path from 'where python'
    const pythonCommand = 'C:\\Users\\vamsh\\AppData\\Local\\Programs\\Python\\Python312\\python.exe';
    console.log('Spawning Python process with command:', [pythonCommand, pythonScriptPath, message]);
    const pythonProcess = spawn(pythonCommand, [pythonScriptPath, message]);
    let botResponse = '';

    pythonProcess.stdout.on('data', (data) => {
      console.log('Python stdout:', data.toString());
      botResponse += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python stderr:', data.toString());
    });

    pythonProcess.on('error', (error) => {
      console.error('Python spawn error:', error);
    });

    pythonProcess.on('close', async (code) => {
      console.log('Python process closed with code:', code);
      if (code !== 0) {
        console.error('Python process failed');
        return res.status(500).json({ error: 'Prediction failed' });
      }

      if (!botResponse) {
        console.error('No response from Python');
        return res.status(500).json({ error: 'No response from prediction' });
      }

      try {
        console.log('Saving to database:', { message, botResponse: botResponse.trim() });
        const chat = new Chat({
          userMessage: message,
          botResponse: botResponse.trim(),
          timestamp: new Date(),
        });
        await chat.save();
        console.log('Saved to database successfully');
        res.json({ response: botResponse.trim() });
      } catch (dbError) {
        console.error('Database error:', dbError);
        res.status(500).json({ error: 'Database error' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
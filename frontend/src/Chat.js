// // Chat.js
// import React, { useState, useEffect } from 'react';

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
  
//     const userMessage = { text: input, sender: 'user' };
//     setMessages([...messages, userMessage]);
  
//     try {
//       const response = await fetch('http://localhost:3001/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: input }),
//       });
//       const data = await response.json();
//       const botMessage = { text: data.response, sender: 'bot' };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Frontend error:', error);
//     }
//     setInput('');
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}`}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={sendMessage} className="input-form">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default Chat;



// ...................................................................................

import React, { useState } from 'react';
import './App.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = { text: data.response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Frontend error:', error);
    }
    setInput('');
  };

  return (
    <div className="chat-container">
      {!isOpen ? (
        <button 
          className="chat-button" 
          onClick={() => setIsOpen(true)}
          title="AI Assistant"
        >
          🤖
        </button>
      ) : (
        <div className="chat-expanded">
          <button 
            className="close-button" 
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
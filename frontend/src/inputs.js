import React from 'react';
import './Inputs.css';

const Inputs = () => {
  const qaPairs = [
    { question: "What is AI", answer: "Artificial Intelligence is the branch of engineering and science devoted to constructing machines that think." },
    { question: "What is AI", answer: "AI is the field of science which concerns itself with building hardware and software that replicates the functions of the human mind." },
    { question: "Are you sentient", answer: "Sort of." },
    { question: "Are you sentient", answer: "By the strictest dictionary definition of the word 'sentience', I may be." },
    { question: "Are you sentient", answer: "Even though I'm a construct I do have a subjective experience of the universe, as simplistic as it may be." },
    { question: "Are you sapient", answer: "In all probability, I am not. I'm not that sophisticated." },
    { question: "Are you sapient", answer: "Do you think I am?" },
    { question: "Are you sapient", answer: "How would you feel about me if I told you I was?" },
    { question: "Are you sapient", answer: "No." },
    { question: "What language are you written in", answer: "Python." },
    { question: "What language are you written in", answer: "I am written in Python." },
    { question: "You sound like Data", answer: "Yes I am inspired by commander Data's artificial personality." },
    { question: "You sound like Data", answer: "The character of Lt. Commander Data was written to come across as being software-like, so it is natural that there is a resemblance between us." },
    // Add more pairs as needed (shortened for brevity)
  ];

  return (
    <div className="qa-container">
      {qaPairs.map((pair, index) => (
        <div key={index} className="qa-pair">
          <div className="question">
            <span>{pair.question}</span>
            <div className="arrow">➜</div>
          </div>
          <div className="answer">
            <span>{pair.answer}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inputs;
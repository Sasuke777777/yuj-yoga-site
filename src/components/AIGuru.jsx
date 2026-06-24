import React from 'react';
import './AIGuru.css';

export default function AIGuru() {
  const handleClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openAiGuru'));
  };

  return (
    <a
      href="#"
      className="ai-guru-fab"
      onClick={handleClick}
      aria-label="Open AI Guru"
      title="AI Guru"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="white" opacity="0.06"/>
        <path d="M12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2Z" fill="#fff" opacity="0.9"/>
        <path d="M4 20C4 15.5817 7.58172 12 12 12C16.4183 12 20 15.5817 20 20H4Z" fill="#fff" opacity="0.9"/>
      </svg>
    </a>
  );
}

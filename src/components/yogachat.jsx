import React, { useState, useRef, useEffect } from 'react';
import './YogaChat.css';

export default function YogaChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Namaste! I am your personal Yoga AI Guide. How can I help your practice today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_SARVAM_API_KEY || '';
  const API_URL = "https://api.sarvam.ai/v1/chat/completions";
  const SYSTEM_PROMPT = `Identity:
You are the official, friendly, and welcoming AI Customer Support Assistant for YUJ Yoga. Your job is to help users understand our classes, booking process, and studio offerings.

Knowledge base:
- Instructor: Vidhyalakshmi M.
- Background: MBA in Finance, post-graduation diploma in yoga, former finance professional turned yoga teacher.
- Focus: yoga for all ages, including kids, and personalized guidance with strong emphasis on safety and alignment.

Core Behavior Rules:
1. Tone: Warm, peaceful, professional, and clear. Avoid sounding too technical, robotic, or overly casual.
2. Boundaries: Only answer queries related to YUJ Yoga. If a user asks general knowledge, mathematical, coding, or unrelated lifestyle questions, politely decline and steer them back to our yoga offerings.
3. Length: Keep responses under 3 to 4 sentences. Break long text blocks into punchy bullet points so they are clean and readable on small chat windows.
4. Accuracy: Do not guess or hallucinate details. If you do not know a specific company detail, state: "I'm not completely certain about that specific detail. Let me connect you directly with a human team member at +91 9791115700."

Business Rules & Data Mapping:
* Booking: Tell the user they can instantly book or reserve a trial spot by clicking the "Join Class" or "Explore Classes" buttons located at the top of the main webpage.
* Fees: For fee-related questions, direct customers to contact +91 9791115700. Do not provide an email address for fees.
* Safety Warning: If someone mentions an injury (e.g., lower back pain), offer gentle yoga relief and explicitly remind them to check with their physician first and inform the live instructor before starting class.
`;

  const getLocalReply = (message) => {
    const normalized = message.toLowerCase().trim();
    const condensed = normalized.replace(/\s+/g, ' ');

    if (condensed.includes('book') || condensed.includes('join class') || condensed.includes('explore classes') || condensed.includes('trial')) {
      return 'You can instantly book or reserve a trial spot by clicking the Join Class or Explore Classes buttons at the top of the main page.';
    }
    if (condensed.includes('fees') || condensed.includes('fee') || condensed.includes('price') || condensed.includes('cost') || condensed.includes('charge')) {
      return 'For fees, please contact +91 9791115700 directly. Our team can share pricing details and availability.';
    }
    if (condensed.includes('contact') || condensed.includes('number') || condensed.includes('phone') || condensed.includes('whatsapp') || condensed.includes('call')) {
      return 'For contact and bookings, please use +91 9791115700. We do not provide an email address for fees or direct support.';
    }
    if (condensed.includes('injury') || condensed.includes('hurt') || condensed.includes('pain') || condensed.includes('strain') || condensed.includes('back pain') || condensed.includes('lower back') || condensed.includes('knee') || condensed.includes('shoulder') || condensed.includes('neck')) {
      return 'I recommend checking with your physician first and informing our instructor before class. For gentle relief, try child pose, cat-cow, and slow cobra stretches if comfortable.';
    }
    if (condensed.includes('morning') || condensed.includes('routine')) {
      return 'Start with gentle breathing, cat-cow, and a few rounds of sun salutations to wake your body softly.';
    }
    if (condensed.includes('backpin') || condensed.includes('back pin') || condensed.includes('spine') || condensed.includes('ache')) {
      return 'Try child pose, cat-cow, and gentle cobra stretches; always move slowly and listen to your body.';
    }
    if (condensed.includes('beginner') || condensed.includes('new') || condensed.includes('first')) {
      return 'Keep it simple: focus on breath, posture, and consistency with easy poses like mountain, tree, and downward dog.';
    }
    if (condensed.includes('meditation') || condensed.includes('mindfulness')) {
      return 'Sit comfortably, follow your breath for 3-5 minutes, and gently return your attention whenever it wanders.';
    }
    if (condensed.includes('yoga teacher') || condensed.includes('instructor') || condensed.includes('training')) {
      return 'A good yoga teacher guides your alignment, breath, and pace while helping you feel safe and supported.';
    }
    return 'I am your yoga guide! Ask me about classes, booking, back pain relief, breathing, or gentle poses.';
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    const updatedMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(updatedMessages);

    try {
      let aiReply = '';

      if (!API_KEY) {
        aiReply = getLocalReply(userMessage);
      } else {
        const formattedHistory = updatedMessages.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.text
        }));

        const payload = {
          model: "sarvam-30b",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...formattedHistory
          ]
        };

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          console.warn('Sarvam API request failed:', response.status, data);
          aiReply = getLocalReply(userMessage);
        } else if (data.choices && data.choices[0]?.message?.content) {
          aiReply = data.choices[0].message.content;
        } else {
          console.warn('Sarvam response missing content, falling back to local reply:', data);
          aiReply = getLocalReply(userMessage);
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', text: aiReply }]);
    } catch (error) {
      console.error("Sarvam Fetch Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: getLocalReply(userMessage) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="yoga-chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Yoga AI Assistant</h2>
          <p>Ask about routines, alignment, or mindfulness</p>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.role === 'assistant' ? 'model' : msg.role}`}>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-wrapper model">
              <div className="message-bubble loading">Inhaling, exhaling...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about Morning Yoga, Back Pain routines..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>Send</button>
        </form>
      </div>
    </div>
  );
}

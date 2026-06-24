import React, { useState, useEffect } from 'react';
import img from './assets/logo.png';
import hero from './assets/header.png';
import momImg from './assets/instructor.png.jpeg';
import p1 from './assets/p1.png';
import p2 from './assets/p2.png';
import p3 from './assets/p3.jpg';
import p4 from './assets/p4.png';
import YogaChat from './components/yogachat';
import AIGuru from './components/AIGuru';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const testimonials = [
    {
      name: "Geethanjali",
      text: "I've been attending Vidya mam's yoga class for the past 2 years, and it has been an incredible journey of personal growth and transformation. Her ability to intuitively understand what I need each class, without me even having to express it, is truly remarkable. Apart from becoming more flexible and transitioning to advanced yoga poses with ease, I've learnt to cultivate a deeper sense of joy, gratitude and inner peace every day. Highly recommended.",
      avatar: p1
    },
    {
      name: "Pragathi",
      text: "I have had the privilege of learning yoga under her guidance for the past seven years and it has been a truly transformative journey. Her expertise in teaching asanas, combined with her insightful approach to meditation, has helped me develop both physical strength and mental clarity.What sets her apart is her holistic approach to wellness. Beyond yoga practice, she provides valuable guidance on nutrition and healthy eating habits, helping her students embrace a balanced lifestyle. Her dedication to teaching is very inspiring. Highly recommend her for anyone looking to transform through a healthier lifestyle.",
      avatar: p2
    },
    {
      name: "Akhilesh",
      text: "I have been practicing yoga with Vidya madam for 3 years now, and the impact on my health has been incredible. Turning 40, I was struggling with persistent, worrying back pain that limited my daily life. Today, my back feels perfect. I can lift heavy objects without a second thought or any fear of throwing my back out,What makes her truly exceptional is her deep, almost intuitive understanding of the human body. If I ever show up with a muscle lock, tightness, or specific pain, I just have to tell her. She knows exactly which adjustments or poses to make, and voila—instant relief. I was so impressed by my results that I even convinced my wife to join her classes too (though in a completely separate session, because a guy still needs his own quiet time!)",
      avatar: p3
    },
    {
      name: "Suchitra",
      text: "I have be1en attending Vidya's yoga classes for the past four years. I initially joined her group classes, but there was a time when even completing 12 Surya Namaskars was a challenge because of severe knee pain. I was on the verge of quitting when Vidya encouraged me to join her one-on-one sessions.Through her personalized approach, she carefully worked on every area where I faced difficulties. Over time, my knee strength improved significantly, and today I am able to perform asanas with much greater ease and confidence.Vidya is an exceptional teacher who truly understands each student's body and limitations. She tailors her instruction accordingly and provides the right exercises and guidance to help achieve steady progress. Her dedication, patience, and expertise have made a remarkable difference in my fitness and overall well-being",
      avatar: p4
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 12000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    const openHandler = () => setCurrentPage('chat');
    window.addEventListener('openAiGuru', openHandler);
    return () => window.removeEventListener('openAiGuru', openHandler);
  }, []);

  return (
    <div className="app-container">
      
      <nav className="navbar">
        <div className="logo-container" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
          <img src={img} alt="YUJ Yoga Logo" className="logo-img" />
          YUJ YOGA
        </div>

        <button
          className={`menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Home</a></li>
          <li><a href="#about" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>About</a></li>
          <li><a href="#schedule" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Schedule</a></li>
          <li><a href="#testimonials" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Testimonials</a></li>
          <li><button onClick={() => { setCurrentPage('chat'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', padding: '0', color: currentPage === 'chat' ? '#4a6b5d' : 'inherit' }}>AI Guru</button></li>
        </ul>
        <a 
          href="https://wa.me/919791115700" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <button className="cta-btn">Join Class</button>
        </a>
      </nav>

      {currentPage === 'chat' ? (
        <YogaChat />
      ) : (
        <>
          <header id="home" className="hero" style={{ backgroundImage: `url(${hero})` }}>
            <div className="hero-content">
              <h1>Welcome, To YUJ Yoga Online Classes</h1>
              <p>Professional online yoga sessions from the comfort of your home.</p>
              <a href="#schedule" style={{ textDecoration: 'none' }}>
                <button className="hero-btn">Explore Classes</button>
              </a>
            </div>
          </header>

          <section id="schedule" className="schedule-section">
            <div className="section-header">
              <h2>How It Works</h2>
              <p>All classes are conducted individually. Get in touch directly to set up your personalized schedule and discuss flexible fees.</p>
            </div>

            <div className="workflow-container">
              <div className="workflow-card card-1">
                <div className="step-number">1</div>
                <h3>Free Consultation</h3>
                <p>Connect with Vidhyalakshmi M over a call or text to discuss your personal health goals and experience level.</p>
              </div>

              <div className="workflow-card card-2">
                <div className="step-number">2</div>
                <h3>Custom Timings</h3>
                <p>Coordinate directly to fix morning or evening slots that adapt seamlessly around your daily life.</p>
              </div>

              <div className="workflow-card card-3">
                <div className="step-number">3</div>
                <h3>Flexible Pricing</h3>
                <p>Decide the final fees transparently based on how many interactive sessions you plan to attend each week.</p>
              </div>
            </div>

            <div className="schedule-cta">
              <a 
                href="https://wa.me/919791115700" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button className="book-slot-btn">Contact on WhatsApp</button>
              </a>
            </div>
          </section>

          <section id="about" className="about-section">
            <div className="about-card">
              <div className="avatar-container">
                <img src={momImg} alt="Yoga Instructor" className="instructor-avatar" />
              </div>
              
              <h2 className="instructor-name">VidhyaLakshmi M</h2>
              
              <p className="instructor-quote">
                "Yoga is not about self-improvement, it's about self-acceptance."
              </p>
              
              <p className="instructor-journey">
                I am a yoga passionate and believe that if kids are provided with proper skills and guidance I would definitely improve their physical health along with a disciplined and good human being for the society, I have done my MBA In Finance left my profession for the love of yoga I have even done my post-graduation diploma in yoga taking classes for all age group but love to take for kids as children's are awesome.
              </p>
            </div>
          </section>

                    <section id="testimonials" className="testimonials-section">
            <div className="testimonials-header">
              <h2>Student Experiences</h2>
              <p>Real stories from individuals who transformed their health through our 1-on-1 private guidance.</p>
            </div>

            <div className="slider-wrapper">
              <button className="slider-arrow prev" onClick={(e) => handlePrev(e)}>‹</button>
              
              <div className="testimonial-row-card">
                <div className="client-avatar-box">
                  <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} className="client-avatar" />
                </div>
                <div className="client-info-box">
                  <p className="client-feedback">"{testimonials[currentIndex].text}"</p>
                  <h4 className="client-name">{testimonials[currentIndex].name}</h4>
                </div>
              </div>

              <button className="slider-arrow next" onClick={(e) => handleNext(e)}>›</button>
            </div>
          </section>
        </>
      )}
      <AIGuru />
    </div>
  );
}


export default App;

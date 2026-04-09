import React, { useState } from "react";
import "../style.css";

function Interact() {

  /* ================= QUIZ ================= */

  const questions = [
    { q: "How long is a standard football match?", options: ["60 minutes","90 minutes","120 minutes","80 minutes"], answer: 1 },
    { q: "How many players per team on field?", options: ["9","10","11","12"], answer: 2 },
    { q: "Offside is determined relative to?", options: ["Goalkeeper only","Second-last defender","Midfield line","Referee"], answer: 1 },
    { q: "A red card results in?", options: ["Warning","Temporary suspension","Player sent off","Free kick only"], answer: 2 },
    { q: "Penalty kicks are taken from?", options: ["Goal line","Midfield","Penalty spot","Corner arc"], answer: 2 },
    { q: "Corner kick awarded when?", options: ["Ball over sideline","Goal scored","Defender last touches over goal line","Foul committed"], answer: 2 },
    { q: "Max players in defensive wall?", options: ["No limit","5","3","4"], answer: 0 },
    { q: "Throw-in requires?", options: ["One hand","Both hands overhead","Foot kick","Bounce throw"], answer: 1 },
    { q: "Yellow card means?", options: ["Send off","Caution","Goal awarded","Match end"], answer: 1 },
    { q: "4-3-3 formation has?", options: ["4 defenders 3 midfield 3 forwards","4 forwards","3 defenders","5 forwards"], answer: 0 }
  ];

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitQuiz = () => {
    let s = 0;
    let allAnswered = true;

    questions.forEach((q, i) => {
      if (answers[i] === undefined) allAnswered = false;
    });

    if (!allAnswered) {
      alert("Please answer all 10 questions before submitting.");
      return;
    }

    questions.forEach((q, i) => {
      if (parseInt(answers[i]) === q.answer) s++;
    });

    setScore("Your Score: " + s + " / 10");
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore("");
    setSubmitted(false);
  };

  /* ================= CONTACT ================= */

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let err = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name) {
      err.name = "Name is required.";
      valid = false;
    }

    if (!form.email) {
      err.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      err.email = "Enter a valid email address.";
      valid = false;
    }

    if (!form.subject) {
      err.subject = "Subject is required.";
      valid = false;
    }

    if (!form.message) {
      err.message = "Message cannot be empty.";
      valid = false;
    } else if (form.message.length < 10) {
      err.message = "Message must be at least 10 characters.";
      valid = false;
    }

    setErrors(err);

    if (!valid) return;

    alert("Your message has been successfully sent to SPORTEdu.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  /* ================= CHAT ================= */

  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const sendChat = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, type: "chat-user" };

    let response = "Stay disciplined and focus on tactical awareness.";
    if (input.toLowerCase().includes("training"))
      response = "Consistency and structured drills build elite performance.";
    if (input.toLowerCase().includes("offside"))
      response = "Time your run with the second-last defender to avoid offside.";

    const botMsg = { text: response, type: "chat-bot" };

    setChat([...chat, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="dark-theme">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">SPORTEdu</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/external/academy.html">Academy</a>
          <a href="/external/register.html">Register</a>
          <a
              href="#"
              onClick={(e) => {
                e.preventDefault();

                // clear cookies
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });

                // clear local storage
                localStorage.clear();

                // redirect to login
                window.location.href = "/external/login.html";
              }}
            >
              Logout
            </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="academy-hero parallax"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1600&q=80')"
        }}
      >
        <div className="dark-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">KNOWLEDGE. DISCIPLINE. EXECUTION.</h1>
        </div>
      </section>

      {/* QUIZ */}
      <section className="section-padding">
        <h1 className="section-title">FOOTBALL KNOWLEDGE ASSESSMENT</h1>

        <div className="quiz-container glass-elite">
          {questions.map((q, i) => (
            <div key={i} className="quiz-question">
              <h3>{i + 1}. {q.q}</h3>

              <div className="quiz-options">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={
                      submitted
                        ? idx === q.answer
                          ? "correct"
                          : answers[i] == idx
                          ? "incorrect"
                          : ""
                        : ""
                    }
                  >
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={idx}
                      disabled={submitted}
                      onChange={(e) =>
                        setAnswers({ ...answers, [i]: e.target.value })
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="center-btn">
          <button onClick={submitQuiz} className="btn-glow">
            Submit Assessment
          </button>
          <button onClick={resetQuiz} className="btn-outline">
            Reset
          </button>
        </div>

        <p className="score-display">{score}</p>
      </section>

      {/* CUSTOMER CARE */}
      <section className="section-padding">
        <h1 className="section-title">CUSTOMER CARE</h1>

        <form className="glass-elite form-grid" onSubmit={handleSubmit}>

          <div className="input-wrapper">
            <label>Name</label>
            <input type="text" id="name" value={form.name} onChange={handleChange} />
            <span className="error">{errors.name}</span>
          </div>

          <div className="input-wrapper">
            <label>Email</label>
            <input type="email" id="email" value={form.email} onChange={handleChange} />
            <span className="error">{errors.email}</span>
          </div>

          <div className="input-wrapper full-width">
            <label>Subject</label>
            <input type="text" id="subject" value={form.subject} onChange={handleChange} />
            <span className="error">{errors.subject}</span>
          </div>

          <div className="input-wrapper full-width">
            <label>Message</label>
            <textarea id="message" value={form.message} onChange={handleChange}></textarea>
            <span className="error">{errors.message}</span>
          </div>

          <div className="full-width center-btn">
            <button type="submit" className="btn-glow">Send Message</button>
          </div>

        </form>
      </section>

      {/* CHAT */}
      <section className="section-padding">
        <h1 className="section-title">LIVE TRAINING CHAT</h1>

        <div className="chat-box glass-elite">
          <div className="chat-window">
            {chat.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about training, rules, tactics..."
            />
            <button onClick={sendChat} className="btn-glow small">
              Send
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Interact;
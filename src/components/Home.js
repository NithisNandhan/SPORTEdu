import React, { useEffect, useRef } from "react";
import "../App.css";
import bgImage from "../assets/home-background.jpeg";

function Home() {

  const tickerRef = useRef(null);
  useEffect(() => {
    const btn = document.getElementById("enterAcademyBtn");

    const handleScroll = () => {
      let scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight -
            window.innerHeight)) *
        100;

      if (scrollPercent >= 70 && btn) {
        btn.classList.remove("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const tips = [
    "⚽ Fact: Football is played in 200+ countries",
    "🔥 Tip: Always scan the field before receiving the ball",
    "🏆 World Cup: Held every 4 years",
    "💡 Training: Consistency beats intensity",
    "🚀 Skill: First touch defines your next move"
  ];

  let index = 0;
  let timer;
  const el = tickerRef.current;

  if (!el) return;

  function animate() {
    if (!el) return;

    // Reset position instantly off-screen to the right
    el.style.transition = "none";
    el.style.left = "100%";
    el.innerText = tips[index];

    // Execution delay to ensure the reset is processed by the DOM
    setTimeout(() => {
      if (!el) return;
      // --- SUPER SLOW SPEED (40 SECONDS) ---
      el.style.transition = "left 40s linear"; 
      el.style.left = "-250%"; // Deep clearance to ensure long text fully exits
    }, 100);

    index = (index + 1) % tips.length;

    // --- INTERVAL TIMER ---
    // 40 seconds for the walk + 2 seconds of "empty air" before the next one
    timer = setTimeout(animate, 42000); 
  }

  animate();

  return () => clearTimeout(timer);
}, []);
  return (
    <div className="dark-theme">

      <nav className="navbar">
        
        <div className="nav-logo">SPORTEdu</div>
        
        <div className="nav-links">

          <a href="/external/academy.html">Academy</a>
          <a href="/external/register.html">Register</a>
          <a href="/interact">Interact</a>
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

      <div className="info-ticker">
          <div ref={tickerRef}>⚽ Fact: Football is played in 200+ countries</div>
        </div>
      

      {/* HERO */}
      <section
        className="hero-section parallax"
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >
        
        <div className="dark-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            FORGED IN DISCIPLINE. BUILT FOR DOMINANCE.
          </h1>
          <p className="hero-text">
            SPORTEdu represents the evolution of football performance. We do not merely train athletes — 
            we engineer competitors. Every sprint is intentional. Every drill is calculated. Every tactical 
            scenario is crafted to sharpen awareness, reaction speed, and positional intelligence. 
            Our methodology blends elite conditioning, cognitive training, structured match simulation, 
            and data-backed performance analysis to develop players capable of adapting under pressure. 
            Modern football demands more than talent. It demands composure in chaos, explosive acceleration, 
            and tactical precision. At SPORTEdu, we cultivate resilience through repetition and leadership 
            through accountability. Our environment challenges physical limits while refining decision-making 
            speed. We train athletes to dominate space, command tempo, and execute with ruthless efficiency. 
            This is not casual training. This is structured performance evolution designed to prepare 
            competitors for high-intensity match environments and elite-level execution.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding">

        <div className="feature-block">
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1400&q=80" />
          </div>
          <div className="feature-text">
            <h2>PERFORMANCE SCIENCE INTEGRATION</h2>
            <p>
              Our development system integrates biomechanics, endurance conditioning, and neuromuscular coordination.
            Athletes train under progressive intensity models that balance explosive strength with sustained stamina.
            Every movement is measured, refined, and optimized. This ensures players gain acceleration efficiency,
            injury prevention awareness, and high-level physical control required in competitive environments.
            Training sessions are designed to simulate match fatigue conditions so players build resilience
            while maintaining technical sharpness.
            </p>
          </div>
        </div>

        <div className="feature-block reverse">
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&w=1400&q=80" />
          </div>
          <div className="feature-text">
            <h2>MENTAL PERFORMANCE EDGE</h2>
            <p>
              Elite football requires clarity under pressure. We simulate real-time decision-making drills
            that enhance awareness, scanning ability, and reaction time. Athletes train to remain composed
            when tempo accelerates and defensive lines tighten. Through cognitive repetition and competitive
            stress training, players develop confidence, leadership communication, and emotional stability.
            Mental resilience becomes instinctive, enabling high-performance consistency during critical match moments.
            </p>
          </div>
        </div>

        <div className="feature-block">
          <div className="feature-image">
            <img src="https://img.freepik.com/premium-vector/football-football-tactics-drawn-with-white-chalk-green-board-vector_532963-5593.jpg" />
          </div>
          <div className="feature-text">
            <h2>TACTICAL INTELLIGENCE DEVELOPMENT</h2>
            <p>
              Tactical awareness separates athletes from true competitors. We teach spatial control,
            formation discipline, transitional awareness, and pressing systems. Players understand not
            only their role, but how their movement affects team structure. Sessions include video analysis,
            shape rotations, and simulated match scenarios that accelerate learning under realistic pressure.
            </p>
          </div>
        </div>

        <div className="feature-block reverse">
          <div className="feature-image">
            <img src="https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/2050/live/ada34330-f1e8-11f0-b373-d7bde4e9f067.jpg" />
          </div>
          <div className="feature-text">
            <h2>COMPETITIVE MATCH EXPOSURE</h2>
            <p>
              Performance must translate into execution. SPORTEdu ensures structured match play exposure
            with performance feedback cycles. Athletes compete in controlled competitive environments
            designed to test tactical adaptability, endurance sustainability, and positional responsibility.
            Match data is reviewed post-session to identify growth opportunities and reinforce strategic discipline.
            </p>
          </div>
        </div>

      </section>

      {/* PROGRAMS */}
      <section className="program-section">
        <h1 className="section-title">ELITE PROGRAMS</h1>

        <div className="program-grid">

          <div className="program-card glass-elite">
            <img src="https://www.thefa.com/-/media/education-hub/england-dna/yd-900-physical-overview---article-header.ashx" alt="Youth Development" />
            <h3>Youth Development</h3>
            <p>
              Designed for foundational athletes, this program builds coordination, ball mastery, acceleration control,
              and tactical basics. Young players learn positional awareness and movement mechanics while strengthening
              technical confidence.
            </p>
          </div>

          <div className="program-card glass-elite">
            <img src="https://www.shutterstock.com/image-photo/football-manager-coaching-chalkboard-write-600nw-2693489427.jpg" alt="Tactical Training" />
            <h3>Advanced Tactical Training</h3>
            <p>
              Players analyze formation transitions, defensive pressing systems, and offensive structure variations.
            </p>
          </div>

          <div className="program-card glass-elite">
            <img src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80" alt="Finishing Camp" />
            <h3>Elite Finishing Camp</h3>
            <p>
              Athletes refine shooting accuracy and composure inside the penalty area.
            </p>
          </div>

          <div className="program-card glass-elite">
            <img src="https://pbs.twimg.com/media/Ge3Io5XXQAAaN3d.png" alt="Defensive Training" />
            <h3>Defensive Mastery</h3>
            <p>
              Training includes interception timing and defensive organization.
            </p>
          </div>

          <div className="program-card glass-elite">
            <img src="https://www.thesun.co.uk/wp-content/uploads/2025/10/31-senne-lammens-catches-ball-1028802837_a6e2b9.jpg?strip=all&w=960" alt="Goalkeeper Training" />
            <h3>Goalkeeper Excellence</h3>
            <p>
              Goalkeepers train in reaction drills and aerial command.
            </p>
          </div>

        </div>

        <br />

        <button
          className="btn-glow center-btn"
          onClick={() => (window.location.href = "/external/academy.html")}
        >
          ENTER THE ACADEMY
        </button>

      </section>

    </div>
  );
}

export default Home;
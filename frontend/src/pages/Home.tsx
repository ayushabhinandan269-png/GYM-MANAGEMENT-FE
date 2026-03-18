import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {

  useEffect(() => {

    AOS.init({
      duration: 900,
      once: true
    });

    const hero = document.querySelector("#hero");

    setTimeout(() => {
      if (hero) {
        (hero as HTMLElement).style.backgroundSize = "120%";
      }
    }, 200);

  }, []);

  const heroStyle = {
    width: "100%",
    height: "85vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as const,
    textAlign: "center" as const,
    color: "white",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48)",
    backgroundSize: "110%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-size 6s ease"
  };

  const featureGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
    gap: "30px",
    marginTop: "40px"
  };

  const card = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: "all 0.35s ease",
    cursor: "pointer",
    border: "1px solid #eee"
  };

  const stats = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "30px",
    textAlign: "center" as const,
    marginTop: "50px"
  };

  const hoverEnter = (e: any) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.background = "#111";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)";
  };

  const hoverLeave = (e: any) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.background = "white";
    e.currentTarget.style.color = "#000";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
  };

  return (
    <div>

      {/* HERO */}

      <section id="hero" style={heroStyle}>

        <h1 style={{ fontSize: "52px", marginBottom: "15px" }} data-aos="fade-up">
          Gym Management System
        </h1>

        <p
          style={{ fontSize: "20px", maxWidth: "650px" }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Manage members, trainers, workout plans and AI based nutrition tracking
          all in one powerful platform.
        </p>

        <div style={{ marginTop: "25px" }} data-aos="fade-up" data-aos-delay="400">

          <Link to="/register">
            <button
              style={{
                padding: "12px 24px",
                background: "#f5c518",
                border: "none",
                borderRadius: "6px",
                marginRight: "15px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.3s"
              }}
            >
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button
              style={{
                padding: "12px 24px",
                background: "#111",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Login
            </button>
          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section style={{ padding: "90px 60px", textAlign: "center" }}>

        <h2 style={{ fontSize: "36px" }} data-aos="fade-up">
          Powerful Features
        </h2>

        <div style={featureGrid}>

          <div style={card} data-aos="fade-up" onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            <h3>📊 Member Management</h3>
            <p>Manage gym members, track memberships and monitor activity.</p>
          </div>

          <div style={card} data-aos="fade-up" data-aos-delay="150" onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            <h3>👨‍🏫 Trainer Assignment</h3>
            <p>Assign trainers to members and manage workout programs.</p>
          </div>

          <div style={card} data-aos="fade-up" data-aos-delay="300" onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            <h3>💪 Workout Programs</h3>
            <p>Create structured workout plans and track performance.</p>
          </div>

          <div style={card} data-aos="fade-up" data-aos-delay="450" onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
            <h3>🥗 AI Nutrition Tracker</h3>
            <p>
              Smart AI calculates calories from your diet and recommends meal plans
              based on your body weight.
            </p>
          </div>

        </div>

      </section>

      {/* AI NUTRITION */}

      <section
        style={{
          padding: "90px",
          background: "#f5f5f5",
          display: "flex",
          gap: "50px",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >

        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
          alt="nutrition"
          loading="lazy"
          style={{
            width: "480px",
            maxWidth: "100%",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            transition: "transform 0.3s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          data-aos="fade-right"
        />

        <div style={{ maxWidth: "500px" }} data-aos="fade-left">

          <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>
            AI Powered Nutrition Planning
          </h2>

          <p style={{ fontSize: "18px", marginBottom: "15px" }}>
            Track calories automatically by entering your meals.
          </p>

          <p style={{ fontSize: "18px", marginBottom: "15px" }}>
            AI calculates daily calorie intake and suggests meal plans
            based on your goals.
          </p>

          <p style={{ fontSize: "18px" }}>
            Perfect for bulking, cutting and maintaining fitness goals.
          </p>

        </div>

      </section>

      {/* STATS */}

      <section style={{ padding: "90px", background: "#111", color: "white" }}>

        <h2 style={{ textAlign: "center", fontSize: "36px" }} data-aos="fade-up">
          GymMS Impact
        </h2>

        <div style={stats}>

          <div
            data-aos="zoom-in"
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ fontSize: "48px", color: "#f5c518" }}>2000+</h3>
            <p>Active Members</p>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ fontSize: "48px", color: "#f5c518" }}>150+</h3>
            <p>Professional Trainers</p>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ fontSize: "48px", color: "#f5c518" }}>500+</h3>
            <p>Workout Plans</p>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-delay="600"
            style={{ transition: "transform 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ fontSize: "48px", color: "#f5c518" }}>24/7</h3>
            <p>AI Nutrition Tracking</p>
          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section style={{ padding: "90px", textAlign: "center" }}>

        <h2 style={{ fontSize: "36px" }} data-aos="fade-up">
          What Our Members Say
        </h2>

        <div style={featureGrid}>

          <div style={card} data-aos="fade-up">
            ⭐⭐⭐⭐⭐
            <p>"This platform transformed how our gym operates."</p>
            <strong>- Trainer</strong>
          </div>

          <div style={card} data-aos="fade-up" data-aos-delay="200">
            ⭐⭐⭐⭐⭐
            <p>"Tracking workouts and nutrition has never been easier."</p>
            <strong>- Member</strong>
          </div>

          <div style={card} data-aos="fade-up" data-aos-delay="400">
            ⭐⭐⭐⭐⭐
            <p>"Best gym management software I’ve used."</p>
            <strong>- Gym Owner</strong>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section style={{ padding: "90px", textAlign: "center" }}>

        <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>
          Start Managing Your Gym Smarter
        </h2>

        <Link to="/register">
          <button
            style={{
              padding: "14px 28px",
              background: "#f5c518",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            Register Now
          </button>
        </Link>

      </section>

      {/* FOOTER */}

      <footer
        style={{
          background: "#111",
          color: "white",
          padding: "40px",
          textAlign: "center"
        }}
      >

        <h3>GymMS</h3>

        <p>Smart gym management powered by technology.</p>

        <div style={{ marginTop: "15px" }}>
          <Link to="/" style={{ color: "#f5c518", margin: "10px" }}>Home</Link>
          <Link to="/plans" style={{ color: "#f5c518", margin: "10px" }}>Plans</Link>
          <Link to="/workouts" style={{ color: "#f5c518", margin: "10px" }}>Workouts</Link>
        </div>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          © 2026 GymMS. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;
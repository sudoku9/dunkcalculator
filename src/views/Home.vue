<template>
    <div class="home">
      <header class="hero">
        <h1>Professional Dunk Calculator</h1>
        <p>Discover if you can dunk and get personalized training advice</p>
        <router-link to="/calculator" class="cta-button">Start Calculator</router-link>
      </header>
  
      <section class="features">
        <h2>Why Choose Our Dunk Calculator?</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Scientific Approach</h3>
            <p>Based on biomechanical research and real NBA data</p>
          </div>
          <div class="feature-card">
            <h3>Personalized Training</h3>
            <p>Get custom workout plans based on your measurements</p>
          </div>
          <div class="feature-card">
            <h3>Advanced Analytics</h3>
            <p>Detailed breakdown of your jumping mechanics</p>
          </div>
          <div class="feature-card">
            <h3>Visual Feedback</h3>
            <p>Interactive 2D trajectory visualization</p>
          </div>
        </div>
      </section>
  
      <section class="quick-start">
        <h2>Quick Start Guide</h2>
        <div class="steps">
          <div class="step">
            <span class="step-number">1</span>
            <p>Enter your physical measurements</p>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <p>Get instant dunk potential analysis</p>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <p>Receive personalized training plan</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
    metaInfo: {
      title: 'Basketball Dunk Calculator - Find Out If You Can Dunk',
      meta: [
        { 
          name: 'description', 
          content: 'Use our professional basketball dunk calculator to discover if you can dunk. Get personalized training advice and improve your vertical jump. Free scientific-based tool.'
        }
      ]
    }
  }
  </script>
  
  <style scoped>
  .hero {
    text-align: center;
    padding: 4rem 2rem;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
  }
  
  .cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background: #ff6b6b;
    color: white;
    text-decoration: none;
    border-radius: 30px;
    margin-top: 2rem;
    transition: all 0.3s ease;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem;
  }
  
  .feature-card {
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    background: white;
  }
  
  .steps {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 2rem;
  }
  
  .step {
    text-align: center;
    padding: 1rem;
  }
  
  .step-number {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background: #2a5298;
    color: white;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 768px) {
    .feature-grid {
      grid-template-columns: 1fr;
    }
    
    .steps {
      flex-direction: column;
    }
  }
  </style>
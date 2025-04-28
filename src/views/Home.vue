<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Dunk Calculator</h1>
          <p class="hero-subtitle">The most advanced basketball dunk calculator with scientific analysis and personalized training recommendations</p>
          <div class="hero-buttons">
            <router-link to="/calculator" class="btn btn-primary">Try the Calculator</router-link>
            <router-link to="/training" class="btn btn-secondary">Training Guide</router-link>
          </div>
        </div>
        <div class="hero-image">
          <img src="../assets/hero-image.svg" alt="Basketball player dunking" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features section">
      <div class="container">
        <h2 class="section-title">Advanced Features</h2>
        <p class="section-subtitle">Our dunk calculator goes beyond basic measurements to provide comprehensive analysis</p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Vertical Jump Analysis</h3>
            <p>Calculate your current vertical jump and how much more you need to dunk successfully</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h3>Precision Metrics</h3>
            <p>Advanced physics calculations including hang time, jumping energy, and optimal takeoff point</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3>Data Visualization</h3>
            <p>Interactive charts and graphs to visualize your dunking potential and progress</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🏋️</div>
            <h3>Training Recommendations</h3>
            <p>Personalized training programs based on your specific measurements and goals</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Dunk Type Suggestions</h3>
            <p>Recommendations for dunk types that match your physical attributes and abilities</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🧠</div>
            <h3>Scientific Approach</h3>
            <p>Calculations based on biomechanics research and professional basketball data</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works section">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">Our calculator uses advanced algorithms to analyze your dunking potential</p>

        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Enter Your Measurements</h3>
              <p>Input your height, weight, standing reach, and other physical measurements</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Add Advanced Parameters</h3>
              <p>Include details like takeoff angle, core strength, and other factors for more precise results</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Get Your Analysis</h3>
              <p>Receive a comprehensive analysis of your dunking potential with detailed metrics</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Follow Training Recommendations</h3>
              <p>Use our personalized training suggestions to improve your vertical jump and dunking ability</p>
            </div>
          </div>
        </div>

        <div class="cta-container">
          <router-link to="/calculator" class="btn">Start Your Analysis Now</router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials section">
      <div class="container">
        <h2 class="section-title">Success Stories</h2>
        <p class="section-subtitle">See how our calculator has helped basketball players achieve their dunking goals</p>

        <div class="testimonials-slider">
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"I was 5'10" and couldn't even touch the rim. After using the Dunk Calculator and following the training program for 8 weeks, I can now dunk consistently!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-image">
                <img src="../assets/testimonial1.jpg" alt="Michael T." />
              </div>
              <div class="author-info">
                <h4>Michael T.</h4>
                <p>High School Player, 5'10"</p>
              </div>
            </div>
          </div>

          <div class="testimonial">
            <div class="testimonial-content">
              <p>"The advanced metrics helped me understand exactly what I needed to improve. The training recommendations were spot on, and I'm now dunking with both hands!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-image">
                <img src="../assets/testimonial2.jpg" alt="Sarah K." />
              </div>
              <div class="author-info">
                <h4>Sarah K.</h4>
                <p>College Basketball Player, 6'0"</p>
              </div>
            </div>
          </div>

          <div class="testimonial">
            <div class="testimonial-content">
              <p>"As a coach, I use this calculator with all my players. The scientific approach and detailed analysis have helped my team improve their vertical jumps by an average of 4 inches!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-image">
                <img src="../assets/placeholder.svg" alt="Coach Wilson" />
              </div>
              <div class="author-info">
                <h4>Coach Wilson</h4>
                <p>High School Basketball Coach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Preview Section -->
    <section class="articles-preview section">
      <div class="container">
        <h2 class="section-title">Basketball Dunking Science</h2>
        <p class="section-subtitle">Learn from our collection of scientific articles about vertical jumping and dunking</p>

        <div class="articles-grid">
          <div class="article-card">
            <div class="article-image">
              <img src="../assets/placeholder.svg" alt="The Science of Vertical Jump" />
            </div>
            <div class="article-content">
              <h3>The Science of Vertical Jump</h3>
              <p>Explore the biomechanics and physics behind an explosive vertical jump</p>
              <router-link to="/articles/vertical-jump-science" class="article-link">Read More</router-link>
            </div>
          </div>

          <div class="article-card">
            <div class="article-image">
              <img src="../assets/placeholder.svg" alt="NBA Dunkers Analysis" />
            </div>
            <div class="article-content">
              <h3>NBA Dunkers Analysis</h3>
              <p>Data-driven analysis of the best NBA dunkers and their physical attributes</p>
              <router-link to="/articles/nba-dunkers" class="article-link">Read More</router-link>
            </div>
          </div>

          <div class="article-card">
            <div class="article-image">
              <img src="../assets/placeholder.svg" alt="Plyometric Training Guide" />
            </div>
            <div class="article-content">
              <h3>Plyometric Training Guide</h3>
              <p>Comprehensive guide to plyometric exercises for improving your vertical jump</p>
              <router-link to="/articles/plyometric-training" class="article-link">Read More</router-link>
            </div>
          </div>
        </div>

        <div class="cta-container">
          <router-link to="/articles" class="btn btn-secondary">View All Articles</router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Start Dunking?</h2>
          <p>Use our advanced dunk calculator to analyze your potential and get personalized training recommendations</p>
          <router-link to="/calculator" class="btn">Try the Calculator Now</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
/* Hero Section */
.hero {
  background: linear-gradient(135deg, #ff5722 0%, #ff9800 100%);
  color: white;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/pattern.svg');
  opacity: 0.1;
}

.hero .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 15px;
}

.hero-image {
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: flex-end;
}

.hero-image img {
  max-width: 100%;
  height: auto;
}

/* Features Section */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.feature-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* How It Works Section */
.how-it-works {
  background-color: #f9f9f9;
}

.steps {
  margin-top: 50px;
}

.step {
  display: flex;
  margin-bottom: 40px;
  position: relative;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50px;
  left: 25px;
  width: 2px;
  height: calc(100% + 20px);
  background-color: #ddd;
  z-index: 0;
}

.step-number {
  width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 30px;
  position: relative;
  z-index: 1;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.step-content p {
  color: #666;
}

.cta-container {
  text-align: center;
  margin-top: 40px;
}

/* Testimonials Section */
.testimonials-slider {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 50px;
}

.testimonial {
  flex: 1;
  min-width: 300px;
  background-color: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
}

.testimonial-content {
  margin-bottom: 20px;
  font-style: italic;
  color: #555;
  position: relative;
}

.testimonial-content::before {
  content: '"';
  font-size: 4rem;
  color: #f0f0f0;
  position: absolute;
  top: -20px;
  left: -15px;
  z-index: 0;
}

.testimonial-content p {
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info h4 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: var(--primary-color);
}

.author-info p {
  font-size: 0.9rem;
  color: #777;
}

/* Articles Preview Section */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.article-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
}

.article-card:hover {
  transform: translateY(-10px);
}

.article-image {
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.article-card:hover .article-image img {
  transform: scale(1.1);
}

.article-content {
  padding: 20px;
}

.article-content h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.article-content p {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.article-link {
  display: inline-block;
  color: var(--secondary-color);
  font-weight: 500;
  position: relative;
}

.article-link::after {
  content: '→';
  margin-left: 5px;
  transition: transform 0.3s;
}

.article-link:hover::after {
  transform: translateX(5px);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #2196f3 0%, #03a9f4 100%);
  color: white;
  padding: 80px 0;
  margin-top: 60px;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

.cta-content .btn {
  background-color: white;
  color: var(--secondary-color);
  font-size: 1.1rem;
  padding: 12px 30px;
}

.cta-content .btn:hover {
  background-color: #f5f5f5;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .hero .container {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    margin-bottom: 40px;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-image {
    justify-content: center;
  }

  .hero-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 0;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .section {
    padding: 40px 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .testimonials-slider {
    flex-direction: column;
  }

  .cta-section {
    padding: 60px 0;
  }

  .cta-content h2 {
    font-size: 2rem;
  }
}
</style>

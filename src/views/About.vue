<template>
  <div class="about-page">
    <div class="container">
      <div class="page-header">
        <h1>About Dunk Calculator</h1>
        <p>Our mission, science, and the team behind the most advanced basketball dunk calculator</p>
      </div>

      <div class="about-section mission-section">
        <div class="section-content">
          <h2>Our Mission</h2>
          <p>
            At Dunk Calculator, our mission is to help basketball players of all heights and abilities achieve their dunking goals through science-based analysis and personalized training recommendations.
          </p>
          <p>
            We believe that dunking a basketball is not just reserved for the tallest or most naturally athletic players. With the right training approach, proper technique, and personalized guidance, many more players can experience the thrill of throwing down their first dunk.
          </p>
          <p>
            Our advanced calculator combines principles of physics, biomechanics, and sports science to provide the most accurate assessment of your dunking potential and the specific improvements needed to reach your goals.
          </p>
        </div>
        <div class="section-image">
          <img src="../assets/mission.svg" alt="Basketball player reaching for the rim">
        </div>
      </div>

      <div class="about-section science-section">
        <div class="section-image">
          <img src="../assets/science.svg" alt="Scientific analysis of vertical jump">
        </div>
        <div class="section-content">
          <h2>The Science Behind Our Calculator</h2>
          <p>
            Our dunk calculator is built on a foundation of scientific research in biomechanics, exercise physiology, and physics. We've analyzed data from thousands of basketball players to create algorithms that accurately predict dunking potential based on physical measurements.
          </p>
          <p>
            Unlike basic calculators that only consider height and standing reach, our advanced model incorporates multiple factors:
          </p>
          <ul>
            <li><strong>Biomechanical Factors:</strong> Standing reach, arm length, hand size, and body proportions</li>
            <li><strong>Physical Performance:</strong> Current vertical jump, running approach, takeoff angle</li>
            <li><strong>Advanced Metrics:</strong> Core strength index, knee bend angle, and other technical factors</li>
            <li><strong>Physics Calculations:</strong> Hang time, jumping energy, initial velocity, and air resistance</li>
          </ul>
          <p>
            Our recommendations are based on peer-reviewed research in sports science and the practical experience of professional trainers who have helped athletes at all levels improve their vertical jump.
          </p>
        </div>
      </div>

      <div class="about-section team-section">
        <div class="section-content">
          <h2>Our Team</h2>
          <p>
            Dunk Calculator was created by a team of basketball enthusiasts, sports scientists, and web developers who share a passion for the game and a commitment to helping players reach their full potential.
          </p>
        </div>

        <div class="team-grid">
          <div class="team-member">
            <div class="member-image">
              <img src="../assets/placeholder.svg" alt="Dr. James Wilson">
            </div>
            <h3>Dr. James Wilson</h3>
            <p class="member-title">Sports Biomechanist</p>
            <p class="member-bio">
              PhD in Biomechanics with 15 years of experience studying vertical jump performance in athletes. Former college basketball player.
            </p>
          </div>

          <div class="team-member">
            <div class="member-image">
              <img src="../assets/placeholder.svg" alt="Coach Sarah Thompson">
            </div>
            <h3>Coach Sarah Thompson</h3>
            <p class="member-title">Vertical Jump Specialist</p>
            <p class="member-bio">
              Certified strength and conditioning coach who has helped hundreds of basketball players improve their vertical jump and achieve their first dunk.
            </p>
          </div>

          <div class="team-member">
            <div class="member-image">
              <img src="../assets/placeholder.svg" alt="Michael Chen">
            </div>
            <h3>Michael Chen</h3>
            <p class="member-title">Data Scientist</p>
            <p class="member-bio">
              Specializes in sports analytics and developing predictive models for athletic performance. Passionate basketball player and stats enthusiast.
            </p>
          </div>

          <div class="team-member">
            <div class="member-image">
              <img src="../assets/placeholder.svg" alt="Alex Rodriguez">
            </div>
            <h3>Alex Rodriguez</h3>
            <p class="member-title">Web Developer</p>
            <p class="member-bio">
              Full-stack developer with expertise in creating interactive web applications. Former high school basketball player who achieved his first dunk at 5'10".
            </p>
          </div>
        </div>
      </div>

      <div class="about-section testimonials-section">
        <h2>What Users Are Saying</h2>

        <div class="testimonials-slider">
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"The Dunk Calculator gave me a precise analysis of what I needed to improve. After following the training recommendations for 10 weeks, I went from barely touching the rim to dunking consistently!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-image">
                <img src="../assets/placeholder.svg" alt="Jason K.">
              </div>
              <div class="author-info">
                <h4>Jason K.</h4>
                <p>High School Player, 6'0"</p>
              </div>
            </div>
          </div>

          <div class="testimonial">
            <div class="testimonial-content">
              <p>"As a shorter player at 5'9", I never thought dunking was possible for me. The personalized training program from Dunk Calculator helped me gain 8 inches on my vertical in just 3 months. I can now dunk with one hand!"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-image">
                <img src="../assets/placeholder.svg" alt="Marcus T.">
              </div>
              <div class="author-info">
                <h4>Marcus T.</h4>
                <p>Recreational Player, 5'9"</p>
              </div>
            </div>
          </div>

          <div class="testimonial">
            <div class="testimonial-content">
              <p>"I use the Dunk Calculator with all my athletes. The scientific approach and detailed metrics have helped me create more effective training programs. My players are seeing faster results than ever before."</p>
            </div>
            <div class="testimonial-author">
              <div class="author-image">
                <img src="../assets/placeholder.svg" alt="Coach Williams">
              </div>
              <div class="author-info">
                <h4>Coach Williams</h4>
                <p>High School Basketball Coach</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="about-section faq-section">
        <h2>Frequently Asked Questions</h2>

        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ faq.question }}</h3>
            <span class="faq-toggle" :class="{ 'active': activeFaq === index }">+</span>
          </div>
          <div class="faq-answer" :class="{ 'active': activeFaq === index }">
            <p v-html="faq.answer"></p>
          </div>
        </div>
      </div>

      <div class="about-section contact-section">
        <h2>Contact Us</h2>
        <p>Have questions, suggestions, or feedback? We'd love to hear from you!</p>

        <div class="contact-methods">
          <div class="contact-method">
            <div class="contact-icon">✉️</div>
            <h3>Email</h3>
            <p><a href="mailto:contact@dunkcalculator.com">contact@dunkcalculator.com</a></p>
          </div>

          <div class="contact-method">
            <div class="contact-icon">📱</div>
            <h3>Social Media</h3>
            <div class="social-links">
              <a href="https://facebook.com" target="_blank">Facebook</a>
              <a href="https://twitter.com" target="_blank">Twitter</a>
              <a href="https://instagram.com" target="_blank">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      activeFaq: null,
      faqs: [
        {
          question: 'How accurate is the Dunk Calculator?',
          answer: 'Our calculator is based on scientific principles of physics and biomechanics, making it highly accurate. We consider multiple factors including height, weight, standing reach, arm length, hand size, and advanced parameters like takeoff angle and core strength. While no calculator can be 100% accurate due to individual differences in technique and athletic ability, our calculator provides a very close estimation of your dunking potential and the improvements needed.'
        },
        {
          question: 'Can anyone learn to dunk with enough training?',
          answer: 'While most people can significantly improve their vertical jump with proper training, not everyone will be able to dunk a basketball. Factors like height, wingspan, natural athleticism, age, and physical limitations all play a role. However, many people who thought dunking was impossible for them have achieved it through dedicated training. Our calculator helps you understand if dunking is a realistic goal for you and what specific improvements you need to make.'
        },
        {
          question: 'How long does it take to improve vertical jump enough to dunk?',
          answer: 'The timeline varies greatly depending on your starting point, natural athleticism, training consistency, and how much improvement you need. Some athletes see significant results in 8-12 weeks, while others may take 6 months or more. Our calculator provides a personalized estimate based on your current measurements and the improvements needed.'
        },
        {
          question: 'Do you offer personalized training programs?',
          answer: 'Yes! Based on your calculator results, we provide personalized training recommendations tailored to your specific needs. These include targeted exercises, training frequency, and progression guidelines. For more comprehensive coaching, we also offer premium training programs with detailed workout plans, video tutorials, and progress tracking.'
        },
        {
          question: 'Is the calculator free to use?',
          answer: 'Yes, the basic Dunk Calculator is completely free to use. We also offer premium features and personalized training programs for those who want more detailed guidance and support.'
        }
      ]
    }
  },
  methods: {
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index
    }
  }
}
</script>

<style scoped>
.about-page {
  padding: 60px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.page-header p {
  color: #666;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
}

.about-section {
  margin-bottom: 80px;
}

.about-section h2 {
  color: var(--secondary-color);
  font-size: 2rem;
  margin-bottom: 30px;
}

.mission-section, .science-section {
  display: flex;
  align-items: center;
  gap: 40px;
}

.section-content {
  flex: 1;
}

.section-content p {
  margin-bottom: 20px;
  line-height: 1.7;
  color: #444;
}

.section-content ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

.section-content li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #444;
}

.section-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-image img {
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius);
}

.team-section .section-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.team-member {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  padding-bottom: 20px;
  transition: transform 0.3s;
}

.team-member:hover {
  transform: translateY(-10px);
}

.member-image {
  height: 250px;
  overflow: hidden;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member h3 {
  margin: 20px 0 5px;
  padding: 0 20px;
  font-size: 1.3rem;
  color: var(--primary-color);
}

.member-title {
  color: var(--secondary-color);
  font-weight: 500;
  margin-bottom: 15px;
  padding: 0 20px;
}

.member-bio {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  padding: 0 20px;
}

.testimonials-section h2 {
  text-align: center;
  margin-bottom: 40px;
}

.testimonials-slider {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
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

.faq-section h2 {
  text-align: center;
  margin-bottom: 40px;
}

.faq-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;
}

.faq-question h3 {
  font-size: 1.2rem;
  color: var(--text-color);
  margin: 0;
  transition: color 0.3s;
}

.faq-question:hover h3 {
  color: var(--primary-color);
}

.faq-toggle {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: transform 0.3s;
}

.faq-toggle.active {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease;
}

.faq-answer.active {
  max-height: 1000px;
  padding-bottom: 20px;
}

.faq-answer p {
  margin-bottom: 15px;
  color: #666;
  line-height: 1.6;
}

.contact-section {
  text-align: center;
}

.contact-section h2 {
  margin-bottom: 20px;
}

.contact-section > p {
  max-width: 600px;
  margin: 0 auto 40px;
  color: #666;
}

.contact-methods {
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
}

.contact-method {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
  min-width: 250px;
  transition: transform 0.3s;
}

.contact-method:hover {
  transform: translateY(-10px);
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.contact-method h3 {
  margin-bottom: 15px;
  color: var(--secondary-color);
}

.contact-method p {
  color: #666;
}

.contact-method a {
  color: var(--secondary-color);
  font-weight: 500;
  transition: color 0.3s;
}

.contact-method a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
}

@media (max-width: 992px) {
  .mission-section, .science-section {
    flex-direction: column;
  }

  .science-section .section-image {
    order: -1;
  }
}

@media (max-width: 768px) {
  .about-page {
    padding: 40px 0;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .about-section h2 {
    font-size: 1.8rem;
  }

  .testimonials-slider {
    flex-direction: column;
  }
}
</style>

<template>
  <div class="calculator-page">
    <div class="container">
      <div class="page-header">
        <h1>Basketball Dunk Calculator</h1>
        <p>Calculate your dunking potential with our advanced scientific calculator</p>
      </div>

      <!-- Main Calculator Component -->
      <div class="calculator-wrapper">
        <DunkCalculator />
      </div>

      <div class="section-divider">
        <h2 class="section-title">Learn More About Our Calculator</h2>
      </div>

      <div class="calculator-intro">
        <div class="intro-content">
          <h2>How Our Calculator Works</h2>
          <p>
            Our advanced dunk calculator uses physics principles and biomechanics to analyze your dunking potential.
            By considering factors like your height, weight, standing reach, and advanced parameters such as takeoff angle
            and core strength, we provide the most accurate assessment of your ability to dunk a basketball.
          </p>
          <p>
            Unlike other calculators, we factor in air resistance, hand grip factors, and provide personalized
            training recommendations based on your specific measurements and goals.
          </p>
          <h3>What You'll Learn:</h3>
          <ul>
            <li>Your current vertical jump and how much more you need to dunk</li>
            <li>Hang time and jumping energy calculations</li>
            <li>Optimal takeoff point for maximum dunking efficiency</li>
            <li>Recommended dunk types based on your physical attributes</li>
            <li>Personalized training program to improve your vertical jump</li>
          </ul>
        </div>
        <div class="intro-image">
          <img src="../assets/calculator-intro.svg" alt="Basketball player measuring vertical jump" />
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div class="faq-item">
          <div class="faq-question" @click="toggleFaq(1)">
            <h3>How accurate is the dunk calculator?</h3>
            <span class="faq-toggle" :class="{ 'active': activeFaq === 1 }">+</span>
          </div>
          <div class="faq-answer" :class="{ 'active': activeFaq === 1 }">
            <p>
              Our dunk calculator is based on scientific principles of physics and biomechanics, making it highly accurate.
              We consider multiple factors including height, weight, standing reach, arm length, hand size, and advanced
              parameters like takeoff angle and core strength. While no calculator can be 100% accurate due to individual
              differences in technique and athletic ability, our calculator provides a very close estimation of your
              dunking potential and the improvements needed.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question" @click="toggleFaq(2)">
            <h3>How much vertical jump do I need to dunk?</h3>
            <span class="faq-toggle" :class="{ 'active': activeFaq === 2 }">+</span>
          </div>
          <div class="faq-answer" :class="{ 'active': activeFaq === 2 }">
            <p>
              The vertical jump needed to dunk depends on your standing reach. For a standard 10-foot (305 cm) basketball hoop:
            </p>
            <ul>
              <li>If your standing reach is 8'0" (244 cm), you need about a 22-inch (56 cm) vertical jump</li>
              <li>If your standing reach is 8'6" (259 cm), you need about a 16-inch (41 cm) vertical jump</li>
              <li>If your standing reach is 9'0" (274 cm), you need about a 10-inch (25 cm) vertical jump</li>
            </ul>
            <p>
              These estimates account for the need to get your hand about 6 inches above the rim for a proper dunk.
              Our calculator will give you a precise measurement based on your specific measurements.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question" @click="toggleFaq(3)">
            <h3>How long does it take to improve vertical jump?</h3>
            <span class="faq-toggle" :class="{ 'active': activeFaq === 3 }">+</span>
          </div>
          <div class="faq-answer" :class="{ 'active': activeFaq === 3 }">
            <p>
              With consistent training, you can expect to see improvements in your vertical jump within 4-12 weeks.
              The rate of improvement depends on several factors:
            </p>
            <ul>
              <li>Your current fitness level and athletic background</li>
              <li>The intensity and consistency of your training</li>
              <li>Your age and natural athletic ability</li>
              <li>Your diet and recovery practices</li>
            </ul>
            <p>
              Most dedicated training programs can help you gain 2-6 inches (5-15 cm) in vertical jump height over
              8-12 weeks. Some athletes may see even greater improvements. The key is consistent training with
              proper technique and progressive overload.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question" @click="toggleFaq(4)">
            <h3>Can short people dunk?</h3>
            <span class="faq-toggle" :class="{ 'active': activeFaq === 4 }">+</span>
          </div>
          <div class="faq-answer" :class="{ 'active': activeFaq === 4 }">
            <p>
              Yes, short people can definitely dunk! There are many examples of shorter players who can dunk:
            </p>
            <ul>
              <li>Spud Webb (5'7" or 170 cm) won the NBA Slam Dunk Contest in 1986</li>
              <li>Nate Robinson (5'9" or 175 cm) won the NBA Slam Dunk Contest three times</li>
              <li>Many high school and college players under 6 feet tall can dunk with proper training</li>
            </ul>
            <p>
              The key for shorter players is developing an exceptional vertical jump through targeted training.
              While taller players may need only a modest vertical to dunk, shorter players need to develop
              greater explosiveness and jumping technique. Our calculator and training recommendations can
              help players of all heights achieve their dunking goals.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question" @click="toggleFaq(5)">
            <h3>What are the best exercises to increase vertical jump?</h3>
            <span class="faq-toggle" :class="{ 'active': activeFaq === 5 }">+</span>
          </div>
          <div class="faq-answer" :class="{ 'active': activeFaq === 5 }">
            <p>
              The best exercises for increasing vertical jump combine strength training, plyometrics, and technique work:
            </p>
            <ul>
              <li><strong>Strength Training:</strong> Squats, deadlifts, lunges, and calf raises</li>
              <li><strong>Plyometrics:</strong> Box jumps, depth jumps, jump squats, and broad jumps</li>
              <li><strong>Core Exercises:</strong> Planks, Russian twists, and hanging leg raises</li>
              <li><strong>Technique Work:</strong> Jump technique drills and approach practice</li>
            </ul>
            <p>
              A well-rounded program should include all these components, with an emphasis on explosive power
              development. Our training recommendations provide a personalized program based on your specific
              needs and current abilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DunkCalculator from '../components/DunkCalculator.vue'

export default {
  name: 'CalculatorPage',
  components: {
    DunkCalculator
  },
  data() {
    return {
      activeFaq: null
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
.calculator-page {
  padding: 60px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
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

.calculator-wrapper {
  margin-bottom: 30px;
}

.section-divider {
  text-align: center;
  margin: 50px 0 30px;
  position: relative;
}

.section-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #e0e0e0;
  z-index: 1;
}

.section-title {
  display: inline-block;
  background-color: var(--bg-color);
  padding: 0 20px;
  position: relative;
  z-index: 2;
  color: var(--secondary-color);
  font-size: 1.6rem;
}

.calculator-intro {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 30px;
}

.intro-content {
  flex: 3;
}

.intro-content h2 {
  color: var(--secondary-color);
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.intro-content p {
  margin-bottom: 15px;
  color: #555;
  line-height: 1.6;
}

.intro-content h3 {
  color: var(--primary-color);
  margin: 25px 0 15px;
  font-size: 1.3rem;
}

.intro-content ul {
  padding-left: 20px;
}

.intro-content li {
  margin-bottom: 10px;
  color: #555;
}

.intro-image {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro-image img {
  max-width: 100%;
  height: auto;
}

/* FAQ Section */
.faq-section {
  margin-top: 60px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 30px;
}

.faq-section h2 {
  color: var(--secondary-color);
  margin-bottom: 30px;
  font-size: 1.8rem;
  text-align: center;
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

.faq-answer ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.faq-answer li {
  margin-bottom: 8px;
  color: #666;
}

@media (max-width: 992px) {
  .calculator-intro {
    flex-direction: column;
  }

  .intro-image {
    order: -1;
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .calculator-page {
    padding: 40px 0;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .intro-content h2 {
    font-size: 1.5rem;
  }
}
</style>

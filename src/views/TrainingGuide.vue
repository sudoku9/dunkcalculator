<template>
  <div class="training-guide-page">
    <div class="container">
      <div class="page-header">
        <h1>Basketball Dunking Training Guide</h1>
        <p>Comprehensive training programs to improve your vertical jump and dunking ability</p>
      </div>
      
      <div class="training-intro">
        <div class="intro-content">
          <h2>How to Use This Guide</h2>
          <p>
            This training guide is designed to help basketball players of all levels improve their vertical jump
            and develop the skills necessary for dunking. Whether you're just starting your dunking journey or
            looking to add more impressive dunks to your repertoire, you'll find valuable information and
            structured training programs here.
          </p>
          <p>
            The programs are organized by skill level and specific goals. Follow the recommended schedule
            and progression guidelines for the best results. Remember that consistency is key - improvements
            in vertical jump require dedicated training over time.
          </p>
        </div>
      </div>
      
      <div class="training-levels">
        <h2>Choose Your Training Level</h2>
        
        <div class="level-cards">
          <div class="level-card">
            <div class="level-icon">🔰</div>
            <h3>Beginner</h3>
            <p>For players who can't yet touch the rim</p>
            <span class="level-tag">4-8 weeks</span>
          </div>
          
          <div class="level-card">
            <div class="level-icon">⚡</div>
            <h3>Intermediate</h3>
            <p>For players who can touch the rim but can't dunk</p>
            <span class="level-tag">6-12 weeks</span>
          </div>
          
          <div class="level-card">
            <div class="level-icon">🏆</div>
            <h3>Advanced</h3>
            <p>For players who can dunk but want to improve</p>
            <span class="level-tag">8-16 weeks</span>
          </div>
        </div>
      </div>
      
      <div class="training-principles">
        <h2>Key Training Principles</h2>
        
        <div class="principles-grid">
          <div class="principle-card">
            <div class="principle-icon">🏋️</div>
            <h3>Progressive Overload</h3>
            <p>Gradually increase the demands on your body to continue making improvements in strength and power.</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">⚖️</div>
            <h3>Balanced Training</h3>
            <p>Combine strength, plyometric, and technique work for optimal results.</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">🔄</div>
            <h3>Proper Recovery</h3>
            <p>Allow adequate rest between workouts to prevent injury and maximize gains.</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">📈</div>
            <h3>Consistent Progression</h3>
            <p>Track your progress and make adjustments to your training as you improve.</p>
          </div>
        </div>
      </div>
      
      <div class="coming-soon">
        <h2>Full Training Programs Coming Soon!</h2>
        <p>We're currently developing comprehensive training programs for all skill levels.</p>
        <p>Check back soon for detailed workout plans, exercise demonstrations, and progress tracking tools.</p>
        
        <div class="cta-container">
          <router-link to="/calculator" class="btn">Try the Dunk Calculator</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainingGuide'
}
</script>

<style scoped>
.training-guide-page {
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

.training-intro {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 30px;
  margin-bottom: 40px;
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

.training-levels {
  margin-bottom: 40px;
}

.training-levels h2 {
  text-align: center;
  color: var(--secondary-color);
  margin-bottom: 30px;
  font-size: 2rem;
}

.level-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.level-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 30px;
  width: 300px;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;
}

.level-card:hover {
  transform: translateY(-10px);
}

.level-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.level-card h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.level-card p {
  color: #666;
  margin-bottom: 20px;
}

.level-tag {
  display: inline-block;
  background-color: var(--secondary-color);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.training-principles {
  margin-bottom: 40px;
}

.training-principles h2 {
  text-align: center;
  color: var(--secondary-color);
  margin-bottom: 30px;
  font-size: 2rem;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.principle-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 25px;
  text-align: center;
}

.principle-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.principle-card h3 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.principle-card p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
}

.coming-soon {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 40px;
  text-align: center;
  margin-bottom: 40px;
}

.coming-soon h2 {
  color: var(--primary-color);
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.coming-soon p {
  color: #666;
  margin-bottom: 15px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-container {
  margin-top: 30px;
}

@media (max-width: 768px) {
  .level-cards {
    flex-direction: column;
    align-items: center;
  }
  
  .level-card {
    width: 100%;
    max-width: 300px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
}
</style>
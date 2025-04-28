<template>
  <div class="calculator-container">
    <div class="calculator-form">
      <h2>Dunk Calculator</h2>
      <p class="calculator-description">
        Enter your physical measurements to calculate your dunking potential and get personalized recommendations.
      </p>
      
      <div class="form-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'basic' }]" 
          @click="activeTab = 'basic'"
        >
          Basic Parameters
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'advanced' }]" 
          @click="activeTab = 'advanced'"
        >
          Advanced Parameters
        </button>
      </div>
      
      <div v-if="activeTab === 'basic'" class="tab-content">
        <div class="form-group">
          <label for="height" class="form-label">Height (cm)</label>
          <input 
            type="number" 
            id="height" 
            v-model="formData.height" 
            class="form-control" 
            min="120" 
            max="250"
            @input="validateInput"
          >
          <span class="form-hint">Your height in centimeters</span>
        </div>
        
        <div class="form-group">
          <label for="weight" class="form-label">Weight (kg)</label>
          <input 
            type="number" 
            id="weight" 
            v-model="formData.weight" 
            class="form-control" 
            min="30" 
            max="200"
            @input="validateInput"
          >
          <span class="form-hint">Your weight in kilograms</span>
        </div>
        
        <div class="form-group">
          <label for="standingReach" class="form-label">Standing Reach (cm)</label>
          <input 
            type="number" 
            id="standingReach" 
            v-model="formData.standingReach" 
            class="form-control" 
            min="150" 
            max="300"
            @input="validateInput"
          >
          <span class="form-hint">How high you can reach with your arm extended</span>
        </div>
        
        <div class="form-group">
          <label for="runningReach" class="form-label">Running Reach (cm)</label>
          <input 
            type="number" 
            id="runningReach" 
            v-model="formData.runningReach" 
            class="form-control" 
            min="150" 
            max="350"
            @input="validateInput"
          >
          <span class="form-hint">How high you can reach while running and jumping</span>
        </div>
        
        <div class="form-group">
          <label for="armLength" class="form-label">Arm Length (cm)</label>
          <input 
            type="number" 
            id="armLength" 
            v-model="formData.armLength" 
            class="form-control" 
            min="50" 
            max="100"
            @input="validateInput"
          >
          <span class="form-hint">Length of your arm from shoulder to wrist</span>
        </div>
        
        <div class="form-group">
          <label for="handSize" class="form-label">Hand Size (cm)</label>
          <input 
            type="number" 
            id="handSize" 
            v-model="formData.handSize" 
            class="form-control" 
            min="15" 
            max="30"
            @input="validateInput"
          >
          <span class="form-hint">Length from wrist to tip of middle finger</span>
        </div>
      </div>
      
      <div v-if="activeTab === 'advanced'" class="tab-content">
        <div class="form-group">
          <label for="runupSteps" class="form-label">Runup Steps</label>
          <input 
            type="number" 
            id="runupSteps" 
            v-model="formData.runupSteps" 
            class="form-control" 
            min="1" 
            max="10"
            @input="validateInput"
          >
          <span class="form-hint">Number of steps in your approach</span>
        </div>
        
        <div class="form-group">
          <label for="takeoffAngle" class="form-label">Takeoff Angle (degrees)</label>
          <input 
            type="number" 
            id="takeoffAngle" 
            v-model="formData.takeoffAngle" 
            class="form-control" 
            min="0" 
            max="90"
            @input="validateInput"
          >
          <span class="form-hint">Angle of your body at takeoff (45° is optimal)</span>
        </div>
        
        <div class="form-group">
          <label for="coreStrength" class="form-label">Core Strength Index (1-10)</label>
          <input 
            type="number" 
            id="coreStrength" 
            v-model="formData.coreStrength" 
            class="form-control" 
            min="1" 
            max="10"
            @input="validateInput"
          >
          <span class="form-hint">Rate your core strength from 1 (weak) to 10 (strong)</span>
        </div>
        
        <div class="form-group">
          <label for="kneeAngle" class="form-label">Knee Bend Angle (degrees)</label>
          <input 
            type="number" 
            id="kneeAngle" 
            v-model="formData.kneeAngle" 
            class="form-control" 
            min="60" 
            max="120"
            @input="validateInput"
          >
          <span class="form-hint">Angle of knee bend at lowest point (90° is optimal)</span>
        </div>
      </div>
      
      <div class="form-actions">
        <button class="btn btn-secondary" @click="resetForm">Reset</button>
        <button class="btn" @click="calculateResults" :disabled="!isFormValid">Calculate</button>
      </div>
    </div>
    
    <div v-if="showResults" class="calculator-results">
      <h2>Your Dunking Analysis</h2>
      
      <div class="results-summary">
        <div class="result-card">
          <div class="result-icon">🏀</div>
          <div class="result-value">{{ results.dunkProbability }}%</div>
          <div class="result-label">Dunk Probability</div>
        </div>
        
        <div class="result-card">
          <div class="result-icon">📏</div>
          <div class="result-value">{{ results.verticalJumpNeeded }} cm</div>
          <div class="result-label">Vertical Jump Needed</div>
        </div>
        
        <div class="result-card">
          <div class="result-icon">⏱️</div>
          <div class="result-value">{{ results.hangTime }} sec</div>
          <div class="result-label">Hang Time</div>
        </div>
      </div>
      
      <div class="results-details">
        <div class="results-section">
          <h3>Detailed Analysis</h3>
          <div class="detail-item">
            <span class="detail-label">Current Vertical Jump:</span>
            <span class="detail-value">{{ results.currentVerticalJump }} cm</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Improvement Needed:</span>
            <span class="detail-value">{{ results.improvementNeeded }} cm</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Optimal Takeoff Point:</span>
            <span class="detail-value">{{ results.optimalTakeoffPoint }} cm from basket</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Jumping Energy Required:</span>
            <span class="detail-value">{{ results.jumpingEnergy }} Joules</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Initial Jumping Speed:</span>
            <span class="detail-value">{{ results.initialJumpingSpeed }} m/s</span>
          </div>
        </div>
        
        <div class="results-section">
          <h3>Recommended Dunk Types</h3>
          <ul class="dunk-types-list">
            <li v-for="(dunk, index) in results.recommendedDunkTypes" :key="index">
              {{ dunk.name }} - <span class="dunk-difficulty">{{ dunk.difficulty }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="training-recommendations">
        <h3>Training Recommendations</h3>
        <p>Based on your measurements, here are personalized training recommendations:</p>
        <div class="training-areas">
          <div class="training-area" v-for="(area, index) in results.trainingRecommendations" :key="index">
            <h4>{{ area.title }}</h4>
            <p>{{ area.description }}</p>
            <ul>
              <li v-for="(exercise, i) in area.exercises" :key="i">{{ exercise }}</li>
            </ul>
          </div>
        </div>
        <router-link to="/training" class="btn">View Full Training Guide</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DunkCalculator',
  data() {
    return {
      activeTab: 'basic',
      showResults: false,
      formData: {
        height: 180,
        weight: 75,
        standingReach: 230,
        runningReach: 280,
        armLength: 75,
        handSize: 20,
        runupSteps: 3,
        takeoffAngle: 45,
        coreStrength: 7,
        kneeAngle: 90
      },
      results: {
        dunkProbability: 0,
        verticalJumpNeeded: 0,
        hangTime: 0,
        currentVerticalJump: 0,
        improvementNeeded: 0,
        optimalTakeoffPoint: 0,
        jumpingEnergy: 0,
        initialJumpingSpeed: 0,
        recommendedDunkTypes: [],
        trainingRecommendations: []
      },
      errors: {}
    }
  },
  computed: {
    isFormValid() {
      // Check if all required fields are filled and valid
      const basicFields = ['height', 'weight', 'standingReach', 'runningReach', 'armLength', 'handSize']
      const advancedFields = ['runupSteps', 'takeoffAngle', 'coreStrength', 'kneeAngle']
      
      const allFields = [...basicFields, ...advancedFields]
      return allFields.every(field => this.formData[field] && !this.errors[field])
    }
  },
  methods: {
    validateInput(e) {
      const field = e.target.id
      const value = parseFloat(this.formData[field])
      
      // Clear previous error
      this.errors[field] = null
      
      // Validate based on field
      switch(field) {
        case 'height':
          if (value < 120 || value > 250) {
            this.errors[field] = 'Height must be between 120 and 250 cm'
          }
          break
        case 'weight':
          if (value < 30 || value > 200) {
            this.errors[field] = 'Weight must be between 30 and 200 kg'
          }
          break
        case 'standingReach':
          if (value < 150 || value > 300) {
            this.errors[field] = 'Standing reach must be between 150 and 300 cm'
          }
          break
        case 'runningReach':
          if (value < 150 || value > 350) {
            this.errors[field] = 'Running reach must be between 150 and 350 cm'
          }
          break
        case 'armLength':
          if (value < 50 || value > 100) {
            this.errors[field] = 'Arm length must be between 50 and 100 cm'
          }
          break
        case 'handSize':
          if (value < 15 || value > 30) {
            this.errors[field] = 'Hand size must be between 15 and 30 cm'
          }
          break
        case 'runupSteps':
          if (value < 1 || value > 10) {
            this.errors[field] = 'Runup steps must be between 1 and 10'
          }
          break
        case 'takeoffAngle':
          if (value < 0 || value > 90) {
            this.errors[field] = 'Takeoff angle must be between 0 and 90 degrees'
          }
          break
        case 'coreStrength':
          if (value < 1 || value > 10) {
            this.errors[field] = 'Core strength must be between 1 and 10'
          }
          break
        case 'kneeAngle':
          if (value < 60 || value > 120) {
            this.errors[field] = 'Knee angle must be between 60 and 120 degrees'
          }
          break
      }
    },
    resetForm() {
      this.formData = {
        height: 180,
        weight: 75,
        standingReach: 230,
        runningReach: 280,
        armLength: 75,
        handSize: 20,
        runupSteps: 3,
        takeoffAngle: 45,
        coreStrength: 7,
        kneeAngle: 90
      }
      this.errors = {}
      this.showResults = false
    },
    calculateResults() {
      // Standard basketball rim height in cm
      const rimHeight = 305
      
      // Calculate current vertical jump (difference between running reach and standing reach)
      const currentVerticalJump = this.formData.runningReach - this.formData.standingReach
      
      // Calculate vertical jump needed to dunk (rim height + ball radius - standing reach + hand size adjustment)
      const ballRadius = 12 // Basketball radius in cm
      const handSizeAdjustment = 5 // Adjustment for hand control
      const verticalJumpNeeded = rimHeight + ballRadius - this.formData.standingReach + handSizeAdjustment
      
      // Calculate improvement needed
      const improvementNeeded = Math.max(0, verticalJumpNeeded - currentVerticalJump)
      
      // Calculate dunk probability based on current jump vs needed jump
      let dunkProbability = 0
      if (currentVerticalJump >= verticalJumpNeeded) {
        dunkProbability = 100
      } else {
        // Calculate probability based on how close they are
        const gap = verticalJumpNeeded - currentVerticalJump
        if (gap <= 5) {
          dunkProbability = 90
        } else if (gap <= 10) {
          dunkProbability = 70
        } else if (gap <= 15) {
          dunkProbability = 50
        } else if (gap <= 20) {
          dunkProbability = 30
        } else if (gap <= 30) {
          dunkProbability = 10
        } else {
          dunkProbability = 5
        }
      }
      
      // Calculate hang time (t = 2 * sqrt(2 * h / g))
      const gravity = 9.81 // m/s²
      const jumpHeightMeters = currentVerticalJump / 100 // Convert to meters
      const hangTime = (2 * Math.sqrt(2 * jumpHeightMeters / gravity)).toFixed(2)
      
      // Calculate optimal takeoff point based on height, arm length, and takeoff angle
      const takeoffAngleRadians = this.formData.takeoffAngle * (Math.PI / 180)
      const optimalTakeoffPoint = (this.formData.height / 2 + this.formData.armLength) * Math.sin(takeoffAngleRadians)
      
      // Calculate jumping energy (E = m * g * h)
      const weightKg = this.formData.weight
      const jumpingEnergy = (weightKg * gravity * jumpHeightMeters).toFixed(1)
      
      // Calculate initial jumping speed (v = sqrt(2 * g * h))
      const initialJumpingSpeed = (Math.sqrt(2 * gravity * jumpHeightMeters)).toFixed(2)
      
      // Determine recommended dunk types based on measurements and ability
      const recommendedDunkTypes = this.getRecommendedDunkTypes(currentVerticalJump, verticalJumpNeeded, this.formData.handSize)
      
      // Generate training recommendations
      const trainingRecommendations = this.getTrainingRecommendations(improvementNeeded, this.formData.coreStrength, this.formData.kneeAngle)
      
      // Set results
      this.results = {
        dunkProbability: Math.round(dunkProbability),
        verticalJumpNeeded: Math.round(verticalJumpNeeded),
        hangTime,
        currentVerticalJump: Math.round(currentVerticalJump),
        improvementNeeded: Math.round(improvementNeeded),
        optimalTakeoffPoint: Math.round(optimalTakeoffPoint),
        jumpingEnergy,
        initialJumpingSpeed,
        recommendedDunkTypes,
        trainingRecommendations
      }
      
      this.showResults = true
      
      // Scroll to results
      this.$nextTick(() => {
        const resultsElement = document.querySelector('.calculator-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
    getRecommendedDunkTypes(currentJump, neededJump, handSize) {
      const dunkTypes = []
      
      // One-handed dunk
      if (currentJump >= neededJump - 5) {
        dunkTypes.push({
          name: 'One-handed Dunk',
          difficulty: 'Easy'
        })
      } else if (currentJump >= neededJump - 15) {
        dunkTypes.push({
          name: 'One-handed Dunk',
          difficulty: 'Moderate'
        })
      }
      
      // Two-handed dunk (requires more height)
      if (currentJump >= neededJump) {
        dunkTypes.push({
          name: 'Two-handed Dunk',
          difficulty: 'Easy'
        })
      } else if (currentJump >= neededJump - 10) {
        dunkTypes.push({
          name: 'Two-handed Dunk',
          difficulty: 'Moderate'
        })
      }
      
      // Alley-oop (requires good timing but less vertical)
      if (currentJump >= neededJump - 10) {
        dunkTypes.push({
          name: 'Alley-oop',
          difficulty: 'Moderate'
        })
      }
      
      // Windmill (requires significant vertical and coordination)
      if (currentJump >= neededJump + 10) {
        dunkTypes.push({
          name: 'Windmill Dunk',
          difficulty: 'Hard'
        })
      }
      
      // 360 dunk (requires excellent vertical and coordination)
      if (currentJump >= neededJump + 20) {
        dunkTypes.push({
          name: '360 Dunk',
          difficulty: 'Very Hard'
        })
      }
      
      // If hand size is large, add tomahawk
      if (handSize >= 22 && currentJump >= neededJump + 5) {
        dunkTypes.push({
          name: 'Tomahawk Dunk',
          difficulty: 'Hard'
        })
      }
      
      // If no dunks are possible yet
      if (dunkTypes.length === 0) {
        dunkTypes.push({
          name: 'Rim Grasp (Pre-dunk exercise)',
          difficulty: 'Preparatory'
        })
      }
      
      return dunkTypes
    },
    getTrainingRecommendations(improvementNeeded, coreStrength, kneeAngle) {
      const recommendations = []
      
      // Plyometric training
      recommendations.push({
        title: 'Plyometric Training',
        description: 'Explosive exercises to improve your vertical jump:',
        exercises: [
          'Box Jumps: 4 sets of 10 reps',
          'Depth Jumps: 3 sets of 8 reps',
          'Jump Squats: 4 sets of 12 reps',
          'Burpees: 3 sets of 15 reps'
        ]
      })
      
      // Strength training
      recommendations.push({
        title: 'Strength Training',
        description: 'Build lower body and core strength:',
        exercises: [
          'Squats: 4 sets of 8-10 reps',
          'Deadlifts: 3 sets of 8 reps',
          'Lunges: 3 sets of 12 reps per leg',
          'Calf Raises: 4 sets of 15 reps'
        ]
      })
      
      // Core training (if core strength is below 7)
      if (coreStrength < 7) {
        recommendations.push({
          title: 'Core Strengthening',
          description: 'Improve your core stability for better jumping mechanics:',
          exercises: [
            'Planks: 3 sets of 45-60 seconds',
            'Russian Twists: 3 sets of 20 reps',
            'Hanging Leg Raises: 3 sets of 12 reps',
            'Medicine Ball Slams: 3 sets of 15 reps'
          ]
        })
      }
      
      // Knee angle optimization (if not in optimal range)
      if (kneeAngle < 80 || kneeAngle > 100) {
        recommendations.push({
          title: 'Jumping Technique',
          description: 'Optimize your knee bend angle for maximum power:',
          exercises: [
            'Squat Depth Training: 3 sets of 10 reps',
            'Jump Technique Drills: 4 sets of 8 reps',
            'Video Analysis Sessions: 2 times per week',
            'Assisted Jumping Practice: 3 sets of 10 reps'
          ]
        })
      }
      
      // If significant improvement needed
      if (improvementNeeded > 15) {
        recommendations.push({
          title: 'Intensive Jump Program',
          description: 'A comprehensive 8-week program to significantly increase your vertical:',
          exercises: [
            'Full Body Explosive Training: 3 times per week',
            'Progressive Overload Jumping: 2 times per week',
            'Recovery and Flexibility Work: Daily',
            'Nutrition Plan for Muscle Development'
          ]
        })
      }
      
      return recommendations
    }
  }
}
</script>

<style scoped>
.calculator-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.calculator-form {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 30px;
  margin-bottom: 40px;
}

.calculator-form h2 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.calculator-description {
  color: #666;
  margin-bottom: 25px;
}

.form-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.tab-btn {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  position: relative;
  transition: all 0.3s;
}

.tab-btn.active {
  color: var(--primary-color);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

.tab-content {
  margin-bottom: 20px;
}

.form-hint {
  display: block;
  font-size: 0.8rem;
  color: #888;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

/* Results styling */
.calculator-results {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 30px;
  animation: fadeIn 0.5s ease-in;
}

.calculator-results h2 {
  color: var(--primary-color);
  margin-bottom: 25px;
  font-size: 1.8rem;
  text-align: center;
}

.results-summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.result-card {
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: var(--border-radius);
  min-width: 150px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.result-card:hover {
  transform: translateY(-5px);
}

.result-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.result-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.result-label {
  color: #666;
  font-size: 0.9rem;
}

.results-details {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;
}

.results-section {
  flex: 1;
  min-width: 300px;
}

.results-section h3 {
  color: var(--secondary-color);
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.detail-label {
  color: #666;
}

.detail-value {
  font-weight: 500;
}

.dunk-types-list {
  list-style: none;
}

.dunk-types-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.dunk-difficulty {
  font-weight: 500;
  color: var(--secondary-color);
}

.training-recommendations {
  margin-top: 40px;
}

.training-recommendations h3 {
  color: var(--secondary-color);
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.training-areas {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0 30px;
}

.training-area {
  flex: 1;
  min-width: 300px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: var(--border-radius);
}

.training-area h4 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.training-area p {
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.training-area ul {
  padding-left: 20px;
}

.training-area li {
  margin-bottom: 8px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .results-summary {
    flex-direction: column;
    align-items: center;
  }
  
  .result-card {
    width: 100%;
  }
  
  .results-details {
    flex-direction: column;
  }
  
  .training-areas {
    flex-direction: column;
  }
}
</style>

<template>
  <div class="calculator-container">
    <h1>Basketball Dunk Calculator</h1>
    <p class="intro">Find out if you can dunk and get personalized training recommendations.</p>

    <form @submit.prevent="calculateDunkAbility">
      <!-- Basic Measurements -->
      <div class="measurement-section">
        <h2>Basic Measurements</h2>
        
        <div class="input-group">
          <label for="height">Height</label>
          <input 
            id="height"
            v-model="height" 
            type="number" 
            step="0.1"
            :class="{ 'error': errors.height }"
          >
          <div class="unit-toggle">
            <button 
              type="button" 
              @click="toggleUnit('height')" 
              :class="{ active: heightUnit === 'cm' }"
            >cm</button>
            <button 
              type="button" 
              @click="toggleUnit('height')" 
              :class="{ active: heightUnit === 'ft' }"
            >ft</button>
          </div>
        </div>

        <div class="input-group">
          <label for="standingReach">Standing Reach</label>
          <input 
            id="standingReach"
            v-model="standingReach" 
            type="number"
            step="0.1"
          >
          <span class="unit">{{ heightUnit }}</span>
        </div>

        <div class="input-group">
          <label for="verticalJump">Vertical Jump</label>
          <input 
            id="verticalJump"
            v-model="verticalJump" 
            type="number"
            step="0.1"
          >
          <span class="unit">{{ heightUnit }}</span>
        </div>
      </div>

      <!-- Advanced Measurements -->
      <div class="measurement-section advanced">
        <h2>Advanced Measurements</h2>
        
        <div class="input-group">
          <label for="armLength">Arm Length</label>
          <input 
            id="armLength"
            v-model="armLength" 
            type="number"
            step="0.1"
          >
          <span class="unit">{{ heightUnit }}</span>
        </div>

        <div class="input-group">
          <label for="approach">Approach Type</label>
          <select id="approach" v-model="approachType">
            <option value="standing">Standing Jump</option>
            <option value="one-step">One Step</option>
            <option value="two-step">Two Steps</option>
            <option value="running">Full Running Approach</option>
          </select>
        </div>
      </div>

      <button type="submit" class="calculate-btn">Calculate Dunking Potential</button>
    </form>

    <!-- Results Section -->
    <div v-if="results" class="results-section">
      <h2>Your Results</h2>
      
      <div class="result-card primary">
        <h3>Dunking Potential</h3>
        <div class="probability">{{ results.probability }}%</div>
        <div class="recommendation">{{ results.mainRecommendation }}</div>
      </div>

      <div class="detailed-results">
        <div class="result-item">
          <span>Height Needed to Dunk</span>
          <strong>{{ results.heightNeeded }} {{ heightUnit }}</strong>
        </div>
        <div class="result-item">
          <span>Optimal Takeoff Distance</span>
          <strong>{{ results.takeoffDistance }} {{ heightUnit }}</strong>
        </div>
        <div class="result-item">
          <span>Recommended Dunk Type</span>
          <strong>{{ results.recommendedDunkType }}</strong>
        </div>
      </div>

      <div class="training-recommendations">
        <h3>Training Recommendations</h3>
        <ul>
          <li v-for="(tip, index) in results.trainingTips" 
              :key="index">{{ tip }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: null,
      standingReach: null,
      verticalJump: null,
      armLength: null,
      approachType: 'two-step',
      heightUnit: 'cm',
      errors: {},
      results: null
    }
  },
  methods: {
    calculateDunkAbility() {
      // Constants
      const RIM_HEIGHT = this.heightUnit === 'cm' ? 305 : 10
      const BALL_DIAMETER = this.heightUnit === 'cm' ? 24.6 : 0.8
      
      // Calculate maximum reach
      const maxReach = this.standingReach + this.verticalJump
      
      // Calculate approach bonus
      const approachBonus = this.calculateApproachBonus()
      
      // Calculate total reach with approach
      const totalReach = maxReach + approachBonus
      
      // Calculate probability
      const probability = this.calculateProbability(totalReach)
      
      // Generate results
      this.results = {
        probability: Math.round(probability),
        heightNeeded: this.calculateHeightNeeded(totalReach),
        takeoffDistance: this.calculateOptimalTakeoff(),
        recommendedDunkType: this.getRecommendedDunkType(probability),
        mainRecommendation: this.generateMainRecommendation(probability),
        trainingTips: this.generateTrainingTips(probability)
      }
    },
    
    calculateApproachBonus() {
      const bonusFactors = {
        'standing': 0,
        'one-step': 2,
        'two-step': 4,
        'running': 6
      }
      return bonusFactors[this.approachType] || 0
    },
    
    calculateProbability(totalReach) {
      // Implement sophisticated probability calculation
      // Consider multiple factors
    },
    
    generateTrainingTips(probability) {
      // Return personalized training tips based on results
    },
    
    toggleUnit(measurement) {
      // Implement unit conversion logic
    }
  }
}
</script>
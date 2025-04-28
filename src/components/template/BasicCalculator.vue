<template>
    <div class="calculator">
      <h2>Dunk Calculator</h2>
      <form @submit.prevent="calculateDunkAbility" class="calculator-form">
        <!-- Basic Measurements -->
        <div class="form-section">
          <h3>Basic Measurements</h3>
          <div class="input-group">
            <label for="height">Height (cm)</label>
            <input 
              type="number" 
              id="height" 
              v-model="measurements.height"
              required
              min="120"
              max="250"
            >
          </div>
          
          <div class="input-group">
            <label for="weight">Weight (kg)</label>
            <input 
              type="number" 
              id="weight" 
              v-model="measurements.weight"
              required
              min="30"
              max="200"
            >
          </div>
  
          <div class="input-group">
            <label for="standingReach">Standing Reach (cm)</label>
            <input 
              type="number" 
              id="standingReach" 
              v-model="measurements.standingReach"
              required
              min="150"
              max="300"
            >
          </div>
  
          <div class="input-group">
            <label for="runningReach">Running Reach (cm)</label>
            <input 
              type="number" 
              id="runningReach" 
              v-model="measurements.runningReach"
              required
              min="150"
              max="350"
            >
          </div>
        </div>
  
        <!-- Advanced Measurements -->
        <div class="form-section">
          <h3>Additional Measurements</h3>
          <div class="input-group">
            <label for="armLength">Arm Length (cm)</label>
            <input 
              type="number" 
              id="armLength" 
              v-model="measurements.armLength"
              required
              min="40"
              max="100"
            >
          </div>
  
          <div class="input-group">
            <label for="handSize">Hand Size (cm)</label>
            <input 
              type="number" 
              id="handSize" 
              v-model="measurements.handSize"
              required
              min="15"
              max="30"
            >
          </div>
        </div>
  
        <button type="submit" class="calculate-button">Calculate</button>
      </form>
  
      <!-- Results Section -->
      <div v-if="results" class="results-section">
        <h3>Your Results</h3>
        <div class="result-card">
          <div class="result-item">
            <h4>Dunk Probability</h4>
            <div class="probability-meter">
              <div 
                class="probability-fill"
                :style="{ width: `${results.probability}%` }"
                :class="getProbabilityClass"
              ></div>
              <span>{{ results.probability }}%</span>
            </div>
          </div>
  
          <div class="result-item">
            <h4>Vertical Jump Required</h4>
            <p>{{ results.requiredJump }} cm</p>
          </div>
  
          <div class="result-item">
            <h4>Height to Improve</h4>
            <p>{{ results.heightToImprove }} cm</p>
          </div>
  
          <div class="result-item">
            <h4>Recommended Dunk Types</h4>
            <ul>
              <li v-for="(dunk, index) in results.recommendedDunks" 
                  :key="index">{{ dunk }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BasicCalculator',
    data() {
      return {
        measurements: {
          height: null,
          weight: null,
          standingReach: null,
          runningReach: null,
          armLength: null,
          handSize: null
        },
        results: null
      }
    },
    computed: {
      getProbabilityClass() {
        if (!this.results) return ''
        if (this.results.probability >= 80) return 'high-probability'
        if (this.results.probability >= 50) return 'medium-probability'
        return 'low-probability'
      }
    },
    methods: {
      calculateDunkAbility() {
        // Rim height in cm
        const RIM_HEIGHT = 305
        
        // Calculate vertical jump from running reach and standing reach
        const verticalJump = this.measurements.runningReach - this.measurements.standingReach
        
        // Calculate maximum reach when jumping
        const maxReach = this.measurements.runningReach
        
        // Calculate how much height is needed above rim for successful dunk
        const MARGIN_NEEDED = 15 // cm needed above rim
        
        // Calculate probability
        let probability = 0
        if (maxReach >= RIM_HEIGHT + MARGIN_NEEDED) {
          probability = Math.min(100, 80 + (maxReach - (RIM_HEIGHT + MARGIN_NEEDED)))
        } else {
          probability = Math.max(0, 80 - (RIM_HEIGHT + MARGIN_NEEDED - maxReach) * 2)
        }
  
        // Calculate required improvements
        const heightToImprove = Math.max(0, (RIM_HEIGHT + MARGIN_NEEDED) - maxReach)
        
        // Determine recommended dunk types based on measurements
        const recommendedDunks = this.getRecommendedDunks(maxReach, this.measurements.handSize)
  
        this.results = {
          probability: Math.round(probability),
          requiredJump: verticalJump,
          heightToImprove: Math.round(heightToImprove),
          recommendedDunks
        }
      },
  
      getRecommendedDunks(maxReach, handSize) {
        const dunks = []
        const RIM_HEIGHT = 305
  
        if (maxReach >= RIM_HEIGHT + 20) {
          dunks.push('Two-Hand Dunk')
          if (handSize >= 20) {
            dunks.push('One-Hand Dunk')
          }
          if (maxReach >= RIM_HEIGHT + 30) {
            dunks.push('Alley-Oop')
          }
        } else if (maxReach >= RIM_HEIGHT + 10) {
          if (handSize >= 20) {
            dunks.push('Simple One-Hand Dunk')
          }
          dunks.push('Touch Dunk')
        }
  
        return dunks.length ? dunks : ['Focus on improving vertical jump first']
      }
    }
  }
  </script>
  
  <style scoped>
  .calculator {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .calculator-form {
    display: grid;
    gap: 2rem;
  }
  
  .form-section {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 10px;
  }
  
  .input-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #495057;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .calculate-button {
    background: #2a5298;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background 0.3s ease;
  }
  
  .calculate-button:hover {
    background: #1e3c72;
  }
  
  .results-section {
    margin-top: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .result-card {
    display: grid;
    gap: 1.5rem;
  }
  
  .probability-meter {
    height: 20px;
    background: #e9ecef;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }
  
  .probability-fill {
    height: 100%;
    transition: width 0.5s ease;
  }
  
  .high-probability {
    background: #28a745;
  }
  
  .medium-probability {
    background: #ffc107;
  }
  
  .low-probability {
    background: #dc3545;
  }
  
  @media (max-width: 768px) {
    .calculator {
      padding: 1rem;
    }
  }
  </style>
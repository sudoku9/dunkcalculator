<template>
  <div class="container">
    <h1>Basketball Shot Calculator</h1>
    <div class="calculator">
      <div class="input-group">
        <label>Distance (feet):</label>
        <input type="number" v-model="distance" min="0" step="0.1">
      </div>
      <div class="input-group">
        <label>Height (feet):</label>
        <input type="number" v-model="height" min="0" step="0.1">
      </div>
      <div class="input-group">
        <label>Release Angle (degrees):</label>
        <input type="number" v-model="angle" min="0" max="90" step="0.1">
      </div>
      <button @click="calculate">Calculate</button>
      
      <div class="results" v-if="showResults">
        <h2>Results:</h2>
        <p>Initial Velocity: {{ velocity.toFixed(2) }} ft/s</p>
        <p>Flight Time: {{ time.toFixed(2) }} seconds</p>
        <p>Maximum Height: {{ maxHeight.toFixed(2) }} feet</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distance: 15,
      height: 6,
      angle: 45,
      velocity: 0,
      time: 0,
      maxHeight: 0,
      showResults: false
    }
  },
  methods: {
    calculate() {
      const g = 32.2; // Gravity in ft/s²
      const angleRad = this.angle * Math.PI / 180;
      const hoopHeight = 10; // Standard basketball hoop height

      // Calculate initial velocity needed
      const v0x = Math.sqrt((2 * g * this.distance * this.distance) / 
                 (2 * (hoopHeight - this.height) + 2 * this.distance * Math.tan(angleRad)));
      const v0y = v0x * Math.tan(angleRad);

      // Calculate total velocity
      this.velocity = Math.sqrt(v0x * v0x + v0y * v0y);

      // Calculate time of flight
      this.time = this.distance / v0x;

      // Calculate maximum height
      this.maxHeight = this.height + (v0y * v0y) / (2 * g);

      this.showResults = true;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.calculator {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

.results {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.results h2 {
  margin-top: 0;
  color: #333;
}

.results p {
  margin: 10px 0;
  color: #666;
}
</style>
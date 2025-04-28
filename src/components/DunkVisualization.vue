<template>
  <div class="visualization-container">
    <h3 class="visualization-title">{{ title }}</h3>
    
    <div class="visualization-tabs">
      <button 
        v-for="tab in availableTabs" 
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="visualization-content">
      <div v-if="activeTab === 'trajectory'" class="chart-container">
        <canvas ref="trajectoryChart"></canvas>
      </div>
      
      <div v-if="activeTab === 'height'" class="chart-container">
        <canvas ref="heightChart"></canvas>
      </div>
      
      <div v-if="activeTab === 'comparison'" class="chart-container">
        <canvas ref="comparisonChart"></canvas>
      </div>
      
      <div v-if="activeTab === 'probability'" class="chart-container probability-container">
        <canvas ref="probabilityChart"></canvas>
      </div>
      
      <div v-if="activeTab === 'dunkTypes'" class="chart-container">
        <canvas ref="dunkTypesChart"></canvas>
      </div>
    </div>
    
    <div class="visualization-description">
      <p>{{ activeTabDescription }}</p>
    </div>
  </div>
</template>

<script>
import { 
  createJumpTrajectoryChart, 
  createHeightOverTimeChart,
  createPlayerComparisonChart,
  createDunkProbabilityChart,
  createDunkTypesChart
} from '../utils/visualizationUtils';

export default {
  name: 'DunkVisualization',
  props: {
    title: {
      type: String,
      default: 'Dunk Visualization'
    },
    playerData: {
      type: Object,
      required: true
    },
    results: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'trajectory',
      charts: {},
      tabDescriptions: {
        trajectory: 'This chart shows your jump trajectory based on your vertical leap and takeoff angle. The blue line represents the rim height.',
        height: 'This chart displays your reach height over time during your jump, showing how long you stay above the rim.',
        comparison: 'Compare your physical metrics to NBA averages to see your strengths and areas for improvement.',
        probability: 'Your overall probability of successfully dunking based on your current measurements and abilities.',
        dunkTypes: 'Recommended dunk types based on your measurements, sorted by difficulty level.'
      }
    }
  },
  computed: {
    availableTabs() {
      return [
        { id: 'trajectory', label: 'Jump Trajectory' },
        { id: 'height', label: 'Height Over Time' },
        { id: 'comparison', label: 'NBA Comparison' },
        { id: 'probability', label: 'Dunk Probability' },
        { id: 'dunkTypes', label: 'Dunk Types' }
      ];
    },
    activeTabDescription() {
      return this.tabDescriptions[this.activeTab] || '';
    }
  },
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId;
      this.$nextTick(() => {
        this.renderActiveChart();
      });
    },
    renderActiveChart() {
      switch (this.activeTab) {
        case 'trajectory':
          this.renderTrajectoryChart();
          break;
        case 'height':
          this.renderHeightChart();
          break;
        case 'comparison':
          this.renderComparisonChart();
          break;
        case 'probability':
          this.renderProbabilityChart();
          break;
        case 'dunkTypes':
          this.renderDunkTypesChart();
          break;
      }
    },
    renderTrajectoryChart() {
      const canvas = this.$refs.trajectoryChart;
      if (!canvas) return;
      
      createJumpTrajectoryChart(
        canvas,
        this.results.currentVerticalJump,
        this.playerData.takeoffAngle,
        this.playerData.height,
        305 // Standard rim height
      );
    },
    renderHeightChart() {
      const canvas = this.$refs.heightChart;
      if (!canvas) return;
      
      createHeightOverTimeChart(
        canvas,
        this.results.currentVerticalJump,
        this.playerData.standingReach,
        305 // Standard rim height
      );
    },
    renderComparisonChart() {
      const canvas = this.$refs.comparisonChart;
      if (!canvas) return;
      
      const playerMetrics = {
        verticalJump: this.results.currentVerticalJump,
        standingReach: this.playerData.standingReach,
        height: this.playerData.height,
        weight: this.playerData.weight,
        armLength: this.playerData.armLength,
        handSize: this.playerData.handSize
      };
      
      createPlayerComparisonChart(canvas, playerMetrics);
    },
    renderProbabilityChart() {
      const canvas = this.$refs.probabilityChart;
      if (!canvas) return;
      
      createDunkProbabilityChart(canvas, this.results.dunkProbability);
    },
    renderDunkTypesChart() {
      const canvas = this.$refs.dunkTypesChart;
      if (!canvas) return;
      
      createDunkTypesChart(canvas, this.results.recommendedDunkTypes);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.renderActiveChart();
    });
  },
  watch: {
    playerData: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.renderActiveChart();
        });
      }
    },
    results: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.renderActiveChart();
        });
      }
    }
  }
}
</script>

<style scoped>
.visualization-container {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 20px;
  margin-bottom: 30px;
}

.visualization-title {
  color: var(--secondary-color);
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.visualization-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.tab-btn {
  padding: 8px 15px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.tab-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.visualization-content {
  margin-bottom: 20px;
}

.chart-container {
  height: 400px;
  position: relative;
}

.probability-container {
  height: 300px;
  max-width: 300px;
  margin: 0 auto;
}

.visualization-description {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .chart-container {
    height: 300px;
  }
  
  .visualization-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .tab-btn {
    flex: 0 0 auto;
  }
}
</style>

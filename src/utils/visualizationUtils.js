/**
 * Utility functions for data visualization in the dunk calculator
 */

import { Chart, registerables } from 'chart.js';
import { calculateJumpTrajectory, calculateHeightOverTime } from './calculationUtils';

// Register Chart.js components
Chart.register(...registerables);

/**
 * Create a jump trajectory visualization
 * @param {HTMLCanvasElement} canvas - Canvas element to render the chart
 * @param {number} verticalJump - Vertical jump in cm
 * @param {number} takeoffAngle - Takeoff angle in degrees
 * @param {number} playerHeight - Player height in cm
 * @param {number} rimHeight - Basketball rim height in cm (default: 305cm)
 */
export function createJumpTrajectoryChart(canvas, verticalJump, takeoffAngle, playerHeight, rimHeight = 305) {
  // Get trajectory data points
  const trajectoryPoints = calculateJumpTrajectory(verticalJump, takeoffAngle);
  
  // Prepare data for Chart.js
  const xValues = trajectoryPoints.map(point => point.x);
  const yValues = trajectoryPoints.map(point => point.y);
  
  // Calculate player position at each point (add standing height)
  const playerPositions = yValues.map(y => y + playerHeight);
  
  // Create chart
  const ctx = canvas.getContext('2d');
  
  // Destroy existing chart if it exists
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  // Create new chart
  canvas.chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Jump Trajectory',
          data: trajectoryPoints.map(point => ({
            x: point.x,
            y: point.y + playerHeight // Add player height
          })),
          backgroundColor: '#ff5722',
          borderColor: '#ff5722',
          pointRadius: 0,
          showLine: true,
          tension: 0.4
        },
        {
          label: 'Rim Height',
          data: [
            { x: Math.min(...xValues) - 50, y: rimHeight },
            { x: Math.max(...xValues) + 50, y: rimHeight }
          ],
          backgroundColor: '#2196f3',
          borderColor: '#2196f3',
          pointRadius: 0,
          showLine: true,
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Horizontal Distance (cm)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Height (cm)'
          },
          min: 0,
          max: Math.max(Math.max(...playerPositions) + 50, rimHeight + 50)
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Jump Trajectory Visualization'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Height: ${Math.round(context.parsed.y)} cm, Distance: ${Math.round(context.parsed.x)} cm`;
            }
          }
        }
      }
    }
  });
  
  return canvas.chart;
}

/**
 * Create a height over time visualization
 * @param {HTMLCanvasElement} canvas - Canvas element to render the chart
 * @param {number} verticalJump - Vertical jump in cm
 * @param {number} standingReach - Standing reach in cm
 * @param {number} rimHeight - Basketball rim height in cm (default: 305cm)
 */
export function createHeightOverTimeChart(canvas, verticalJump, standingReach, rimHeight = 305) {
  // Get height over time data points
  const heightData = calculateHeightOverTime(verticalJump);
  
  // Prepare data for Chart.js
  const timeValues = heightData.map(point => point.time);
  const heightValues = heightData.map(point => point.height + standingReach);
  
  // Create chart
  const ctx = canvas.getContext('2d');
  
  // Destroy existing chart if it exists
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  // Create new chart
  canvas.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeValues,
      datasets: [
        {
          label: 'Reach Height',
          data: heightValues,
          backgroundColor: 'rgba(255, 87, 34, 0.2)',
          borderColor: '#ff5722',
          borderWidth: 2,
          fill: true
        },
        {
          label: 'Rim Height',
          data: Array(timeValues.length).fill(rimHeight),
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderColor: '#2196f3',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time (seconds)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Height (cm)'
          },
          min: standingReach - 20,
          max: Math.max(...heightValues) + 20
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Height Over Time During Jump'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Height: ${Math.round(context.parsed.y)} cm at ${context.parsed.x.toFixed(2)} seconds`;
            }
          }
        }
      }
    }
  });
  
  return canvas.chart;
}

/**
 * Create a radar chart comparing player metrics to NBA averages
 * @param {HTMLCanvasElement} canvas - Canvas element to render the chart
 * @param {Object} playerMetrics - Player's metrics
 */
export function createPlayerComparisonChart(canvas, playerMetrics) {
  // NBA average metrics (approximate values)
  const nbaAverages = {
    verticalJump: 70, // cm
    standingReach: 260, // cm
    height: 200, // cm
    weight: 100, // kg
    armLength: 85, // cm
    handSize: 23 // cm
  };
  
  // Calculate relative scores (percentage of NBA average)
  const relativeScores = {
    'Vertical Jump': (playerMetrics.verticalJump / nbaAverages.verticalJump) * 100,
    'Standing Reach': (playerMetrics.standingReach / nbaAverages.standingReach) * 100,
    'Height': (playerMetrics.height / nbaAverages.height) * 100,
    'Arm Length': (playerMetrics.armLength / nbaAverages.armLength) * 100,
    'Hand Size': (playerMetrics.handSize / nbaAverages.handSize) * 100,
    'Weight': (nbaAverages.weight / playerMetrics.weight) * 100 // Inverted for weight (lower is better for jumping)
  };
  
  // Create chart
  const ctx = canvas.getContext('2d');
  
  // Destroy existing chart if it exists
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  // Create new chart
  canvas.chart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: Object.keys(relativeScores),
      datasets: [
        {
          label: 'Your Metrics (% of NBA Average)',
          data: Object.values(relativeScores),
          backgroundColor: 'rgba(255, 87, 34, 0.2)',
          borderColor: '#ff5722',
          borderWidth: 2,
          pointBackgroundColor: '#ff5722'
        },
        {
          label: 'NBA Average',
          data: Array(Object.keys(relativeScores).length).fill(100),
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
          borderColor: '#2196f3',
          borderWidth: 2,
          pointBackgroundColor: '#2196f3'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 150
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Your Metrics vs. NBA Average'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const datasetLabel = context.dataset.label;
              const value = context.parsed.r;
              return `${datasetLabel}: ${Math.round(value)}%`;
            }
          }
        }
      }
    }
  });
  
  return canvas.chart;
}

/**
 * Create a doughnut chart showing dunk probability
 * @param {HTMLCanvasElement} canvas - Canvas element to render the chart
 * @param {number} dunkProbability - Probability of dunking (0-100)
 */
export function createDunkProbabilityChart(canvas, dunkProbability) {
  // Create chart
  const ctx = canvas.getContext('2d');
  
  // Destroy existing chart if it exists
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  // Determine color based on probability
  let color;
  if (dunkProbability >= 80) {
    color = '#4caf50'; // Green
  } else if (dunkProbability >= 50) {
    color = '#ffc107'; // Yellow
  } else if (dunkProbability >= 20) {
    color = '#ff9800'; // Orange
  } else {
    color = '#f44336'; // Red
  }
  
  // Create new chart
  canvas.chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Dunk Probability', 'Remaining'],
      datasets: [
        {
          data: [dunkProbability, 100 - dunkProbability],
          backgroundColor: [color, '#e0e0e0'],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        title: {
          display: true,
          text: 'Dunk Probability'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        },
        legend: {
          display: false
        }
      }
    }
  });
  
  // Add center text
  const originalDraw = canvas.chart.draw;
  canvas.chart.draw = function() {
    originalDraw.apply(this, arguments);
    
    const width = this.width;
    const height = this.height;
    const ctx = this.ctx;
    
    ctx.restore();
    ctx.font = 'bold 30px Arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(`${dunkProbability}%`, width / 2, height / 2);
    ctx.save();
  };
  
  return canvas.chart;
}

/**
 * Create a bar chart comparing different dunk types
 * @param {HTMLCanvasElement} canvas - Canvas element to render the chart
 * @param {Array} dunkTypes - Array of dunk types with difficulty ratings
 */
export function createDunkTypesChart(canvas, dunkTypes) {
  // Map difficulty to numeric values
  const difficultyMap = {
    'Preparatory': 0,
    'Easy': 1,
    'Moderate': 2,
    'Hard': 3,
    'Very Hard': 4
  };
  
  // Sort dunk types by difficulty
  const sortedDunkTypes = [...dunkTypes].sort((a, b) => 
    difficultyMap[a.difficulty] - difficultyMap[b.difficulty]
  );
  
  // Prepare data for Chart.js
  const labels = sortedDunkTypes.map(dunk => dunk.name);
  const data = sortedDunkTypes.map(dunk => difficultyMap[dunk.difficulty]);
  
  // Map difficulty to colors
  const colors = sortedDunkTypes.map(dunk => {
    switch (dunk.difficulty) {
      case 'Preparatory': return '#9e9e9e';
      case 'Easy': return '#4caf50';
      case 'Moderate': return '#2196f3';
      case 'Hard': return '#ff9800';
      case 'Very Hard': return '#f44336';
      default: return '#9e9e9e';
    }
  });
  
  // Create chart
  const ctx = canvas.getContext('2d');
  
  // Destroy existing chart if it exists
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  // Create new chart
  canvas.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Difficulty Level',
          data: data,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          ticks: {
            callback: function(value) {
              const difficultyLabels = ['Preparatory', 'Easy', 'Moderate', 'Hard', 'Very Hard'];
              return difficultyLabels[value];
            }
          },
          title: {
            display: true,
            text: 'Difficulty Level'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Dunk Type'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Recommended Dunk Types by Difficulty'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const dunkType = sortedDunkTypes[context.dataIndex];
              return `Difficulty: ${dunkType.difficulty}`;
            }
          }
        }
      }
    }
  });
  
  return canvas.chart;
}

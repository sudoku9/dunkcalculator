export const DunkCalculator = {
  // Constants
  RIM_HEIGHT_CM: 305,
  RIM_HEIGHT_FT: 10,
  BALL_DIAMETER_CM: 24.6,
  BALL_DIAMETER_FT: 0.8,
  
  // Convert measurements between units
  convertUnits(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    return fromUnit === 'cm' ? value / 30.48 : value * 30.48;
  },

  // Calculate approach bonus based on approach type
  calculateApproachBonus(approachType, verticalJump) {
    const bonusPercentages = {
      'standing': 0,
      'one-step': 0.05,
      'two-step': 0.1,
      'running': 0.15
    };
    return verticalJump * bonusPercentages[approachType];
  },

  // Calculate dunking probability
  calculateProbability(measurements) {
    const {
      totalReach,
      rimHeight,
      ballDiameter,
      armLength
    } = measurements;

    // Minimum height needed to dunk
    const minHeightNeeded = rimHeight + ballDiameter;
    
    // Calculate reach margin
    const reachMargin = totalReach - minHeightNeeded;
    
    // Base probability calculation
    let probability = 0;
    
    if (reachMargin >= 0) {
      probability = Math.min(100, 50 + (reachMargin * 10));
    } else {
      probability = Math.max(0, 50 + (reachMargin * 15));
    }

    // Adjust probability based on arm length
    if (armLength) {
      const armLengthFactor = (armLength / measurements.height) * 10;
      probability += armLengthFactor;
    }

    return Math.round(probability);
  },

  // Generate training recommendations
  generateTrainingTips(probability, measurements) {
    const tips = [];
    
    if (probability < 30) {
      tips.push("Focus on building basic strength with squats and deadlifts");
      tips.push("Incorporate plyometric exercises to develop explosive power");
      tips.push("Work on flexibility and mobility to improve jump mechanics");
    } else if (probability < 60) {
      tips.push("Add box jumps and depth jumps to your training routine");
      tips.push("Practice approach steps and timing");
      tips.push("Include basketball-specific conditioning exercises");
    } else {
      tips.push("Fine-tune your dunking technique with ball control drills");
      tips.push("Practice different types of dunks");
      tips.push("Maintain explosive power with regular plyometric training");
    }

    return tips;
  },

  // Recommend dunk types based on measurements
  recommendDunkType(probability, measurements) {
    if (probability < 40) {
      return "Focus on basic rim touches first";
    } else if (probability < 70) {
      return "One-handed dunk from a running start";
    } else {
      return "Two-handed dunk or one-handed power dunk";
    }
  },

  // Calculate optimal takeoff distance
  calculateOptimalTakeoff(height, verticalJump) {
    // Base distance calculation
    let baseDistance = height * 0.6;
    
    // Adjust for vertical jump capability
    const jumpFactor = verticalJump / 100;
    baseDistance *= (1 + jumpFactor);
    
    return Math.round(baseDistance * 10) / 10;
  }
};
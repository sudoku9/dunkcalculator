/**
 * Utility functions for dunk calculator calculations
 */

// Constants
const GRAVITY = 9.81; // m/s²
const BASKETBALL_RADIUS = 12; // cm
const RIM_HEIGHT = 305; // cm (standard 10 feet)
const AIR_DENSITY = 1.225; // kg/m³
const DRAG_COEFFICIENT = 0.5; // Approximate drag coefficient for a human body

/**
 * Calculate vertical jump needed to dunk based on standing reach
 * @param {number} standingReach - Standing reach in cm
 * @param {number} handSize - Hand size in cm
 * @returns {number} - Vertical jump needed in cm
 */
export function calculateVerticalJumpNeeded(standingReach, handSize) {
  // Need to get hand above rim by approximately 15cm (ball radius + control margin)
  const controlMargin = 3; // Additional margin for ball control
  const heightNeeded = RIM_HEIGHT + BASKETBALL_RADIUS + controlMargin - standingReach;
  
  // Adjust based on hand size (larger hands need less height above rim)
  const handSizeAdjustment = Math.max(0, (handSize - 20) * 0.5);
  
  return Math.max(0, heightNeeded - handSizeAdjustment);
}

/**
 * Calculate current vertical jump based on standing and running reach
 * @param {number} standingReach - Standing reach in cm
 * @param {number} runningReach - Running reach in cm
 * @returns {number} - Current vertical jump in cm
 */
export function calculateCurrentVerticalJump(standingReach, runningReach) {
  return runningReach - standingReach;
}

/**
 * Calculate hang time based on vertical jump height
 * @param {number} verticalJump - Vertical jump in cm
 * @returns {number} - Hang time in seconds
 */
export function calculateHangTime(verticalJump) {
  // Convert cm to meters
  const jumpHeightMeters = verticalJump / 100;
  
  // t = 2 * sqrt(2 * h / g)
  return 2 * Math.sqrt(2 * jumpHeightMeters / GRAVITY);
}

/**
 * Calculate jumping energy required
 * @param {number} weight - Body weight in kg
 * @param {number} verticalJump - Vertical jump in cm
 * @returns {number} - Jumping energy in Joules
 */
export function calculateJumpingEnergy(weight, verticalJump) {
  // Convert cm to meters
  const jumpHeightMeters = verticalJump / 100;
  
  // E = m * g * h
  return weight * GRAVITY * jumpHeightMeters;
}

/**
 * Calculate initial jumping speed
 * @param {number} verticalJump - Vertical jump in cm
 * @returns {number} - Initial jumping speed in m/s
 */
export function calculateInitialJumpingSpeed(verticalJump) {
  // Convert cm to meters
  const jumpHeightMeters = verticalJump / 100;
  
  // v = sqrt(2 * g * h)
  return Math.sqrt(2 * GRAVITY * jumpHeightMeters);
}

/**
 * Calculate optimal takeoff point
 * @param {number} height - Player height in cm
 * @param {number} armLength - Arm length in cm
 * @param {number} takeoffAngle - Takeoff angle in degrees
 * @returns {number} - Optimal takeoff distance from basket in cm
 */
export function calculateOptimalTakeoffPoint(height, armLength, takeoffAngle) {
  // Convert angle to radians
  const angleRadians = takeoffAngle * (Math.PI / 180);
  
  // Calculate horizontal distance based on height, arm length, and angle
  return (height / 2 + armLength) * Math.sin(angleRadians);
}

/**
 * Calculate dunk probability based on current jump vs needed jump
 * @param {number} currentJump - Current vertical jump in cm
 * @param {number} neededJump - Vertical jump needed to dunk in cm
 * @returns {number} - Probability percentage (0-100)
 */
export function calculateDunkProbability(currentJump, neededJump) {
  if (currentJump >= neededJump) {
    return 100;
  }
  
  // Calculate probability based on how close they are
  const gap = neededJump - currentJump;
  
  if (gap <= 5) {
    return 90;
  } else if (gap <= 10) {
    return 70;
  } else if (gap <= 15) {
    return 50;
  } else if (gap <= 20) {
    return 30;
  } else if (gap <= 30) {
    return 10;
  } else {
    return 5;
  }
}

/**
 * Calculate air resistance effect on jump height
 * @param {number} weight - Body weight in kg
 * @param {number} height - Player height in cm
 * @param {number} verticalJump - Vertical jump in cm
 * @returns {number} - Height reduction due to air resistance in cm
 */
export function calculateAirResistanceEffect(weight, height, verticalJump) {
  // Convert height to meters
  const heightMeters = height / 100;
  
  // Estimate frontal area (m²) based on height
  const frontalArea = 0.5 * heightMeters * 0.5; // Rough approximation
  
  // Initial velocity in m/s
  const initialVelocity = calculateInitialJumpingSpeed(verticalJump);
  
  // Calculate drag force: F_d = 0.5 * ρ * v² * C_d * A
  const dragForce = 0.5 * AIR_DENSITY * Math.pow(initialVelocity, 2) * DRAG_COEFFICIENT * frontalArea;
  
  // Calculate deceleration: a = F / m
  const deceleration = dragForce / weight;
  
  // Calculate height reduction: Δh = a * t²/2 (where t is time to peak height)
  const timeToPeak = initialVelocity / GRAVITY;
  const heightReduction = deceleration * Math.pow(timeToPeak, 2) / 2;
  
  // Convert back to cm
  return heightReduction * 100;
}

/**
 * Get recommended dunk types based on measurements
 * @param {number} currentJump - Current vertical jump in cm
 * @param {number} neededJump - Vertical jump needed to dunk in cm
 * @param {number} handSize - Hand size in cm
 * @returns {Array} - Array of recommended dunk types with difficulty
 */
export function getRecommendedDunkTypes(currentJump, neededJump, handSize) {
  const dunkTypes = [];
  
  // One-handed dunk
  if (currentJump >= neededJump - 5) {
    dunkTypes.push({
      name: 'One-handed Dunk',
      difficulty: 'Easy'
    });
  } else if (currentJump >= neededJump - 15) {
    dunkTypes.push({
      name: 'One-handed Dunk',
      difficulty: 'Moderate'
    });
  }
  
  // Two-handed dunk (requires more height)
  if (currentJump >= neededJump) {
    dunkTypes.push({
      name: 'Two-handed Dunk',
      difficulty: 'Easy'
    });
  } else if (currentJump >= neededJump - 10) {
    dunkTypes.push({
      name: 'Two-handed Dunk',
      difficulty: 'Moderate'
    });
  }
  
  // Alley-oop (requires good timing but less vertical)
  if (currentJump >= neededJump - 10) {
    dunkTypes.push({
      name: 'Alley-oop',
      difficulty: 'Moderate'
    });
  }
  
  // Windmill (requires significant vertical and coordination)
  if (currentJump >= neededJump + 10) {
    dunkTypes.push({
      name: 'Windmill Dunk',
      difficulty: 'Hard'
    });
  }
  
  // 360 dunk (requires excellent vertical and coordination)
  if (currentJump >= neededJump + 20) {
    dunkTypes.push({
      name: '360 Dunk',
      difficulty: 'Very Hard'
    });
  }
  
  // If hand size is large, add tomahawk
  if (handSize >= 22 && currentJump >= neededJump + 5) {
    dunkTypes.push({
      name: 'Tomahawk Dunk',
      difficulty: 'Hard'
    });
  }
  
  // If no dunks are possible yet
  if (dunkTypes.length === 0) {
    dunkTypes.push({
      name: 'Rim Grasp (Pre-dunk exercise)',
      difficulty: 'Preparatory'
    });
  }
  
  return dunkTypes;
}

/**
 * Generate training recommendations based on player metrics
 * @param {number} improvementNeeded - Vertical jump improvement needed in cm
 * @param {number} coreStrength - Core strength index (1-10)
 * @param {number} kneeAngle - Knee bend angle in degrees
 * @returns {Array} - Array of training recommendations
 */
export function getTrainingRecommendations(improvementNeeded, coreStrength, kneeAngle) {
  const recommendations = [];
  
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
  });
  
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
  });
  
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
    });
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
    });
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
    });
  }
  
  return recommendations;
}

/**
 * Calculate jump trajectory data points for visualization
 * @param {number} verticalJump - Vertical jump in cm
 * @param {number} takeoffAngle - Takeoff angle in degrees
 * @returns {Array} - Array of data points for trajectory visualization
 */
export function calculateJumpTrajectory(verticalJump, takeoffAngle) {
  // Convert to meters
  const jumpHeightMeters = verticalJump / 100;
  
  // Convert angle to radians
  const angleRadians = takeoffAngle * (Math.PI / 180);
  
  // Calculate initial velocity
  const initialVelocity = Math.sqrt(2 * GRAVITY * jumpHeightMeters);
  
  // Vertical and horizontal components
  const vY = initialVelocity * Math.cos(angleRadians);
  const vX = initialVelocity * Math.sin(angleRadians);
  
  // Time of flight
  const timeOfFlight = 2 * vY / GRAVITY;
  
  // Generate data points
  const dataPoints = [];
  const numPoints = 50;
  const timeStep = timeOfFlight / numPoints;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i * timeStep;
    const x = vX * t;
    const y = vY * t - 0.5 * GRAVITY * t * t;
    
    // Convert back to cm
    dataPoints.push({
      x: x * 100,
      y: y * 100
    });
  }
  
  return dataPoints;
}

/**
 * Calculate height at different points during jump for visualization
 * @param {number} verticalJump - Vertical jump in cm
 * @returns {Array} - Array of height data points over time
 */
export function calculateHeightOverTime(verticalJump) {
  // Convert to meters
  const jumpHeightMeters = verticalJump / 100;
  
  // Calculate initial velocity
  const initialVelocity = Math.sqrt(2 * GRAVITY * jumpHeightMeters);
  
  // Time of flight
  const timeOfFlight = 2 * initialVelocity / GRAVITY;
  
  // Generate data points
  const dataPoints = [];
  const numPoints = 50;
  const timeStep = timeOfFlight / numPoints;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i * timeStep;
    const height = initialVelocity * t - 0.5 * GRAVITY * t * t;
    
    // Convert back to cm
    dataPoints.push({
      time: t,
      height: height * 100
    });
  }
  
  return dataPoints;
}

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
        <div class="intro-image">
          <img src="../assets/training-intro.svg" alt="Basketball player training" />
        </div>
      </div>
      
      <div class="training-levels">
        <h2>Choose Your Training Level</h2>
        
        <div class="level-cards">
          <div class="level-card" @click="activeLevel = 'beginner'">
            <div class="level-icon">🔰</div>
            <h3>Beginner</h3>
            <p>For players who can't yet touch the rim</p>
            <span class="level-tag">4-8 weeks</span>
          </div>
          
          <div class="level-card" @click="activeLevel = 'intermediate'">
            <div class="level-icon">⚡</div>
            <h3>Intermediate</h3>
            <p>For players who can touch the rim but can't dunk</p>
            <span class="level-tag">6-12 weeks</span>
          </div>
          
          <div class="level-card" @click="activeLevel = 'advanced'">
            <div class="level-icon">🏆</div>
            <h3>Advanced</h3>
            <p>For players who can dunk but want to improve</p>
            <span class="level-tag">8-16 weeks</span>
          </div>
        </div>
      </div>
      
      <div v-if="activeLevel" class="training-program">
        <h2>{{ programTitle }}</h2>
        
        <div class="program-overview">
          <div class="overview-item">
            <div class="overview-icon">⏱️</div>
            <div class="overview-content">
              <h4>Duration</h4>
              <p>{{ programDuration }}</p>
            </div>
          </div>
          
          <div class="overview-item">
            <div class="overview-icon">🔄</div>
            <div class="overview-content">
              <h4>Frequency</h4>
              <p>{{ programFrequency }}</p>
            </div>
          </div>
          
          <div class="overview-item">
            <div class="overview-icon">🎯</div>
            <div class="overview-content">
              <h4>Goal</h4>
              <p>{{ programGoal }}</p>
            </div>
          </div>
        </div>
        
        <div class="program-phases">
          <div v-for="(phase, index) in programPhases" :key="index" class="program-phase">
            <h3>Phase {{ index + 1 }}: {{ phase.title }}</h3>
            <p class="phase-duration">{{ phase.duration }}</p>
            <p class="phase-description">{{ phase.description }}</p>
            
            <div class="workout-days">
              <div v-for="(workout, dayIndex) in phase.workouts" :key="dayIndex" class="workout-day">
                <h4>{{ workout.day }}</h4>
                <ul class="exercise-list">
                  <li v-for="(exercise, exIndex) in workout.exercises" :key="exIndex">
                    <span class="exercise-name">{{ exercise.name }}</span>
                    <span class="exercise-sets">{{ exercise.sets }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="program-tips">
          <h3>Training Tips</h3>
          <ul>
            <li v-for="(tip, index) in programTips" :key="index">{{ tip }}</li>
          </ul>
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
      
      <div class="training-faq">
        <h2>Frequently Asked Questions</h2>
        
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ faq.question }}</h3>
            <span class="faq-toggle" :class="{ 'active': activeFaq === index }">+</span>
          </div>
          <div class="faq-answer" :class="{ 'active': activeFaq === index }">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainingGuide',
  data() {
    return {
      activeLevel: null,
      activeFaq: null,
      faqs: [
        {
          question: 'How long will it take to see results?',
          answer: 'Most athletes see noticeable improvements in their vertical jump within 4-6 weeks of consistent training. However, the time frame varies based on your starting point, genetics, and how consistently you follow the program. For significant improvements (6+ inches), expect to train consistently for 3-6 months.'
        },
        {
          question: 'How often should I train my vertical jump?',
          answer: 'For optimal results, dedicate 3-4 days per week to vertical jump training. This includes a mix of strength training, plyometrics, and technique work. Always allow at least 48 hours of recovery between intense plyometric or lower body strength sessions.'
        },
        {
          question: 'Should I train if my muscles are sore?',
          answer: 'Mild soreness is normal, but you should avoid intense plyometric or strength training when experiencing significant muscle soreness. Instead, focus on recovery techniques like light cardio, stretching, or working different muscle groups. Listen to your body - pain is different from soreness and may indicate injury.'
        },
        {
          question: 'What if I don\'t have access to a gym?',
          answer: 'While gym equipment can be beneficial, you can make significant improvements with bodyweight exercises. Focus on squats, lunges, calf raises, and plyometric exercises like box jumps (using stairs or sturdy platforms), broad jumps, and depth jumps. Resistance bands can also be an affordable alternative to weights.'
        },
        {
          question: 'Is it better to train for strength or explosiveness?',
          answer: 'Both are important for maximizing your vertical jump. Strength provides the foundation for power, while explosiveness training teaches your muscles to apply that strength quickly. A well-designed program should include both elements, with the ratio depending on your current strengths and weaknesses.'
        }
      ]
    }
  },
  computed: {
    programTitle() {
      if (this.activeLevel === 'beginner') {
        return 'Beginner Vertical Jump Program'
      } else if (this.activeLevel === 'intermediate') {
        return 'Intermediate Dunking Program'
      } else if (this.activeLevel === 'advanced') {
        return 'Advanced Dunking Mastery Program'
      }
      return ''
    },
    programDuration() {
      if (this.activeLevel === 'beginner') {
        return '4-8 weeks'
      } else if (this.activeLevel === 'intermediate') {
        return '6-12 weeks'
      } else if (this.activeLevel === 'advanced') {
        return '8-16 weeks'
      }
      return ''
    },
    programFrequency() {
      if (this.activeLevel === 'beginner') {
        return '3 days per week'
      } else if (this.activeLevel === 'intermediate') {
        return '4 days per week'
      } else if (this.activeLevel === 'advanced') {
        return '4-5 days per week'
      }
      return ''
    },
    programGoal() {
      if (this.activeLevel === 'beginner') {
        return 'Increase vertical jump by 4-6 inches'
      } else if (this.activeLevel === 'intermediate') {
        return 'Achieve first one-handed dunk'
      } else if (this.activeLevel === 'advanced') {
        return 'Master multiple dunk variations'
      }
      return ''
    },
    programPhases() {
      if (this.activeLevel === 'beginner') {
        return [
          {
            title: 'Foundation Building',
            duration: 'Weeks 1-2',
            description: 'Focus on developing proper form and building basic strength.',
            workouts: [
              {
                day: 'Day 1: Lower Body Strength',
                exercises: [
                  { name: 'Bodyweight Squats', sets: '3 sets of 15-20 reps' },
                  { name: 'Walking Lunges', sets: '3 sets of 10 reps per leg' },
                  { name: 'Calf Raises', sets: '3 sets of 20 reps' },
                  { name: 'Glute Bridges', sets: '3 sets of 15 reps' }
                ]
              },
              {
                day: 'Day 2: Core & Upper Body',
                exercises: [
                  { name: 'Planks', sets: '3 sets of 30 seconds' },
                  { name: 'Push-ups', sets: '3 sets of 10-15 reps' },
                  { name: 'Superman Holds', sets: '3 sets of 15 seconds' },
                  { name: 'Mountain Climbers', sets: '3 sets of 20 reps' }
                ]
              },
              {
                day: 'Day 3: Intro to Plyometrics',
                exercises: [
                  { name: 'Jump Squats', sets: '3 sets of 10 reps' },
                  { name: 'Ankle Bounces', sets: '3 sets of 20 reps' },
                  { name: 'Broad Jumps', sets: '3 sets of 5 reps' },
                  { name: 'Jumping Rope', sets: '3 sets of 30 seconds' }
                ]
              }
            ]
          },
          {
            title: 'Strength Development',
            duration: 'Weeks 3-5',
            description: 'Increase intensity to build strength in the muscles critical for jumping.',
            workouts: [
              {
                day: 'Day 1: Lower Body Strength',
                exercises: [
                  { name: 'Goblet Squats', sets: '4 sets of 12 reps' },
                  { name: 'Bulgarian Split Squats', sets: '3 sets of 8 reps per leg' },
                  { name: 'Romanian Deadlifts', sets: '3 sets of 10 reps' },
                  { name: 'Seated Calf Raises', sets: '4 sets of 15 reps' }
                ]
              },
              {
                day: 'Day 2: Core & Upper Body',
                exercises: [
                  { name: 'Hanging Leg Raises', sets: '3 sets of 10 reps' },
                  { name: 'Push-ups', sets: '4 sets of 12 reps' },
                  { name: 'Dumbbell Rows', sets: '3 sets of 10 reps per arm' },
                  { name: 'Russian Twists', sets: '3 sets of 20 reps' }
                ]
              },
              {
                day: 'Day 3: Basic Plyometrics',
                exercises: [
                  { name: 'Box Jumps (low height)', sets: '4 sets of 8 reps' },
                  { name: 'Depth Jumps', sets: '3 sets of 6 reps' },
                  { name: 'Lateral Bounds', sets: '3 sets of 8 reps per side' },
                  { name: 'Jump Lunges', sets: '3 sets of 10 reps per leg' }
                ]
              }
            ]
          },
          {
            title: 'Power Development',
            duration: 'Weeks 6-8',
            description: 'Focus on explosive movements and converting strength to power.',
            workouts: [
              {
                day: 'Day 1: Lower Body Power',
                exercises: [
                  { name: 'Jump Squats with Weight', sets: '4 sets of 10 reps' },
                  { name: 'Speed Skater Jumps', sets: '3 sets of 12 reps per side' },
                  { name: 'Single-Leg Bounds', sets: '3 sets of 8 reps per leg' },
                  { name: 'Weighted Calf Jumps', sets: '4 sets of 12 reps' }
                ]
              },
              {
                day: 'Day 2: Core & Upper Body',
                exercises: [
                  { name: 'Medicine Ball Slams', sets: '4 sets of 10 reps' },
                  { name: 'Explosive Push-ups', sets: '3 sets of 8 reps' },
                  { name: 'Hanging Leg Raises', sets: '3 sets of 12 reps' },
                  { name: 'Battle Ropes', sets: '3 sets of 30 seconds' }
                ]
              },
              {
                day: 'Day 3: Advanced Plyometrics',
                exercises: [
                  { name: 'Box Jumps (medium height)', sets: '4 sets of 6 reps' },
                  { name: 'Depth Jumps to Vertical Jump', sets: '3 sets of 5 reps' },
                  { name: 'Hurdle Jumps', sets: '3 sets of 8 reps' },
                  { name: 'Rim Touches (if possible)', sets: '3 sets of max effort' }
                ]
              }
            ]
          }
        ]
      } else if (this.activeLevel === 'intermediate') {
        return [
          {
            title: 'Strength Foundation',
            duration: 'Weeks 1-3',
            description: 'Build the strength base needed for advanced plyometrics and dunking.',
            workouts: [
              {
                day: 'Day 1: Lower Body Strength',
                exercises: [
                  { name: 'Barbell Squats', sets: '4 sets of 8 reps' },
                  { name: 'Deadlifts', sets: '4 sets of 6 reps' },
                  { name: 'Walking Lunges with Weights', sets: '3 sets of 10 reps per leg' },
                  { name: 'Weighted Calf Raises', sets: '4 sets of 15 reps' }
                ]
              },
              {
                day: 'Day 2: Upper Body & Core',
                exercises: [
                  { name: 'Pull-ups', sets: '4 sets of 8 reps' },
                  { name: 'Bench Press', sets: '4 sets of 8 reps' },
                  { name: 'Hanging Leg Raises', sets: '3 sets of 12 reps' },
                  { name: 'Medicine Ball Russian Twists', sets: '3 sets of 20 reps' }
                ]
              },
              {
                day: 'Day 3: Plyometrics',
                exercises: [
                  { name: 'Box Jumps', sets: '4 sets of 8 reps' },
                  { name: 'Depth Jumps', sets: '4 sets of 6 reps' },
                  { name: 'Broad Jumps', sets: '3 sets of 6 reps' },
                  { name: 'Lateral Bounds', sets: '3 sets of 8 reps per side' }
                ]
              },
              {
                day: 'Day 4: Recovery & Technique',
                exercises: [
                  { name: 'Light Jogging', sets: '10-15 minutes' },
                  { name: 'Dynamic Stretching', sets: '10-15 minutes' },
                  { name: 'Approach Practice', sets: '3 sets of 5 approaches' },
                  { name: 'Rim Touches', sets: '4 sets of max effort' }
                ]
              }
            ]
          },
          {
            title: 'Power Development',
            duration: 'Weeks 4-8',
            description: 'Focus on explosive power and converting strength to vertical jump height.',
            workouts: [
              {
                day: 'Day 1: Lower Body Power',
                exercises: [
                  { name: 'Jump Squats with Barbell', sets: '5 sets of 6 reps' },
                  { name: 'Power Cleans', sets: '4 sets of 5 reps' },
                  { name: 'Single-Leg Box Jumps', sets: '3 sets of 6 reps per leg' },
                  { name: 'Weighted Step-ups', sets: '3 sets of 8 reps per leg' }
                ]
              },
              {
                day: 'Day 2: Upper Body & Core Power',
                exercises: [
                  { name: 'Medicine Ball Chest Passes', sets: '4 sets of 10 reps' },
                  { name: 'Clapping Push-ups', sets: '4 sets of 8 reps' },
                  { name: 'Medicine Ball Slams', sets: '4 sets of 10 reps' },
                  { name: 'Hanging Windshield Wipers', sets: '3 sets of 10 reps' }
                ]
              },
              {
                day: 'Day 3: Advanced Plyometrics',
                exercises: [
                  { name: 'Depth Jumps to Box Jumps', sets: '4 sets of 5 reps' },
                  { name: 'Hurdle Hops', sets: '3 sets of 8 hurdles' },
                  { name: 'Bounding', sets: '3 sets of 20 yards' },
                  { name: 'Continuous Vertical Jumps', sets: '3 sets of 8 reps' }
                ]
              },
              {
                day: 'Day 4: Dunking Practice',
                exercises: [
                  { name: 'Approach Drills', sets: '4 sets of 5 approaches' },
                  { name: 'Rim Hangs', sets: '3 sets of 5 hangs' },
                  { name: 'Tennis Ball Dunks', sets: '3 sets of 5 attempts' },
                  { name: 'One-handed Dunk Attempts', sets: '3 sets of 5 attempts' }
                ]
              }
            ]
          },
          {
            title: 'Dunking Technique',
            duration: 'Weeks 9-12',
            description: 'Refine your approach, takeoff, and dunking technique while maintaining power.',
            workouts: [
              {
                day: 'Day 1: Maintenance Strength',
                exercises: [
                  { name: 'Trap Bar Deadlifts', sets: '4 sets of 6 reps' },
                  { name: 'Bulgarian Split Squats', sets: '3 sets of 8 reps per leg' },
                  { name: 'Weighted Calf Raises', sets: '4 sets of 15 reps' },
                  { name: 'Glute-Ham Raises', sets: '3 sets of 10 reps' }
                ]
              },
              {
                day: 'Day 2: Explosive Power',
                exercises: [
                  { name: 'Depth Jumps', sets: '5 sets of 5 reps' },
                  { name: 'Medicine Ball Overhead Throws', sets: '4 sets of 8 reps' },
                  { name: 'Single-Leg Power Skips', sets: '3 sets of 10 reps per leg' },
                  { name: 'Reactive Box Jumps', sets: '4 sets of 6 reps' }
                ]
              },
              {
                day: 'Day 3: Dunking Technique',
                exercises: [
                  { name: 'Approach Speed Drills', sets: '4 sets of 5 approaches' },
                  { name: 'Takeoff Angle Practice', sets: '3 sets of 8 jumps' },
                  { name: 'Ball Control Drills', sets: '3 sets of 5 minutes' },
                  { name: 'Dunking Attempts (Various Types)', sets: '5 sets of 4 attempts' }
                ]
              },
              {
                day: 'Day 4: Recovery & Technique Refinement',
                exercises: [
                  { name: 'Light Shooting', sets: '20 minutes' },
                  { name: 'Video Analysis', sets: '15 minutes' },
                  { name: 'Dynamic Stretching', sets: '15 minutes' },
                  { name: 'Visualization Practice', sets: '10 minutes' }
                ]
              }
            ]
          }
        ]
      } else if (this.activeLevel === 'advanced') {
        return [
          {
            title: 'Maximum Strength Phase',
            duration: 'Weeks 1-4',
            description: 'Build elite strength levels to support advanced dunking variations.',
            workouts: [
              {
                day: 'Day 1: Lower Body Max Strength',
                exercises: [
                  { name: 'Back Squats (Heavy)', sets: '5 sets of 5 reps' },
                  { name: 'Romanian Deadlifts', sets: '4 sets of 6 reps' },
                  { name: 'Weighted Lunges', sets: '3 sets of 8 reps per leg' },
                  { name: 'Seated Calf Raises', sets: '4 sets of 12 reps' }
                ]
              },
              {
                day: 'Day 2: Upper Body Power',
                exercises: [
                  { name: 'Weighted Pull-ups', sets: '4 sets of 6 reps' },
                  { name: 'Bench Press', sets: '4 sets of 6 reps' },
                  { name: 'Medicine Ball Chest Passes', sets: '4 sets of 10 reps' },
                  { name: 'Barbell Rows', sets: '4 sets of 8 reps' }
                ]
              },
              {
                day: 'Day 3: Olympic Lifting',
                exercises: [
                  { name: 'Power Cleans', sets: '5 sets of 3 reps' },
                  { name: 'Hang Snatches', sets: '4 sets of 3 reps' },
                  { name: 'Push Press', sets: '4 sets of 5 reps' },
                  { name: 'Front Squats', sets: '4 sets of 6 reps' }
                ]
              },
              {
                day: 'Day 4: Plyometrics',
                exercises: [
                  { name: 'Depth Jumps', sets: '4 sets of 5 reps' },
                  { name: 'Box Jumps (High)', sets: '4 sets of 5 reps' },
                  { name: 'Hurdle Hops', sets: '3 sets of 8 hurdles' },
                  { name: 'Weighted Vertical Jumps', sets: '4 sets of 6 reps' }
                ]
              },
              {
                day: 'Day 5: Recovery & Technique',
                exercises: [
                  { name: 'Light Basketball Shooting', sets: '20 minutes' },
                  { name: 'Dynamic Stretching', sets: '15 minutes' },
                  { name: 'Foam Rolling', sets: '15 minutes' },
                  { name: 'Basic Dunk Practice', sets: '10 minutes' }
                ]
              }
            ]
          },
          {
            title: 'Explosive Power Phase',
            duration: 'Weeks 5-10',
            description: 'Maximize explosive power and convert strength gains to vertical jump height.',
            workouts: [
              {
                day: 'Day 1: Lower Body Power',
                exercises: [
                  { name: 'Jump Squats with Barbell', sets: '5 sets of 5 reps' },
                  { name: 'Speed Deadlifts', sets: '4 sets of 4 reps' },
                  { name: 'Weighted Box Jumps', sets: '4 sets of 5 reps' },
                  { name: 'Plyometric Lunges', sets: '3 sets of 8 reps per leg' }
                ]
              },
              {
                day: 'Day 2: Upper Body Explosiveness',
                exercises: [
                  { name: 'Plyometric Push-ups', sets: '4 sets of 8 reps' },
                  { name: 'Medicine Ball Overhead Throws', sets: '4 sets of 10 reps' },
                  { name: 'Explosive Pull-ups', sets: '4 sets of 6 reps' },
                  { name: 'Battle Ropes', sets: '4 sets of 30 seconds' }
                ]
              },
              {
                day: 'Day 3: Advanced Plyometrics',
                exercises: [
                  { name: 'Depth Jumps to Box Jumps', sets: '4 sets of 5 reps' },
                  { name: 'Single-Leg Bounds', sets: '3 sets of 10 reps per leg' },
                  { name: 'Altitude Landings', sets: '3 sets of 5 reps' },
                  { name: 'Continuous Hurdle Jumps', sets: '3 sets of 8 hurdles' }
                ]
              },
              {
                day: 'Day 4: Dunk-Specific Training',
                exercises: [
                  { name: 'Approach Speed Work', sets: '4 sets of 5 approaches' },
                  { name: 'Ball Control Drills', sets: '3 sets of 5 minutes' },
                  { name: 'One-handed Dunk Practice', sets: '4 sets of 5 attempts' },
                  { name: 'Two-handed Dunk Practice', sets: '4 sets of 5 attempts' }
                ]
              },
              {
                day: 'Day 5: Advanced Dunk Variations',
                exercises: [
                  { name: 'Windmill Dunk Practice', sets: '3 sets of 5 attempts' },
                  { name: 'Tomahawk Dunk Practice', sets: '3 sets of 5 attempts' },
                  { name: '360 Dunk Practice', sets: '3 sets of 5 attempts' },
                  { name: 'Between-the-Legs Practice', sets: '3 sets of 5 attempts' }
                ]
              }
            ]
          },
          {
            title: 'Dunk Mastery Phase',
            duration: 'Weeks 11-16',
            description: 'Perfect advanced dunking techniques while maintaining peak power.',
            workouts: [
              {
                day: 'Day 1: Maintenance Strength',
                exercises: [
                  { name: 'Trap Bar Deadlifts', sets: '4 sets of 5 reps' },
                  { name: 'Front Squats', sets: '4 sets of 6 reps' },
                  { name: 'Weighted Step-ups', sets: '3 sets of 8 reps per leg' },
                  { name: 'Single-Leg Calf Raises', sets: '3 sets of 15 reps per leg' }
                ]
              },
              {
                day: 'Day 2: Power Maintenance',
                exercises: [
                  { name: 'Power Cleans', sets: '4 sets of 3 reps' },
                  { name: 'Depth Jumps', sets: '4 sets of 5 reps' },
                  { name:
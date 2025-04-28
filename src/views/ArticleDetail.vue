<template>
  <div class="article-detail-page">
    <div class="container">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading article...</p>
      </div>

      <div v-else-if="error" class="error-container">
        <h2>Article Not Found</h2>
        <p>{{ error }}</p>
        <router-link to="/articles" class="btn btn-secondary">Back to Articles</router-link>
      </div>

      <div v-else class="article-content">
        <div class="article-header">
          <div class="article-category">{{ article.category }}</div>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <div class="meta-item">
              <span class="meta-icon">📅</span>
              <span>{{ formatDate(article.date) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">⏱️</span>
              <span>{{ article.readTime }} min read</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">👁️</span>
              <span>{{ article.views }} views</span>
            </div>
          </div>
        </div>

        <div class="article-featured-image">
          <img :src="article.image" :alt="article.title">
        </div>

        <div class="article-body">
          <div v-for="(section, index) in article.content" :key="index" class="article-section">
            <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
            <p v-if="section.text" class="section-text" v-html="section.text"></p>

            <ul v-if="section.list" class="section-list">
              <li v-for="(item, i) in section.list" :key="i">{{ item }}</li>
            </ul>

            <div v-if="section.image" class="section-image">
              <img :src="section.image.src" :alt="section.image.alt">
              <p v-if="section.image.caption" class="image-caption">{{ section.image.caption }}</p>
            </div>

            <div v-if="section.quote" class="section-quote">
              <blockquote>
                <p>{{ section.quote.text }}</p>
                <cite v-if="section.quote.author">— {{ section.quote.author }}</cite>
              </blockquote>
            </div>

            <div v-if="section.video" class="section-video">
              <iframe
                :src="section.video.src"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <p v-if="section.video.caption" class="video-caption">{{ section.video.caption }}</p>
            </div>
          </div>
        </div>

        <div class="article-author">
          <div class="author-image">
            <img :src="article.author.image" :alt="article.author.name">
          </div>
          <div class="author-info">
            <h3>{{ article.author.name }}</h3>
            <p>{{ article.author.bio }}</p>
          </div>
        </div>

        <div class="article-share">
          <h3>Share this article</h3>
          <div class="share-buttons">
            <a href="#" class="share-button facebook" @click.prevent="shareOnFacebook">
              <span class="share-icon">Facebook</span>
            </a>
            <a href="#" class="share-button twitter" @click.prevent="shareOnTwitter">
              <span class="share-icon">Twitter</span>
            </a>
            <a href="#" class="share-button linkedin" @click.prevent="shareOnLinkedIn">
              <span class="share-icon">LinkedIn</span>
            </a>
            <a href="#" class="share-button email" @click.prevent="shareByEmail">
              <span class="share-icon">Email</span>
            </a>
          </div>
        </div>

        <div class="related-articles">
          <h3>Related Articles</h3>
          <div class="related-articles-grid">
            <div v-for="article in relatedArticles" :key="article.id" class="related-article">
              <div class="related-article-image">
                <img :src="article.image" :alt="article.title">
              </div>
              <div class="related-article-content">
                <h4>{{ article.title }}</h4>
                <p>{{ article.excerpt }}</p>
                <router-link :to="'/articles/' + article.id" class="read-more">Read More</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="article-navigation">
          <router-link v-if="prevArticle" :to="'/articles/' + prevArticle.id" class="nav-link prev">
            <span class="nav-direction">Previous Article</span>
            <span class="nav-title">{{ prevArticle.title }}</span>
          </router-link>
          <div v-else class="nav-link disabled"></div>

          <router-link v-if="nextArticle" :to="'/articles/' + nextArticle.id" class="nav-link next">
            <span class="nav-direction">Next Article</span>
            <span class="nav-title">{{ nextArticle.title }}</span>
          </router-link>
          <div v-else class="nav-link disabled"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetail',
  data() {
    return {
      loading: true,
      error: null,
      article: null,
      articles: [
        {
          id: 'vertical-jump-science',
          title: 'The Science of Vertical Jump: Biomechanics and Physics',
          excerpt: 'Explore the scientific principles behind an explosive vertical jump, including muscle activation, force production, and energy transfer.',
          image: require('../assets/placeholder.svg'),
          category: 'Science',
          date: '2023-06-15',
          readTime: 8,
          views: 3542,
          author: {
            name: 'Dr. Michael Johnson',
            bio: 'Sports Biomechanics Researcher and former NCAA Division I basketball player with a PhD in Exercise Physiology.',
            image: require('../assets/placeholder.svg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'The vertical jump is one of the most impressive athletic movements in basketball, combining explosive power, coordination, and technique. Understanding the science behind this movement can help players optimize their training and maximize their jumping potential.'
            },
            {
              title: 'The Physics of Jumping',
              text: 'From a physics perspective, a vertical jump is all about generating enough force to overcome gravity and propel your body upward. The height of your jump is determined by your takeoff velocity, which is directly related to the amount of force you can generate against the ground and how quickly you can apply that force.'
            },
            {
              text: 'The key equation that governs vertical jump height is:<br><strong>Jump Height = (Initial Velocity)² / (2 × Gravity)</strong><br>where gravity is approximately 9.81 m/s². This means that to jump higher, you need to increase your initial velocity at takeoff.'
            },
            {
              title: 'Biomechanics of the Vertical Jump',
              text: 'The vertical jump involves a complex sequence of muscle activations and joint movements that work together to generate maximum force:'
            },
            {
              list: [
                'Countermovement: The initial downward movement that stretches the muscles and stores elastic energy',
                'Triple Extension: The coordinated extension of the ankles, knees, and hips',
                'Arm Swing: The upward swing of the arms that adds to the upward momentum',
                'Core Stabilization: The bracing of the core muscles to transfer force efficiently'
              ]
            },
            {
              image: {
                src: require('../assets/placeholder.svg'),
                alt: 'Phases of a vertical jump',
                caption: 'The four main phases of a vertical jump: preparation, countermovement, propulsion, and flight.'
              }
            },
            {
              title: 'Muscle Activation Sequence',
              text: 'A proper vertical jump follows a specific sequence of muscle activation, starting from the largest muscles and moving to the smallest:'
            },
            {
              list: [
                'Gluteus Maximus (buttocks): Provides the primary hip extension force',
                'Quadriceps (front thigh): Extends the knee joint',
                'Hamstrings (back thigh): Assists with hip extension',
                'Gastrocnemius and Soleus (calves): Provides ankle plantarflexion',
                'Core muscles: Stabilizes the trunk and transfers force'
              ]
            },
            {
              quote: {
                text: "The vertical jump is not just about leg strength—it's about how efficiently you can coordinate all the muscles in your body to work together in a split second.",
                author: 'Dr. Peter Vint, Sports Biomechanist'
              }
            },
            {
              title: 'The Stretch-Shortening Cycle',
              text: 'One of the most important concepts in vertical jump performance is the stretch-shortening cycle (SSC). This is a natural mechanism where a muscle that is stretched immediately before contraction will contract more forcefully than a muscle that begins contracting from a resting state.'
            },
            {
              text: "This is why the countermovement (the quick dip before jumping) is so important—it stretches the leg muscles, storing elastic energy that can be released during the upward phase of the jump, increasing the force production by 20-30%."
            },
            {
              video: {
                src: 'https://www.youtube.com/embed/V5g4JPFzCnA',
                caption: 'Slow-motion analysis of the stretch-shortening cycle in vertical jumps.'
              }
            },
            {
              title: 'Optimizing Jump Mechanics',
              text: 'Research has identified several key factors that can optimize vertical jump performance:'
            },
            {
              list: [
                'Countermovement depth: A medium depth (knee angle of approximately 120°) is optimal for most athletes',
                'Arm swing: Can contribute up to 10% of jump height when properly coordinated',
                'Takeoff angle: A nearly vertical takeoff angle maximizes height',
                'Rate of force development: How quickly you can reach maximum force is often more important than maximum strength',
                'Triple extension timing: Coordinated extension of ankles, knees, and hips in the correct sequence'
              ]
            },
            {
              title: 'Practical Applications',
              text: 'Understanding the science behind vertical jumping can help players and coaches design more effective training programs. Some evidence-based recommendations include:'
            },
            {
              list: [
                'Combine heavy strength training with explosive plyometric exercises',
                'Train the rate of force development with speed-strength exercises',
                'Practice proper jumping technique with feedback on mechanics',
                'Develop core strength to improve force transfer',
                'Include specific exercises for all muscle groups involved in jumping'
              ]
            },
            {
              title: 'Conclusion',
              text: "The vertical jump is a fascinating display of human athletic ability that combines physics, biomechanics, and physiology. By understanding the scientific principles behind jumping, basketball players can train more effectively and maximize their vertical leap potential. Whether you're trying to touch the rim for the first time or aiming to throw down spectacular dunks, the science of vertical jumping provides the blueprint for improvement."
            }
          ]
        },
        {
          id: 'nba-dunkers',
          title: 'NBA Dunkers Analysis: Physical Attributes of Elite Dunkers',
          excerpt: 'A data-driven analysis of the physical attributes and vertical jump metrics of the NBA\'s most impressive dunkers.',
          image: require('../assets/placeholder.svg'),
          category: 'Analysis',
          date: '2023-07-22',
          readTime: 10,
          views: 2876,
          author: {
            name: 'James Wilson',
            bio: 'Basketball analyst and former college player with expertise in sports statistics and performance metrics.',
            image: require('../assets/placeholder.svg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'The NBA has seen some incredible dunkers throughout its history, from the high-flying acrobatics of Vince Carter to the power slams of Shaquille O\'Neal. But what physical attributes contribute to elite dunking ability? This article analyzes data from some of the NBA\'s most impressive dunkers to identify patterns and insights.'
            },
            {
              title: 'Methodology',
              text: 'For this analysis, we collected data on 50 of the most renowned NBA dunkers from the past three decades. We examined their height, weight, wingspan, standing reach, vertical jump measurements, and other physical attributes. We also analyzed their dunking styles and signature moves to identify correlations between physical traits and dunking capabilities.'
            },
            {
              title: 'Height and Dunking Ability',
              text: 'While it might seem obvious that taller players have an advantage when it comes to dunking, our analysis revealed some interesting nuances:'
            },
            {
              list: [
                'The average height of elite NBA dunkers is 6\'6" (198 cm), which is actually slightly below the NBA average of 6\'7"',
                'Some of the most spectacular dunkers, like Spud Webb (5\'7") and Nate Robinson (5\'9"), were well below average height',
                'Taller dunkers (above 6\'8") tend to perform power dunks, while shorter dunkers often excel at acrobatic, high-flying dunks',
                'The sweet spot for versatile dunking ability appears to be between 6\'3" and 6\'7"'
              ]
            },
            {
              title: 'Wingspan and Standing Reach',
              text: 'Wingspan and standing reach proved to be more significant factors than height alone:'
            },
            {
              list: [
                'Elite dunkers typically have a wingspan-to-height ratio of 1.06 or greater (their wingspan exceeds their height by 6% or more)',
                'The average standing reach of elite dunkers is approximately 8\'7" (262 cm)',
                'Players with exceptional wingspan-to-height ratios, like Vince Carter and Michael Jordan, often display greater versatility in their dunking repertoire'
              ]
            },
            {
              title: 'Vertical Jump Measurements',
              text: 'Not surprisingly, vertical jump ability is a critical factor for elite dunkers:'
            },
            {
              list: [
                'The average maximum vertical jump among elite NBA dunkers is 40 inches (102 cm)',
                'The highest recorded vertical jumps belong to players like Michael Jordan (48 inches) and Vince Carter (43 inches)',
                'Shorter dunkers typically have higher vertical jumps to compensate for their height disadvantage',
                'Players with vertical jumps exceeding 42 inches can typically perform the most spectacular in-game dunks regardless of height'
              ]
            },
            {
              title: 'Body Composition and Muscle Distribution',
              text: 'The physical build of elite dunkers shows some consistent patterns:'
            },
            {
              list: [
                'Lower body power is crucial - elite dunkers typically have well-developed quadriceps, hamstrings, and calf muscles',
                'A relatively low body fat percentage (typically under 10%) is common among the most explosive dunkers',
                'Upper body strength, particularly in the shoulders and core, contributes to dunk control and power',
                'Lean muscle mass rather than bulk appears optimal for maximum jumping ability'
              ]
            },
            {
              title: 'Dunking Styles and Physical Attributes',
              text: 'Different physical attributes tend to correlate with specific dunking styles:'
            },
            {
              list: [
                'Players with exceptional vertical leaps but average wingspan (like Nate Robinson) excel at straight-line power dunks',
                'Dunkers with exceptional wingspan and good (but not elite) vertical ability (like Giannis Antetokounmpo) excel at extension dunks from further from the basket',
                'The most versatile dunkers (like Vince Carter and Zach LaVine) combine elite vertical leaps with above-average wingspan',
                'Heavier players with good vertical ability (like Shaquille O\'Neal or Dwight Howard) specialize in power dunks that can break backboards'
              ]
            },
            {
              title: 'Training Implications',
              text: 'Based on our analysis of elite NBA dunkers, we can draw several conclusions about optimal training approaches:'
            },
            {
              list: [
                'Plyometric training is essential for developing the explosive power needed for impressive dunks',
                'Targeted lower body strength training with emphasis on fast-twitch muscle development is crucial',
                'Core strength development contributes significantly to in-air control and power transfer',
                'Flexibility training, particularly in the hips and shoulders, enables more complex dunking movements',
                'For shorter players, a greater emphasis on vertical jump training can help overcome height limitations'
              ]
            },
            {
              title: 'Conclusion',
              text: 'While natural physical attributes certainly play a role in dunking ability, our analysis of NBA dunkers shows that a combination of factors contributes to elite dunking performance. Height alone is not determinative - wingspan, standing reach, vertical leap, and body composition all play crucial roles. Understanding these physical attributes can help players at all levels develop training programs that maximize their dunking potential based on their individual physical profile.'
            }
          ]
        },
        {
          id: 'plyometric-training',
          title: 'Plyometric Training Guide for Basketball Players',
          excerpt: 'Comprehensive guide to plyometric exercises that can significantly improve your vertical jump and dunking ability.',
          image: require('../assets/placeholder.svg'),
          category: 'Training',
          date: '2023-08-05',
          readTime: 12,
          views: 4210,
          author: {
            name: 'Coach Sarah Thompson',
            bio: 'Certified strength and conditioning specialist with 15 years of experience training basketball players at all levels.',
            image: require('../assets/placeholder.svg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'Plyometric training is one of the most effective methods for improving vertical jump height and explosive power for basketball players. This guide covers the science behind plyometrics and provides a comprehensive program to enhance your dunking ability.'
            },
            {
              title: 'What is Plyometric Training?',
              text: 'Plyometric training, often called "jump training" or simply "plyos," is a type of exercise that involves rapid stretching and contracting of muscles to increase power output. These exercises typically involve explosive movements where muscles exert maximum force in short intervals, helping to increase power and speed.'
            },
            {
              title: 'The Science Behind Plyometrics',
              text: 'Plyometric exercises work by utilizing the stretch-shortening cycle (SSC) of your muscles. When a muscle is stretched quickly before contraction (eccentric phase), it stores elastic energy. When followed immediately by a concentric contraction, this stored energy is released, resulting in greater force production than a concentric contraction alone.'
            },
            {
              text: 'This is why a countermovement jump (where you quickly dip down before jumping) allows you to jump higher than a squat jump from a static position. Plyometric training enhances your neuromuscular system\'s ability to utilize this stretch-shortening cycle more efficiently.'
            },
            {
              title: 'Benefits for Basketball Players',
              text: 'Plyometric training offers several specific benefits for basketball players:'
            },
            {
              list: [
                'Increased vertical jump height (critical for dunking and rebounding)',
                'Improved first-step quickness and acceleration',
                'Enhanced lateral movement speed and agility',
                'Greater explosive power for more effective drives to the basket',
                'Improved landing mechanics, potentially reducing injury risk',
                'Increased rate of force development (how quickly you can generate maximum force)'
              ]
            },
            {
              title: 'Safety Considerations',
              text: 'Before starting any plyometric program, it\'s important to understand these safety guidelines:'
            },
            {
              list: [
                'Establish a strength base first - you should be able to squat at least 1.5 times your body weight before intensive plyometrics',
                'Always warm up thoroughly before plyometric exercises',
                'Start with lower intensity exercises and gradually progress',
                'Use proper landing technique - soft landings with knees aligned over toes',
                'Allow 48-72 hours of recovery between intensive plyometric sessions',
                'Train on forgiving surfaces like basketball courts or rubber mats, not concrete',
                'If you experience joint pain (not muscle soreness), stop and consult a professional'
              ]
            },
            {
              title: '8-Week Plyometric Program for Basketball Players',
              text: 'This progressive 8-week program is designed specifically for basketball players looking to increase their vertical jump and dunking ability. Perform these workouts twice per week with at least 48 hours between sessions.'
            },
            {
              title: 'Weeks 1-2: Foundation Phase',
              text: 'Focus on proper landing mechanics and basic plyometric movements:'
            },
            {
              list: [
                'Jump and Stick (3 sets of 8 reps): Jump in place and focus on soft, stable landings',
                'Ankle Bounces (3 sets of 15 reps): Small, quick jumps using only ankle flexion',
                'Squat Jumps (3 sets of 10 reps): Full squat followed by vertical jump',
                'Lateral Bounds (3 sets of 8 reps each side): Jump sideways from one foot to the other',
                'Split Squat Jumps (2 sets of 8 reps each leg): Lunge position, jump and switch legs mid-air'
              ]
            },
            {
              title: 'Weeks 3-4: Development Phase',
              text: 'Increase intensity and introduce more basketball-specific movements:'
            },
            {
              list: [
                'Depth Jumps (12" box) (3 sets of 8 reps): Step off box, land, immediately jump vertically',
                'Broad Jumps (3 sets of 6 reps): Jump forward for maximum horizontal distance',
                'Lateral Box Push-offs (3 sets of 8 reps each side): Explosive lateral jumps from one foot',
                'Tuck Jumps (3 sets of 10 reps): Jump while bringing knees to chest',
                'Single-Leg Hops (3 sets of 10 reps each leg): Consecutive hops on one leg'
              ]
            },
            {
              title: 'Weeks 5-6: Power Phase',
              text: 'Focus on maximizing power output and jump height:'
            },
            {
              list: [
                'Depth Jumps (18" box) (4 sets of 6 reps): Increased box height from previous phase',
                'Depth Jump to Rim Touch (3 sets of 6 reps): Depth jump followed by immediate jump to touch basketball rim',
                'Hurdle Hops (3 sets of 6 hurdles): Consecutive jumps over low hurdles',
                'Box Jumps (3 sets of 8 reps): Jump onto box from standing position',
                'Reactive Squat Jumps (3 sets of 8 reps): Quick succession of squat jumps with minimal ground contact time'
              ]
            },
            {
              title: 'Weeks 7-8: Basketball-Specific Phase',
              text: 'Integrate plyometric power with basketball-specific movements:'
            },
            {
              list: [
                'Approach Jump to Rim (4 sets of 5 reps): Take 2-3 steps, jump and touch rim/backboard',
                'Depth Jump to Ball Grab (3 sets of 5 reps): Depth jump, then jump again to grab ball held above you',
                'Lateral Bound to Vertical Jump (3 sets of 6 reps each side): Bound sideways, then immediately jump vertically',
                'Single-Leg Box Jumps (3 sets of 6 reps each leg): Jump onto 12" box using one leg',
                'Continuous Vertical Jumps with Basketball (3 sets of 8 reps): Consecutive max-effort jumps while holding basketball overhead'
              ]
            },
            {
              title: 'Integrating with Your Basketball Training',
              text: 'For optimal results, integrate this plyometric program with your overall basketball training plan:'
            },
            {
              list: [
                'Perform plyometrics after warm-up but before skill work or regular basketball practice',
                'On strength training days, do plyometrics before weight training',
                'Maintain regular strength training for legs (squats, deadlifts, lunges) on separate days',
                'Include core strengthening exercises 3-4 times per week',
                'Ensure adequate protein intake (1.6-2g per kg of bodyweight) to support muscle recovery',
                'Get 7-9 hours of sleep for optimal recovery and adaptation'
              ]
            },
            {
              title: 'Measuring Your Progress',
              text: 'Track your progress throughout the 8-week program using these methods:'
            },
            {
              list: [
                'Vertical Jump Test: Measure standing reach, then jump and touch highest point. The difference is your vertical jump',
                'Standing Broad Jump: Measure the distance of your horizontal jump from a standing position',
                'Reactive Strength Index: Measure the ratio between jump height and ground contact time',
                'Video Analysis: Record your jumping technique from the side to analyze form improvements',
                'Basketball-Specific Metrics: Track improvements in rebounding, blocking, and dunking ability during games'
              ]
            },
            {
              title: 'Conclusion',
              text: 'Plyometric training is a powerful tool for basketball players looking to increase their vertical jump and overall explosiveness. This 8-week program provides a structured approach to developing the specific type of power needed for dunking and other basketball movements requiring vertical leap. Remember that consistency is key - follow the program as outlined, respect recovery periods, and combine with proper nutrition and rest for maximum results. Within 8 weeks, most players see significant improvements in their jumping ability and on-court performance.'
            }
          ]
        },
        {
          id: 'dunking-techniques',
          title: 'Mastering Different Dunking Techniques',
          excerpt: 'Learn the mechanics and techniques behind various types of dunks, from basic one-handed dunks to advanced windmills and 360s.',
          image: require('../assets/placeholder.svg'),
          category: 'Techniques',
          date: '2023-09-10',
          readTime: 9,
          views: 3125,
          author: {
            name: 'Marcus Johnson',
            bio: 'Former professional basketball player and dunk contest champion with expertise in advanced dunking techniques.',
            image: require('../assets/placeholder.svg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'Dunking a basketball is an art form that combines athleticism, creativity, and technical skill. This article breaks down the mechanics of different dunking techniques and provides step-by-step guidance for mastering each style.'
            },
            {
              title: 'Prerequisites for Dunking',
              text: 'Before attempting any dunking technique, you should have:'
            },
            {
              list: [
                'Sufficient vertical jump (typically 20+ inches to dunk on a standard 10-foot rim)',
                'Proper approach and takeoff mechanics',
                'Hand size adequate to palm the ball (though not absolutely necessary)',
                'Core strength and body control for in-air stability',
                'Confidence and mental preparation'
              ]
            },
            {
              title: 'The Basic One-Handed Dunk',
              text: 'The one-handed dunk is the foundation for most dunking techniques and the first style most players master.'
            },
            {
              title: 'Technique Breakdown:',
              list: [
                'Approach: Take a running start of 3-5 steps at a 45-degree angle to the basket',
                'Gather: On your last step, plant your takeoff foot firmly while bringing your other knee up forcefully',
                'Ball Position: Hold the ball in your dunking hand, slightly above waist level during approach',
                'Takeoff: Push explosively off your plant foot, driving your non-plant knee upward',
                'Extension: As you rise, extend your dunking arm upward and slightly forward',
                'Finish: At the peak of your jump, extend your arm fully and push the ball down through the rim',
                'Landing: Land with bent knees to absorb impact, ideally on both feet'
              ]
            },
            {
              title: 'Common Mistakes:',
              list: [
                'Jumping from too far away, requiring excessive reach',
                'Poor ball security during the approach',
                'Insufficient arm extension at the rim',
                'Leaning back instead of staying upright or slightly forward',
                'Stiff landing that increases injury risk'
              ]
            },
            {
              title: 'The Two-Handed Dunk',
              text: 'The two-handed dunk offers more ball security but requires greater vertical leap than a one-handed dunk.'
            },
            {
              title: 'Technique Breakdown:',
              list: [
                'Approach: Similar to one-handed dunk, but with a more direct angle to the basket',
                'Ball Position: Hold the ball with both hands at chest level during approach',
                'Gather: On your final step, bring both knees up forcefully as you jump',
                'Arm Movement: Bring the ball back toward your chest slightly before extending both arms',
                'Extension: At the peak of your jump, extend both arms upward and forward',
                'Finish: Push the ball through the rim with both hands, aiming for the back of the rim',
                'Landing: Land with knees bent, feet shoulder-width apart'
              ]
            },
            {
              title: 'The Tomahawk Dunk',
              text: 'The tomahawk dunk is a powerful, athletic move where the ball is brought back behind the head before being slammed through the rim.'
            },
            {
              title: 'Technique Breakdown:',
              list: [
                'Approach: Faster approach than basic dunks, 3-5 powerful steps',
                'Takeoff: Explosive jump with strong knee drive',
                'Ball Movement: As you jump, bring the ball back behind your head with one or both hands',
                'Arm Extension: At the peak of your jump, bring your arm(s) forward in a powerful motion',
                'Finish: Slam the ball through the rim with force, wrist snapping downward',
                'Follow-through: Allow your arm to continue through the rim naturally',
                'Landing: Absorb impact with bent knees, maintaining balance'
              ]
            },
            {
              title: 'The Windmill Dunk',
              text: 'The windmill is one of the most visually impressive dunks, involving a circular motion of the arm before finishing.'
            },
            {
              title: 'Technique Breakdown:',
              list: [
                'Approach: Fast approach with powerful strides',
                'Takeoff: Maximum-effort vertical jump with strong knee drive',
                'Initial Position: Hold the ball in your dunking hand as you leave the ground',
                'Circular Motion: Swing your arm in a wide circular motion (windmill) from low to high',
                'Ball Control: Keep the ball in your hand throughout the circular motion',
                'Timing: Complete the circular motion as you reach the peak of your jump',
                'Finish: As your hand comes above the rim, push the ball down through the hoop',
                'Landing: Focus on a controlled, balanced landing'
              ]
            },
            {
              title: 'Advanced Tip:',
              text: 'Start practicing the windmill motion without a ball first, then with a tennis ball, before attempting with a basketball. The windmill requires excellent shoulder flexibility and coordination.'
            },
            {
              title: 'The 360-Degree Dunk',
              text: 'The 360 dunk involves a complete rotation in the air before dunking, creating a spectacular visual effect.'
            },
            {
              title: 'Technique Breakdown:',
              list: [
                'Approach: Approach the basket at an angle that facilitates rotation',
                'Takeoff: Jump while initiating a spin in your preferred direction (usually toward your dominant hand)',
                'Ball Security: Hold the ball with both hands initially, then transfer to your dunking hand during rotation',
                'Rotation: Use your arms and hips to generate a full 360-degree spin',
                'Spotting: Keep your eyes on the rim as you complete the rotation',
                'Timing: Time your rotation to complete just as you reach the rim',
                'Finish: Once facing the rim again, extend and dunk with one or two hands',
                'Landing: Land with knees bent, focusing on balance after rotation'
              ]
            },
            {
              title: 'Between-the-Legs Dunk',
              text: 'This advanced dunk involves passing the ball between your legs in mid-air before dunking.'
            },
            {
              title: 'Technique Breakdown:',
              list: [
                'Approach: Fast, powerful approach for maximum height',
                'Takeoff: Explosive jump with significant knee drive',
                'Initial Position: Hold the ball in both hands as you leave the ground',
                'Transfer: Pass the ball under one leg from one hand to the other',
                'Timing: Complete the transfer at the peak of your jump',
                'Extension: After the transfer, extend your arm toward the rim',
                'Finish: Push the ball through the rim with control',
                'Landing: Focus on a balanced, controlled landing'
              ]
            },
            {
              title: 'Advanced Tip:',
              text: 'This dunk requires exceptional vertical leap (typically 35+ inches). Practice the motion with a smaller ball first, and ensure you can comfortably dunk with one hand before attempting this technique.'
            },
            {
              title: 'Alley-Oop Dunk',
              text: 'While typically performed with a partner, self alley-oops are also possible and add flair to your dunking repertoire.'
            },
            {
              title: 'Technique Breakdown:',
              list: [
                'Setup: For self alley-oops, toss the ball toward the backboard as you begin your approach',
                'Timing: Time your approach so you reach the basket as the ball rebounds',
                'Tracking: Keep your eyes on the ball throughout your approach and jump',
                'Catching: Catch the ball with one or two hands at or near the peak of your jump',
                'Finish: Immediately after catching, push the ball through the rim',
                'Variations: Can be combined with other techniques (windmill alley-oop, 360 alley-oop, etc.)',
                'Landing: Focus on balance and control, especially since timing adds complexity'
              ]
            },
            {
              title: 'Training Progression for Dunking Techniques',
              text: 'Follow this progression to safely develop your dunking skills:'
            },
            {
              list: [
                '1. Master basic jumping technique and rim touches',
                '2. Practice one-handed dunks with a tennis ball or mini basketball',
                '3. Progress to one-handed dunks with a regulation basketball',
                '4. Develop two-handed dunking ability',
                '5. Practice tomahawk motion without a ball, then with a basketball',
                '6. Work on windmill motion gradually, starting without a ball',
                '7. Attempt 360-degree spins without a ball before adding dunking',
                '8. Practice between-the-legs motion with a smaller ball before full attempts',
                '9. Combine techniques only after mastering individual elements'
              ]
            },
            {
              title: 'Mental Aspects of Dunking',
              text: 'The psychological component of dunking is often overlooked but critically important:'
            },
            {
              list: [
                'Visualization: Regularly visualize successful execution of dunking techniques',
                'Confidence: Believe in your ability to complete the dunk',
                'Commitment: Hesitation often leads to failed attempts or injuries',
                'Focus: Concentrate on technique rather than the spectacle',
                'Progression: Accept that mastery comes gradually through consistent practice'
              ]
            },
            {
              title: 'Conclusion',
              text: 'Mastering different dunking techniques is a journey that combines athletic development, technical skill, and artistic expression. Start with the fundamentals, progress gradually, and prioritize proper technique over flashiness. With dedicated practice and the right approach, you can expand your dunking repertoire and experience the thrill of executing these spectacular basketball moves. Remember that even professional dunkers spent years perfecting their craft—patience and persistence are key to dunking success.'
            }
          ]
        },
        {
          id: 'vertical-jump-nutrition',
          title: 'Nutrition for Vertical Jump: Fueling for Explosive Power',
          excerpt: 'How to optimize your diet to support muscle growth, energy production, and recovery for maximum vertical jump gains.',
          image: require('../assets/placeholder.svg'),
          category: 'Nutrition',
          date: '2023-10-18',
          readTime: 7,
          views: 1985,
          author: {
            name: 'Dr. Lisa Chen',
            bio: 'Sports nutritionist with a PhD in Exercise Physiology and specialization in performance nutrition for basketball players.',
            image: require('../assets/placeholder.svg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'Nutrition plays a crucial role in developing the explosive power needed for an impressive vertical jump. This article explores the optimal nutritional strategies to fuel your training, support muscle growth, and enhance recovery for maximum jumping performance.'
            }
            // Additional content sections would be added here
          ]
        },
        {
          id: 'short-dunkers',
          title: 'Short Dunkers: How Players Under 6 Feet Can Dunk',
          excerpt: 'Success stories and training strategies from basketball players under 6 feet who have achieved impressive dunking abilities.',
          image: require('../assets/placeholder.svg'),
          category: 'Inspiration',
          date: '2023-11-05',
          readTime: 8,
          views: 5340,
          author: {
            name: 'Tony Rodriguez',
            bio: '5\'10" professional basketball trainer who specializes in helping shorter players develop their vertical jump and dunking ability.',
            image: require('../assets/placeholder.svg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'While height certainly provides an advantage for dunking, many players under 6 feet have defied expectations and become impressive dunkers. This article shares inspiring stories and practical training advice for shorter players looking to throw it down.'
            },
            {
              title: 'Famous Short Dunkers',
              text: 'Throughout basketball history, several shorter players have become legendary for their dunking abilities:'
            },
            {
              list: [
                'Spud Webb (5\'7"): Won the 1986 NBA Slam Dunk Contest with a 42-inch vertical leap',
                'Nate Robinson (5\'9"): Three-time NBA Slam Dunk Contest champion with incredible power and creativity',
                'Anthony "Spud" Webb (5\'7"): Known for his 46-inch vertical jump and ability to dunk with ease',
                'Muggsy Bogues (5\'3"): While rarely dunking in games, he could dunk in practice despite being the shortest NBA player ever',
                'Isaiah Thomas (5\'9"): Known for his in-game dunks despite his height'
              ]
            },
            {
              title: 'The Physics of Dunking for Shorter Players',
              text: 'Understanding the physics helps explain what shorter players need to overcome:'
            },
            {
              list: [
                'A 5\'9" player typically needs a vertical leap of at least 29 inches to dunk on a 10-foot rim',
                'Standing reach is more important than height - some shorter players have proportionally longer arms',
                'Hand size matters - smaller hands make it harder to palm the ball, requiring modified techniques',
                'Approach speed and takeoff angle become more critical as height decreases',
                'Power-to-weight ratio is often better in shorter players, potentially aiding explosive movements'
              ]
            },
            {
              title: 'Success Stories: Real Players Under 6 Feet',
              text: 'These stories from real athletes prove that dunking is possible regardless of height:'
            },
            {
              text: 'Marcus Taylor (5\'8"): "I couldn\'t touch the rim at 16. By implementing a specialized jump training program for 6 months, focusing on plyometrics and Olympic lifts, I gained 11 inches on my vertical and can now dunk with one hand in games. The key was consistency and proper recovery."'
            },
            {
              text: 'David Chen (5\'6"): "As one of the shortest players on my team, dunking seemed impossible. I focused on technique rather than just strength, particularly my approach and takeoff mechanics. After 8 months of targeted training, I achieved my first one-handed dunk. Now I can consistently dunk with either hand."'
            },
            {
              text: 'James Wilson (5\'9"): "I had average athleticism but was determined to dunk. I followed a comprehensive program that included heavy squats, depth jumps, and specific core work. The breakthrough came when I fixed my jumping technique - I was leaking energy in my approach. Now at 32 years old, I can still throw down dunks that surprise taller players."'
            },
            {
              title: 'Training Focus Areas for Shorter Dunkers',
              text: 'Shorter players need to focus on specific areas to maximize their dunking potential:'
            },
            {
              list: [
                'Relative strength: Power-to-weight ratio is crucial - focus on strength without adding unnecessary bulk',
                'Plyometric training: Emphasize reactive strength and rate of force development',
                'Approach mechanics: Perfect your approach steps and timing for maximum momentum transfer',
                'Core strength: A strong core allows for better force transfer from lower to upper body',
                'Grip strength: Especially important for players with smaller hands who struggle to palm the ball',
                'Flexibility: Particularly in the hips and ankles to optimize jumping mechanics',
                'Technique refinement: Learn to dunk with momentum rather than from a standstill'
              ]
            },
            {
              title: '12-Week Training Program for Shorter Dunkers',
              text: 'This specialized program addresses the unique needs of players under 6 feet:'
            },
            {
              title: 'Weeks 1-4: Foundation Phase',
              list: [
                'Strength (2x/week): Front squats, trap bar deadlifts, weighted lunges, calf raises',
                'Plyometrics (2x/week): Ankle bounces, squat jumps, broad jumps, depth jumps (low box)',
                'Technique (2x/week): Approach practice, one-step jumps, rim touches from different angles',
                'Core (3x/week): Hanging leg raises, planks, medicine ball throws, Russian twists',
                'Recovery: Foam rolling daily, full rest day every 3rd day'
              ]
            },
            {
              title: 'Weeks 5-8: Power Development Phase',
              list: [
                'Strength (2x/week): Heavy squats, power cleans, weighted step-ups, single-leg exercises',
                'Plyometrics (2x/week): Depth jumps (medium box), continuous hurdle jumps, lateral bounds, single-leg hops',
                'Technique (2x/week): Two-step approaches, dunking with tennis ball, rim hangs',
                'Core (3x/week): Weighted core exercises, rotational medicine ball throws, hanging windshield wipers',
                'Recovery: Contrast baths, active recovery sessions, mobility work'
              ]
            },
            {
              title: 'Weeks 9-12: Specialization Phase',
              list: [
                'Strength (1x/week): Maintenance strength work, focus on explosive movements',
                'Plyometrics (3x/week): Maximum intensity plyometrics, sport-specific jumping patterns',
                'Technique (3x/week): Full approach dunking practice, different takeoff patterns, ball control drills',
                'Game-Specific (2x/week): Practice dunking in game-like situations, off the dribble, with defenders',
                'Recovery: Increased focus on sleep quality, nutrition timing, and active recovery'
              ]
            },
            {
              title: 'Mental Approach for Shorter Dunkers',
              text: 'The psychological aspect is particularly important for shorter players:'
            },
            {
              list: [
                'Embrace the challenge: Use your height as motivation rather than a limitation',
                'Visualization: Regularly visualize successful dunks to build neural pathways',
                'Incremental goals: Celebrate small improvements rather than focusing only on the end goal',
                'Persistence: Understand that progress may be slower than for taller players',
                'Community: Connect with other shorter dunkers for motivation and technique sharing'
              ]
            },
            {
              title: 'Nutrition Considerations',
              text: 'Optimize your diet to support your dunking goals:'
            },
            {
              list: [
                'Power-to-weight ratio: Maintain lean body composition without unnecessary bulk',
                'Protein intake: 1.6-2.0g per kg of bodyweight to support muscle development',
                'Carbohydrate timing: Focus carbs around training sessions for energy and recovery',
                'Anti-inflammatory foods: Incorporate foods that reduce inflammation and support recovery',
                'Hydration: Maintain optimal hydration for muscle function and recovery',
                'Supplement considerations: Creatine monohydrate has strong evidence for improving power output'
              ]
            },
            {
              title: 'Common Mistakes to Avoid',
              text: 'Shorter players often make these errors when training to dunk:'
            },
            {
              list: [
                'Focusing only on strength while neglecting technique and approach',
                'Adding too much muscle mass, which can reduce relative power',
                'Insufficient recovery between high-intensity sessions',
                'Attempting to dunk before developing adequate jumping ability',
                'Improper landing mechanics leading to injuries',
                'Inconsistent training patterns with frequent program changes'
              ]
            },
            {
              title: 'Conclusion',
              text: 'Being under 6 feet tall presents challenges for dunking, but it\'s far from impossible. With the right training approach, consistent effort, and attention to technique, players of modest height can achieve their dunking goals. The stories of successful shorter dunkers prove that with determination and smart training, you can defy expectations and gravity. Remember that the journey to your first dunk may take months or even years, but the satisfaction of throwing down despite your height makes it all worthwhile.'
            }
          ]
        },
        {
          id: 'training-programs',
          title: 'Complete Basketball Dunking Training Programs',
          excerpt: 'Comprehensive training programs for all levels, from beginners touching the rim for the first time to advanced athletes mastering complex dunks.',
          image: require('../assets/placeholder.svg'),
          category: 'Training',
          date: '2023-09-25',
          readTime: 15,
          views: 7820,
          author: {
            name: 'Coach Michael Williams',
            bio: 'Strength and conditioning specialist with 20+ years of experience training basketball players from high school to professional levels.',
            image: require('../assets/placeholder.svg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'Dunking a basketball represents the pinnacle of athletic achievement for many players. Whether you\'re just starting your journey toward touching the rim or you\'re looking to add spectacular dunks to your repertoire, this comprehensive guide provides structured training programs for every level. Each program incorporates the latest sports science principles to maximize your vertical jump and dunking ability.'
            },
            {
              title: 'Assessing Your Starting Point',
              text: 'Before beginning any training program, it\'s essential to assess your current abilities:'
            },
            {
              list: [
                'Standing Vertical Jump: Measure your vertical jump from a standing position',
                'Running Vertical Jump: Measure your vertical jump with an approach',
                'Standing Reach: Measure how high you can reach while standing flat-footed',
                'Current Strength Levels: Test your squat, deadlift, and power clean maximums if applicable',
                'Mobility Assessment: Check ankle, hip, and shoulder mobility',
                'Current Dunking Ability: Note whether you can touch the rim, grab the rim, or already dunk'
              ]
            },
            {
              title: 'Beginner Program: Rim Toucher',
              text: 'This 12-week program is designed for players who are working toward consistently touching the rim.'
            },
            {
              title: 'Phase 1 (Weeks 1-4): Foundation Building',
              text: 'Focus on developing basic strength and proper movement patterns:'
            },
            {
              list: [
                'Monday: Lower Body Strength',
                '- Goblet Squats: 3 sets of 12 reps',
                '- Romanian Deadlifts: 3 sets of 10 reps',
                '- Walking Lunges: 3 sets of 10 reps per leg',
                '- Calf Raises: 4 sets of 15 reps',
                'Wednesday: Upper Body and Core',
                '- Push-ups: 3 sets of 10-15 reps',
                '- Inverted Rows: 3 sets of 10 reps',
                '- Planks: 3 sets of 30-45 seconds',
                '- Medicine Ball Slams: 3 sets of 10 reps',
                'Friday: Introductory Plyometrics',
                '- Ankle Bounces: 3 sets of 20 reps',
                '- Squat Jumps: 3 sets of 8 reps',
                '- Broad Jumps: 3 sets of 5 reps',
                '- Depth Drops (low box): 3 sets of 6 reps'
              ]
            },
            {
              title: 'Phase 2 (Weeks 5-8): Power Development',
              text: 'Increase intensity and introduce more explosive movements:'
            },
            {
              list: [
                'Monday: Lower Body Strength/Power',
                '- Front Squats: 4 sets of 8 reps',
                '- Trap Bar Deadlifts: 4 sets of 6 reps',
                '- Split Squats: 3 sets of 8 reps per leg',
                '- Single-Leg Calf Raises: 3 sets of 12 reps per leg',
                'Wednesday: Upper Body and Core Power',
                '- Explosive Push-ups: 3 sets of 8 reps',
                '- Pull-ups or Assisted Pull-ups: 3 sets of 8 reps',
                '- Medicine Ball Rotational Throws: 3 sets of 8 reps each side',
                '- Hanging Leg Raises: 3 sets of 10 reps',
                'Friday: Intermediate Plyometrics',
                '- Depth Jumps (12" box): 4 sets of 6 reps',
                '- Lateral Bounds: 3 sets of 6 reps each direction',
                '- Tuck Jumps: 3 sets of 8 reps',
                '- Rim Touches: 5 sets of 3 attempts (with approach)'
              ]
            },
            {
              title: 'Phase 3 (Weeks 9-12): Specific Adaptation',
              text: 'Focus on basketball-specific jumping and approach mechanics:'
            },
            {
              list: [
                'Monday: Lower Body Explosive Strength',
                '- Jump Squats (light weight): 4 sets of 6 reps',
                '- Speed Deadlifts: 4 sets of 5 reps',
                '- Weighted Step-ups: 3 sets of 8 reps per leg',
                '- Seated Calf Raises: 4 sets of 15 reps',
                'Wednesday: Basketball-Specific Power',
                '- Medicine Ball Vertical Throws: 4 sets of 6 reps',
                '- Single-Arm Medicine Ball Slams: 3 sets of 6 reps each arm',
                '- Explosive Pull-ups: 3 sets of 6 reps',
                '- Russian Twists: 3 sets of 20 reps',
                'Friday: Basketball Jump Training',
                '- Approach Jumps: 5 sets of 4 reps',
                '- Continuous Vertical Jumps: 3 sets of 5 reps',
                '- Single-Leg Approach Jumps: 3 sets of 3 reps each leg',
                '- Rim Touches with Basketball: 5 sets of 3 attempts'
              ]
            },
            {
              title: 'Intermediate Program: Rim Grabber to First Dunk',
              text: 'This 12-week program is for players who can consistently grab the rim and are working toward their first dunk.'
            },
            {
              title: 'Phase 1 (Weeks 1-4): Strength Foundation',
              text: 'Build the strength base needed for dunking:'
            },
            {
              list: [
                'Monday: Lower Body Strength',
                '- Back Squats: 4 sets of 6 reps',
                '- Deadlifts: 4 sets of 5 reps',
                '- Bulgarian Split Squats: 3 sets of 8 reps per leg',
                '- Standing Calf Raises (weighted): 4 sets of 12 reps',
                'Wednesday: Upper Body and Core',
                '- Weighted Dips: 3 sets of 8 reps',
                '- Weighted Pull-ups: 3 sets of 6-8 reps',
                '- Hanging Windshield Wipers: 3 sets of 8 reps',
                '- Medicine Ball Overhead Throws: 4 sets of 8 reps',
                'Friday: Foundational Plyometrics',
                '- Depth Jumps (18" box): 4 sets of 5 reps',
                '- Box Jumps: 4 sets of 6 reps',
                '- Broad Jump to Vertical Jump: 3 sets of 5 reps',
                '- Rim Hangs: 5 sets of 3 hangs (5 seconds each)'
              ]
            },
            {
              title: 'Phase 2 (Weeks 5-8): Power Emphasis',
              text: 'Focus on explosive power development:'
            },
            {
              list: [
                'Monday: Lower Body Power',
                '- Power Cleans: 5 sets of 3 reps',
                '- Jump Squats (moderate weight): 4 sets of 5 reps',
                '- Walking Lunge Jumps: 3 sets of 6 reps per leg',
                '- Depth Jumps to Box Jumps: 4 sets of 5 reps',
                'Wednesday: Upper Body Power and Core',
                '- Clapping Push-ups: 4 sets of 8 reps',
                '- Explosive Pull-ups: 4 sets of 6 reps',
                '- Medicine Ball Slams: 4 sets of 10 reps',
                '- Ab Rollouts: 3 sets of 10 reps',
                'Friday: Basketball-Specific Plyometrics',
                '- Approach Jumps with Reach: 5 sets of 4 jumps',
                '- Single-Leg Box Jumps: 3 sets of 5 reps each leg',
                '- Hurdle Hops: 3 sets of 6 hurdles',
                '- Tennis Ball Dunks: 5 sets of 3 attempts'
              ]
            },
            {
              title: 'Phase 3 (Weeks 9-12): Dunking Technique',
              text: 'Focus on the specific skills needed for your first dunk:'
            },
            {
              list: [
                'Monday: Maintenance Strength',
                '- Front Squats: 3 sets of 6 reps',
                '- Romanian Deadlifts: 3 sets of 8 reps',
                '- Weighted Step-ups: 3 sets of 8 reps per leg',
                '- Single-Leg Calf Raises: 3 sets of 15 reps per leg',
                'Wednesday: Explosive Power',
                '- Trap Bar Jumps: 4 sets of 5 reps',
                '- Depth Drops to Vertical Jumps: 4 sets of 5 reps',
                '- Medicine Ball Push Passes: 3 sets of 8 reps',
                '- Lateral Bound to Vertical Jump: 3 sets of 5 reps each side',
                'Friday: Dunking Practice',
                '- Approach Refinement: 5 sets of 3 approaches',
                '- Mini Basketball Dunks: 4 sets of 4 attempts',
                '- One-handed Dunk Attempts: 5 sets of 3 attempts',
                '- Two-handed Dunk Attempts: 5 sets of 3 attempts'
              ]
            },
            {
              title: 'Advanced Program: Dunk Mastery',
              text: 'This 12-week program is for athletes who can already dunk and want to master more advanced dunking techniques.'
            },
            {
              title: 'Phase 1 (Weeks 1-4): Strength and Power Foundation',
              text: 'Build elite strength and power levels:'
            },
            {
              list: [
                'Monday: Maximum Strength',
                '- Back Squats: 5 sets of 5 reps (heavy)',
                '- Deadlifts: 5 sets of 3 reps (heavy)',
                '- Walking Lunges with Barbell: 3 sets of 8 reps per leg',
                '- Weighted Calf Raises: 4 sets of 12 reps',
                'Wednesday: Olympic Lifting',
                '- Power Cleans: 5 sets of 3 reps',
                '- Push Press: 4 sets of 5 reps',
                '- Hang Snatches: 4 sets of 3 reps',
                '- Front Squats: 3 sets of 6 reps',
                'Friday: Advanced Plyometrics',
                '- Depth Jumps (24" box): 5 sets of 4 reps',
                '- Weighted Vertical Jumps: 4 sets of 5 reps',
                '- Multiple Response Jumps: 3 sets of 5 jumps',
                '- Single-Leg Depth Jumps: 3 sets of 4 reps each leg'
              ]
            },
            {
              title: 'Phase 2 (Weeks 5-8): Specialized Dunking Power',
              text: 'Focus on the specific power needed for advanced dunks:'
            },
            {
              list: [
                'Monday: Lower Body Explosive Power',
                '- Squat Jumps with Barbell: 5 sets of 4 reps',
                '- Clean Pulls: 4 sets of 4 reps',
                '- Weighted Box Jumps: 4 sets of 5 reps',
                '- Depth Jumps to Rim Touch: 4 sets of 4 reps',
                'Wednesday: Upper Body Power',
                '- Plyometric Push-ups (elevated): 4 sets of 6 reps',
                '- Weighted Pull-ups: 4 sets of 6 reps',
                '- Medicine Ball Chest Passes: 4 sets of 8 reps',
                '- Barbell Explosive Rows: 4 sets of 6 reps',
                'Friday: Dunking Technique Work',
                '- Approach Speed Drills: 4 sets of 4 approaches',
                '- Basic Dunk Variations: 3 sets of 3 attempts each variation',
                '- Tomahawk Dunk Practice: 4 sets of 3 attempts',
                '- Windmill Technique Drills: 4 sets of 3 attempts'
              ]
            },
            {
              title: 'Phase 3 (Weeks 9-12): Advanced Dunk Specialization',
              text: 'Master specific advanced dunking techniques:'
            },
            {
              list: [
                'Monday: Maintenance Strength/Power',
                '- Trap Bar Deadlifts: 4 sets of 4 reps',
                '- Quarter Squats with Jump: 4 sets of 5 reps',
                '- Single-Leg Power Exercises: 3 sets of 6 reps per leg',
                '- Reactive Depth Jumps: 4 sets of 4 reps',
                'Wednesday: Specialized Power',
                '- 360 Jump Practice (no ball): 4 sets of 4 attempts',
                '- Between-the-Legs Motion Practice: 4 sets of 4 attempts',
                '- Medicine Ball Windmill Simulation: 3 sets of 6 reps',
                '- Specific Core Work for Rotation: 3 exercises, 3 sets each',
                'Friday: Advanced Dunk Practice',
                '- 360 Dunk Attempts: 5 sets of 3 attempts',
                '- Windmill Dunk Refinement: 5 sets of 3 attempts',
                '- Between-the-Legs Dunk Practice: 5 sets of 3 attempts',
                '- Creative Dunk Development: 15 minutes of experimentation'
              ]
            },
            {
              title: 'Recovery and Nutrition',
              text: 'Proper recovery and nutrition are essential components of any effective dunking program:'
            },
            {
              list: [
                'Sleep: Aim for 8-9 hours of quality sleep per night',
                'Hydration: Drink at least 3-4 liters of water daily',
                'Protein Intake: Consume 1.6-2.2g of protein per kg of bodyweight',
                'Carbohydrates: Time carb intake around training sessions',
                'Anti-inflammatory Foods: Include foods like fatty fish, berries, and turmeric',
                'Recovery Techniques: Implement foam rolling, contrast baths, and massage',
                'Active Recovery: Light movement on rest days to promote blood flow'
              ]
            },
            {
              title: 'Program Modifications',
              text: 'These programs can be modified based on your specific needs:'
            },
            {
              list: [
                'For players with limited equipment: Substitute bodyweight exercises and find a park with pull-up bars',
                'For in-season athletes: Reduce volume by 30-40% and focus on maintenance',
                'For older athletes (30+): Add an extra recovery day and reduce plyometric volume',
                'For those with previous injuries: Work with a physical therapist to modify exercises',
                'For time-constrained individuals: Combine workout days into full-body sessions 3 times per week'
              ]
            },
            {
              title: 'Tracking Progress',
              text: 'Monitor your development throughout the program:'
            },
            {
              list: [
                'Weekly measurements of vertical jump height',
                'Video analysis of jumping technique and dunking attempts',
                'Strength progression on key exercises',
                'Recovery quality and subjective energy levels',
                'Success rate on dunking attempts'
              ]
            },
            {
              title: 'Conclusion',
              text: 'Developing your dunking ability is a journey that requires consistent, focused effort. These programs provide a structured approach based on sports science principles to help you achieve your dunking goals, whether you\'re just starting out or looking to master advanced techniques. Remember that progress takes time—trust the process, follow the program diligently, and you\'ll see improvements in your vertical jump and dunking ability. The satisfaction of throwing down your first dunk or mastering an impressive dunk variation makes all the hard work worthwhile.'
            }
          ]
        }
      ]
    }
  },
  computed: {
    relatedArticles() {
      if (!this.article) return []

      // Find articles in the same category, excluding the current article
      return this.articles
        .filter(a => a.id !== this.article.id && a.category === this.article.category)
        .slice(0, 3) // Limit to 3 related articles
    },
    prevArticle() {
      if (!this.article) return null

      const currentIndex = this.articles.findIndex(a => a.id === this.article.id)
      return currentIndex > 0 ? this.articles[currentIndex - 1] : null
    },
    nextArticle() {
      if (!this.article) return null

      const currentIndex = this.articles.findIndex(a => a.id === this.article.id)
      return currentIndex < this.articles.length - 1 ? this.articles[currentIndex + 1] : null
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href)
      const title = encodeURIComponent(this.article.title)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, '_blank')
    },
    shareOnTwitter() {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(`${this.article.title} | Dunk Calculator`)
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    },
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href)
      const title = encodeURIComponent(this.article.title)
      const summary = encodeURIComponent(this.article.excerpt)
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank')
    },
    shareByEmail() {
      const subject = encodeURIComponent(`Check out this article: ${this.article.title}`)
      const body = encodeURIComponent(`I thought you might be interested in this article:\n\n${this.article.title}\n\n${window.location.href}`)
      window.location.href = `mailto:?subject=${subject}&body=${body}`
    }
  },
  created() {
    // Get article ID from route params
    const articleId = this.$route.params.id

    // Find the article in our data
    const article = this.articles.find(a => a.id === articleId)

    if (article) {
      this.article = article
      this.loading = false

      // Update page title
      document.title = `${article.title} | Dunk Calculator`
    } else {
      this.error = 'The article you are looking for could not be found.'
      this.loading = false
    }
  }
}
</script>

<style scoped>
.article-detail-page {
  padding: 60px 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 100px 0;
}

.error-container h2 {
  color: var(--error-color);
  margin-bottom: 20px;
}

.error-container p {
  margin-bottom: 30px;
  color: #666;
}

.article-content {
  max-width: 800px;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 30px;
}

.article-category {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.article-title {
  font-size: 2.5rem;
  line-height: 1.3;
  margin-bottom: 20px;
  color: var(--text-color);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  color: #666;
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-icon {
  margin-right: 5px;
}

.article-featured-image {
  margin-bottom: 30px;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.article-featured-image img {
  width: 100%;
  height: auto;
  display: block;
}

.article-body {
  margin-bottom: 40px;
}

.article-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--secondary-color);
}

.section-text {
  margin-bottom: 20px;
  line-height: 1.8;
  color: #333;
}

.section-list {
  margin-bottom: 20px;
  padding-left: 20px;
}

.section-list li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.section-image {
  margin: 30px 0;
}

.section-image img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
}

.image-caption, .video-caption {
  text-align: center;
  font-style: italic;
  color: #666;
  margin-top: 10px;
  font-size: 0.9rem;
}

.section-quote {
  margin: 30px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 5px solid var(--primary-color);
}

.section-quote blockquote {
  margin: 0;
}

.section-quote p {
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 10px;
}

.section-quote cite {
  font-style: normal;
  color: #666;
}

.section-video {
  margin: 30px 0;
}

.section-video iframe {
  width: 100%;
  height: 450px;
  border-radius: var(--border-radius);
}

.article-author {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: var(--border-radius);
  margin-bottom: 40px;
}

.author-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info h3 {
  margin-bottom: 10px;
  color: var(--secondary-color);
}

.author-info p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
}

.article-share {
  margin-bottom: 40px;
}

.article-share h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: var(--text-color);
}

.share-buttons {
  display: flex;
  gap: 15px;
}

.share-button {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 5px;
  color: white;
  font-size: 0.9rem;
  transition: opacity 0.3s;
}

.share-button:hover {
  opacity: 0.9;
}

.facebook {
  background-color: #3b5998;
}

.twitter {
  background-color: #1da1f2;
}

.linkedin {
  background-color: #0077b5;
}

.email {
  background-color: #666;
}

.related-articles {
  margin-bottom: 40px;
}

.related-articles h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: var(--text-color);
}

.related-articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.related-article {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
}

.related-article:hover {
  transform: translateY(-5px);
}

.related-article-image {
  height: 150px;
  overflow: hidden;
}

.related-article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.related-article:hover .related-article-image img {
  transform: scale(1.1);
}

.related-article-content {
  padding: 15px;
}

.related-article-content h4 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: var(--text-color);
  transition: color 0.3s;
}

.related-article:hover h4 {
  color: var(--primary-color);
}

.related-article-content p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  font-size: 0.9rem;
  color: var(--secondary-color);
  font-weight: 500;
}

.article-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  border-top: 1px solid #eee;
  padding-top: 30px;
}

.nav-link {
  flex: 1;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
}

.nav-link:hover {
  background-color: #f0f0f0;
}

.nav-link.prev {
  margin-right: 10px;
}

.nav-link.next {
  margin-left: 10px;
  text-align: right;
}

.nav-direction {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 5px;
}

.nav-title {
  font-weight: 500;
  color: var(--secondary-color);
}

.nav-link.disabled {
  opacity: 0;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 2rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 10px;
  }

  .section-video iframe {
    height: 250px;
  }

  .article-author {
    flex-direction: column;
    text-align: center;
  }

  .author-image {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .share-buttons {
    flex-wrap: wrap;
  }

  .article-navigation {
    flex-direction: column;
    gap: 15px;
  }

  .nav-link.prev, .nav-link.next {
    margin: 0;
  }

  .nav-link.next {
    text-align: left;
  }
}
</style>

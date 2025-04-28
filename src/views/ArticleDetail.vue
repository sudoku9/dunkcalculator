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
          image: require('../assets/article1.jpg'),
          category: 'Science',
          date: '2023-06-15',
          readTime: 8,
          views: 3542,
          author: {
            name: 'Dr. Michael Johnson',
            bio: 'Sports Biomechanics Researcher and former NCAA Division I basketball player with a PhD in Exercise Physiology.',
            image: require('../assets/author1.jpg')
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
                src: require('../assets/jump-phases.jpg'),
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
                text: "The vertical jump is not just about leg strength - it is about how efficiently you can coordinate all the muscles in your body to work together in a split second.",
                author: "Dr. Peter Vint, Sports Biomechanist"
              }
            },
            {
              title: 'The Stretch-Shortening Cycle',
              text: 'One of the most important concepts in vertical jump performance is the stretch-shortening cycle (SSC). This is a natural mechanism where a muscle that is stretched immediately before contraction will contract more forcefully than a muscle that begins contracting from a resting state.'
            },
            {
              text: 'This is why the countermovement (the quick dip before jumping) is so important - it stretches the leg muscles, storing elastic energy that can be released during the upward phase of the jump, increasing the force production by 20-30%.'
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
              text: "The vertical jump is a fascinating display of human athletic ability that combines physics, biomechanics, and physiology. By understanding the scientific principles behind jumping, basketball players can train more effectively and maximize their vertical leap potential. Whether you are trying to touch the rim for the first time or aiming to throw down spectacular dunks, the science of vertical jumping provides the blueprint for improvement."
            }
          ]
        },
        {
          id: 'nba-dunkers',
          title: 'NBA Dunkers Analysis: Physical Attributes of Elite Dunkers',
          excerpt: 'A data-driven analysis of the physical attributes and vertical jump metrics of the NBA\'s most impressive dunkers.',
          image: require('../assets/article2.jpg'),
          category: 'Analysis',
          date: '2023-07-22',
          readTime: 10,
          views: 2876,
          author: {
            name: 'James Wilson',
            bio: 'Basketball analyst and former college player with expertise in sports statistics and performance metrics.',
            image: require('../assets/author2.jpg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'The NBA has seen some incredible dunkers throughout its history, from the high-flying acrobatics of Vince Carter to the power slams of Shaquille O\'Neal. But what physical attributes contribute to elite dunking ability? This article analyzes data from some of the NBA\'s most impressive dunkers to identify patterns and insights.'
            }
            // Additional content sections would be added here
          ]
        },
        {
          id: 'plyometric-training',
          title: 'Plyometric Training Guide for Basketball Players',
          excerpt: 'Comprehensive guide to plyometric exercises that can significantly improve your vertical jump and dunking ability.',
          image: require('../assets/article3.jpg'),
          category: 'Training',
          date: '2023-08-05',
          readTime: 12,
          views: 4210,
          author: {
            name: 'Coach Sarah Thompson',
            bio: 'Certified strength and conditioning specialist with 15 years of experience training basketball players at all levels.',
            image: require('../assets/author3.jpg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'Plyometric training is one of the most effective methods for improving vertical jump height and explosive power for basketball players. This guide covers the science behind plyometrics and provides a comprehensive program to enhance your dunking ability.'
            }
            // Additional content sections would be added here
          ]
        },
        {
          id: 'dunking-techniques',
          title: 'Mastering Different Dunking Techniques',
          excerpt: 'Learn the mechanics and techniques behind various types of dunks, from basic one-handed dunks to advanced windmills and 360s.',
          image: require('../assets/article4.jpg'),
          category: 'Techniques',
          date: '2023-09-10',
          readTime: 9,
          views: 3125,
          author: {
            name: 'Marcus Johnson',
            bio: 'Former professional basketball player and dunk contest champion with expertise in advanced dunking techniques.',
            image: require('../assets/author4.jpg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'Dunking a basketball is an art form that combines athleticism, creativity, and technical skill. This article breaks down the mechanics of different dunking techniques and provides step-by-step guidance for mastering each style.'
            }
            // Additional content sections would be added here
          ]
        },
        {
          id: 'vertical-jump-nutrition',
          title: 'Nutrition for Vertical Jump: Fueling for Explosive Power',
          excerpt: 'How to optimize your diet to support muscle growth, energy production, and recovery for maximum vertical jump gains.',
          image: require('../assets/article5.jpg'),
          category: 'Nutrition',
          date: '2023-10-18',
          readTime: 7,
          views: 1985,
          author: {
            name: 'Dr. Lisa Chen',
            bio: 'Sports nutritionist with a PhD in Exercise Physiology and specialization in performance nutrition for basketball players.',
            image: require('../assets/author5.jpg')
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
          image: require('../assets/article6.jpg'),
          category: 'Inspiration',
          date: '2023-11-05',
          readTime: 8,
          views: 5340,
          author: {
            name: 'Tony Rodriguez',
            bio: '5\'10" professional basketball trainer who specializes in helping shorter players develop their vertical jump and dunking ability.',
            image: require('../assets/author6.jpg')
          },
          content: [
            {
              title: 'Introduction',
              text: 'While height certainly provides an advantage for dunking, many players under 6 feet have defied expectations and become impressive dunkers. This article shares inspiring stories and practical training advice for shorter players looking to throw it down.'
            }
            // Additional content sections would be added here
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
<template>
  <div class="articles-page">
    <div class="container">
      <div class="page-header">
        <h1>Basketball Dunking Articles</h1>
        <p>Learn about vertical jump science, training techniques, and dunking strategies</p>
      </div>
      
      <div class="articles-grid">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <div class="article-image">
            <img :src="article.image" :alt="article.title" />
            <div class="article-category">{{ article.category }}</div>
          </div>
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-meta">
              <span>{{ formatDate(article.date) }}</span>
              <span>{{ article.readTime }} min read</span>
            </div>
            <router-link :to="'/new-articles/' + article.id" class="read-more-btn">Read More</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { articles } from '../data/articles.js'

export default {
  name: 'NewArticles',
  data() {
    return {
      articles: articles
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style scoped>
.articles-page {
  padding: 60px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.page-header p {
  color: #666;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.article-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
}

.article-card:hover {
  transform: translateY(-10px);
}

.article-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.article-card:hover .article-image img {
  transform: scale(1.1);
}

.article-category {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--primary-color);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.article-content {
  padding: 20px;
}

.article-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--text-color);
  transition: color 0.3s;
}

.article-card:hover .article-title {
  color: var(--primary-color);
}

.article-excerpt {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.8rem;
  color: #888;
}

.read-more-btn {
  display: inline-block;
  padding: 8px 15px;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: background-color 0.3s;
  text-decoration: none;
}

.read-more-btn:hover {
  background-color: var(--primary-color);
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
}
</style>

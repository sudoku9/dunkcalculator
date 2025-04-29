<template>
  <div class="article-detail-page">
    <div class="container">
      <div v-if="article" class="article-content">
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

        <div class="article-body" v-html="article.content">
        </div>

        <div class="article-navigation">
          <router-link to="/new-articles" class="back-btn">
            <span class="back-icon">←</span> Back to Articles
          </router-link>
        </div>
      </div>

      <div v-else class="not-found">
        <h2>Article Not Found</h2>
        <p>Sorry, the article you're looking for doesn't exist or has been moved.</p>
        <router-link to="/new-articles" class="back-btn">Back to Articles</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { articles } from '../data/articles.js'

export default {
  name: 'NewArticleDetail',
  data() {
    return {
      articles: articles
    }
  },
  computed: {
    article() {
      const articleId = this.$route.params.id
      return this.articles.find(article => article.id === articleId)
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
.article-detail-page {
  padding: 60px 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.article-content {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

.article-header {
  padding: 30px;
  text-align: center;
}

.article-category {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 15px;
}

.article-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
  line-height: 1.3;
}

.article-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  color: #777;
  font-size: 0.9rem;
}

.meta-icon {
  margin-right: 5px;
}

.article-featured-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.article-featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-body {
  padding: 40px;
  line-height: 1.7;
  color: #333;
}

.article-body h2 {
  color: var(--primary-color);
  margin: 30px 0 15px;
  font-size: 1.8rem;
}

.article-body h3 {
  color: var(--secondary-color);
  margin: 25px 0 15px;
  font-size: 1.4rem;
}

.article-body p {
  margin-bottom: 20px;
}

.article-body ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

.article-body li {
  margin-bottom: 10px;
}

.article-body blockquote {
  border-left: 4px solid var(--primary-color);
  padding: 15px 20px;
  margin: 20px 0;
  background-color: #f9f9f9;
  font-style: italic;
}

.article-body blockquote cite {
  display: block;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
}

.article-navigation {
  padding: 30px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 20px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: var(--secondary-color);
}

.back-icon {
  margin-right: 5px;
}

.not-found {
  text-align: center;
  padding: 100px 0;
}

.not-found h2 {
  color: var(--primary-color);
  margin-bottom: 15px;
  font-size: 2rem;
}

.not-found p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.8rem;
  }
  
  .article-featured-image {
    height: 250px;
  }
  
  .article-body {
    padding: 20px;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
}
</style>

<template>
  <div class="articles-page">
    <div class="container">
      <div class="page-header">
        <h1>Basketball Dunking Articles</h1>
        <p>Scientific insights and expert advice on vertical jumping and dunking</p>
      </div>
      
      <div class="articles-filter">
        <div class="filter-options">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['filter-btn', { active: activeCategory === category.id }]"
            @click="filterByCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search articles..." 
            @input="filterArticles"
          >
          <button class="search-btn">
            <span class="search-icon">🔍</span>
          </button>
        </div>
      </div>
      
      <div class="articles-grid">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id" 
          class="article-card"
        >
          <div class="article-image">
            <img :src="article.image" :alt="article.title">
            <div class="article-category">{{ getCategoryName(article.category) }}</div>
          </div>
          <div class="article-content">
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-meta">
              <span class="article-date">{{ formatDate(article.date) }}</span>
              <span class="article-read-time">{{ article.readTime }} min read</span>
            </div>
            <router-link :to="'/articles/' + article.id" class="read-more-btn">
              Read More
            </router-link>
          </div>
        </div>
      </div>
      
      <div v-if="filteredArticles.length === 0" class="no-results">
        <p>No articles found matching your search criteria.</p>
        <button class="btn btn-secondary" @click="resetFilters">Reset Filters</button>
      </div>
      
      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </button>
        
        <div class="pagination-numbers">
          <button 
            v-for="page in paginationNumbers" 
            :key="page"
            :class="['page-number', { active: currentPage === page }]"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          class="pagination-btn" 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticlesPage',
  data() {
    return {
      articles: [
        {
          id: 'vertical-jump-science',
          title: 'The Science of Vertical Jump: Biomechanics and Physics',
          excerpt: 'Explore the scientific principles behind an explosive vertical jump, including muscle activation, force production, and energy transfer.',
          image: require('../assets/article1.jpg'),
          category: 'science',
          date: '2023-06-15',
          readTime: 8
        },
        {
          id: 'nba-dunkers',
          title: 'NBA Dunkers Analysis: Physical Attributes of Elite Dunkers',
          excerpt: 'A data-driven analysis of the physical attributes and vertical jump metrics of the NBA\'s most impressive dunkers.',
          image: require('../assets/article2.jpg'),
          category: 'analysis',
          date: '2023-07-22',
          readTime: 10
        },
        {
          id: 'plyometric-training',
          title: 'Plyometric Training Guide for Basketball Players',
          excerpt: 'Comprehensive guide to plyometric exercises that can significantly improve your vertical jump and dunking ability.',
          image: require('../assets/article3.jpg'),
          category: 'training',
          date: '2023-08-05',
          readTime: 12
        },
        {
          id: 'dunking-techniques',
          title: 'Mastering Different Dunking Techniques',
          excerpt: 'Learn the mechanics and techniques behind various types of dunks, from basic one-handed dunks to advanced windmills and 360s.',
          image: require('../assets/article4.jpg'),
          category: 'techniques',
          date: '2023-09-10',
          readTime: 9
        },
        {
          id: 'vertical-jump-nutrition',
          title: 'Nutrition for Vertical Jump: Fueling for Explosive Power',
          excerpt: 'How to optimize your diet to support muscle growth, energy production, and recovery for maximum vertical jump gains.',
          image: require('../assets/article5.jpg'),
          category: 'nutrition',
          date: '2023-10-18',
          readTime: 7
        },
        {
          id: 'short-dunkers',
          title: 'Short Dunkers: How Players Under 6 Feet Can Dunk',
          excerpt: 'Success stories and training strategies from basketball players under 6 feet who have achieved impressive dunking abilities.',
          image: require('../assets/article6.jpg'),
          category: 'inspiration',
          date: '2023-11-05',
          readTime: 8
        }
      ],
      categories: [
        { id: 'all', name: 'All Articles' },
        { id: 'science', name: 'Science' },
        { id: 'training', name: 'Training' },
        { id: 'techniques', name: 'Techniques' },
        { id: 'analysis', name: 'Analysis' },
        { id: 'nutrition', name: 'Nutrition' },
        { id: 'inspiration', name: 'Inspiration' }
      ],
      activeCategory: 'all',
      searchQuery: '',
      currentPage: 1,
      articlesPerPage: 4
    }
  },
  computed: {
    filteredArticles() {
      let filtered = [...this.articles]
      
      // Filter by category
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter(article => article.category === this.activeCategory)
      }
      
      // Filter by search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(article => 
          article.title.toLowerCase().includes(query) || 
          article.excerpt.toLowerCase().includes(query)
        )
      }
      
      // Apply pagination
      const startIndex = (this.currentPage - 1) * this.articlesPerPage
      const endIndex = startIndex + this.articlesPerPage
      
      return filtered.slice(startIndex, endIndex)
    },
    totalFilteredArticles() {
      let filtered = [...this.articles]
      
      // Filter by category
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter(article => article.category === this.activeCategory)
      }
      
      // Filter by search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(article => 
          article.title.toLowerCase().includes(query) || 
          article.excerpt.toLowerCase().includes(query)
        )
      }
      
      return filtered.length
    },
    totalPages() {
      return Math.ceil(this.totalFilteredArticles / this.articlesPerPage)
    },
    paginationNumbers() {
      const pages = []
      const maxVisiblePages = 5
      
      if (this.totalPages <= maxVisiblePages) {
        // Show all pages if total pages is less than max visible
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Always show first page
        pages.push(1)
        
        // Calculate start and end of visible pages
        let start = Math.max(2, this.currentPage - 1)
        let end = Math.min(this.totalPages - 1, this.currentPage + 1)
        
        // Adjust if at the beginning or end
        if (this.currentPage <= 2) {
          end = 4
        } else if (this.currentPage >= this.totalPages - 1) {
          start = this.totalPages - 3
        }
        
        // Add ellipsis if needed
        if (start > 2) {
          pages.push('...')
        }
        
        // Add middle pages
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
        
        // Add ellipsis if needed
        if (end < this.totalPages - 1) {
          pages.push('...')
        }
        
        // Always show last page
        pages.push(this.totalPages)
      }
      
      return pages
    }
  },
  methods: {
    filterByCategory(categoryId) {
      this.activeCategory = categoryId
      this.currentPage = 1
      this.filterArticles()
    },
    filterArticles() {
      this.currentPage = 1
    },
    resetFilters() {
      this.activeCategory = 'all'
      this.searchQuery = ''
      this.currentPage = 1
    },
    changePage(page) {
      if (typeof page === 'number') {
        this.currentPage = page
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId)
      return category ? category.name : ''
    },
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

.articles-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  padding: 8px 15px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.filter-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.search-box {
  display: flex;
  align-items: center;
  position: relative;
}

.search-box input {
  padding: 10px 15px;
  padding-right: 40px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.9rem;
  width: 250px;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: var(--secondary-color);
  width: 300px;
}

.search-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
}

.read-more-btn:hover {
  background-color: var(--primary-color);
}

.no-results {
  text-align: center;
  padding: 40px 0;
}

.no-results p {
  margin-bottom: 20px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.pagination-btn {
  padding: 8px 15px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  margin: 0 10px;
}

.page-number {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 50%;
  margin: 0 5px;
  transition: all 0.3s;
}

.page-number.active {
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  .articles-filter {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-box {
    width: 100%;
  }
  
  .search-box input {
    width: 100%;
  }
  
  .search-box input:focus {
    width: 100%;
  }
}
</style>

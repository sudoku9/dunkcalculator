<template>
  <div class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Dunk Calculator</h3>
          <p>The most advanced basketball dunk calculator with personalized training recommendations and scientific analysis.</p>
          <div class="social-links">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/calculator">Calculator</router-link></li>
            <li><router-link to="/training">Training Guide</router-link></li>
            <li><router-link to="/articles">Articles</router-link></li>
            <li><router-link to="/about">About</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Resources</h3>
          <ul class="footer-links">
            <li><router-link to="/articles/vertical-jump-science">Vertical Jump Science</router-link></li>
            <li><router-link to="/articles/dunking-techniques">Dunking Techniques</router-link></li>
            <li><router-link to="/articles/training-programs">Training Programs</router-link></li>
            <li><router-link to="/articles/nba-dunkers">NBA Dunkers Analysis</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
          <a href="mailto:contact@dunkcalculator.com" class="contact-link">contact@dunkcalculator.com</a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Dunk Calculator. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--dark-bg);
  color: white;
  padding: 60px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 40px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 30px;
  padding-right: 20px;
}

.footer-section h3 {
  color: var(--primary-color);
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-section p {
  margin-bottom: 20px;
  color: #bbb;
  font-size: 0.9rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  transition: all 0.3s;
}

.social-links a:hover {
  background-color: var(--primary-color);
  transform: translateY(-3px);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #bbb;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.contact-link {
  color: var(--secondary-color);
  font-weight: 500;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.9rem;
}

.footer-bottom p {
  color: #999;
}

.footer-bottom-links {
  display: flex;
  gap: 20px;
}

.footer-bottom-links a {
  color: #999;
  transition: color 0.3s;
}

.footer-bottom-links a:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  
  .footer-section {
    width: 100%;
    padding-right: 0;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
}
</style>

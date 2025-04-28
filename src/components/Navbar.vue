<template>
  <nav class="navbar">
    <div class="container navbar-container">
      <router-link to="/" class="navbar-logo">
        <img src="../assets/logo.svg" alt="Dunk Calculator Logo" class="logo-img" />
        <span class="logo-text">Dunk Calculator</span>
      </router-link>
      
      <div class="navbar-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <ul class="navbar-menu" :class="{ 'active': menuActive }">
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/calculator" @click="closeMenu">Calculator</router-link></li>
        <li><router-link to="/training" @click="closeMenu">Training Guide</router-link></li>
        <li><router-link to="/articles" @click="closeMenu">Articles</router-link></li>
        <li><router-link to="/about" @click="closeMenu">About</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuActive: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive
    },
    closeMenu() {
      this.menuActive = false
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.navbar-logo {
  display: flex;
  align-items: center;
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.5rem;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.navbar-menu {
  display: flex;
  list-style: none;
}

.navbar-menu li {
  margin-left: 30px;
}

.navbar-menu a {
  color: var(--text-color);
  font-weight: 500;
  position: relative;
  padding-bottom: 5px;
}

.navbar-menu a:hover,
.navbar-menu a.router-link-active {
  color: var(--primary-color);
}

.navbar-menu a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.navbar-toggle span {
  width: 25px;
  height: 3px;
  background-color: var(--text-color);
  margin-bottom: 5px;
  border-radius: 3px;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }
  
  .navbar-menu {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transform: translateY(-150%);
    opacity: 0;
    transition: all 0.3s;
    z-index: 999;
  }
  
  .navbar-menu.active {
    transform: translateY(0);
    opacity: 1;
  }
  
  .navbar-menu li {
    margin: 15px 0;
  }
}
</style>

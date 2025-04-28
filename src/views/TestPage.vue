<template>
  <div class="test-page">
    <h1>Test Page</h1>
    <p>This is a test page to check if routing is working correctly.</p>
    <div class="links">
      <router-link to="/" class="test-link">Home</router-link>
      <router-link to="/articles" class="test-link">Articles</router-link>
      <router-link to="/calculator" class="test-link">Calculator</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestPage'
}
</script>

<style scoped>
.test-page {
  padding: 60px 0;
  text-align: center;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

.links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.test-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.test-link:hover {
  background-color: var(--secondary-color);
}
</style>

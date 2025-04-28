<template>
  <div class="model-container">
    <h3 class="model-title">3D Dunk Simulation</h3>
    
    <div class="model-controls">
      <button 
        v-for="view in viewOptions" 
        :key="view.id"
        :class="['view-btn', { active: activeView === view.id }]"
        @click="setActiveView(view.id)"
      >
        {{ view.label }}
      </button>
    </div>
    
    <div class="model-viewport">
      <canvas ref="modelCanvas"></canvas>
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <p>Loading 3D model...</p>
      </div>
    </div>
    
    <div class="model-instructions">
      <p>Click and drag to rotate the view. Scroll to zoom in/out.</p>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default {
  name: 'DunkModel3D',
  props: {
    playerData: {
      type: Object,
      required: true
    },
    results: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      activeView: 'side',
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      animationFrame: null,
      playerModel: null,
      basketballModel: null,
      basketballHoopModel: null
    }
  },
  computed: {
    viewOptions() {
      return [
        { id: 'side', label: 'Side View' },
        { id: 'front', label: 'Front View' },
        { id: 'top', label: 'Top View' },
        { id: 'player', label: 'Player View' }
      ];
    }
  },
  methods: {
    initScene() {
      // Create scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf5f5f5);
      
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 10, 10);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);
      
      // Create camera
      const canvas = this.$refs.modelCanvas;
      const aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
      this.setActiveView(this.activeView);
      
      // Create renderer
      this.renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true
      });
      this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMap.enabled = true;
      
      // Add controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      
      // Create court floor
      const floorGeometry = new THREE.PlaneGeometry(20, 20);
      const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xd9c8a9,
        side: THREE.DoubleSide
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0;
      floor.receiveShadow = true;
      this.scene.add(floor);
      
      // Add court markings
      const courtTexture = new THREE.TextureLoader().load('/court-texture.jpg');
      const courtGeometry = new THREE.PlaneGeometry(15, 14);
      const courtMaterial = new THREE.MeshStandardMaterial({ 
        map: courtTexture,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const court = new THREE.Mesh(courtGeometry, courtMaterial);
      court.rotation.x = -Math.PI / 2;
      court.position.y = 0.01;
      this.scene.add(court);
      
      // Create basketball hoop
      this.createBasketballHoop();
      
      // Create player model
      this.createPlayerModel();
      
      // Create basketball
      this.createBasketball();
      
      // Start animation loop
      this.animate();
      
      // Handle window resize
      window.addEventListener('resize', this.onWindowResize);
      
      // Set loading to false
      this.loading = false;
    },
    
    createBasketballHoop() {
      // Create basketball hoop group
      this.basketballHoopModel = new THREE.Group();
      
      // Create backboard
      const backboardGeometry = new THREE.BoxGeometry(1.8, 1.05, 0.05);
      const backboardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const backboard = new THREE.Mesh(backboardGeometry, backboardMaterial);
      backboard.position.set(0, 3.05, -5.25);
      backboard.castShadow = true;
      this.basketballHoopModel.add(backboard);
      
      // Create rim
      const rimGeometry = new THREE.TorusGeometry(0.225, 0.02, 16, 100);
      const rimMaterial = new THREE.MeshStandardMaterial({ color: 0xff5722 });
      const rim = new THREE.Mesh(rimGeometry, rimMaterial);
      rim.position.set(0, 3.05 - 0.15, -5.25 + 0.125);
      rim.rotation.x = Math.PI / 2;
      rim.castShadow = true;
      this.basketballHoopModel.add(rim);
      
      // Create pole
      const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3.05, 32);
      const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x424242 });
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.set(0, 3.05 / 2, -5.25 - 0.5);
      pole.castShadow = true;
      this.basketballHoopModel.add(pole);
      
      // Add to scene
      this.scene.add(this.basketballHoopModel);
    },
    
    createPlayerModel() {
      // Create player group
      this.playerModel = new THREE.Group();
      
      // Calculate player height in Three.js units (1 unit = 1 meter)
      const playerHeightMeters = this.playerData.height / 100;
      
      // Create player body (simplified representation)
      const bodyGeometry = new THREE.CapsuleGeometry(0.3, playerHeightMeters - 0.6, 4, 8);
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2196f3 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = playerHeightMeters / 2;
      body.castShadow = true;
      this.playerModel.add(body);
      
      // Create head
      const headGeometry = new THREE.SphereGeometry(0.15, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffccbc });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = playerHeightMeters - 0.15;
      head.castShadow = true;
      this.playerModel.add(head);
      
      // Create arms
      const armLength = this.playerData.armLength / 100;
      const armGeometry = new THREE.CapsuleGeometry(0.05, armLength, 4, 8);
      const armMaterial = new THREE.MeshStandardMaterial({ color: 0xffccbc });
      
      // Right arm (extended for dunking)
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(0.35, playerHeightMeters - 0.3, 0);
      rightArm.rotation.z = -Math.PI / 4;
      rightArm.castShadow = true;
      this.playerModel.add(rightArm);
      
      // Left arm
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-0.35, playerHeightMeters - 0.3, 0);
      leftArm.rotation.z = Math.PI / 4;
      leftArm.castShadow = true;
      this.playerModel.add(leftArm);
      
      // Create legs
      const legLength = playerHeightMeters / 2;
      const legGeometry = new THREE.CapsuleGeometry(0.1, legLength, 4, 8);
      const legMaterial = new THREE.MeshStandardMaterial({ color: 0x424242 });
      
      // Right leg (bent for jumping)
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(0.15, legLength / 2, 0);
      rightLeg.castShadow = true;
      this.playerModel.add(rightLeg);
      
      // Left leg
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(-0.15, legLength / 2, 0);
      leftLeg.castShadow = true;
      this.playerModel.add(leftLeg);
      
      // Position player for dunking
      this.playerModel.position.set(0, 0, -4);
      
      // Add to scene
      this.scene.add(this.playerModel);
      
      // Animate player jumping
      this.animatePlayerJump();
    },
    
    createBasketball() {
      const geometry = new THREE.SphereGeometry(0.12, 32, 32);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0xff5722,
        roughness: 0.8
      });
      
      this.basketballModel = new THREE.Mesh(geometry, material);
      this.basketballModel.castShadow = true;
      
      // Add texture with lines
      const ballTexture = new THREE.TextureLoader().load('/basketball-texture.jpg');
      material.map = ballTexture;
      material.needsUpdate = true;
      
      // Position ball in player's hand initially
      const playerHeightMeters = this.playerData.height / 100;
      this.basketballModel.position.set(0.4, playerHeightMeters, -4);
      
      // Add to scene
      this.scene.add(this.basketballModel);
    },
    
    animatePlayerJump() {
      // Calculate jump height in Three.js units
      const jumpHeightMeters = this.results.currentVerticalJump / 100;
      
      // Create animation timeline
      const jumpDuration = 1.5; // seconds
      const startTime = Date.now();
      
      const animateJump = () => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const jumpProgress = (elapsedTime % jumpDuration) / jumpDuration;
        
        // Sinusoidal jump motion
        const jumpHeight = Math.sin(jumpProgress * Math.PI) * jumpHeightMeters;
        
        // Update player position
        this.playerModel.position.y = jumpHeight;
        
        // Update basketball position (follows player's hand)
        const playerHeightMeters = this.playerData.height / 100;
        this.basketballModel.position.y = playerHeightMeters + jumpHeight;
        
        // Move player forward during jump
        const forwardDistance = Math.sin(jumpProgress * Math.PI) * 1.5;
        this.playerModel.position.z = -4 + forwardDistance;
        this.basketballModel.position.z = -4 + forwardDistance;
        
        // Rotate basketball
        this.basketballModel.rotation.x += 0.01;
        this.basketballModel.rotation.z += 0.01;
        
        // Request next frame
        requestAnimationFrame(animateJump);
      };
      
      // Start animation
      animateJump();
    },
    
    animate() {
      this.animationFrame = requestAnimationFrame(this.animate);
      
      // Update controls
      if (this.controls) {
        this.controls.update();
      }
      
      // Render scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    },
    
    setActiveView(viewId) {
      this.activeView = viewId;
      
      if (!this.camera) return;
      
      switch (viewId) {
        case 'side':
          this.camera.position.set(10, 3, 0);
          this.camera.lookAt(0, 3, -4);
          break;
        case 'front':
          this.camera.position.set(0, 3, 5);
          this.camera.lookAt(0, 3, -5);
          break;
        case 'top':
          this.camera.position.set(0, 10, -4);
          this.camera.lookAt(0, 0, -4);
          break;
        case 'player':
          this.camera.position.set(0, this.playerData.height / 100 + 0.2, -3);
          this.camera.lookAt(0, 3.05 - 0.15, -5.25);
          break;
      }
      
      if (this.controls) {
        this.controls.update();
      }
    },
    
    onWindowResize() {
      if (!this.camera || !this.renderer || !this.$refs.modelCanvas) return;
      
      const canvas = this.$refs.modelCanvas;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      
      this.renderer.setSize(width, height);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initScene();
    });
  },
  beforeUnmount() {
    // Clean up resources
    window.removeEventListener('resize', this.onWindowResize);
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.controls) {
      this.controls.dispose();
    }
    
    // Dispose geometries and materials
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.model-container {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 20px;
  margin-bottom: 30px;
}

.model-title {
  color: var(--secondary-color);
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.model-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.view-btn {
  padding: 8px 15px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.view-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.model-viewport {
  height: 500px;
  position: relative;
  margin-bottom: 20px;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.model-viewport canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.model-instructions {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .model-viewport {
    height: 350px;
  }
}
</style>

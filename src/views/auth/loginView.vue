<template>
  <div class="login-container">
    <div class="bubbles">
      <span v-for="i in 50" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
    </div>

    <div class="auth-card">
      <div class="logo">
        <div class="logo-header">
          <v-icon large color="white">mdi-shield-alert</v-icon>
          <h1>LEAK ALERT</h1>
        </div>
      </div>

      <v-form @submit.prevent="handleLogin" class="login-form">
        <v-text-field
          v-model="formData.username"
          label="Username"
          placeholder="kyssfuentes"
          outlined
          dense
          background-color="transparent"
          class="custom-field"
        ></v-text-field>

        <v-text-field
          v-model="formData.password"
          label="Password"
          placeholder="......"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          background-color="transparent"
          class="custom-field"
        ></v-text-field>

        <v-select
          v-model="formData.userType"
          :items="userTypes"
          label="Sign in as"
          placeholder="2o"
          outlined
          dense
          background-color="transparent"
          class="custom-field"
        ></v-select>

        <div class="options-row">
          <v-checkbox
            v-model="rememberMe"
            label="Remember me"
            hide-details
            class="custom-checkbox small"
          ></v-checkbox>
          <router-link to="/forgot-password" class="forgot-password-link">
            Forgot password?
          </router-link>
        </div>

        <div class="divider"></div>

        <v-btn type="submit" color="primary" block :loading="isLoading" class="login-btn" large>
          <v-icon start>mdi-login</v-icon>
          LOG IN
        </v-btn>

        <div class="register-link">
          <span>Don't have an account?</span>
          <router-link to="/register">Register here</router-link>
        </div>
      </v-form>
    </div>

    <div class="footer">
      <span>© 2025 LeakAlert. All rights reserved.</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form Data
const formData = ref({
  username: '',
  password: '',
  userType: '',
})

// UI States
const showPassword = ref(false)
const isLoading = ref(false)
const rememberMe = ref(false)

// Options
const userTypes = ['Admin', 'Plumber', 'Waterline Technician', 'Client']

// Handle Login
const handleLogin = async () => {
  try {
    isLoading.value = true
    console.log('Logging in with:', formData.value)

    // Simulate API call (replace with your actual login logic)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect based on user type
    let redirectPath = '/'

    switch (formData.value.userType) {
      case 'Admin':
        redirectPath = '/administrator-dashboard'
        break
      case 'Plumber':
        redirectPath = '/plumber-dashboard'
        break
      case 'Waterline Technician':
        redirectPath = '/waterline-technician-dashboard'
        break
      case 'Client':
        redirectPath = '/client-dashboard'
        break
      default:
        console.warn('Unknown user type:', formData.value.userType)
        break
    }

    router.push(redirectPath)
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e272e 0%, #2c3e50 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.auth-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 400px;
  z-index: 2;
  margin: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
}

.logo-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.logo h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.login-form {
  margin-top: 1rem;
}

.custom-field {
  margin-bottom: 1.5rem; /* Increased margin for more spacing */
}

.custom-field :deep(.v-input__slot) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-radius: 8px !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.custom-field :deep(.v-text-field__slot input),
.custom-field :deep(.v-select__selection) {
  color: white !important;
}

.custom-field :deep(.v-text-field__slot input::placeholder),
.custom-field :deep(.v-select__selection--placeholder) {
  color: rgba(255, 255, 255, 0.6) !important;
}

.custom-field :deep(.v-label) {
  color: rgb(0, 0, 0) !important; /* Tiyakin na ito ay white */
}

.options-row {
  display: flex;
  justify-content: space-between; /* Changed to space-between */
  align-items: center; /* Vertically align items */
  margin: 1.5rem 0; /* Increased margin */
}

.custom-checkbox.small :deep(.v-label) {
  color: white !important;
  font-size: 0.8rem;
}

.forgot-password-link {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.8rem;
}

.forgot-password-link:hover {
  text-decoration: underline;
  color: #3498db;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1.5rem 0;
}

.login-btn {
  margin-top: 1.5rem;
  height: 45px;
  font-weight: bold;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-size: 1rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #3498db 30%, #2c3e50 70%);
}

.register-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #bdc3c7;
  font-size: 0.8rem;
}

.register-link a {
  color: #3498db;
  margin-left: 0.3rem;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Bubble animation */
.bubbles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.bubbles span {
  width: calc(20px + var(--i) * 0.5px);
  height: calc(20px + var(--i) * 0.5px);
  position: absolute;
  bottom: -100px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: bubble 15s linear infinite;
  animation-delay: calc(var(--i) * -0.3s);
}

.bubbles span:nth-child(even) {
  background: rgba(255, 255, 255, 0.1);
}

@keyframes bubble {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-120vh) scale(1.2);
    opacity: 0;
  }
}

/* Footer */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.7rem;
  z-index: 3;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .auth-card {
    padding: 1.5rem;
  }

  .logo h1 {
    font-size: 2rem;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const router = useRouter()

const email = ref('')
const resetSuccess = ref(false)
const resetError = ref('')

const resetPassword = () => {
  // In a real application, you would send a password reset link to this email.
  console.log('Requesting password reset for:', email.value)

  // Simulate a successful reset request
  setTimeout(() => {
    resetSuccess.value = true
  }, 1500)

  // Simulate an error for a non-existent email
  // setTimeout(() => {
  // resetError.value = 'Email not found.'
  // }, 2500)
}
</script>

<template>
  <div class="gradient-background">
    <v-row class="ma-0 fill-height align-center justify-center">
      <v-col cols="12" md="6" class="mx-auto">
        <v-card
          class="mx-auto glass-card"
          width="100%"
          max-width="450"
          prepend-icon="mdi-lock-reset"
          elevation="24"
        >
          <template #title>
            <span class="font-weight-black text-white">RESET PASSWORD</span>
          </template>

          <template #prepend>
            <v-icon size="x-large" color="white"></v-icon>
          </template>

          <v-card-text class="pa-6">
            <v-form fast-fail @submit.prevent="resetPassword">
              <v-alert v-if="resetSuccess" type="success" closable class="mb-4">
                Password reset link sent to your email address. Please check your inbox.
              </v-alert>
              <v-alert
                v-if="resetError"
                type="error"
                closable
                class="mb-4"
                @close="resetError = ''"
              >
                {{ resetError }}
              </v-alert>

              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                color="white"
                class="mb-4"
                prepend-inner-icon="mdi-email"
                :rules="[(v) => !!v || 'Email is required']"
              ></v-text-field>

              <v-btn
                class="mt-2 reset-btn"
                type="submit"
                block
                size="large"
                prepend-icon="mdi-send"
                :disabled="resetSuccess"
              >
                SEND RESET LINK
              </v-btn>
            </v-form>

            <v-divider class="my-5" color="rgba(255,255,255,0.2)"></v-divider>

            <p class="text-center text-white mb-0">
              Remember your password?
              <router-link to="/login" class="text-primary text-decoration-none font-weight-bold">
                Login here
              </router-link>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="bubbles">
      <span v-for="i in 50" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
    </div>
  </div>
</template>

<style scoped>
.gradient-background {
  position: relative;
  background: linear-gradient(45deg, #1e3a8a, #2e3192, #3f51b5, #283593); /* Darker blues */
  background-size: 400% 400%;
  animation: subtle-gradient 15s ease infinite;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* Add padding for smaller screens */
}

@keyframes subtle-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 20px !important;
  width: 100%;
  max-width: 450px;
}

.glass-card :deep(.v-card-title) {
  color: white;
  font-size: 1.8rem;
  letter-spacing: 2px;
  text-align: center;
}

.glass-card :deep(.v-card-text) {
  padding: 24px;
}

:deep(.v-field__outline) {
  color: rgba(255, 255, 255, 0.3) !important;
}

:deep(.v-field__input) {
  color: white !important;
}

:deep(.v-label) {
  color: rgba(255, 255, 255, 0.8) !important;
}

:deep(.v-field--active .v-label) {
  color: white !important;
}

/* Bubbles animation */
.bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.bubbles span {
  width: calc(20px + var(--i) * 0.5px);
  height: calc(20px + var(--i) * 0.5px);
  position: absolute;
  bottom: -100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: bubble 15s linear infinite;
  animation-delay: calc(var(--i) * -0.3s);
}

.bubbles span:nth-child(even) {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes bubble {
  0% {
    transform: translateY(0) scale(0.5);
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-120vh) scale(1.2);
    opacity: 0;
  }
}

/* Specific style for the reset button */
.reset-btn {
  background: #ff9800 !important; /* Example reset button color */
  color: white !important;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
}
</style>

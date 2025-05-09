<template>
  <div class="register-container">
    <div class="bubbles">
      <span v-for="i in 50" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
    </div>

    <div class="auth-card">
      <div class="logo">
        <h2>LeakAlert</h2>
        <p>Create your administrator account</p>
      </div>

      <v-form @submit.prevent="handleRegister" class="register-form">
        <!-- Basic Info -->
        <v-text-field
          v-model="formData.username"
          label="Username"
          :rules="[requiredRule]"
          outlined
          dense
          prepend-inner-icon="mdi-account"
          dark
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="Email"
          :rules="[requiredRule, emailRule]"
          outlined
          dense
          prepend-inner-icon="mdi-email"
          dark
        ></v-text-field>

        <!-- Date of Birth -->
        <v-menu
          ref="menu"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formData.birthDate"
              label="Date of Birth"
              prepend-inner-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              :rules="[requiredRule, dateRule]"
              outlined
              dense
              dark
              @click="dateMenu = true"
            ></v-text-field>
          </template>
        </v-menu>

        <v-text-field
          v-model="formData.password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :rules="[requiredRule, passwordRule]"
          outlined
          dense
          prepend-inner-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showPassword = !showPassword"
          dark
        ></v-text-field>

        <v-text-field
          v-model="formData.confirmPassword"
          label="Confirm Password"
          :type="showConfirmPassword ? 'text' : 'password'"
          :rules="[requiredRule, confirmPasswordRule]"
          outlined
          dense
          prepend-inner-icon="mdi-lock-check"
          :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showConfirmPassword = !showConfirmPassword"
          dark
        ></v-text-field>

        <!-- Security Questions -->
        <v-select
          v-model="formData.securityQuestion1"
          :items="securityQuestions"
          label="Security Question 1"
          :rules="[requiredRule]"
          outlined
          dense
          prepend-inner-icon="mdi-shield-question"
          dark
        ></v-select>

        <v-text-field
          v-model="formData.securityAnswer1"
          label="Answer 1"
          :rules="[requiredRule]"
          outlined
          dense
          dark
        ></v-text-field>

        <v-select
          v-model="formData.securityQuestion2"
          :items="securityQuestions"
          label="Security Question 2"
          :rules="[requiredRule]"
          outlined
          dense
          prepend-inner-icon="mdi-shield-question"
          dark
        ></v-select>

        <v-text-field
          v-model="formData.securityAnswer2"
          label="Answer 2"
          :rules="[requiredRule]"
          outlined
          dense
          dark
        ></v-text-field>

        <!-- Gender Selection -->
        <v-radio-group
          v-model="formData.gender"
          row
          :rules="[requiredRule]"
          class="gender-radio-group"
          dark
        >
          <v-radio label="Male" value="male" color="primary"></v-radio>
          <v-radio label="Female" value="female" color="primary"></v-radio>
          <v-radio label="Other" value="other" color="primary"></v-radio>
        </v-radio-group>

        <v-text-field
          v-if="formData.gender === 'other'"
          v-model="formData.customGender"
          label="Please specify"
          :rules="[requiredRule]"
          outlined
          dense
          dark
        ></v-text-field>

        <!-- CAPTCHA and Terms -->
        <div class="captcha-terms">
          <v-checkbox
            v-model="formData.notRobot"
            :rules="[(v) => !!v || 'You must verify you are not a robot']"
            class="checkbox-white"
            dark
          >
            <template v-slot:label>
              <span class="white--text">I'm not a robot</span>
            </template>
          </v-checkbox>

          <v-checkbox
            v-model="formData.agreeTerms"
            :rules="[(v) => !!v || 'You must agree to the terms']"
            class="checkbox-white"
            dark
          >
            <template v-slot:label>
              <span class="white--text">
                I agree to the
                <a href="#" @click.stop="showTerms = true" class="terms-link">Terms of Service</a>
                and
                <a href="#" @click.stop="showPrivacy = true" class="terms-link">Privacy Policy</a>
              </span>
            </template>
          </v-checkbox>
        </div>

        <!-- User Type Dropdown -->
        <v-select
          v-model="formData.userType"
          :items="userTypes"
          label="Sign in as"
          :rules="[requiredRule]"
          outlined
          dense
          prepend-inner-icon="mdi-account-group"
          dark
          class="user-type-select"
        ></v-select>

        <!-- Submit Button -->
        <v-btn type="submit" color="primary" block :loading="isLoading" class="register-btn">
          REGISTER
        </v-btn>

        <!-- Login Link -->
        <div class="login-link">
          <span>Already have an account?</span>
          <router-link to="/login">Sign In</router-link>
        </div>
      </v-form>

      <!-- Terms Dialog -->
      <v-dialog v-model="showTerms" max-width="600">
        <v-card dark>
          <v-card-title>Terms of Service</v-card-title>
          <v-card-text>
            <!-- Your terms content here -->
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="showTerms = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Privacy Dialog -->
      <v-dialog v-model="showPrivacy" max-width="600">
        <v-card dark>
          <v-card-title>Privacy Policy</v-card-title>
          <v-card-text>
            <!-- Your privacy policy content here -->
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="showPrivacy = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form Data
const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  userType: '',
  securityQuestion1: '',
  securityAnswer1: '',
  securityQuestion2: '',
  securityAnswer2: '',
  gender: '',
  customGender: '',
  notRobot: false,
  agreeTerms: false,
})

// UI States
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const dateMenu = ref(false)
const showTerms = ref(false)
const showPrivacy = ref(false)

// Options
const userTypes = ['Admin', 'Plumber', 'Waterline Technician', 'Client']

const securityQuestions = [
  "What was your first pet's name?",
  'What elementary school did you attend?',
  'What was the make of your first car?',
  "What is your mother's maiden name?",
  'In what city were you born?',
]

// Validation Rules
const requiredRule = (v) => !!v || 'This field is required'
const emailRule = (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
const passwordRule = (v) => v.length >= 8 || 'Password must be at least 8 characters'
const confirmPasswordRule = computed(
  () => (v) => v === formData.value.password || 'Passwords do not match',
)

// Handle Registration
const handleRegister = async () => {
  try {
    isLoading.value = true

    // Prepare final gender value
    const finalGender =
      formData.value.gender === 'other' ? formData.value.customGender : formData.value.gender

    const registrationData = {
      ...formData.value,
      gender: finalGender,
      // Remove unnecessary fields before sending
      customGender: undefined,
      confirmPassword: undefined,
      notRobot: undefined,
      agreeTerms: undefined,
    }

    // Redirect based on user type
    const redirectPath = {
      Admin: '/administrator-dashboard',
      Plumber: '/plumber-dashboard',
      'Waterline Technician': '/technician-dashboard',
      Client: '/client-dashboard',
    }[formData.value.userType]

    router.push(redirectPath)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Registration failed'
  } finally {
    isLoading.value = false
  }
}

const dateRule = (v) => {
  if (!v) return true
  const pattern = /^\d{4}-\d{2}-\d{2}$/
  return pattern.test(v) || 'Date must be in YYYY-MM-DD format'
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1e272e;
  position: relative;
  overflow: hidden;
}

.auth-card {
  background-color: #2c3e50;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  z-index: 2;
  margin: 1rem;
}

.logo {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #fff;
}

.logo h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.logo p {
  color: #bdc3c7;
  font-size: 0.9rem;
}

.register-form {
  margin-top: 1rem;
}

.register-btn {
  margin-top: 1rem;
  height: 45px;
  font-weight: bold;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.login-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #bdc3c7;
  font-size: 0.9rem;
}

.login-link a {
  color: #3498db;
  margin-left: 0.5rem;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

.captcha-terms {
  margin: 1rem 0;
}

.user-type-select {
  margin-top: 1rem;
}

.gender-radio-group {
  margin-top: 8px;
  margin-bottom: 8px;
}

.terms-link {
  color: #3498db;
  text-decoration: none;
}

.terms-link:hover {
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

/* White text for checkboxes */
.checkbox-white :deep(.v-label) {
  color: white !important;
}
</style>

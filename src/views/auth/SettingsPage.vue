<template>
  <div class="settings">
    <div class="sidebar">
      <div class="logo">LeakAlert</div>
      <ul class="nav-links">
        <li :class="{ active: $route.path === '/admin-dashboard' }">
          <router-link to="/administrator-dashboard" style="cursor: pointer">Dashboard</router-link>
        </li>
        <li :class="{ active: $route.path === '/report-leaks' }">
          <router-link to="/report-leaks">Report Leaks</router-link>
        </li>
        <li :class="{ active: $route.path === '/settings' }">
          <router-link to="/settings" style="cursor: pointer">Settings</router-link>
        </li>
        <li :class="{ active: $route.path === '/technician-dashboard' }">
          <router-link to="/technician-dashboard" style="cursor: pointer">Contact</router-link>
        </li>
        <li>
          <a @click="showLogoutConfirmation" style="cursor: pointer">Log out</a>
        </li>
      </ul>
    </div>
    <div class="report-content">
      <header class="top-bar">
        <div class="actions">
          <div class="notification-icon">
            <BellIcon size="24" />
          </div>
          <div class="user-info">
            <div class="avatar-placeholder" v-if="!profilePicture">
              <UserIcon size="30" />
            </div>
            <img
              v-if="profilePicture"
              :src="profilePicture"
              alt="Profile Picture"
              style="
                width: 30px;
                height: 30px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 10px;
              "
            />
            <span>{{ displayName }}</span>
          </div>
        </div>
      </header>
      <div class="settings-container">
        <div class="settings-header">
          <h1>Settings</h1>
        </div>
        <div class="settings-content">
          <div class="profile-section">
            <h2>Profile</h2>
            <div class="profile-picture">
              <div class="avatar-placeholder-large" v-if="!profilePicture">
                <UserIcon size="48" />
              </div>
              <img
                v-if="profilePicture"
                :src="profilePicture"
                alt="Profile Picture"
                style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover"
              />
              <input
                type="file"
                @change="handleFileUpload"
                accept="image/*"
                style="margin-top: 10px"
              />
              <button @click="saveProfilePicture" class="settings-button">Save Picture</button>
            </div>
            <div class="change-name">
              <label for="displayName">Display Name:</label>
              <input type="text" id="displayName" v-model="localDisplayName" />
              <button @click="saveDisplayName" class="settings-button">Save Name</button>
            </div>
          </div>

          <div class="account-section">
            <h2>Account</h2>
            <div class="change-password">
              <label for="newPassword">New Password:</label>
              <input type="password" id="newPassword" v-model="newPassword" />
              <label for="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" />
              <button @click="changePassword" class="settings-button">Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bubbles">
      <span v-for="i in 50" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
    </div>

    <v-dialog v-model="logoutConfirmationVisible" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5"> Confirm Logout </v-card-title>
        <v-card-text> Are you sure you want to log out? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="logoutConfirmationVisible = false">
            No
          </v-btn>
          <v-btn color="primary" variant="text" @click="logoutAction"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User as UserIcon } from 'lucide-vue-next'
import { Bell as BellIcon } from 'lucide-vue-next'

const router = useRouter()

// Profile Picture
const profilePicture = ref(null)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      profilePicture.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const saveProfilePicture = () => {
  // Temporary save to ref - will be lost on refresh
  console.log('Profile picture saved temporarily:', profilePicture.value)
  // In a real backend scenario, you'd send this to the server
}

// Display Name
const localDisplayName = ref('Brader Admin') // Use a local ref for input
const displayName = ref('Brader Admin') // Ref to display in the header

const saveDisplayName = () => {
  displayName.value = localDisplayName.value
  console.log('Display name saved temporarily:', displayName.value)
  // In a real backend scenario, you'd send this to the server and update globally
}

// Change Password
const newPassword = ref('')
const confirmPassword = ref('')
const changePassword = () => {
  if (newPassword.value === confirmPassword.value) {
    console.log('Password changed temporarily to:', newPassword.value)
    // In a real backend scenario, you'd send this to the server
  } else {
    alert('Passwords do not match.')
  }
}

// Logout Functionality
const logoutConfirmationVisible = ref(false)

const showLogoutConfirmation = () => {
  logoutConfirmationVisible.value = true
}

const logoutAction = () => {
  console.log('Logging out...')
  router.push('/login')
}
</script>

<style scoped>
.settings {
  display: flex;
  height: 100vh;
  background-color: #1e272e;
  color: #eee;
  overflow: hidden; /* To prevent scrollbars on the main page */
  position: relative; /* Add this to make it a positioning context for fixed elements */
}

.sidebar {
  background-color: #2c3e50;
  color: #fff;
  width: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li a {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #eee;
  transition: background-color 0.3s ease;
}

.nav-links li a:hover,
.nav-links li.active a {
  background-color: #34495e;
}

.report-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.top-bar {
  background-color: #2c3e50;
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.top-bar .actions {
  display: flex;
  align-items: center;
}

.notification-icon {
  margin-right: 20px;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar-placeholder {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #34495e;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.avatar-placeholder svg {
  width: 20px;
  height: 20px;
  color: #eee;
}

.user-info span {
  font-weight: bold;
}

.settings-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
}

.settings-header h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-section,
.account-section {
  background-color: #2c3e50;
  padding: 15px;
  border-radius: 8px;
}

.profile-picture {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar-placeholder-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #34495e;
  display: flex;
  justify-content: center;
  align-items: center;
}

.change-name,
.change-password {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.change-name label,
.change-password label {
  width: 120px;
  text-align: left;
}

.change-name input,
.change-password input {
  padding: 8px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #34495e;
  color: #eee;
  flex-grow: 1;
}

.logout-button-settings:hover {
  opacity: 0.8;
}

.settings-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.settings-button:hover {
  opacity: 0.8;
}

input[type='file']::file-selector-button {
  color: black;
}

/* Bubbles animation */
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
</style>

<template>
  <div class="technician-page">
    <div class="sidebar">
      <div class="logo">LeakAlert</div>
      <ul class="nav-links">
        <li :class="{ active: $route.path === '/administrator-dashboard' }">
          <router-link to="/administrator-dashboard" style="cursor: pointer">Dashboard</router-link>
        </li>
        <li :class="{ active: $route.path === '/report-leaks' }">
          <router-link to="/report-leaks">Report Leaks</router-link>
        </li>
        <li :class="{ active: $route.path === '/settings' }">
          <router-link to="/settings" style="cursor: pointer">Settings</router-link>
        </li>
        <li :class="{ active: $route.path === 'technician-dashboard' }">
          <router-link
            to="technician-dashboard"
            style="cursor: pointer"
            @click.prevent="stayOnContact"
          >
            Contact
          </router-link>
        </li>
        <li>
          <a @click="showLogoutConfirmation" style="cursor: pointer">Log out</a>
        </li>
      </ul>
    </div>
    <div class="technician-content">
      <header class="top-bar">
        <div class="left-header"></div>
        <div class="right-header">
          <div class="notification-icon">
            <BellIcon />
          </div>
          <div class="user-info">
            <div class="avatar-placeholder">
              <UserIcon />
            </div>
            <span>Brader Admin</span>
          </div>
        </div>
      </header>
      <div class="technician-list">
        <h1>Technicians</h1>
        <div class="technician-grid">
          <div class="technician-card">
            <img src="/src/assets/images/Michael Phelps.jpeg" alt="Michael Phelps" />
            <div class="card-info">
              <h3>Michael Phelps</h3>
              <p>kuhlmanjerney@yahoo.com</p>
              <button class="message-button">
                <MailIcon />
                Message
              </button>
            </div>
          </div>

          <div class="technician-card">
            <img src="/src/assets/images/Duane Dean.jpeg" alt="Duane Dean" />
            <div class="card-info">
              <h3>Duane Dean</h3>
              <p>rudy.borgford@willms.io</p>
              <button class="message-button">
                <MailIcon />
                Message
              </button>
            </div>
          </div>

          <div class="technician-card">
            <img src="/src/assets/images/Jonathan Barker.jpeg" alt="Jonathan Barker" />
            <div class="card-info">
              <h3>Jonathan Barker</h3>
              <p>cora_haley@quam.biz</p>
              <button class="message-button">
                <MailIcon />
                Message
              </button>
            </div>
          </div>

          <div class="technician-card">
            <img src="/src/assets/images/Michael Jordan.jpg" alt="Michael Jordan" />
            <div class="card-info">
              <h3>Michael Jordan</h3>
              <p>lockman.murazik@hotmail.com</p>
              <button class="message-button">
                <MailIcon />
                Message
              </button>
            </div>
          </div>

          <div class="technician-card">
            <img src="/src/assets/images/Christine Brooks.jpeg" alt="Christine Brooks" />
            <div class="card-info">
              <h3>Christine Brooks</h3>
              <p>christine.brooks@example.com</p>
              <button class="message-button">
                <MailIcon />
                Message
              </button>
            </div>
          </div>

          <div class="technician-card">
            <img src="/src/assets/images/Rosie Pearson.jpeg" alt="Rosie Pearson" />
            <div class="card-info">
              <h3>Rosie Pearson</h3>
              <p>rosie.pearson@example.com</p>
              <button class="message-button">
                <MailIcon />
                Message
              </button>
            </div>
          </div>

          <div class="technician-card">
            <img src="/src/assets/images/Darrell Caldwell.jpeg" alt="Darrell Caldwell" />
            <div class="card-info">
              <h3>Darrell Caldwell</h3>
              <p>darrell.caldwell@example.com</p>
              <button class="message-button">
                <MailIcon />
                Message
              </button>
            </div>
          </div>

          <div class="technician-card">
            <img src="/src/assets/images/Gilbert Johnston.jpg" alt="Gilbert Johnston" />
            <div class="card-info">
              <h3>Gilbert Johnston</h3>
              <p>gilbert.johnston@example.com</p>
              <button class="message-button">
                <MailIcon />
                Message
              </button>
            </div>
          </div>

          <div class="technician-card add-technician-card">
            <button @click="goToAddTechnician">
              <PlusIcon />
              Add Technician
            </button>
          </div>
        </div>
      </div>
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
          <v-btn color="primary" variant="text" @click="logout"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div class="bubbles">
    <span v-for="i in 50" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
  </div>
</template>

<style scoped>
.technician-page {
  display: flex;
  height: 100vh;
  background-color: #1e272e;
  color: #eee;
  overflow: hidden; /* Prevent scrolling */
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

.technician-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent scrolling */
}

.top-bar {
  background-color: #2c3e50;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between; /* Keep space between potential left and right items */
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.right-header {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Align items to the right */
}

.notification-icon {
  margin-left: 20px;
  margin-right: 20px; /* Adjust this value as needed */
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

.technician-list {
  padding: 20px;
  overflow: hidden; /* Prevent scrolling */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.technician-list h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.technician-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* Adjusted minmax */
  gap: 15px; /* Adjusted gap */
  overflow-y: auto; /* Enable vertical scrolling for technicians */
  padding-bottom: 20px;
}

.technician-card {
  background-color: #2c3e50;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 250px; /* Fixed height for cards */
}

.technician-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-bottom: 1px solid #34495e;
}

.card-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.card-info h3 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.card-info p {
  font-size: 12px;
  color: #ccc;
  margin: 0;
}

.message-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: auto;
  font-size: 12px;
}

.message-button svg {
  width: 14px;
  height: 14px;
}

.add-technician-card {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 250px;
}

.add-technician-card button {
  background: none;
  border: 2px dashed #fff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.add-technician-card svg {
  width: 20px;
  height: 20px;
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
  bottom: -100px; /* Start below the screen */
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
    transform: translateY(-120vh) scale(1.2); /* Move upwards */
    opacity: 0;
  }
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import {
  Bell as BellIcon,
  User as UserIcon,
  Mail as MailIcon,
  Plus as PlusIcon,
} from 'lucide-vue-next'

const router = useRouter()
const logoutConfirmationVisible = ref(false)

const goToAddTechnician = () => {
  console.log('Navigating to Add Technician')
  // Replace '/add-technician' with your actual route for adding a technician
  router.push('/add-technician')
}

const showLogoutConfirmation = () => {
  logoutConfirmationVisible.value = true
}

const logout = () => {
  console.log('Logging out...')
  router.push('/login')
}

const stayOnContact = () => {
  if (route.path === '/technician-dashboard') {
    // Optionally, add some visual feedback
    console.log('Already on the Contact page.')
  } else {
    router.push('/technician-dashboard')
  }
}
</script>

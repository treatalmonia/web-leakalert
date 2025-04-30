<template>
  <div class="plumber-dashboard-page">
    <div class="sidebar">
      <div class="logo">Plumber Portal</div>
      <ul class="nav-links">
        <li class="active"><a href="#">Dashboard</a></li>
        <li><a href="#">Assigned Tasks</a></li>
        <li><a href="#">Completed Tasks</a></li>
        <li><a href="#">Schedule</a></li>
        <li><a href="#">Reports</a></li>
        <li @click="showLogoutConfirmation" class="logout-link">
          <i class="mdi mdi-logout"></i> Log Out
        </li>
      </ul>
    </div>
    <div class="main-content">
      <header>
        <h1>Plumber Dashboard</h1>
        <div class="user-info">
          <span>Welcome, Plumber!</span>
        </div>
      </header>

      <div class="dashboard-widgets">
        <div class="widget">
          <h3>Assigned Leaks</h3>
          <div class="value">7</div>
          <div class="sub-value">3 urgent, 4 regular</div>
        </div>
        <div class="widget in-progress">
          <h3>Current Tasks</h3>
          <div class="value">2</div>
        </div>
        <div class="widget completed">
          <h3>Completed Tasks</h3>
          <div class="value">15</div>
        </div>
      </div>

      <div class="task-list">
        <h2>Your Assigned Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in assignedTasks" :key="task.id">
              <td>{{ task.id }}</td>
              <td>{{ task.location }}</td>
              <td :class="task.severity.toLowerCase()">{{ task.severity }}</td>
              <td :class="task.status.toLowerCase()">{{ task.status }}</td>
              <td>
                <div class="image-upload-container">
                  <input
                    type="file"
                    @change="uploadImage($event, task.id)"
                    accept="image/*"
                    class="image-upload-input"
                    :id="'upload-' + task.id"
                    style="display: none"
                  />
                  <label :for="'upload-' + task.id" class="upload-button">
                    <i class="mdi mdi-upload"></i> Upload
                  </label>
                  <img
                    v-if="task.imageUrl"
                    :src="task.imageUrl"
                    alt="Task Image"
                    class="task-image"
                  />
                </div>
              </td>
              <td>View | Edit</td>
            </tr>
          </tbody>
        </table>
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
          <v-btn color="red" variant="text" @click="logout"> Yes </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="bubbles">
      <span v-for="i in 50" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '@mdi/font/css/materialdesignicons.min.css'

const router = useRouter()

const assignedTasks = ref([
  {
    id: '00001',
    location: 'Purok 3, Ampayon',
    severity: 'Urgent',
    status: 'Assigned',
    imageUrl: null,
  },
  {
    id: '000002',
    location: 'Barangay Poblacion',
    severity: 'Regular',
    status: 'In Progress',
    imageUrl: null,
  },
  {
    id: '000003',
    location: 'Barangay Baan',
    severity: 'Regular',
    status: 'In Progress',
    imageUrl: null,
  },
  {
    id: '000004',
    location: 'Barangay Buenavista',
    severity: 'Urgent',
    status: 'In Progress',
    imageUrl: null,
  },
  {
    id: '000005',
    location: 'Barangay Manapa',
    severity: 'Regular',
    status: 'In Progress',
    imageUrl: null,
  },
])

const logoutConfirmationVisible = ref(false)

const showLogoutConfirmation = () => {
  logoutConfirmationVisible.value = true
}

const logout = () => {
  console.log('Logging out...')
  router.push('/login') // Adjust the route as needed
}

const uploadImage = (event, taskId) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const task = assignedTasks.value.find((task) => task.id === taskId)
      if (task) {
        task.imageUrl = reader.result
      }
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.plumber-dashboard-page {
  display: flex; /* Use flexbox to position sidebar and main content */
  position: relative;
  padding: 0; /* Adjust padding for the overall page */
  background: linear-gradient(45deg, #1e3a8a, #2e3192, #3f51b5, #283593); /* Darker blues */
  background-size: 400% 400%;
  animation: subtle-gradient 15s ease infinite;
  min-height: 100vh;
  color: #fff;
  font-family: sans-serif;
  overflow: hidden;
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

.sidebar {
  background-color: rgba(30, 47, 59, 0.8); /* Dark blue sidebar */
  width: 220px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Make sidebar full height */
  position: sticky; /* Stick the sidebar */
  top: 0;
  left: 0;
  z-index: 2; /* Ensure it's above the bubbles */
}

.logo {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
}

.nav-links {
  list-style: none;
  padding: 0;
}

.nav-links li a,
.nav-links li.logout-link {
  display: block;
  padding: 12px 15px;
  text-decoration: none;
  color: #eee;
  transition: background-color 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-links li a:hover,
.nav-links li.active a,
.nav-links li.logout-link:hover {
  background-color: #4a698a; /* Slightly lighter dark blue on hover */
}

.nav-links li.logout-link {
  color: #f44336; /* Red color for logout */
  margin-top: 20px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-right: 20px; /* Add some right padding to align with content */
}

header h1 {
  color: #fff;
  margin: 0;
}

.user-info {
  font-weight: bold;
  color: #ccd1e1;
}

.logout-button {
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #d32f2f;
}

.dashboard-widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  padding-right: 20px; /* Align with content */
}

.widget {
  background-color: rgba(30, 47, 59, 0.8); /* Dark blue widgets */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.widget h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #ccd1e1;
  font-size: 1.1rem;
}

.widget .value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
}

.widget .sub-value {
  color: #a3b18a;
  font-size: 0.9rem;
  margin-top: 5px;
}

.widget.urgent .value {
  color: #ff9800; /* Orange for urgent */
}

.widget.in-progress .value {
  color: #64b5f6; /* Light blue for in progress */
}

.widget.completed .value {
  color: #81c784; /* Green for completed */
}

.task-list {
  background-color: rgba(30, 47, 59, 0.8); /* Dark blue task list */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-right: 20px; /* Align with content */
}

.task-list h2 {
  color: #ccd1e1;
  margin-top: 0;
  margin-bottom: 15px;
}

.task-list table {
  width: 100%;
  border-collapse: collapse;
}

.task-list th,
.task-list td {
  padding: 12px 15px;
  border-bottom: 1px solid #4a698a;
  text-align: left;
}

.task-list th {
  background-color: rgba(39, 73, 109, 0.7); /* Slightly darker blue header */
  font-weight: bold;
  color: #fff;
}

.task-list tbody tr:nth-child(even) {
  background-color: rgba(39, 73, 109, 0.5); /* Even rows slightly darker */
}

.urgent {
  color: #ff9800;
  font-weight: bold;
}

.regular {
  color: #64b5f6;
}

.assigned {
  color: #ffe082;
  font-weight: bold;
}

.in-progress {
  color: #64b5f6;
  font-weight: bold;
}

.completed {
  color: #81c784;
  font-weight: bold;
}

.image-upload-container {
  position: relative;
  display: inline-block;
}

.upload-button {
  background-color: #64b5f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.upload-button:hover {
  background-color: #42a5f5;
}

.image-upload-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.task-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-top: 5px;
  object-fit: cover;
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

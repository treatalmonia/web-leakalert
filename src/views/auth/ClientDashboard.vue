<template>
  <div class="client-dashboard">
    <div class="sidebar">
      <div class="logo">Client Portal</div>
      <ul class="nav-links">
        <li class="active"><a href="#">Dashboard</a></li>
        <li><a href="#">My Leaks</a></li>
        <li><a href="#">Report a Leak</a></li>
        <li><a href="#">Account Settings</a></li>
        <li @click="showLogoutConfirmation" class="logout-link">
          <i class="mdi mdi-logout"></i> Log Out
        </li>
      </ul>
    </div>
    <div class="main-content">
      <header>
        <h1>Client Dashboard</h1>
        <div class="user-info">
          <span>Welcome, Client Name</span>
          <div class="avatar">CN</div>
        </div>
      </header>
      <div class="dashboard-widgets">
        <div class="widget">
          <div class="widget-header">Recent Leaks</div>
          <div class="widget-content">
            <ul>
              <li v-for="leak in recentLeaks" :key="leak.id">
                {{ leak.id }} - Reported {{ leak.reported }} - Status:
                <span :class="'status-' + leak.status.toLowerCase()">{{ leak.status }}</span>
              </li>
            </ul>
            <button class="view-all-button">View All Leaks</button>
          </div>
        </div>

        <div class="widget">
          <div class="widget-header">Announcements</div>
          <div class="widget-content">
            <p
              v-if="announcements.length > 0"
              v-for="announcement in announcements"
              :key="announcement.id"
            >
              {{ announcement.text }}
            </p>
            <p v-else>No new announcements at this time.</p>
          </div>
        </div>

        <div class="widget">
          <div class="widget-header">Account Overview</div>
          <div class="widget-content">
            <p>Account Status: <span class="status-active">Active</span></p>
            <p>Last Login: Yesterday</p>
          </div>
        </div>
      </div>

      <div class="report-list-section">
        <h2>My Reported Leaks</h2>
        <div class="report-list-table-container">
          <table class="report-list-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Reported Date</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="report in reportedLeaks" :key="report.id">
                <td>{{ report.id }}</td>
                <td>{{ report.reported }}</td>
                <td>
                  <span :class="'status-' + report.status.toLowerCase()">{{ report.status }}</span>
                </td>
                <td>
                  <div class="image-upload-container">
                    <input
                      type="file"
                      @change="uploadImage($event, report.id)"
                      accept="image/*"
                      class="image-upload-input"
                      :id="'upload-' + report.id"
                      style="display: none"
                    />
                    <label :for="'upload-' + report.id" class="upload-button">
                      <i class="mdi mdi-upload"></i> Upload
                    </label>
                  </div>
                </td>
                <td>
                  <button class="action-button view-button">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
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

const recentLeaks = ref([
  { id: '#123', reported: '2 days ago', status: 'In Progress' },
  { id: '#456', reported: '1 week ago', status: 'Resolved' },
  { id: '#789', reported: '3 weeks ago', status: 'Resolved' },
])

const announcements = ref([
  { id: 1, text: 'Regular maintenance scheduled for next week.' },
  // Add more announcements as needed
])

const reportedLeaks = ref([
  { id: '00001', reported: '2025-04-25', status: 'Pending', imageUrl: null },
  { id: '00002', reported: '2025-04-20', status: 'In Progress', imageUrl: null },
  {
    id: '00003',
    reported: '2025-04-15',
    status: 'Resolved',
    imageUrl: 'https://via.placeholder.com/50',
  },
  { id: '00004', reported: '2025-04-10', status: 'Pending', imageUrl: null },
  { id: '00005', reported: '2025-04-05', status: 'Assigned', imageUrl: null },
  // ... more reports
])

const logoutConfirmationVisible = ref(false)

const showLogoutConfirmation = () => {
  logoutConfirmationVisible.value = true
}

const logout = () => {
  console.log('Logging out...')
  router.push('/login') // Assuming you have a /login route
}

const uploadImage = (event, reportId) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const report = reportedLeaks.value.find((report) => report.id === reportId)
      if (report) {
        report.imageUrl = reader.result
      }
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.client-dashboard {
  position: relative;
  background: linear-gradient(45deg, #1e3a8a, #2e3192, #3f51b5, #283593); /* Darker blues */
  background-size: 400% 400%;
  animation: subtle-gradient 15s ease infinite;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  font-family: sans-serif;
  color: white;
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
  padding-bottom: 20px;
  border-bottom: 1px solid #628aaf;
  margin-bottom: 20px;
}

header h1 {
  font-size: 32px;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-right: 15px;
  color: #ccd1e1;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #64b5f6;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.dashboard-widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.widget {
  background-color: rgba(30, 47, 59, 0.8); /* Dark blue widgets */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.widget-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom: 1px solid #628aaf;
  padding-bottom: 10px;
  color: #ccd1e1;
}

.widget-content ul {
  list-style: none;
  padding: 0;
  margin-bottom: 15px;
}

.widget-content ul li {
  padding: 10px 0;
  border-bottom: 1px solid #4a698a;
}

.widget-content ul li:last-child {
  border-bottom: none;
}

.view-all-button {
  background-color: #4a698a;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.view-all-button:hover {
  background-color: #628aaf;
}

.report-list-section {
  background-color: rgba(30, 47, 59, 0.8); /* Dark blue section */
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.report-list-section h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #ccd1e1;
}

.report-list-table-container {
  overflow-x: auto;
  background-color: #27496d; /* Darker blue for table */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.report-list-table {
  width: 100%;
  border-collapse: collapse;
}

.report-list-table th,
.report-list-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #4a698a;
}

.report-list-table th {
  font-weight: bold;
  color: #ccd1e1;
}

.report-list-table tbody tr:last-child td {
  border-bottom: none;
}

.status-pending {
  background-color: #fdd835;
  color: #333;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-in-progress {
  background-color: #3f51b5;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-resolved {
  background-color: #81c784;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-assigned {
  background-color: #64b5f6;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-active {
  background-color: #4caf50;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.action-button {
  background-color: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
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
  font-size: 14px;
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

.leak-image {
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

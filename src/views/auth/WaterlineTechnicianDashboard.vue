<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <div class="logo">Waterline Portal</div>
      <ul class="nav-links">
        <li class="active"><a href="#">Dashboard</a></li>
        <li><a href="#">Assigned Reports</a></li>
        <li><a href="#">Urgent Cases</a></li>
        <li><a href="#">My Schedule</a></li>
        <li><a href="#">Report History</a></li>
        <li @click="showLogoutConfirmation" class="logout-link">
          <i class="mdi mdi-logout"></i> Log Out
        </li>
      </ul>
    </div>
    <div class="main-content">
      <header>
        <h1>Waterline Technician Dashboard</h1>
      </header>

      <div class="dashboard-widgets">
        <div class="widget">
          <div class="widget-title">Assigned Reports</div>
          <div class="widget-content">
            <span>15</span>
          </div>
          <div class="widget-icon">
            <i class="mdi mdi-file-document-multiple-outline"></i>
          </div>
        </div>

        <div class="widget">
          <div class="widget-title">Urgent Cases</div>
          <div class="widget-content">
            <span>5</span>
          </div>
          <div class="widget-icon">
            <i class="mdi mdi-alert-octagon-outline"></i>
          </div>
        </div>

        <div class="widget availability-widget">
          <div class="widget-title">My Availability</div>
          <div class="widget-content">
            <span class="availability active">Available</span>
          </div>
          <div class="widget-icon">
            <i class="mdi mdi-account-check-outline"></i>
          </div>
        </div>

        <div class="widget weather-widget">
          <div class="widget-title">Local Weather</div>
          <div class="widget-content">
            <span>Sunny, 28°C</span>
            <i class="mdi mdi-weather-sunny"></i>
          </div>
        </div>
      </div>

      <div class="content-area">
        <div class="report-list-section">
          <h2>My Assigned Leaks</h2>
          <div class="report-list-controls">
            <div class="filter-section">
              <button class="filter-button">
                <i class="mdi mdi-filter-variant"></i> Filter By
                <i class="mdi mdi-chevron-down"></i>
              </button>
            </div>
            <div class="search-section">
              <input type="text" placeholder="Search Assigned Reports" />
              <button class="search-button"><i class="mdi mdi-magnify"></i> Search</button>
            </div>
          </div>

          <div class="report-list-table-container">
            <table class="report-list-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>LOCATION</th>
                  <th>SEVERITY</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                  <th>IMAGE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in assignedReports" :key="report.id">
                  <td>{{ report.id }}</td>
                  <td>{{ report.location }}</td>
                  <td>
                    <span :class="'severity-' + report.severity.toLowerCase()">
                      {{ report.severity }}
                    </span>
                  </td>
                  <td>
                    <span :class="'status-' + report.status.toLowerCase()">
                      {{ report.status }}
                    </span>
                  </td>
                  <td>
                    <button class="action-button view-button">View</button>
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
                      <img
                        v-if="report.imageUrl"
                        :src="report.imageUrl"
                        alt="Report Image"
                        class="report-image"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination">
            <span>Showing 1-5 of 30</span>
            <div class="pagination-buttons">
              <button :disabled="currentPage === 1">
                <i class="mdi mdi-chevron-left"></i>
              </button>
              <span>{{ currentPage }}</span>
              <button :disabled="currentPage === totalPages">
                <i class="mdi mdi-chevron-right"></i>
              </button>
            </div>
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

const assignedReports = ref([
  {
    id: '00001',
    location: 'Area A, Street 1',
    severity: 'Minor',
    status: 'Pending',
    imageUrl: null,
  },
  {
    id: '00002',
    location: 'Area B, Avenue 5',
    severity: 'Major',
    status: 'In Progress',
    imageUrl: null,
  },
  {
    id: '00003',
    location: 'Area C, Lane 2',
    severity: 'Emergency',
    status: 'Assigned',
    imageUrl: null,
  },
  {
    id: '00004',
    location: 'Area A, Street 3',
    severity: 'Minor',
    status: 'Completed',
    imageUrl: null,
  },
  {
    id: '00005',
    location: 'Area D, Road 10',
    severity: 'Major',
    status: 'Pending',
    imageUrl: null,
  },
  // ... more reports
])

const currentPage = ref(1)
const totalAssignedReports = ref(30)
const reportsPerPage = 5
const totalPages = ref(Math.ceil(totalAssignedReports.value / reportsPerPage))
const logoutConfirmationVisible = ref(false)

const showLogoutConfirmation = () => {
  logoutConfirmationVisible.value = true
}

const logout = () => {
  console.log('Logging out...')
  router.push('/login')
}

const uploadImage = (event, reportId) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const report = assignedReports.value.find((report) => report.id === reportId)
      if (report) {
        report.imageUrl = reader.result
      }
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.dashboard-container {
  position: relative;
  background: linear-gradient(45deg, #1e3a8a, #2e3192, #3f51b5, #283593); /* Darker blues */
  background-size: 400% 400%;
  animation: subtle-gradient 15s ease infinite;
  min-height: 100vh;
  overflow: hidden;
  padding: 0;
  display: flex; /* Enable flex for sidebar layout */
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
  height: 120h; /* Full height sidebar */
  position: sticky; /* Stick the sidebar */
  top: 0;
  left: 0;
  z-index: 2; /* Above bubbles */
}

.logo {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: white;
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
  background-color: #4a698a; /* Lighter dark blue on hover */
}

.nav-links li.logout-link {
  color: #f44336; /* Red for logout */
  margin-top: 20px;
}

.main-content {
  flex-grow: 1; /* Take remaining width */
  padding: 20px;
  display: flex;
  flex-direction: column;
}

header {
  color: white;
  padding: 20px 0;
  text-align: left;
  margin-bottom: 20px;
}

header h1 {
  margin: 0;
}

.dashboard-widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjust minmax for spacing */
  gap: 20px;
  margin-bottom: 20px;
}

.widget {
  background-color: rgba(30, 47, 59, 0.8); /* Dark blue for widgets */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  color: white;
}

.widget-title {
  font-size: 16px;
  color: #ccd1e1;
  margin-bottom: 5px;
}

.widget-content {
  font-size: 24px; /* Adjusted font size */
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.widget-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
  color: #a3b18a;
}

.availability-widget .widget-content {
  flex-direction: row; /* Align availability and logout horizontally */
  justify-content: space-between;
  align-items: center;
}

.availability {
  background-color: #81b13d;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}

.logout-button {
  background-color: transparent;
  border: none;
  color: #f44336;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: rgba(244, 67, 54, 0.1);
}

.content-area {
  background-color: rgba(30, 47, 59, 0.8); /* Dark blue for content area */
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.report-list-section h2 {
  font-size: 20px;
  color: white;
  margin-bottom: 15px;
}

.report-list-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.filter-section .filter-button,
.search-section input[type='text'],
.search-section .search-button,
.pagination-buttons button {
  background-color: #4a698a; /* Slightly lighter dark blue for controls */
  color: white;
  border: 1px solid #628aaf;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.search-section {
  display: flex;
}

.search-section input[type='text'] {
  border-radius: 4px 0 0 4px;
  flex-grow: 1;
  padding: 8px;
}

.search-section .search-button {
  border-radius: 0 4px 4px 0;
}

.report-list-table-container {
  overflow-x: auto;
  background-color: #27496d; /* Darker blue for table container */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
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

.severity-emergency {
  background-color: #f44336;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.severity-major {
  background-color: #ff9800;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.severity-minor {
  background-color: #4caf50;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
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

.status-completed {
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

.action-button {
  background-color: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  color: #ccd1e1;
}

.pagination-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

.image-upload-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.upload-button {
  background-color: #5cb85c; /* Green button */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #4cae4c;
}

.image-upload-input {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}

.report-image {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid #ccc;
}
</style>

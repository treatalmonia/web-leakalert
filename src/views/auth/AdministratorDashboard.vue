<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <div class="logo">LeakAlert</div>
      <ul class="nav-links">
        <li :class="{ active: $route.path === '/administrator-dashboard' }">
          <router-link
            to="/administrator-dashboard"
            style="cursor: pointer"
            @click.prevent="navigateTo('Dashboard')"
          >
            Dashboard
          </router-link>
        </li>
        <li :class="{ active: $route.path === '/report-leaks' }">
          <router-link to="/report-leaks" @click="navigateTo('Report Leaks')"
            >Report Leaks</router-link
          >
        </li>
        <li :class="{ active: $route.path === '/settings' }">
          <router-link to="/settings" style="cursor: pointer" @click="navigateTo('Settings')"
            >Settings</router-link
          >
        </li>
        <li :class="{ active: $route.path === '/contact' }">
          <router-link
            to="/technician-dashboard"
            style="cursor: pointer"
            @click="navigateTo('Contact')"
            >Contact</router-link
          >
        </li>
        <li>
          <a @click="showLogoutConfirmation" style="cursor: pointer">Log out</a>
        </li>
      </ul>
    </div>
    <div class="dashboard-content">
      <header class="top-bar">
        <div class="actions">
          <div
            class="notification-icon"
            @click="showNotification('A new client from Barangay Poblacion has registered!')"
          >
            <BellIcon size="24" />
            <span class="notification-badge" v-if="hasNewNotification"></span>
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
            <span>Brader Admin</span>
          </div>
        </div>
      </header>
      <div class="dashboard-widgets-grid">
        <div class="widget-card large-icon">
          <ClockIcon size="80" />
          <h3 class="widget-title">Current Time</h3>
          <div class="widget-value">{{ currentTime }}</div>
          <div class="widget-sub-value">{{ currentDate }}</div>
        </div>
        <div class="widget-card">
          <h3 class="widget-title">Technician Availability</h3>
          <div class="widget-metric">
            Plumber: 40 available / <span class="busy">10 currently busy</span>
          </div>
          <div class="widget-metric">
            Waterline Tech: 30 available / <span class="busy">8 currently busy</span>
          </div>
          <div class="widget-metric">
            Overall: 70 available / <span class="busy">18 currently busy</span>
          </div>
          <div class="widget-metric">Note: Busy technicians are on active service calls.</div>
        </div>
        <div class="widget-card">
          <h3 class="widget-title">Total Users</h3>
          <div class="widget-value">200</div>
          <div class="widget-sub-value">Currently Active on Platform: 20</div>
          <div class="widget-sub-value">Last Sign-in within 15 minutes.</div>
        </div>
        <div class="widget-card high-severity">
          <h3 class="widget-title">High Severity Leaks</h3>
          <div class="widget-value">5</div>
          <div class="widget-sub-value">Requiring immediate attention.</div>
        </div>
        <div class="widget-card average-resolution">
          <h3 class="widget-title">Avg. Resolution Time</h3>
          <div class="widget-value">2.5 Hours</div>
          <div class="widget-sub-value">Based on completed reports in the last week.</div>
        </div>
        <div class="widget-card pending-reports">
          <h3 class="widget-title">Pending Reports</h3>
          <div class="widget-value">12</div>
          <div class="widget-sub-value">Awaiting assignment to a technician.</div>
        </div>
        <div class="widget-card monthly-revenue">
          <h3 class="widget-title">Monthly Revenue (Estimated)</h3>
          <div class="revenue-value">$15,500</div>
          <div class="revenue-details">Total Expenses for the Month: $3,200</div>
          <div class="revenue-details">Net Profit (Estimated): $12,300</div>
          <div class="revenue-details">Note: Figures are based on completed service orders.</div>
        </div>
        <div class="widget-card system-status">
          <h3 class="widget-title">System Status Overview</h3>
          <div class="status-item healthy">
            <span class="status-indicator"></span> Core System: Healthy and Operational
          </div>
          <div class="status-item warning">
            <span class="status-indicator"></span> Minor Issues Detected in Reporting Module
          </div>
          <div class="status-item stable">
            <span class="status-indicator"></span> Database Services: Online and Stable
          </div>
          <div class="status-item ok">
            <span class="status-indicator"></span> API Communication: Services Running Smoothly
          </div>
          <div class="status-item ok">
            <span class="status-indicator"></span> Image Processing Queue: Nominal Load
          </div>
        </div>
      </div>

      <div class="report-leaks-section">
        <h2>Recent Leak Reports and Management</h2>
        <div class="filters">
          <button class="filter-button">Filter By Category</button>
          <button class="filter-button">Filter By Severity Level</button>
          <button class="filter-button">Filter By Assigned Technician</button>
          <button class="filter-button">Filter By Current Order Status</button>
          <button class="filter-button reset">Clear All Filters</button>
          <div class="search-bar">
            <input type="text" placeholder="Search for location, ID..." />
            <button><SearchIcon size="20" /></button>
          </div>
        </div>
        <div class="report-table-container">
          <table>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Report Location</th>
                <th>Assigned Technician</th>
                <th>Image Review Status</th>
                <th>Leak Severity</th>
                <th>Current Status</th>
                <th>Actions Available</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 100" :key="n">
                <td>{{ n + 0 }}</td>
                <td>
                  Barangay
                  {{ ['Ampayon', 'Libertad', 'Poblacion', 'Doongan', 'Los Angeles'][n % 5] }},
                  Butuan City
                </td>
                <td>
                  {{
                    [
                      'Michael Phelps',
                      'Duane Dean',
                      'Jonathan Barker',
                      'Michael Jordan',

                      'Christine Brooks',
                      'Rosie Pearson',
                      'Darrell Caldwell',
                      'Gilbert Johnston',
                      'Michael Jordan',
                    ][n % 9]
                  }}
                </td>
                <td>{{ n % 2 === 0 ? 'Reviewed' : 'Pending Review' }}</td>
                <td :class="['severity-' + (n % 3)]">
                  {{ ['Minor', 'Major', 'Emergency'][n % 3] }}
                </td>
                <td
                  :class="['status-' + ['completed', 'pending', 'rejected', 'in-progress'][n % 4]]"
                >
                  {{ ['Completed', 'Pending', 'Rejected', 'In Progress'][n % 4] }}
                </td>
                <td>
                  <EyeIcon size="18" class="action-icon" /><EditIcon
                    size="18"
                    class="action-icon"
                  />
                </td>
              </tr>
              <tr v-for="n in 5" :key="'more-' + n">
                <td>{{ n + 20 }}</td>
                <td>
                  Sitio {{ ['Masao', 'Babag', 'San Vicente', 'Taguibo', 'Baybay'][n % 5] }},
                  Buenavista
                </td>
                <td>
                  {{
                    [
                      'Duane Dean',
                      'Jonathan Barker',
                      'Michael Jordan',

                      'Christine Brooks',
                      'Rosie Pearson',
                      'Darrell Caldwell',
                      'Gilbert Johnston',
                      'Michael Phelps',
                    ][(n + 2) % 9]
                  }}
                </td>
                <td>{{ n % 3 === 0 ? 'Reviewed' : 'Needs Attention' }}</td>
                <td :class="['severity-' + ((n + 1) % 3)]">
                  {{ ['Major', 'Emergency', 'Minor'][(n + 1) % 3] }}
                </td>
                <td
                  :class="[
                    'status-' + ['completed', 'pending', 'rejected', 'in-progress'][(n + 2) % 4],
                  ]"
                >
                  {{ ['Pending', 'Rejected', 'In Progress', 'Completed'][(n + 2) % 4] }}
                </td>
                <td>
                  <EyeIcon size="18" class="action-icon" /><EditIcon
                    size="18"
                    class="action-icon"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="bubbles">
      <span v-for="i in 50" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
    </div>

    <v-dialog v-model="logoutConfirmationVisible" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5"> Confirm Logout </v-card-title>
        <v-card-text> Are you sure you want to log out of the administrator dashboard?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="logoutConfirmationVisible = false">
            No, Stay Here
          </v-btn>
          <v-btn color="primary" variant="text" @click="logout"> Yes, Log Out </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="notificationMessage" class="notification-toast">
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Bell as BellIcon,
  User as UserIcon,
  Eye as EyeIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Clock as ClockIcon,
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const profilePicture = ref(null)
const logoutConfirmationVisible = ref(false)
const currentTime = ref('')
const currentDate = ref('') // Ref for the date
let intervalId = null
const notificationMessage = ref('')
const hasNewNotification = ref(true) // Simulate a new notification initially

const navigateTo = (page) => {
  console.log(`Navigating to ${page}`)
  notificationMessage.value = `Navigating to ${page}`
  setTimeout(() => {
    notificationMessage.value = ''
  }, 2000)
}

const updateDateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
  currentDate.value = now.toLocaleDateString() // Get the local date string
}

const showNotification = (message) => {
  notificationMessage.value = message
  hasNewNotification.value = false // Clear the new notification badge
  setTimeout(() => {
    notificationMessage.value = ''
  }, 3000)
}

onMounted(() => {
  updateDateTime()
  intervalId = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const showLogoutConfirmation = () => {
  logoutConfirmationVisible.value = true
}

const logout = () => {
  console.log('Logging out...')
  router.push('/login')
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #2c3e50;
  overflow: hidden;
  position: relative;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.nav-links {
  list-style: none;
  padding: 0;
  width: 100%;
}

.nav-links li {
  margin-bottom: 1px;
}

.nav-links li a,
.nav-links li .router-link-active {
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-links li a:hover {
  background-color: #34495e;
}

.nav-links li .router-link-active {
  background-color: #34495e;
  font-weight: bold;
}

.dashboard-content {
  flex-grow: 1;
  padding: 30px;
  background-color: rgba(44, 62, 80, 0.9); /* Bahagyang mas matingkad na dark blue na may opacity */
}

.top-bar {
  display: flex;
  background-color: #2c3e50;
  color: #fff;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  align-items: center;
}

.notification-icon {
  margin-right: 20px;
  cursor: pointer;
  color: #fff;
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e74c3c;
  color: #fff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  font-size: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  color: #fff;
}

.avatar-placeholder {
  background-color: #555;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: #eee;
}

.dashboard-widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.widget-card {
  background-color: rgba(52, 73, 94, 0.8);
  padding: 25px;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 150px;
}

.widget-card.large-icon {
  padding: 30px;
  justify-content: center;
}

.widget-card.large-icon svg {
  margin-bottom: 15px;
}

.widget-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
}

.widget-value {
  font-size: 2rem;
  font-weight: bold;
}

.widget-sub-value {
  font-size: 0.9rem;
  color: #ccc;
  margin-top: 5px;
}

.widget-metric {
  font-size: 1rem;
  margin-bottom: 5px;
}

.widget-metric .busy {
  color: #e74c3c;
  font-weight: bold;
}

.monthly-revenue {
  align-items: center;
}

.revenue-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.revenue-details {
  font-size: 0.9rem;
  color: #eee;
}

.system-status {
  align-items: flex-start;
  text-align: left;
  padding: 20px;
}

.status-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 1rem;
}

.status-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

.status-item.healthy .status-indicator {
  background-color: #2ecc71;
}

.status-item.warning .status-indicator {
  background-color: #f39c12;
}

.status-item.stable .status-indicator {
  background-color: #3498db;
}

.status-item.ok .status-indicator {
  background-color: #27ae60;
}

.widget-card ul {
  list-style: none;
  padding: 0;
  text-align: left;
  width: 100%;
}

.widget-card li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.widget-card li:last-child {
  border-bottom: none;
}

.report-leaks-section {
  background-color: rgba(52, 73, 94, 0.8);
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.report-leaks-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.filter-button {
  background-color: #4a6572;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #5c7a89;
}

.filter-button.reset {
  background-color: #e67e22;
}

.search-bar {
  display: flex;
  margin-left: auto;
}

.search-bar input {
  padding: 8px;
  border: 1px solid #4a6572;
  border-radius: 4px 0 0 4px;
  background-color: #2c3e50;
  color: #eee;
}

.search-bar button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.report-table-container {
  overflow-x: auto;
}

.report-table-container table {
  width: 100%;
  border-collapse: collapse;
}

.report-table-container th,
.report-table-container td {
  padding: 10px 15px;
  text-align: left;
  border-bottom: 1px solid #4a6572;
}

.report-table-container th {
  background-color: #2c3e50;
  font-weight: bold;
}

.report-table-container tbody tr:nth-child(even) {
  background-color: #2c3e50;
}

.emergency {
  color: #e74c3c;
  font-weight: bold;
}

.major {
  color: #f39c12;
  font-weight: bold;
}

.minor {
  color: #f1c40f;
  font-weight: bold;
}

.report-table-container .status-completed {
  color: #2ecc71;
  font-weight: bold;
}

.report-table-container .status-in-progress {
  color: #3498db;
  font-weight: bold;
}

.report-table-container .status-rejected {
  color: #95a5a6;
  font-weight: bold;
}

.report-table-container .status-pending {
  color: #ff9800; /* Example color for pending */
  font-weight: bold;
}

.action-icon {
  margin-left: 10px;
  cursor: pointer;
}

.high-severity {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px; /* Adjust as needed */
}

.high-severity .widget-value {
  color: #e74c3c; /* Example color for high severity */
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.high-severity .widget-sub-value {
  font-size: 0.9rem;
  color: #eee;
}

.average-resolution {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px; /* Adjust as needed */
}

.average-resolution .widget-value {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.average-resolution .widget-sub-value {
  font-size: 0.9rem;
  color: #eee;
}

.pending-reports {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px; /* Adjust as needed */
}

.pending-reports .widget-value {
  color: #ff9800; /* Example color for pending */
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.pending-reports .widget-sub-value {
  font-size: 0.9rem;
  color: #eee;
}

.report-leaks-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.6rem; /* Slightly larger heading */
}

.filters {
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.filter-button {
  background-color: #5c6bc0; /* Different shade of blue */
  color: #fff;
  border: none;
  padding: 10px 18px; /* Slightly more padding */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.95rem;
}

.filter-button:hover {
  background-color: #7986cb;
}

.filter-button.reset {
  background-color: #d32f2f; /* Red for reset */
}

.filter-button.reset:hover {
  background-color: #f44336;
}

.search-bar {
  display: flex;
  margin-left: auto;
}

.search-bar input {
  padding: 10px;
  border: 1px solid #5c6bc0;
  border-radius: 5px 0 0 5px;
  background-color: #303f9f; /* Darker blue */
  color: #eee;
  font-size: 0.95rem;
}

.search-bar button {
  background-color: #5c6bc0;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.report-table-container {
  overflow-x: auto;
}

.report-table-container table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.report-table-container th,
.report-table-container td {
  padding: 12px 15px; /* Slightly more padding */
  text-align: left;
  border-bottom: 1px solid #5c6bc0;
}

.report-table-container th {
  background-color: #303f9f;
  font-weight: bold;
  color: #fff;
}

.report-table-container tbody tr:nth-child(even) {
  background-color: #303f9f;
  color: #eee;
}

.report-table-container tbody tr:hover {
  background-color: #3f51b5; /* Lighter blue on hover */
}

.report-table-container .severity-minor {
  color: #fdd835; /* Yellow */
  font-weight: bold;
}

.report-table-container .severity-major {
  color: #ff9800; /* Orange */
  font-weight: bold;
}

.report-table-container .severity-emergency {
  color: #f44336; /* Red */
  font-weight: bold;
}

.report-table-container .status-completed {
  color: #4caf50; /* Green */
  font-weight: bold;
}

.report-table-container .status-in-progress {
  color: #2196f3; /* Blue */
  font-weight: bold;
}

.report-table-container .status-rejected {
  color: #f44336; /* Red */
  font-weight: bold;
}

.report-table-container .status-pending {
  color: #ffc107; /* Amber */
  font-weight: bold;
}

.action-icon {
  margin-left: 8px;
  cursor: pointer;
  color: #fff; /* White action icons */
}

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

.notification-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #34495e;
  color: #fff;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
</style>

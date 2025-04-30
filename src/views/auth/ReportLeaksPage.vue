<template>
  <div class="report-leaks-page">
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
      <div class="report-leaks-container">
        <div class="report-header">
          <h1>Report Leaks</h1>
        </div>
        <div class="report-filters">
          <div class="filter-group">
            <SlidersIcon />
            <span>Filter By</span>
          </div>
          <div class="severity-filter">
            <button class="severity-dropdown-toggle" @click="toggleSeverityDropdown">
              Severity
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="width: 1em; height: 1em; margin-left: 5px"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div v-if="showSeverityDropdown" class="severity-dropdown-menu">
              <label v-for="severity in severityOptions" :key="severity">
                <input
                  type="radio"
                  name="severity"
                  :value="severity"
                  v-model="selectedSeverityFilter"
                />
                {{ severity }}
              </label>
              <p class="severity-note">*You can choose one Order Severity</p>
            </div>
          </div>
          <div class="technician-filter">
            <button class="technician-dropdown-toggle" @click="toggleTechnicianDropdown">
              Technician
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="width: 1em; height: 1em; margin-left: 5px"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div v-if="showTechnicianDropdown" class="technician-dropdown-menu">
              <label v-for="technician in uniqueTechnicians" :key="technician">
                <input
                  type="radio"
                  name="technician"
                  :value="technician"
                  v-model="selectedTechnicianFilter"
                />
                {{ technician }}
              </label>
              <p class="technician-note">*You can choose one Technician</p>
            </div>
          </div>
          <div class="status-filter">
            <button class="status-dropdown-toggle" @click="toggleStatusDropdown">
              Order Status
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style="width: 1em; height: 1em; margin-left: 5px"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div v-if="showStatusDropdown" class="status-dropdown-menu">
              <label v-for="status in statusOptions" :key="status">
                <input type="radio" name="status" :value="status" v-model="selectedStatusFilter" />
                {{ status }}
              </label>
              <p class="status-note">*You can choose one Order Status</p>
            </div>
          </div>
          <button class="reset-filter" @click="resetFilters">
            <RefreshCwIcon />
            Reset Filter
          </button>
          <div class="search-bar">
            <input type="text" placeholder="Search" />
            <button>
              <SearchIcon />
            </button>
          </div>
        </div>

        <div class="report-table-container">
          <table>
            <thead>
              <tr>
                <th>IMAGE PREVIEW</th>
                <th>TECHNICIAN</th>
                <th>LOCATION</th>
                <th>
                  Severity
                  <button
                    v-if="selectedSeverityFilter"
                    class="clear-filter-button"
                    @click="clearSeverityFilter"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style="width: 0.8em; height: 0.8em"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </th>
                <th>ID</th>
                <th>
                  Status and Action
                  <button
                    v-if="selectedStatusFilter"
                    class="clear-filter-button"
                    @click="clearStatusFilter"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style="width: 0.8em; height: 0.8em"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredReportData" :key="item.id">
                <td>
                  <div
                    v-if="item.imageSrc"
                    class="image-preview"
                    :style="{ backgroundImage: `url(${item.imageSrc})` }"
                  ></div>
                  <div v-else class="image-preview placeholder"></div>
                  <div
                    v-if="item.anotherImageSrc"
                    class="image-preview"
                    :style="{ backgroundImage: `url(${item.anotherImageSrc})` }"
                  ></div>
                  <div v-else class="image-preview placeholder"></div>
                </td>
                <td>
                  <div class="technician-cell">
                    <button class="assign-technician-button" @click="showTechnicianSelection(item)">
                      ⊕
                    </button>
                    <span
                      :class="{
                        available: getTechnicianAvailability(item.technician) === 'available',
                        unavailable: getTechnicianAvailability(item.technician) === 'unavailable',
                      }"
                    >
                      {{ item.technician }}
                    </span>
                    <svg
                      v-if="item.online"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      color="#5cb85c"
                      class="online-indicator"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                </td>
                <td>{{ item.location }}</td>
                <td :class="`severity ${item.severity.toLowerCase().replace(' ', '-')}`">
                  {{ item.severity }}
                </td>
                <td>{{ item.id }}</td>
                <td :class="`status ${item.status.toLowerCase()}`">{{ item.status }}</td>
                <td class="actions">
                  <button class="view-button">
                    <EyeIcon />
                  </button>
                  <button class="delete-button">
                    <Trash2Icon />
                  </button>
                </td>
              </tr>
              <tr
                v-if="filteredReportData.length < 6"
                :key="'empty-' + index"
                v-for="index in 6 - filteredReportData.length"
              >
                <td colspan="7">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="report-footer">
          <span
            >Showing
            {{ filteredReportData.length > 0 ? '1-' + filteredReportData.length : '0-0' }} of
            {{ originalReportData.length }}</span
          >
          <button class="add-task-button">+ Add Task</button>
          <div class="pagination-controls">
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="logoutConfirmationVisible" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5">Confirm Logout</v-card-title>
        <v-card-text>Are you sure you want to log out?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="logoutConfirmationVisible = false">
            No
          </v-btn>
          <v-btn color="primary" variant="text" @click="logout">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="technicianSelectionVisible" width="auto">
      <v-card style="background-color: #1e272e; color: #eee">
        <v-card-title class="text-h5" style="color: #eee">
          Select Available Plumber or Waterline Technician
        </v-card-title>
        <v-card-text>
          <div class="available-technicians">
            <div
              v-for="technician in availableTechnicians"
              :key="technician.name"
              class="technician-option"
              style="color: #eee"
            >
              <input
                type="checkbox"
                :id="technician.name"
                :value="technician.name"
                v-model="selectedTechnicians"
              />
              <label :for="technician.name" style="color: #eee">
                <span
                  :class="{
                    available: technician.availability === 'available',
                    unavailable: technician.availability === 'unavailable',
                  }"
                ></span>
                {{ technician.name }}
              </label>
            </div>
          </div>
          <small class="multiple-selection-note" style="color: #999"
            >*You can choose multiple technicians.</small
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="technicianSelectionVisible = false"
            style="color: #ccc"
          >
            Cancel
          </v-btn>
          <v-btn color="primary" variant="text" @click="applySelectedTechnicians">
            Apply Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div class="bubbles">
    <span v-for="i in 50" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
  </div>
</template>

<style scoped>
.report-leaks-page {
  display: flex;
  height: 100vh;
  background-color: #1e272e;
  color: #eee;
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

.report-leaks-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Important to allow it to grow */
  height: 100%; /* Ensure it tries to take full height */
  overflow-y: auto; /* Add this to make the table scrollable within the container */
}

.report-header {
  margin-bottom: 20px;
}

.report-header h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.report-filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ccc;
}

.filter-group svg {
  width: 18px;
  height: 18px;
}

.severity-filter {
  position: relative;
}

.severity-dropdown-toggle {
  padding: 8px 12px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #34495e;
  color: #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.severity-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #2c3e50;
  color: #eee;
  border: 1px solid #444;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.severity-dropdown-menu label {
  display: flex;
  align-items: center;
}

.severity-dropdown-menu input[type='radio'] {
  margin-right: 8px;
}

.severity-note {
  font-size: 0.8em;
  color: #999;
  margin-top: 5px;
  margin-bottom: 10px;
}

.apply-severity-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.report-filters select {
  padding: 8px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #34495e;
  color: #eee;
}

.reset-filter {
  background-color: transparent;
  border: 1px solid #555;
  color: #eee;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
}

.reset-filter svg {
  width: 16px;
  height: 16px;
}

.reset-filter:hover {
  background-color: #34495e;
}

.search-bar {
  display: flex;
  margin-left: auto;
}

.search-bar input {
  padding: 8px;
  border: 1px solid #444;
  border-radius: 4px 0 0 4px;
  border-right: none;
  background-color: #34495e;
  color: #eee;
}

.search-bar input::placeholder {
  color: #999;
}

.search-bar button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.search-bar button svg {
  width: 18px;
  height: 18px;
}

.report-table-container {
  overflow-x: auto;
  margin-bottom: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.report-table-container table {
  width: 100%; /* Make the table take full width of its container */
  border-collapse: collapse; /* Collapse borders for a cleaner look */
}

.report-table-container thead th {
  padding: 12px;
  text-align: left;
  background-color: #34495e;
  border-bottom: 2px solid #444;
}

.report-table-container tbody td {
  padding: 10px;
  border-bottom: 1px solid #444;
  vertical-align: middle; /* Ensure content is vertically centered by default */
}

.report-table-container tbody tr:last-child td {
  border-bottom: none; /* Typically the last row doesn't have a bottom border */
}

.report-table-container tbody tr td.actions {
  text-align: center !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 10px !important;
}

.image-preview.placeholder {
  background-color: #777;
}

.image-preview {
  width: 40px;
  height: 30px;
  background-color: #555;
  margin-right: 5px;
  display: inline-block;
  background-size: cover; /* Ensure the image covers the preview area */
  background-position: center; /* Center the image within the preview area */
}

.severity {
  font-weight: bold;
}

.severity.emergency {
  color: #dc3545;
}

.severity.major-leak {
  color: #ffc107;
}

.severity.minor-leak {
  color: #28a745;
}

.status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 30px;
  vertical-align: middle;
  line-height: 1;
  border-radius: 5px; /* Add some rounding to the status badge */
  color: #fff; /* Default text color for status */
}

.status.completed {
  background-color: #28a745;
}

.status.in-progress {
  background-color: #007bff;
}

.status.rejected {
  background-color: #dc3545;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.actions button {
  background: none;
  border: none;
  color: #eee;
  cursor: pointer;
  padding: 5px;
}

.actions button:hover {
  opacity: 0.8;
}

.actions svg {
  width: 20px;
  height: 20px;
}

.report-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ccc;
  padding-top: 15px;
}

.add-task-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-controls button {
  background-color: transparent;
  border: 1px solid #555;
  color: #eee;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  transition: background-color 0.3s ease;
}

.pagination-controls button:hover {
  background-color: #34495e;
}

.online-indicator {
  width: 10px;
  height: 10px;
  fill: #5cb85c;
  stroke: none;
  border-radius: 50%;
  display: inline-block;
  margin-left: 5px;
  vertical-align: middle;
}

.assign-technician-button {
  background: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-right: 5px;
  padding: 0;
  font-size: 1em;
  vertical-align: middle;
}

.technician-cell {
  display: flex;
  align-items: center;
}

.available-technicians {
  margin-bottom: 10px;
}

.technician-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.technician-option input[type='checkbox'] {
  margin-right: 8px;
}

.technician-option label {
  display: flex;
  align-items: center;
}

.technician-option label span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.technician-option label span.available {
  background-color: #5cb85c;
}

.technician-option label span.unavailable {
  background-color: #dc3545;
}

.multiple-selection-note {
  display: block;
  font-size: 0.8em;
  color: #999;
  margin-top: 10px;
}

.technician-cell span.available {
  color: #5cb85c;
}

.technician-cell span.unavailable {
  color: #dc3545;
}

.technician-filter {
  position: relative;
}

.technician-dropdown-toggle {
  padding: 8px 12px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #34495e;
  color: #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.technician-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #2c3e50;
  color: #eee;
  border: 1px solid #444;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.technician-dropdown-menu label {
  display: flex;
  align-items: center;
}

.technician-dropdown-menu input[type='radio'] {
  margin-right: 8px;
}

.technician-note {
  font-size: 0.8em;
  color: #999;
  margin-top: 5px;
  margin-bottom: 10px;
}

.apply-technician-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.clear-filter-button {
  background: transparent;
  border: none;
  color: #eee;
  cursor: pointer;
  margin-left: 5px;
  padding: 0;
  font-size: 0.8em;
  vertical-align: middle;
}

.status-filter {
  position: relative;
}

.status-dropdown-toggle {
  padding: 8px 12px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #34495e;
  color: #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.status-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #2c3e50;
  color: #eee;
  border: 1px solid #444;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.status-dropdown-menu label {
  display: flex;
  align-items: center;
}

.status-dropdown-menu input[type='radio'] {
  margin-right: 8px;
}

.status-note {
  font-size: 0.8em;
  color: #999;
  margin-top: 5px;
  margin-bottom: 10px;
}

.apply-status-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

/* Fix status box alignment */
.status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 30px;
  vertical-align: middle;
  line-height: 1;
  border-radius: 5px; /* Add some rounding to the status badge */
  color: #fff; /* Default text color for status */
}

.status.pending {
  background-color: #ffc107;
  color: #333;
}

.status.on-hold {
  background-color: #6c757d;
  color: #fff;
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
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { SlidersIcon } from 'lucide-vue-next'
import { Bell as BellIcon } from 'lucide-vue-next'
import { User as UserIcon } from 'lucide-vue-next'
import { Eye as EyeIcon } from 'lucide-vue-next'
import { Trash2 as Trash2Icon } from 'lucide-vue-next'
import { RefreshCw as RefreshCwIcon } from 'lucide-vue-next'
import { Search as SearchIcon } from 'lucide-vue-next'

const router = useRouter()
const logoutConfirmationVisible = ref(false)
const technicianSelectionVisible = ref(false)
const selectedReportItem = ref(null)
const selectedTechnicians = ref([])

// Severity Filter
const showSeverityDropdown = ref(false)
const selectedSeverityFilter = ref('')
const severityOptions = ref(['Emergency', 'Major Leak', 'Minor Leak', 'Rejected'])

// Technician Filter
const showTechnicianDropdown = ref(false)
const selectedTechnicianFilter = ref('')
const availableTechnicians = ref([
  { name: 'Christine Brooks', availability: 'available', type: 'plumber' },
  { name: 'Rosie Pearson', availability: 'unavailable', type: 'waterline technician' },
  { name: 'Darrell Caldwell', availability: 'available', type: 'plumber' },
  { name: 'Gilbert Johnston', availability: 'available', type: 'waterline technician' },
  { name: 'Alan Cain', availability: 'unavailable', type: 'plumber' },
  { name: 'Lebron James', availability: 'available', type: 'plumber' },
  { name: 'Stephen Curry', availability: 'unavailable', type: 'waterline technician' },
])
const uniqueTechnicians = computed(() => {
  return availableTechnicians.value.map((tech) => tech.name)
})

// Status Filter
const showStatusDropdown = ref(false)
const selectedStatusFilter = ref('')
const statusOptions = ref(['Completed', 'In Progress', 'Rejected', 'Pending', 'On Hold'])

const originalReportData = ref([
  {
    id: '00001',
    location: 'Purok 1, Ampayon',
    technician: 'Christine Brooks',
    severity: 'Emergency',
    status: 'Completed',
    online: true,
    imageSrc: '/path/to/image1.jpg',
    anotherImageSrc: '/path/to/another_image1.png',
  },
  {
    id: '00002',
    location: 'Purok 2, Ampayon',
    technician: 'Rosie Pearson',
    severity: 'Major Leak',
    status: 'In Progress',
    online: false,
    imageSrc: '/path/to/image2.jpg',
    anotherImageSrc: null,
  },
  {
    id: '00003',
    location: 'Purok 3, Ampayon',
    technician: 'Darrell Caldwell',
    severity: 'Minor Leak',
    status: 'Rejected',
    online: true,
  },
  {
    id: '00004',
    location: 'Purok 4, Ampayon',
    technician: 'Gilbert Johnston',
    severity: 'Minor Leak',
    status: 'Completed',
    online: true,
  },
  {
    id: '00005',
    location: 'Purok 5, Ampayon',
    technician: 'Alan Cain',
    severity: 'Minor Leak',
    status: 'Completed',
    online: false,
  },
  {
    id: '00006',
    location: 'Purok 3, Ampayon',
    technician: 'Rosie Pearson',
    severity: 'Emergency',
    status: 'Completed',
    online: true,
  },
  {
    id: '00007',
    location: 'Purok 6, Ampayon',
    technician: 'Juan Dela Cruz',
    severity: 'Rejected',
    status: 'Pending',
    online: true,
  },
])

const filteredReportData = computed(() => {
  let filtered = [...originalReportData.value]

  if (selectedSeverityFilter.value) {
    filtered = filtered.filter((item) => item.severity === selectedSeverityFilter.value)
  }

  if (selectedTechnicianFilter.value) {
    filtered = filtered.filter((item) => item.technician === selectedTechnicianFilter.value)
  }

  if (selectedStatusFilter.value) {
    filtered = filtered.filter((item) => item.status === selectedStatusFilter.value)
  }

  return filtered
})

const goToDashboard = () => {
  console.log('Navigating to Dashboard')
  router.push('/admin-dashboard')
}

const goToContact = () => {
  console.log('Navigating to Contact Page')
  router.push('/technician-dashboard')
}

const showLogoutConfirmation = () => {
  logoutConfirmationVisible.value = true
}

const logout = () => {
  console.log('Logging out...')
  router.push('/login')
}

const showTechnicianSelection = (item) => {
  selectedReportItem.value = item
  selectedTechnicians.value = []
  technicianSelectionVisible.value = true
}

const applySelectedTechnicians = () => {
  if (selectedReportItem.value) {
    selectedReportItem.value.technician = selectedTechnicians.value.join(', ')
  }
  technicianSelectionVisible.value = false
}

const getTechnicianAvailability = (technicianName) => {
  const technician = availableTechnicians.value.find((tech) => tech.name === technicianName)
  return technician ? technician.availability : 'unknown'
}

// Severity Filter Functions
const toggleSeverityDropdown = () => {
  showSeverityDropdown.value = !showSeverityDropdown.value
}
const clearSeverityFilter = () => {
  selectedSeverityFilter.value = ''
}

// Technician Filter Functions
const toggleTechnicianDropdown = () => {
  showTechnicianDropdown.value = !showTechnicianDropdown.value
}
const clearTechnicianFilter = () => {
  selectedTechnicianFilter.value = ''
}

// Status Filter Functions
const toggleStatusDropdown = () => {
  showStatusDropdown.value = !showStatusDropdown.value
}
const clearStatusFilter = () => {
  selectedStatusFilter.value = ''
}

// Reset Filters Function
const resetFilters = () => {
  selectedSeverityFilter.value = ''
  selectedTechnicianFilter.value = ''
  selectedStatusFilter.value = ''
}
</script>

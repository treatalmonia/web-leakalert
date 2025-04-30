<template>
  <div class="report-leak-container">
    <div class="header">
      <h1>Report a New Leak</h1>
      <p class="subheader">Please provide as much detail as possible about the leak.</p>
      <router-link to="/client-dashboard" class="back-to-dashboard">
        <i class="mdi mdi-arrow-left"></i> Back to Dashboard
      </router-link>
    </div>

    <div class="report-form">
      <div class="form-section">
        <h2>Location Details</h2>
        <div class="form-group">
          <label for="locationType">Type of Location:</label>
          <select id="locationType" v-model="leakDetails.locationType">
            <option value="">Select Location Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="public">Public Area</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="specificLocation">Specific Location:</label>
          <textarea
            id="specificLocation"
            v-model="leakDetails.specificLocation"
            placeholder="e.g., Street address, Landmark, Specific area within a building"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="coordinates">Coordinates (Optional):</label>
          <div class="coordinates-input">
            <input
              type="text"
              id="latitude"
              v-model="leakDetails.latitude"
              placeholder="Latitude"
            />
            <input
              type="text"
              id="longitude"
              v-model="leakDetails.longitude"
              placeholder="Longitude"
            />
            <button @click="getCurrentLocation">Get My Current Location</button>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Leak Details</h2>
        <div class="form-group">
          <label for="severity">Severity of Leak:</label>
          <select id="severity" v-model="leakDetails.severity">
            <option value="">Select Severity</option>
            <option value="minor">Minor</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">Description of Leak:</label>
          <textarea
            id="description"
            v-model="leakDetails.description"
            placeholder="Describe the leak in detail: size, flow rate, sound, etc."
          ></textarea>
        </div>
        <div class="form-group">
          <label for="timeDetected">Time Detected (Optional):</label>
          <input type="datetime-local" id="timeDetected" v-model="leakDetails.timeDetected" />
        </div>
      </div>

      <div class="form-section">
        <h2>Visual Evidence</h2>
        <div class="form-group">
          <label for="imageUpload">Upload Images (Up to 3):</label>
          <input
            type="file"
            id="imageUpload"
            multiple
            @change="handleImageUpload"
            accept="image/*"
          />
          <div class="image-preview-container">
            <div v-for="(image, index) in uploadedImages" :key="index" class="image-preview">
              <img :src="image.url" alt="Uploaded Image" class="preview-image" />
              <button @click="removeImage(index)" class="remove-image-button">Remove</button>
            </div>
            <p v-if="uploadedImages.length === 0" class="no-images">No images uploaded yet.</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Reporter Information (Optional)</h2>
        <div class="form-group">
          <label for="reporterName">Your Name:</label>
          <input
            type="text"
            id="reporterName"
            v-model="reporterInfo.name"
            placeholder="Your Name"
          />
        </div>
        <div class="form-group">
          <label for="reporterContact">Contact Number:</label>
          <input
            type="tel"
            id="reporterContact"
            v-model="reporterInfo.contact"
            placeholder="Your Contact Number"
          />
        </div>
        <div class="form-group">
          <label for="reporterEmail">Email Address:</label>
          <input
            type="email"
            id="reporterEmail"
            v-model="reporterInfo.email"
            placeholder="Your Email Address"
          />
        </div>
      </div>

      <div class="form-actions">
        <button @click="submitReport" class="submit-button">Submit Report</button>
        <button @click="resetForm" class="reset-button">Reset Form</button>
      </div>
    </div>

    <div class="bubbles">
      <span v-for="i in 100" :key="i" :style="`--i: ${i}; left: ${Math.random() * 100}vw;`"></span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      leakDetails: {
        locationType: '',
        specificLocation: '',
        latitude: '',
        longitude: '',
        severity: '',
        description: '',
        timeDetected: null,
      },
      uploadedImages: [],
      reporterInfo: {
        name: '',
        contact: '',
        email: '',
      },
    }
  },
  methods: {
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.leakDetails.latitude = position.coords.latitude
            this.leakDetails.longitude = position.coords.longitude
            alert(
              `Current location: Latitude ${this.leakDetails.latitude}, Longitude ${this.leakDetails.longitude}`,
            )
          },
          (error) => {
            alert(`Error getting location: ${error.message}`)
          },
        )
      } else {
        alert('Geolocation is not supported by your browser.')
      }
    },
    handleImageUpload(event) {
      const files = event.target.files
      if (this.uploadedImages.length + files.length > 3) {
        alert('You can upload a maximum of 3 images.')
        return
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onloadend = () => {
          this.uploadedImages.push({ file: file, url: reader.result })
        }
        reader.readAsDataURL(file)
      }
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1)
    },
    submitReport() {
      console.log('Leak Details:', this.leakDetails)
      console.log(
        'Uploaded Images:',
        this.uploadedImages.map((img) => img.file.name),
      )
      console.log('Reporter Info:', this.reporterInfo)
      alert('Report submitted successfully!')
      this.resetForm()
    },
    resetForm() {
      this.leakDetails = {
        locationType: '',
        specificLocation: '',
        latitude: '',
        longitude: '',
        severity: '',
        description: '',
        timeDetected: null,
      }
      this.uploadedImages = []
      this.reporterInfo = {
        name: '',
        contact: '',
        email: '',
      }
    },
  },
}
</script>

<style scoped>
.report-leak-container {
  background-color: #1e272e;
  color: #eee;
  min-height: calc(100vh - 0px);
  padding: 40px;
  position: relative;
  overflow: hidden; /* To contain the bubbles */
  display: flex; /* Add flex display */
  flex-direction: column; /* Stack header and form vertically */
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.header .subheader {
  color: #999;
  font-size: 1.1em;
}

.back-to-dashboard {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #81c784;
  text-decoration: none;
  margin-top: 20px;
  transition: color 0.3s ease;
}

.back-to-dashboard:hover {
  color: #a5d6a7;
}

.report-form {
  background-color: #2c3e50;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 0 auto;
  z-index: 2; /* Ensure form is above bubbles */
  position: relative; /* For z-index to work */
  flex-grow: 1; /* Allow the form to take up remaining vertical space */
  display: flex; /* Add flex display for form content */
  flex-direction: column; /* Stack form sections vertically */
}

.form-section {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #34495e;
}

.form-section h2 {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: #eee;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: #ddd;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type='text'],
.form-group input[type='tel'],
.form-group input[type='email'],
.form-group input[type='datetime-local'],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #34495e;
  border-radius: 4px;
  background-color: #34495e;
  color: #eee;
  box-sizing: border-box;
  font-size: 1em;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.coordinates-input {
  display: flex;
  gap: 10px;
  align-items: center;
}

.coordinates-input input[type='text'] {
  flex-grow: 1;
}

.coordinates-input button {
  padding: 10px 15px;
  background-color: #3867d6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.coordinates-input button:hover {
  background-color: #2a4ba7;
}

.image-preview-container {
  display: flex;
  gap: 15px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.image-preview {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #555;
  border-radius: 4px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-button {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-image-button:hover {
  background-color: #c0392b;
}

.no-images {
  color: #999;
  font-style: italic;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding-top: 20px;
}

.form-actions button {
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button {
  background-color: #2ecc71;
  color: #fff;
}

.submit-button:hover {
  background-color: #27ae60;
}

.reset-button {
  background-color: #f39c12;
  color: #fff;
}

.reset-button:hover {
  background-color: #e67e22;
}

/* Correct Bubble Background Styles */
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
  left: v-bind('Math.random() * 100 + "vw"'); /* Vue binding for dynamic left */
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

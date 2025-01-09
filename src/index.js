import { renderUI } from "./modules/ui";
import { renderChart } from "./modules/chart";
import { fetchData } from "./modules/api";
import { handleLinkClicks, handleTestClicks } from "./modules/helper";


const spinner = document.getElementById('loading-spinner');
const container = document.querySelector('.container');
const patientsList = document.querySelector('.patient-list')
const LOADING_DELAY = 1000;

patientsList.innerHTML = '';

/**
 * 
 * @param {boolean} isLoading - True to show spinner, False to hide
 */
const toggleSpinner = (isLoading) => {
  spinner.classList.toggle("hidden", !isLoading);
  container.classList.toggle("hidden", isLoading);
}


/**
 * Fetches data with spinner and handles the spinner
 * @param {Promise<*>} - The fetched data or an error if fetching fails
 */
const fetchDataWithSpinner = async () => {
  toggleSpinner(true);
  try {
    const data = await new Promise((resolve, reject) =>
      setTimeout( async () => {
        try {
          const result = await fetchData();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, LOADING_DELAY)
    )
    return data;

  } catch (error) {
    throw error
  } finally {
    toggleSpinner(false);
  }
}

/**
 * Handles patient clicked and update ui and chart
 * @param {Object} data - Array of patient data
 */

// Function to handle clicking on a patient
const handleClickedPatient = (data) => {
  const patientContainer = document.querySelector('.patient-list');
  console.log(data)
  
  patientContainer.addEventListener('click', (event) => {
    const clickedElement = event.target.closest('.patients-info');

    if (clickedElement) {
      const index = Array.from(patientContainer.children).indexOf(clickedElement)
      // const index = parseInt(clickedElement.dataset.index, 10)
      // index !== -1
      if (index !== -1) {
        // Find data of the clicked patient
        const clickedPatient = data[index];
        renderUI(clickedPatient)
        renderChart([clickedPatient]);
      }
    }
  })
}

const renderPatientList = (data) => {
  data.forEach((item, index) => {
    const { name, gender, age, profile_picture } = item;
    const patientItem = `
      <li class="patients-info" key="${index}">
        <div class="patients-info__details">
          <img src="${profile_picture}" alt="Profile picture of ${profile_picture}" class="patients-img">
          <div>
            <p class="patients-name">${name}</p>
            <p class="patients-details">
              <span class="patients-gender">${gender}, </span>
              <span class="patients-age">${age}</span>
            </p>
          </div>
        </div>
        <img src="./more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="" class="three-dots-img">
      </li>
    `
    patientsList.insertAdjacentHTML("beforeend", patientItem);
  })
}

/**
 * Initialize the app by fetching data, rendering ui and setting up event handlers
*/
const initializeApp = async () => {
  try {
    const data = await fetchDataWithSpinner();
    if (data && data.length > 0) {
      // Find and display Jessica initially
      const defaultPatient = data.find((patient) => patient.name === "Jessica Taylor") || data[0];
        renderUI(defaultPatient);
        renderChart([defaultPatient]);
    }
    renderPatientList(data)
    handleClickedPatient(data)
  } catch (error) {
    console.error("Failed to initialize the app:", error);
    // container.innerHTML = "<p class='failed'>Failed to load data. Please try again later!</p>"
  }
}

initializeApp()
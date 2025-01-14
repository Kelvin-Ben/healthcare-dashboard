import { renderUI } from "./modules/ui";
import { renderChart } from "./modules/chart";
import { fetchData } from "./modules/api";
import {
  handleLinkClicks,
  searchPatient,
  toggleSpinner,
  renderPatientList,
} from "./modules/helper";

const container = document.querySelector(".container");
const LOADING_DELAY = 1000;

// attach window to searchPatient function
window.searchPatient = searchPatient;

/**
 * Fetches data with spinner and handles the spinner
 * @param {Promise<*>} - The fetched data or an error if fetching fails
 */
const fetchDataWithSpinner = async () => {
  toggleSpinner(true);
  try {
    const data = await new Promise((resolve, reject) =>
      setTimeout(async () => {
        try {
          const result = await fetchData();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, LOADING_DELAY)
    );
    return data;
  } catch (error) {
    throw error;
  } finally {
    toggleSpinner(false);
  }
};

/**
 * Handle patient clicked and update ui and chart
 * @param {Object} data - Array of patient data
 */
const handleClickedPatient = (data) => {
  const patientContainer = document.querySelector(".patient-list");

  patientContainer.addEventListener("click", (event) => {
    const clickedElement = event.target.closest(".patients-info");

    if (clickedElement) {
      const index = Array.from(patientContainer.children).indexOf(
        clickedElement
      );
      if (index !== -1) {
        const clickedPatient = data[index];
        renderUI(clickedPatient);
        renderChart([clickedPatient]);
      }
    }
  });
};

const initializeApp = async () => {
  try {
    const data = await fetchDataWithSpinner();
    if (data && data.length > 0) {
      // Find and display Jessica initially
      const defaultPatient =
        data.find((patient) => patient.name === "Jessica Taylor") || data[0];
      renderUI(defaultPatient);
      renderChart([defaultPatient]);
    }
    renderPatientList(data);
    handleClickedPatient(data);
  } catch (error) {
    console.error("Failed to initialize the app:", error);
    container.innerHTML =
      "<p class='failed'>Failed to load data. Please try again later!</p>";
  }
};
handleLinkClicks();
initializeApp();

import { Chart } from "chart.js/auto";
import { updateInfoSections } from "./helper";

let bloodPressureChartInstance = null;

export const renderChart = (data) => {
  const durationSelect = document.getElementById("month-range");

  const createChart = (patient, months) => {
    const diagnosisHistory = patient.diagnosis_history;
    const filteredHistory = diagnosisHistory.slice(-months).reverse();

    // prepare data for the chart
    const labels = filteredHistory.map(
      (item) => `${item.month.slice(0, 3)}, ${item.year}`
    );
    const systolicData = filteredHistory.map(
      (item) => item.blood_pressure.systolic.value
    );
    const diastolicData = filteredHistory.map(
      (item) => item.blood_pressure.diastolic.value
    );

    // get chart context
    const bloodPressureChart = document.querySelector("#blood-pressure-chart");
    const ctx = bloodPressureChart.getContext("2d");

    // Destroy existing chart instance if it exists
    if (bloodPressureChartInstance) {
      bloodPressureChartInstance.destroy();
    }

    bloodPressureChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Systolic",
            data: systolicData,
            borderColor: "#E66FD2",
            backgroundColor: "#E66FD2",
            borderWidth: 2,
          },
          {
            label: "Diastolic",
            data: diastolicData,
            borderColor: "#8C6FE6",
            backgroundColor: "#8C6FE6",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: false,
              text: "Blood Pressure (mmHg)",
            },
          },
          x: {
            title: {
              display: false,
              text: "Months",
            },
            grid: {
              display: false,
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    });
    updateInfoSections(filteredHistory);
  };
  
  // render the inital chart for 6 months
  const initialMonths = 6;
  createChart(data[0], initialMonths);

  // listen for changes in duration
  durationSelect.addEventListener("change", (event) => {
    const selectedMonths = parseInt(event.target.value, 10);
    createChart(data[0], selectedMonths);
  });
};

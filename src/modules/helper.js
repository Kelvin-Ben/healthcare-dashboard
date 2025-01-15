const spinner = document.getElementById("loading-spinner");
const container = document.querySelector(".container");
const patientsList = document.querySelector(".patient-list");

patientsList.innerHTML = "";

export function handleLinkClicks() {
  const links = document.querySelectorAll(".nav a");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((link) => {
        link.classList.remove("active");
        this.classList.add("active");
      });
    });
  });
}

// search patient function
export function searchPatient(event) {
  const searchTerm = event.target.value.trim().toLowerCase();
  const patients = document.querySelectorAll(".patient-list .patients-info");
  patients.forEach((patient) => {
    patient.style.display = "revert";
    if (!patient.innerText.toLowerCase().includes(searchTerm)) {
      patient.style.display = "none";
    }
  });
}

/**
 *
 * @param {boolean} isLoading - True to show spinner, False to hide
 */
export const toggleSpinner = (isLoading) => {
  spinner.classList.toggle("hidden", !isLoading);
  container.classList.toggle("hidden", isLoading);
};

export const renderPatientList = (data) => {
  data.forEach((item, index) => {
    const { name, gender, age, profile_picture } = item;
    const patientItem = `
      <li class="patients-info" key="${index}">
        <div class="patients-info__details">
          <img src="${profile_picture}" alt="Profile picture of ${profile_picture}" class="patients-img">
          <div id="patients-details">
          <div>
            <p class="patients-name">${name}</p>
            <p class="patients-inner_details">
              <span class="patients-gender">${gender}, </span>
              <span class="patients-age">${age}</span>
            </p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="3.714" class="three-dots viewBox="0 0 18 3.714">
            <path id="more_horiz_FILL0_wght300_GRAD0_opsz24" d="M191.09-536.285a1.788,1.788,0,0,1-1.312-.546,1.788,1.788,0,0,1-.546-1.312,1.788,1.788,0,0,1,.546-1.312A1.788,1.788,0,0,1,191.09-540a1.788,1.788,0,0,1,1.312.546,1.788,1.788,0,0,1,.546,1.312,1.788,1.788,0,0,1-.546,1.312A1.788,1.788,0,0,1,191.09-536.285Zm7.143,0a1.788,1.788,0,0,1-1.312-.546,1.788,1.788,0,0,1-.546-1.312,1.788,1.788,0,0,1,.546-1.312,1.788,1.788,0,0,1,1.312-.546,1.788,1.788,0,0,1,1.312.546,1.788,1.788,0,0,1,.546,1.312,1.788,1.788,0,0,1-.546,1.312A1.788,1.788,0,0,1,198.233-536.285Zm7.143,0a1.788,1.788,0,0,1-1.312-.546,1.788,1.788,0,0,1-.546-1.312,1.788,1.788,0,0,1,.546-1.312,1.788,1.788,0,0,1,1.312-.546,1.788,1.788,0,0,1,1.312.546,1.788,1.788,0,0,1,.546,1.312,1.788,1.788,0,0,1-.546,1.312,1.788,1.788,0,0,1-1.312.546Z" transform="translate(-189.233 539.999)" fill="#072635"/>
          </svg>
          </div>
        </div>
      </li>
    `;
    patientsList.insertAdjacentHTML("beforeend", patientItem);
  });

  const allPatients = document.querySelectorAll(".patients-info");
  allPatients.forEach((patient) => {
    patient.addEventListener("click", function () {
      allPatients.forEach((patient) => {
        patient.classList.remove("active-patient");
        this.classList.add("active-patient");
        console.log(this);
      });
    });
  });
};

// Helper function to calculate average and determine
const calculateLevel = (value, type) => {
  if (type === "systolic") {
    if (value < 120) return { level: "Lower than Average" };
    if (value > 140) return { level: "Higher than Average" };
    return { level: "Normal" };
  } else if (type === "diastolic") {
    if (value < 80) return { level: "Lower than Average" };
    if (value > 90) return { level: "Higher than Average" };
    return { level: "Normal" };
  } else if (type === "respiratory") {
    if (value < 16) return { level: "Lower than Average" };
    if (value >= 20) return { level: "Higher than Average" };
    return { level: "Normal" };
  } else if (type === "temperature") {
    if (value < 97.5) return { level: "Lower than Average" };
    if (value >= 99.5) return { level: "Higher than Average" };
    return { level: "Normal" };
  } else if (type === "heart") {
    if (value < 60) return { level: "Lower than Average" };
    if (value >= 100) return { level: "Higher than Average" };
    return { level: "Normal" };
  }
};

// Helper function to update diagnosis section
export const updateInfoSections = (filteredHistory) => {
  const systolicData = filteredHistory.map(
    (record) => record.blood_pressure.systolic.value
  );
  const diastolicData = filteredHistory.map(
    (record) => record.blood_pressure.diastolic.value
  );
  const tempData = filteredHistory.map((record) => record.temperature.value);
  const respData = filteredHistory.map(
    (record) => record.respiratory_rate.value
  );
  const heartData = filteredHistory.map((record) => record.heart_rate.value);

  const systolicAvg = Math.round(
    systolicData.reduce((sum, value) => sum + value, 0) / filteredHistory.length
  );
  const diastolicAvg = Math.round(
    diastolicData.reduce((sum, value) => sum + value, 0) /
      filteredHistory.length
  );

  const systolicLevel = calculateLevel(systolicAvg, "systolic");
  const diastolicLevel = calculateLevel(diastolicAvg, "diastolic");

  // Update the systolic and diastolic info
  document.querySelector(".systolic .value").textContent = systolicAvg;
  document.querySelector(".systolic .level").textContent = systolicLevel.level;
  document.querySelector(".diastolic .value").textContent = diastolicAvg;
  document.querySelector(".diastolic .level").textContent =
    diastolicLevel.level;

  // update respiratory rate
  const respRateAvg = Math.round(
    respData.reduce((sum, value) => sum + value, 0) / respData.length
  );
  const respRateLevel = calculateLevel(respRateAvg, "respiratory");
  document.querySelector(
    ".respiratory-rate .bpm"
  ).textContent = `${respRateAvg} bpm`;
  document.querySelector(".respiratory-rate .level").textContent =
    respRateLevel.level;

  const tempAvg = Math.round(
    tempData.reduce((sum, value) => sum + value, 0) / tempData.length
  ).toFixed(1);
  const tempLevel = calculateLevel(tempAvg, "temperature");

  document.querySelector("#fahrenheit").innerHTML = `${tempAvg} <sup>0</sup> F`;
  document.querySelector(".temperature .level").innerHTML = tempLevel.level;

  const heartAvg = Math.round(
    heartData.reduce((sum, value) => sum + value, 0) / heartData.length
  );
  const heartLevel = calculateLevel(heartAvg, "heart");
  document.querySelector(".heart-rate .bpm").innerHTML = `${heartAvg} bpm`;
  document.querySelector(".heart-rate .level").textContent = heartLevel.level;
};

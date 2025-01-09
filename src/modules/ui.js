// import { renderChart } from "./chart";

export const renderUI = (patient) => {
  const patientMoreInfo = document.querySelector('.more-details div')
  const testsWrapper = document.querySelector('#tests-wrapper');
  const diagnosticList = document.getElementById('list');
  function clear() {
    patientMoreInfo.innerHTML = '';
    diagnosticList.innerHTML = '';
    testsWrapper.innerHTML = '';
  }

  clear();
  
  const { name, gender, profile_picture, date_of_birth, phone_number, emergency_contact, insurance_type, diagnostic_list, lab_results } = patient;
  console.log(lab_results)
  const patientProfile = `
        <header classs="profile-header">
          <figure id="patient-detail">
            <img src="${profile_picture}" alt="${name} photo" id="patient-img">
            <p id="patient-name">${name}</p>
          </figure>
        </header>
        <div id="more-info">
          <div id="dob">
            <img src="../images/BirthIcon.svg" alt="Date of birth icon" id="birth-icon"/>
            <div class="details-info">
              <p>Date of Birth</p>
              <p id="date-details">${date_of_birth}</p>
            </div>
          </div>
          <div id="gender">
            <img src="../images/FemaleIcon.svg" alt="Female Icon" id="gender-icon"/>
            <div class="details-info">
              <p>Gender</p>
              <p id="date-details">${gender}</p>
            </div>
          </div>
          <div id="contact-info">
            <img src="../images/PhoneIcon.svg" alt="Phone icon" class="phone-icon"/>
            <div class="details-info">
              <p>Contact Info.</p>
              <p id="date-details">${phone_number}</p>
            </div>
          </div>
          <div id="emergency-contact">
            <img src="../images/PhoneIcon.svg" alt="Phone Icon" class="phone-icon"/>
            <div class="details-info">
              <p>Emergency Contacts</p>
              <p id="date-details">${emergency_contact}</p>
            </div>
          </div>
          <div id="insurance-provider">
            <img src="../images/InsuranceIcon.svg" alt="Insurance Icon" id="insurance-icon"/>
            <div class="details-info">
              <p>Insurance Provider</p>
              <p id="date-details">${insurance_type}</p>
            </div>
          </div>
        </div>
        `
    patientMoreInfo.innerHTML = patientProfile;

    if (lab_results && lab_results > 0) {
      lab_results.forEach((result, index) => {
        const resultsItem = `
          <li class="test" key="${index}">
            <p class="text">${result}</p>
            <img src="../images/download.svg" alt="Download ${result}">
          </li>
      `
      testsWrapper.insertAdjacentHTML('beforeend', resultsItem)
      // testsWrapper,innerHTML += resultsItem
      })
    }

    if (diagnostic_list && diagnostic_list.length > 0) {
      diagnostic_list.forEach((list, index) => {
        const listItem = `
          <li class="row" key="${index}">
            <p class="problems">${list.name}</p>
            <p class="description">${list.description}</p>
            <p class="status">${list.status}</p>
          </li>
        `
        diagnosticList.insertAdjacentHTML('beforeend', listItem)
      })
    }
}
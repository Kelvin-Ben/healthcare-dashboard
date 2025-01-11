export function handleLinkClicks() {
  const links = document.querySelectorAll(".details a");

  links.forEach(link => {
    link.addEventListener('click', function() {
      links.forEach(link => {
        link.classList.remove('active')
        this.classList.add('active')
      })
    })
  })
}

export function handleTestClicks() {
  const allTests = document.querySelectorAll('.test');
  
  allTests.forEach(test => {
    test.addEventListener('click', function() {
      allTests.forEach(test => {
        test.classList.remove('test-active');
        this.classList.add('test-active')
      })
    })
  })
}

// Helper function to calculate average and determine
const calculateLevel = (value, type) => {
  if (type === 'systolic') {
    if (value < 120) return {level: "Lower than Average"};
    if (value > 140) return {level: "Higher than Average"};
    return { level: "Normal"};
  } else if (type === 'diastolic') {
    if (value < 80) return {level: "Lower than Average"};
    if (value > 90) return {level: "Higher than Average"};
    return { level: "Normal"};
  } else if (type === 'respiratory') {
    if (value < 16) return {level: "Lower than Average"};
    if (value <= 20) return {level: "Higher than Average"};
    return { level: "Normal"};
  } else if (type === 'temperature') {
    if (value < 97.5) return {level: "Lower than Average"};
    if (value <= 99.5) return {level: "Higher than Average"};
    return { level: "Normal"};
  } else if (type === 'heart') {
    if (value < 60) return {level: "Lower than Average"};
    if (value > 100) return {level: "Higher than Average"};
    return { level: "Normal"};
  }
}

// Helper function to update HTML section
export const updateInfoSections = (filteredHistory) => {
  const systolicData = filteredHistory.map((record) => record.blood_pressure.systolic.value);
  console.log(systolicData)

  /**
   * NOTE:- This function needs more concentration, am trying to get the levels display
   */

    const systolicAvg = Math.round(
      systolicData.reduce((sum, item) => sum + item, 0)  / filteredHistory.length
    );
    const diastolicAvg = Math.round(
      filteredHistory.reduce((sum, item) => sum + item.blood_pressure.diastolic.value, 0)  / filteredHistory.length
    );
    console.log(filteredHistory)
    // console.log(filteredHistory.blood_pressure.systolic.value)
    
    const systolicLevel = calculateLevel(systolicAvg, "systolic")
    const diastolicLevel = calculateLevel(diastolicAvg, "diastolic")
    console.log(systolicLevel, diastolicLevel)
    // Update the systolic and diastolic info
    document.querySelector('.systolic .value').textContent = systolicAvg;
    document.querySelector('.systolic .level').textContent = systolicLevel;
    document.querySelector('.diastolic .value').textContent = diastolicAvg;
    document.querySelector('.diastolic .level').textContent = diastolicLevel;
  
    // update respiratory rate
    const respRateAvg = Math.round(
      filteredHistory.reduce((sum, item) => sum + item.respiratory_rate.value, 0) / filteredHistory.length
    )
    const respRateLevel = calculateLevel(respRateAvg, 'respiratory')
    document.querySelector('.respiratory-rate .bpm').textContent = `${respRateAvg} bpm`
    document.querySelector('.respiratory-rate .level').textContent = respRateLevel
    
    const tempAvg = Math.round(
      filteredHistory.reduce((sum, item) => sum + item.temperature.value, 0) / filteredHistory.length
    ).toFixed(1)
    const tempLevel = calculateLevel(tempAvg, 'temperature')
  
    document.querySelector('#fahrenheit').innerHTML = `${tempAvg} <sup>0</sup> F`
    document.querySelector('.temperature .level').innerHTML = tempLevel
  
    const heartAvg = Math.round(
      filteredHistory.reduce((sum, item) => sum + item.heart_rate.value, 0) / filteredHistory.length
    )
    const heartLevel = calculateLevel(heartAvg, 'heart')
    document.querySelector('.heart-rate .bpm').innerHTML = `${heartAvg} bpm`
    console.log(document.querySelector('.heart-rate .level').textContent = heartLevel)
}
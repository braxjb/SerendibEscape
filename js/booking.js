// script.js – step navigation with validation, country code, email validation
document.addEventListener('DOMContentLoaded', function() {
  // ----- DOM elements -----
  const steps = document.querySelectorAll('.form-step');
  const nextBtn = document.getElementById('nextBtn');
  const backBtn = document.getElementById('backBtn');
  const submitBtn = document.getElementById('submitBtn');
  const progressItems = document.querySelectorAll('.step-item');
  const form = document.getElementById('multiStepForm');
  const stepImage = document.getElementById('stepImage');
  const imageCaption = document.getElementById('imageCaption');
  const emailInput = document.getElementById('emailInput');
  const phoneInput = document.getElementById('phoneInput');
 
  // state
  let currentStep = 0;
  const totalSteps = steps.length;

  const captions = [
    "Explore the Cultural Triangle",
    "Discover your interests",
    "Plan your travel party",
    "Choose your travel dates",
    "Set your budget per person",
    "Almost there! Your details"
  ];

  // Email validation function
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone number validation (basic - at least 5 digits, only numbers)
  function validatePhone(phone) {
    const phoneRegex = /^[0-9]{5,15}$/;
    return phoneRegex.test(phone);
  }

  // Real-time email validation
  if (emailInput) {
    emailInput.addEventListener('input', function() {
      const email = this.value.trim();
      const hint = document.getElementById('emailHint');
      if (email === '') {
        hint.textContent = '';
        hint.className = 'field-hint';
        this.classList.remove('error', 'success');
      } else if (validateEmail(email)) {
        hint.textContent = '✓ Valid email address';
        hint.className = 'field-hint success';
        this.classList.remove('error');
        this.classList.add('success');
      } else {
        hint.textContent = '✗ Please enter a valid email address (e.g., name@example.com)';
        hint.className = 'field-hint error';
        this.classList.add('error');
        this.classList.remove('success');
      }
    });
  }

  // Real-time phone validation
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      const phone = this.value.trim();
      const hint = document.getElementById('phoneHint');
      if (phone === '') {
        hint.textContent = '';
        hint.className = 'field-hint';
        this.classList.remove('error', 'success');
      } else if (validatePhone(phone)) {
        hint.textContent = '✓ Valid phone number';
        hint.className = 'field-hint success';
        this.classList.remove('error');
        this.classList.add('success');
      } else {
        hint.textContent = '✗ Please enter a valid phone number (numbers only, 5-15 digits)';
        hint.className = 'field-hint error';
        this.classList.add('error');
        this.classList.remove('success');
      }
    });
  }

  // Validate step 1: at least one region selected
  function validateStep1() {
    const checkboxes = document.querySelectorAll('#step1 input[name="explore[]"]');
    const isChecked = Array.from(checkboxes).some(cb => cb.checked);
    const errorDiv = document.getElementById('step1Error');
    const grid = document.querySelector('#step1 .image-check-grid');
    
    if (!isChecked) {
      errorDiv.textContent = 'Please select at least one region you\'d like to explore';
      errorDiv.classList.add('show');
      grid.classList.add('error-highlight');
      return false;
    } else {
      errorDiv.classList.remove('show');
      grid.classList.remove('error-highlight');
      return true;
    }
  }

  // Validate step 2: at least one interest selected
  function validateStep2() {
    const checkboxes = document.querySelectorAll('#step2 input[name="interests[]"]');
    const isChecked = Array.from(checkboxes).some(cb => cb.checked);
    const errorDiv = document.getElementById('step2Error');
    const grid = document.querySelector('#step2 .image-check-grid');
    
    if (!isChecked) {
      errorDiv.textContent = 'Please select at least one interest for your trip';
      errorDiv.classList.add('show');
      grid.classList.add('error-highlight');
      return false;
    } else {
      errorDiv.classList.remove('show');
      grid.classList.remove('error-highlight');
      return true;
    }
  }

  // Validate step 3: at least one adult (or total travelers > 0)
  function validateStep3() {
    const adults = parseInt(document.querySelector('input[name="adults"]').value) || 0;
    const children = parseInt(document.querySelector('input[name="children"]').value) || 0;
    const infants = parseInt(document.querySelector('input[name="infants"]').value) || 0;
    const total = adults + children + infants;
    const errorDiv = document.getElementById('step3Error');
    
    if (total === 0) {
      errorDiv.textContent = 'Please add at least one traveler';
      errorDiv.classList.add('show');
      return false;
    } else if (adults === 0 && (children > 0 || infants > 0)) {
      errorDiv.textContent = 'Children and infants must be accompanied by at least one adult';
      errorDiv.classList.add('show');
      return false;
    } else {
      errorDiv.classList.remove('show');
      return true;
    }
  }

  // Validate step 4: arrival date and duration
  function validateStep4() {
    const arrivalDate = document.querySelector('input[name="arrival_date"]').value;
    const duration = parseInt(document.querySelector('input[name="duration_days"]').value) || 0;
    const errorDiv = document.getElementById('step4Error');
    
    if (!arrivalDate) {
      errorDiv.textContent = 'Please select an arrival date';
      errorDiv.classList.add('show');
      return false;
    }
    
    const selectedDate = new Date(arrivalDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errorDiv.textContent = 'Arrival date cannot be in the past';
      errorDiv.classList.add('show');
      return false;
    }
    
    if (duration < 1) {
      errorDiv.textContent = 'Please enter a valid duration (minimum 1 day)';
      errorDiv.classList.add('show');
      return false;
    }
    
    if (duration > 60) {
      errorDiv.textContent = 'Duration cannot exceed 60 days';
      errorDiv.classList.add('show');
      return false;
    }
    
    errorDiv.classList.remove('show');
    return true;
  }

  // Validate step 5: budget is automatically set, always valid
  function validateStep5() {
    const errorDiv = document.getElementById('step5Error');
    errorDiv.classList.remove('show');
    return true;
  }

  // Validate step 6: personal details
  function validateStep6() {
    const firstName = document.querySelector('input[name="first_name"]').value.trim();
    const lastName = document.querySelector('input[name="last_name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const countryCode = document.getElementById('countryCode').value;
    const mobile = document.getElementById('phoneInput').value.trim();
    const errorDiv = document.getElementById('step6Error');
    let errors = [];
    
    if (!firstName) errors.push('First name is required');
    if (!lastName) errors.push('Last name is required');
    
    if (!email) {
      errors.push('Email is required');
    } else if (!validateEmail(email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!mobile) {
      errors.push('Mobile number is required');
    } else if (!validatePhone(mobile)) {
      errors.push('Please enter a valid phone number (numbers only, 5-15 digits)');
    }
    
    if (errors.length > 0) {
      errorDiv.textContent = errors.join(' • ');
      errorDiv.classList.add('show');
      return false;
    } else {
      errorDiv.classList.remove('show');
      return true;
    }
  }

  // Main validation function based on current step
  function validateCurrentStep() {
    switch(currentStep) {
      case 0: return validateStep1();
      case 1: return validateStep2();
      case 2: return validateStep3();
      case 3: return validateStep4();
      case 4: return validateStep5();
      case 5: return validateStep6();
      default: return true;
    }
  }

  function updateStepDisplay() {
    steps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.add('active-step');
      } else {
        step.classList.remove('active-step');
      }
    });

    progressItems.forEach((item, idx) => {
      item.classList.remove('active', 'completed');
      if (idx === currentStep) {
        item.classList.add('active');
      } else if (idx < currentStep) {
        item.classList.add('completed');
      }
    });

    if (stepImage) stepImage.setAttribute('data-step', currentStep + 1);
    if (imageCaption) imageCaption.textContent = captions[currentStep];

    if (currentStep === totalSteps - 1) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-block';
    } else {
      nextBtn.style.display = 'inline-block';
      submitBtn.style.display = 'none';
    }
    
    // Clear any previous validation messages when stepping
    const errorDiv = document.getElementById(`step${currentStep + 1}Error`);
    if (errorDiv) errorDiv.classList.remove('show');
  }

  // Image card selection
  function setupImageCards() {
    const cardContainers = ['#step1 .image-check-grid', '#step2 .image-check-grid'];
    
    cardContainers.forEach(selector => {
      const container = document.querySelector(selector);
      if (!container || container.dataset.listenerAttached) return;
      
      container.addEventListener('click', function(e) {
        const card = e.target.closest('.image-card');
        if (!card) return;
        
        e.preventDefault();
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          if (checkbox.checked) {
            card.classList.add('selected');
          } else {
            card.classList.remove('selected');
          }
        }
        // Clear validation error when user selects
        const stepId = this.closest('.form-step')?.id;
        if (stepId) {
          const errorDiv = document.getElementById(`${stepId}Error`);
          if (errorDiv) errorDiv.classList.remove('show');
          const grid = this;
          grid.classList.remove('error-highlight');
        }
      });
      
      container.dataset.listenerAttached = 'true';
    });
    
    document.querySelectorAll('.image-card').forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        card.classList.add('selected');
      }
    });
  }

  function setupCounters() {
    document.querySelectorAll('.counter-control').forEach(control => {
      const buttons = control.querySelectorAll('.counter-btn');
      const input = control.querySelector('.counter-input');
      if (!input) return;
      
      const decreaseBtn = buttons[0];
      const increaseBtn = buttons[1];
      
      function updateCounter(change) {
        let val = parseInt(input.value, 10) || 0;
        val = Math.max(0, val + change);
        input.value = val;
        // Clear validation error when counter changes
        const errorDiv = document.getElementById('step3Error');
        if (errorDiv) errorDiv.classList.remove('show');
      }
      
      const newDecrease = decreaseBtn.cloneNode(true);
      const newIncrease = increaseBtn.cloneNode(true);
      decreaseBtn.parentNode.replaceChild(newDecrease, decreaseBtn);
      increaseBtn.parentNode.replaceChild(newIncrease, increaseBtn);
      
      newDecrease.addEventListener('click', (e) => {
        e.preventDefault();
        updateCounter(-1);
      });
      newIncrease.addEventListener('click', (e) => {
        e.preventDefault();
        updateCounter(1);
      });
    });
  }

  function setupBudgetSlider() {
    const slider = document.getElementById('budgetSlider');
    const budgetValueSpan = document.getElementById('budgetValue');
    const budgetFormatted = document.getElementById('budgetFormatted');
    if (slider) {
      function updateBudgetDisplay() {
        const val = parseInt(slider.value, 10);
        const formatted = '$' + val.toLocaleString();
        if (budgetValueSpan) budgetValueSpan.textContent = formatted;
        if (budgetFormatted) budgetFormatted.value = formatted;
      }
      slider.addEventListener('input', updateBudgetDisplay);
      updateBudgetDisplay();
    }
  }

  function collectFormData() {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      if (key.endsWith('[]')) {
        const arrayKey = key.slice(0, -2);
        if (!data[arrayKey]) data[arrayKey] = [];
        data[arrayKey].push(value);
      } else {
        if (data[key] !== undefined) {
          if (!Array.isArray(data[key])) data[key] = [data[key]];
          data[key].push(value);
        } else {
          data[key] = value;
        }
      }
    }
    
    // Add formatted phone number
    const countryCode = document.getElementById('countryCode')?.value || '';
    const mobile = document.getElementById('phoneInput')?.value.trim() || '';
    if (countryCode && mobile) {
      data.full_mobile = `${countryCode} ${mobile}`;
    }
    
    const optionalFields = ['specific_places', 'specific_experiences', 'travel_group_notes', 'travel_plans', 'preferences_must_haves'];
    optionalFields.forEach(field => {
      const element = document.getElementById(field);
      if (element && element.value.trim()) data[field] = element.value.trim();
    });
    
    if (data.budget_per_person) {
      data.budget_per_person_formatted = '$' + parseInt(data.budget_per_person).toLocaleString();
    }
    return data;
  }

  function nextHandler(e) {
    e.preventDefault();
    
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
      // Add shake animation to the error message
      const errorDiv = document.getElementById(`step${currentStep + 1}Error`);
      if (errorDiv) {
        errorDiv.classList.add('shake');
        setTimeout(() => errorDiv.classList.remove('shake'), 500);
      }
      return;
    }
    
    if (currentStep < totalSteps - 1) {
      currentStep++;
      updateStepDisplay();
      if (currentStep === 2) setupCounters();
      if (currentStep === 4) setupBudgetSlider();
      document.querySelector('.content-column')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
 
  function backHandler(e) {
    e.preventDefault();
    if (currentStep > 0) {
      currentStep--;
      updateStepDisplay();
      if (currentStep === 2) setupCounters();
      if (currentStep === 4) setupBudgetSlider();
      document.querySelector('.content-column')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  form.addEventListener('submit', function(e) {
    if (currentStep !== totalSteps - 1) {
      e.preventDefault();
      currentStep = totalSteps - 1;
      updateStepDisplay();
      alert('Please complete all steps first. You are now on the final step.');
      return false;
    }
    
    // Final validation before submission
    if (!validateStep6()) {
      e.preventDefault();
      const errorDiv = document.getElementById('step6Error');
      if (errorDiv) {
        errorDiv.classList.add('shake');
        setTimeout(() => errorDiv.classList.remove('shake'), 500);
      }
      return false;
    }
    
    const formData = collectFormData();
    console.log('=== SRI LANKA TRIP PLAN SUBMISSION ===');
    console.log(JSON.stringify(formData, null, 2));
    alert('Thank you! Your trip request has been submitted. A local expert will contact you within 24 hours.');
    return true;
  });

  nextBtn.addEventListener('click', nextHandler);
  backBtn.addEventListener('click', backHandler);

  // Add real-time validation for date and duration
  const dateInput = document.querySelector('input[name="arrival_date"]');
  const durationInput = document.querySelector('input[name="duration_days"]');
  
  if (dateInput) {
    dateInput.addEventListener('change', () => validateStep4());
  }
  if (durationInput) {
    durationInput.addEventListener('input', () => validateStep4());
  }

  updateStepDisplay();
  setupImageCards();
  setupCounters();
  setupBudgetSlider();
});
// ============================================
// AUTOELITE — FORM VALIDATION (JavaScript)
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm()) {
      document.getElementById('form-success').style.display = 'block';
      form.reset();
      form.style.opacity = '0.5';
      setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
        form.style.opacity = '1';
      }, 5000);
    }
  });

  // Live validation on blur
  ['fname', 'lname', 'email', 'phone', 'interest', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(id));
  });
});

function clearError(fieldId) {
  const errEl = document.getElementById('err-' + fieldId);
  const inputEl = document.getElementById(fieldId);
  if (errEl) errEl.textContent = '';
  if (inputEl) inputEl.style.borderColor = '#333';
}

function setError(fieldId, message) {
  const errEl = document.getElementById('err-' + fieldId);
  const inputEl = document.getElementById(fieldId);
  if (errEl) errEl.textContent = message;
  if (inputEl) inputEl.style.borderColor = '#e8221a';
}

function setValid(fieldId) {
  const inputEl = document.getElementById(fieldId);
  if (inputEl) inputEl.style.borderColor = '#00c853';
}

function validateField(fieldId) {
  const el = document.getElementById(fieldId);
  if (!el) return true;
  const val = el.value.trim();

  clearError(fieldId);

  switch (fieldId) {
    case 'fname':
      if (!val) { setError('fname', 'First name is required.'); return false; }
      if (val.length < 2) { setError('fname', 'Must be at least 2 characters.'); return false; }
      break;

    case 'lname':
      if (!val) { setError('lname', 'Last name is required.'); return false; }
      if (val.length < 2) { setError('lname', 'Must be at least 2 characters.'); return false; }
      break;

    case 'email':
      if (!val) { setError('email', 'Email address is required.'); return false; }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) { setError('email', 'Please enter a valid email address.'); return false; }
      break;

    case 'phone':
      if (val && !/^[\d\s\+\-\(\)]{7,15}$/.test(val)) {
        setError('phone', 'Please enter a valid phone number.'); return false;
      }
      break;

    case 'interest':
      if (!val) { setError('interest', 'Please select an option.'); return false; }
      break;

    case 'message':
      if (!val) { setError('message', 'Message cannot be empty.'); return false; }
      if (val.length < 10) { setError('message', 'Message must be at least 10 characters.'); return false; }
      break;
  }

  setValid(fieldId);
  return true;
}

function validateForm() {
  const fields = ['fname', 'lname', 'email', 'interest', 'message'];
  let isValid = true;

  fields.forEach(f => {
    if (!validateField(f)) isValid = false;
  });

  // Validate phone only if filled
  const phone = document.getElementById('phone');
  if (phone && phone.value.trim()) {
    if (!validateField('phone')) isValid = false;
  }

  // Validate checkbox
  const agree = document.getElementById('agree');
  const errAgree = document.getElementById('err-agree');
  if (agree && !agree.checked) {
    if (errAgree) errAgree.textContent = 'You must agree to the Privacy Policy.';
    isValid = false;
  } else if (errAgree) {
    errAgree.textContent = '';
  }

  return isValid;
}

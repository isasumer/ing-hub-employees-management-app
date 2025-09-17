export function validateForm(data) {
  const errors = {};

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email)) {
    errors.email = 'Invalid email address';
  }

  // Validate phone number
  const phonePattern = /^\+90\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
  if (!data.phone || !phonePattern.test(data.phone)) {
    errors.phone = 'Phone number must be in the format +90 123 456 78 90';
  }

  return errors;
}

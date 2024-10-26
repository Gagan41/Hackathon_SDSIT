// policyValidator.js

const validatePolicyData = (policyData) => {
  const { cropType, area, policyFor, location, premium } = policyData;
  
  if (!cropType || !policyFor || !location) {
    return { isValid: false, error: 'All fields must be provided.' };
  }
  
  if (area <= 0 || premium <= 0) {
    return { isValid: false, error: 'Area and premium must be greater than zero.' };
  }
  
  return { isValid: true };
};

module.exports = validatePolicyData;

export const validateLength = (name, value, minimumLength) => {
  if (value && value.trim().length > 0) {
    if (value.trim().length < minimumLength) {
      return {
        validateStatus: 'error',
        errorMsg: `${name} minimum length is ${minimumLength} characters`,
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `${name} is required`,
  };
};

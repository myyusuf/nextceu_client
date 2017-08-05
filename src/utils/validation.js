const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

export const validateEmail = (name, value) => {
  if (value && value.trim().length > 0) {
    if (!emailRegex.test(value)) {
      return {
        validateStatus: 'error',
        errorMsg: 'Not valid email address',
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

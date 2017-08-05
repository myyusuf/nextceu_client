import _ from 'lodash';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validatePassword = (name, value, minimumLength) => {
  if (value && value.trim().length > 0) {
    if (value.trim().length < minimumLength) {
      return {
        validateStatus: 'error',
        errorMsg: `${_.capitalize(name)} minimum length is ${minimumLength} characters`,
      };
    }
    if (value.search(/[a-z]/i) < 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'Your password must contain at least one letter.',
      };
    }
    if (value.search(/[0-9]/) < 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'Your password must contain at least one digit.',
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `${_.capitalize(name)} is required`,
  };
};

export const validateLength = (name, value, minimumLength) => {
  if (value && value.trim().length > 0) {
    if (value.trim().length < minimumLength) {
      return {
        validateStatus: 'error',
        errorMsg: `${_.capitalize(name)} minimum length is ${minimumLength} characters`,
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  }
  return {
    validateStatus: 'error',
    errorMsg: `${_.capitalize(name)} is required`,
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
    errorMsg: `${_.capitalize(name)} is required`,
  };
};

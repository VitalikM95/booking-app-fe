const REQUIRED_FIELD = 'field is required'

export const usernameValidation = {
  required: REQUIRED_FIELD,
  minLength: {
    value: 3,
    message: 'must be min 3 chars',
  },
  maxLength: {
    value: 20,
    message: 'must be max 20 chars',
  },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: 'username is invalid',
  },
}

export const emailValidation = {
  required: REQUIRED_FIELD,
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'email is invalid',
  },
}

export const passwordValidation = {
  required: REQUIRED_FIELD,
  minLength: {
    value: 6,
    message: 'must be min 6 chars',
  },
  maxLength: {
    value: 20,
    message: 'must be max 20 chars',
  },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: 'password is invalid',
  },
}

export const phoneValidation = {
  required: REQUIRED_FIELD,
  minLength: {
    value: 6,
    message: REQUIRED_FIELD,
  },
}

export const cityValidation = {
  required: REQUIRED_FIELD,
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: 'field is invalid',
  },
}

export const countryValidation = {
  required: REQUIRED_FIELD,
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: 'field is invalid',
  },
}

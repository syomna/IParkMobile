export const validateName = name => {
  let error = '';
  if (!name) {
    error = 'Name is required';
  } else if (name.length < 2) {
    error = 'Name must be longer than 3 characters';
  } else {
    error = '';
  }
  return error;
};

export const validateEmail = email => {
  let error = '';
  if (!email) {
    error = 'Email is required';
  } else if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  ) {
    error = 'Invalid email format';
  } else {
    error = '';
  }
  return error;
};

export const validatePassword = password => {
  let error = '';
  if (!password) {
    error = 'Password is required';
  } else if (
    // password.length < 8
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&_])[A-Za-z\d!@#$%&_]{8,16}$/i.test(
      password,
    )
  ) {
    error =
      // 'Password must be at least 8 characters';
      'Password must be between 8 to 16, contains at least  uppercase, lowercase, number and special character (! @ # $ % & _)';
  } else {
    error = '';
  }
  return error;
};

export const validatePhone = value => {
  let error = '';
  if (!value) {
    error = 'Phone is Required';
  } else if (!/^(002)?01[0125][0-9]{8}$/i.test(value)) {
    error = 'Phone must be valid egyptain number';
  } else {
    error = '';
  }
  return error;
};

export const validatePlate = value => {
  let error = '';
  if (!value) {
    error = 'Plate number is required';
  } else if (!/^[a-zA-Z]{3}[0-9]{3}$/i.test(value)) {
    error = 'Invalid Plate Number';
  } else {
    error = '';
  }

  return error;
};

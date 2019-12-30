function validateSignIn(user) {
  const { username, password } = user;

  const errors = {};

  if (username.length === 0) errors.username = 'Username cannot be empty';
  if (password.length === 0) errors.password = 'Password cannot be empty';

  return { errors, validated: Object.values(errors).length === 0 };
}

function validateSignUp(user) {
  const { username, password, password2 } = user;

  const errors = {};

  if (username.length === 0) errors.username = 'Username cannot be empty';
  if (password.length === 0) errors.password = 'Password cannot be empty';
  if (password2.length === 0) errors.password2 = 'Repeated password cannot be empty';

  return { errors, validated: Object.values(errors).length === 0 };
}

export { validateSignUp, validateSignIn };

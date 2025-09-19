export const Users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  }
};

export const CustomerInfo = {
  standard: {
    firstName: 'QA',
    lastName: 'Test',
    postalCode: '12345'
  }
};

export const ErrorMessages = {
  lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
  missingUsername: 'Epic sadface: Username is required',
  missingPassword: 'Epic sadface: Password is required',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service'
};
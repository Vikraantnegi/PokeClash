import {HashMap} from './interfaces';

interface ValidatorProps {
  value: string | number;
  type: string;
}

export const validator = ({value, type}: ValidatorProps): boolean => {
  switch (type) {
    case 'email':
      return isValidEmail(value);
    case 'password':
      return isValidPassword(value);
    default:
      return false;
  }
};

const isValidEmail = (input: string | number): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input.toString());
};

const isValidPassword = (input: string | number): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(input.toString());
};

export const ErrorMap: HashMap = {
  email: 'Please enter a valid email',
  password:
    'Password must consist of one lowercase, uppercase, digit and symbol',
  confirmPassword: 'Password does not match.',
  authErr: 'Invalid login credentials. Please try again!',
  incompeleteCreds: 'Please fill the above fields to login!',
  userExists: 'Error adding user: username already exists',
};

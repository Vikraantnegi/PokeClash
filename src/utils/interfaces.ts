export interface HashMap {
  [key: number]: any;
  [key: string]: any;
}

export interface FirebaseUserObject {
  username: string;
  email: string;
  password: string;
  userId: string;
  isVerified: boolean;
}

export interface UserProps {
  email: string;
  password: string;
  username: string;
}

export interface TextInputChangeEvent {
  type: string;
  value: string;
  validationType?: string;
}

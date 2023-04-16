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

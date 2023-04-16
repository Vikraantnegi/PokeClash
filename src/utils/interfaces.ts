export interface HashMap {
  [key: number]: any;
  [key: string]: any;
}

export interface FirebaseUserObject {
  username: string;
  email: string | null | undefined;
  password: string;
  userId: string | undefined;
  isVerified: boolean | undefined;
}

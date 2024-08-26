export interface loginData{
    email: string;
    password: string;
}

export interface SignupData extends loginData {
  name: string;
  rePassword: string;
  phone: string;
}

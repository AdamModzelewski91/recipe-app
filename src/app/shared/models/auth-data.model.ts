export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = LoginData & {
  nick: string;
};

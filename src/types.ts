export type UsersType = {
  token?: any;
  createdAt: string;
  email: string;
  nickname: string;
  password: string;
  role: string;
  _id: string;
  message?: string;
};

export type UsersErrorType = {
  message: any;
};
export type test1 = {
  msg: string;
};

export type LoginType = {
  status: string;
  token: string | undefined;
};

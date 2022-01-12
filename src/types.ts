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

export type PostType = {
  category: string;
  content: string;
  count: Count[];
  createdAt: string;
  image: Image[];
  info_title: string;
  info_url: string;
  postId: number;
  writer: string;
  __v: number;
  _id: string;
};

export type Image = {
  info: string;
  original: string;
};
export type Count = {
  like: number;
  comment: number;
};

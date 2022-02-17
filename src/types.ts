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

export type User = {
  nickname: string;
  role: string;
  _id: string;
  profileImage: string;
};

export type PostType = {
  categoryLabel: string;
  categoryValue: string;
  content: string;
  count: Count[];
  createdAt: string;
  image: Image[];
  info_title: string;
  info_url: string;
  postId: number;
  writer: Writer[];
  userBookmark: string;
  __v: number;
  _id: string;
};

export type Writer = {
  nickname: string;
  profileImage: string;
  _id: string;
};
export type Image = {
  info_image: string;
  originalImageName: string;
};
export type Count = {
  bookmark: number;
  comment: number;
};

// REACT_APP_BASIC_SERVER_URL="https://3.38.234.81:8080"
// "proxy": "http://3.38.234.81:8080"

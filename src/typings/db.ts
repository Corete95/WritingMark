export interface IListBox {
  categoryLabel: string;
  categoryValue: string;
  bookmarkState: boolean;
  _id: number;
  postId: number;
  info_url: string;
  info_title: string;
  createdAt: string;
  content: string;
  category: string;
  userBookmark: string;
  image: Image;
  count: Count;
  writer: Writer;
}

export interface Count {
  bookmark: number;
  comment: number;
}

export interface Writer {
  nickname: string;
  profileImage: string;
  _id: string;
}

export interface Image {
  info_image: string;
  originalImageName: string;
}

export const API = "http://172.30.1.47:8080";

export const KAKAO_KEY = "c54587e1e09ef1e3b86b7a35f071b555";
export const NAV_CATEGORY = [
  { id: 1, name: "신규", path: "/", payload: "new" },
  {
    id: 2,
    name: "인기",
    path: "/hot",
    payload: "hot",
  },
  // {
  //   id: 3,
  //   name: "글갈피 소개",
  //   path: "/Introduction",
  // },
];

export const NAVIGATION_CATEGORY = [
  { id: 1, name: "웹소설 · 웹툰", path: "/Category/web-content" },
  { id: 2, name: "에세이", path: "/Category/essay" },
  { id: 3, name: "소설", path: "/Category/novel" },
  { id: 4, name: "시", path: "/Category/poetry" },
  { id: 5, name: "지식", path: "/Category/knowledge" },
  { id: 6, name: "깍두기", path: "/Category/etc" },
];

export const BOOKMARK_CATEGORY = [
  { id: 1, name: "내가 쓴 글", queryString: "test.json" },
  { id: 2, name: "내 찜목록", queryString: "test1.json" },
];

export const CATEGORY_OPTIONS = [
  { label: "웹소설 · 웹툰", value: "web-content" },
  { value: "essay", label: "에세이" },
  { value: "novel", label: "소설" },
  { value: "poetry", label: "시" },
  { value: "knowledge", label: "지식" },
  { value: "etc", label: "깍두기" },
];

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400,500,600,700,800,900,bold;
    font-style: normal;
}


  *{
        box-sizing:border-box;

    }
    body {
      font-family: 'Pretendard-Regular';

  }
    a{
      text-decoration: none;
    }
    .swal2-shown{
      padding-right: 0px;
    }
    .swal2-height-auto{
      padding-right: 0px;
    }
`;

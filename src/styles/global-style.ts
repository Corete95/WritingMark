import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  *{
        box-sizing:border-box;

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

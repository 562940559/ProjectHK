import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Poppins;
    src: url(/fonts/Poppins-Regular.ttf);
  }
  
  @font-face {
    font-family: Poppins-Regular;
    src: url(/fonts/Poppins-Regular.ttf);
  }

  @font-face {
    font-family: Poppins-Black;
    src: url(/fonts/Poppins-Black.ttf);
  }

  @font-face {
    font-family: Poppins-BoldItalic;
    src: url(/fonts/Poppins-BoldItalic.ttf);
  }

  @font-face {
    font-family: Poppins-Bold;
    src: url(/fonts/Poppins-Bold.ttf);
  }

  @font-face {
    font-family: Poppins-Medium;
    src: url(/fonts/Poppins-Medium.ttf);
  }

  @font-face {
    font-family: Poppins-SemiBold;
    src: url(/fonts/Poppins-SemiBold.ttf);
  }

  #root {
    position: relative;
  }
`;

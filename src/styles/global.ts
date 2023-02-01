import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    :root {
        --gray-100: #f8f9fa;
        --gray-200: #ced4da;
        --gray-400: #6c757d;
        --gray-600: #343a40;

        --green-200: #DFFDD4;
        --green-400: #7EF4BB ;
        --green-600: #3DA485 ;

        --blue-600: #205CF4;
        --blue-800: #1744B5;

        --orange-400: #F9A85D;
        --orange-500: #F59945;

        --red-400: #BE1D1D
   
};
    * {
        margin: 0;
        border: 0;
        padding: 0px;
        outline: unset;
        font-family: 'Nunito', sans-serif;
        font-weight: 500;
        font-size: 1rem;
        list-style: none;
        box-sizing: border-box;
    };
`
export default GlobalStyle
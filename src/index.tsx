import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const rootElement = document.getElementById("root");

// Type assertion to ensure non-null value
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//  curl -v -X OPTIONS \
//   -H "Origin: http://localhost:3000/" \
//   -H "Access-Control-Request-Method: GET" \
//      "https://test-permissions-bucket-sstoor.s3.us-west-2.amazonaws.com/DJI_20240513073006_0147_D-comp.jpg"

//  curl -v -X OPTIONS \
//   -H "Origin: http://localhost:3000/" \
//   -H "Access-Control-Request-Method: GET" \
//      "https://sstoor-world-assets.s3.us-west-2.amazonaws.com/hamu-smarty-website-assets/HOMEPAGE/images/DJI_20240513073006_0147_D-comp.jpg"

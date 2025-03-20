import React, {Suspense, lazy} from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "Cart_Order_mf/Sidebar";


import "./index.css";
// import ErrorBoundary from "./components/ErrorBoundary";
const ErrorBoundary = lazy(()=>
  import("Cart_Order_mf/Sidebar"));

const App = () => {
  
  return (
    <>
    <div> Helooooo</div> 
     {/* <BrowserRouter> */}

      {/* <ProductNavigations /> */}
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Sidebar />
          </Suspense>
        </ErrorBoundary>

    {/* </BrowserRouter> */}
    </>
  );
};
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);

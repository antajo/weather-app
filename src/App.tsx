import React from "react";
import Header from "./components/Header";
import Store from "./store/Store";
import Home from "./components/Home";

function App() {
  return (
    <Store>
      <div className="app">
        <Header />
        <Home />
      </div>
    </Store>
  );
}

export default App;

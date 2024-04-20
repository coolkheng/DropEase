import React from "react";
import Header from "./components/header"; // Import the Header component
import "./style/Header.css";

function App() {
  return (
    <div className="App">
      {/* Include the Header component */}
      <Header username="Your Username" />
      <main>
        <p>This is the main content of the app.</p>
      </main>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

export default App;

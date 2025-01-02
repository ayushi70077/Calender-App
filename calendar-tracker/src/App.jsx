// import React from "react";
// import './styles/global.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminPage from "./pages/AdminPage";
// import UserPage from "./pages/UserPage";
// import ReportsPage from "./pages/ReportsPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
     
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/reports" element={<ReportsPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Landing page */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}

export default App;


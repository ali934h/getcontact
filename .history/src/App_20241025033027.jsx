// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4">
            صفحه کاربر
          </Link>
          <Link to="/admin" className="mr-4">
            صفحه مدیر
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

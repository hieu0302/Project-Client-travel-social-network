import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./page/profilePage/profilePage";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilePage />}/>
       
      </Routes>
    </Router>
  );
}

export default App;


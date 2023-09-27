
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRuter = ({ component: component, ...rest }) => {
  const user = useSelector((state) => {
    
    return state.user.currentUser;
  });
  
  return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PrivateRuter />}>
          <Route exact path="/" element={<Homepage />} />
        </Route>

        {user ? (
          <Route exact path="/login" element={<Homepage />} />
        ) : (
          <Route exact path="/login" element={<Login />} />
        )}
        {user ? (
          <Route exact path="/profile" element={<Profile />} />
        ) : (
          <Route exact path="/profile" element={<Login />} />
        )}


        {/* <Route exact path="/" element={<PrivateRuter />}>
          <Route exact path="/register" element={<Home />} />
        </Route> */}
        <Route exact path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
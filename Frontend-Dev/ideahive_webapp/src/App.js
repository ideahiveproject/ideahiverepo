import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import "./App.css";
import PostForm from "./components/PostForm";
import Post from "./components/Post";
import UserPage from "./components/UserPage";
// import posts from "./components/data.json";
import { PostProvider } from "./context/PostState";
import Edit from "./components/Edit";
import Delete from "./components/Delete";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className="App">
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/post">Post</NavLink>
        <NavLink to="/createpost">Create Post</NavLink>
      </nav>
      <PostProvider>
      <Routes location= {background || location}>
        <Route path="/post" element={<Post />} />
        <Route path="/createpost" element={<PostForm />} />
        <Route path="/user/:userid" element={<UserPage />}>
        </Route>
      </Routes>
      {background && <Route path="/user/:userid/delete" children={<Delete />}/>}
      </PostProvider>
    </div>
  );
}

export default App;

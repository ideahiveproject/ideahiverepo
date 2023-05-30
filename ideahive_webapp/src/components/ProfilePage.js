import { useEffect, useState } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";

const ProfilePage = ({ user }) => {
  const [posts, setPosts] = useState([]);

  // useEffect(()=>{
  //     fetch('http://localhost:8000/posts')
  //     .then(res => {
  //         return res.json
  //     })
  //     .then(data => {
  //         setPosts(data);
  //     })
  // }, []);

  return (
    <div>
      <div>
        <img src={user.img} alt={user.title} />
        <Link to="/myaccount">My Account</Link>
      </div>
      {posts && <Post post={posts} />}
    </div>
  );
};

export default ProfilePage;

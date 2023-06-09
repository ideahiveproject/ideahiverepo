import { Link } from "react-router-dom";
import { Box, Stack} from '@mui/material';
import posts from './data.json'

const Post = () => {
  const users = [...new Set(posts.map(q => q.userId))];

  return (
    <Box sx={{ mt: { lg: "70px" } }} m="8px" p="20px">
    {users.map((user) => ( 
      <Stack direction="row" gap="20px" fontSize="18px" alignItems="flex-end">
        {/*<img src={user.img} alt={user.title} />*/}
        <Link to={'/user/'+ user} key={user.userId}>User: {user}</Link>
      </Stack>
      ))
    }
    </Box>
  );
};

export default Post;

// Importing necessary libraries popup and MUI/MUI-icons
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

import Edit from "./Edit";
import Delete from "./Delete";

const UserPost = ({ post, userid }) => {
const location = useLocation();
// const history = useNavigate();
  return (
    //indivdual post of user 
    <Card sx={{ maxWidth: 1000, mb: "20px" }}>
      <Stack direction="row" justifyContent="flex-end">
        <CardMedia
          component="img"
          height="194"
          image={post.image}
          alt={post.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" mb="5px">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb="5px">
            {post.body}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb="5px">
            {post.category}
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Popup
              trigger={
                <Link to={{
                  pathname: '/user/'+ post.id,
                  state: {background: location}
                }}>
                <Button
                  variant="outlined"
                  sx={{
                    m: "2px",
                    color: "#FF6663",
                    borderColor: "#FF6663",
                    borderRadius: "50px",
                    ":hover": {
                      background: "#FF6663",
                      borderColor: "#FF6663",
                      color: "#ffffff",
                    },
                  }}
                >
                  Edit
                </Button>
                </Link>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal">
                  <div className="content">
                    <Edit close={close} />
                  </div>
                </div>
              )}
            </Popup>
            <Popup
              trigger={
                <Link to={{
                  pathname: `/user/${userid}/delete`,
                  state: {background: location}
                }}>
                <Button
                  variant="outlined"
                  sx={{
                    m: "2px",
                    color: "#FF6663",
                    borderColor: "#FF6663",
                    borderRadius: "50px",
                    ":hover": {
                      background: "#FF6663",
                      borderColor: "#FF6663",
                      color: "#ffffff",
                    },
                  }}
                >
                  Delete
                </Button>
                </Link>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal">
                  <div className="content">
                  <Delete close={close} post={post}/>
                  </div>
                </div>
              )}
            </Popup>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default UserPost;

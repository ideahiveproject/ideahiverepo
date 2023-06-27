import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Stack, Button, TextField } from "@mui/material";
import { AccountContext } from "../context/UserState";
import EditIcon from '@mui/icons-material/Edit';

const EditProfile = () => {

    const { accounts, editAccount } = useContext(AccountContext);
    const [selecteduser, setSelecteduser] = useState({
        userId: "",
        name: "",
        email: "",
        password: "",
        // file: null,
      });
    
    const currentUserid  = useParams();

    const navigate = useNavigate();

    useEffect(() => {
      const userId = currentUserid.userid;
      setSelecteduser(accounts.find((account) => account.userId === Number(userId)));
    }, [currentUserid, accounts]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelecteduser({ ...selecteduser, [name]: value });
    };
  
    
    const handleSubmit = () => {
        editAccount(selecteduser);
      navigate("/post");
    };

  return (
    <Box display="flex" justifyContent="center">
    <Box 
    position="absolute"
    top={30}
    left={550}
    component="img"
    src={selecteduser.profile_picture}
    alt={selecteduser.title}
      sx={{
        width: "140px",
        height: "140px",
        borderRadius: "100px",
        border: "1px solid black",
      }}
      display="flex"
      alignItems="center"
      justifyContent="center" />
      <Stack direction="row" justifyContent= "center" position="absolute"
      top={130}
      left={650}><EditIcon /></Stack>
    <Stack  mt="100px"
    p="30px"
    pt="50px"
    spacing={3}
    direction="column"
    width="40vw"
    height="80vh"
    sx={{
      boxShadow: "0px 5px 15px 3px rgba(0, 0, 0, 0.25)",
    }}>
        <TextField label="Full name" name= "name" variant="standard" value={selecteduser.name} onChange={handleChange}/>
        <TextField
          label="Email"
          name="email"
          value={selecteduser.email}
          variant="standard"
          onChange={handleChange}
        />
        <TextField label="Current password" name= "currentpassword" variant="standard" onChange={handleChange}/>
        <TextField label="New password" name= "newPassword" variant="standard" onChange={handleChange}/>
        <TextField label="Confrim password" name= "confrimPassword" variant="standard" onChange={handleChange}/>
       <Stack direction={"row"} spacing={4} justifyContent="flex-end" ml="30px">
          <Button variant="contained" sx={{
            width: "150px",
            background: "#FBDF5F",
            color: "#000000",
            fontSize:"24",
            border: '1px solid black',
            borderRadius: "10px",
            p: "0.5rem",
            ":hover": {
              background: "#FBDF5F",
              color: "#FFFFFF"
            },
          }} onClick={handleSubmit}>
          Edit
          </Button>
          <Button variant="contained" sx={{
            width: "150px",
            background: "#FFFFFF",
            color: "#000000",
            fontSize:"24",
            border: '1px solid black',
            borderRadius: "10px",
            p: "0.5rem",
            ":hover": {
              background: "#FBDF5F",
              color: "#FFFFFF"
            },
          }} >
           Cancel
          </Button>
          </Stack>
          </Stack>
    </Box>
  )
}

export default EditProfile
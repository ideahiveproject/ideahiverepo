// Importing necessary libraries for routing and MUI/MUI-icons
import { useParams } from "react-router-dom";
import { Box, Stack} from "@mui/material";
import ProfileSection from "./ProfileSection";

const InvestorPage = () => {
  return (
    //every investor users page
    <Box sx={{ p: 8, bgColor: "#F5F5F5" }}>
    <ProfileSection />
    </Box>
  );
};

export default InvestorPage;

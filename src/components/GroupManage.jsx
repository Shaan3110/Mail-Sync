import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const GroupManage = () => {
    const navigate = useNavigate();
  const [data, setdata] = useState([
    {
      name: "Group 1",
      description: "Group 1",
    },
    {
      name: "Group 2",
      description: "Group 2",
    },
    {
      name: "Group 3",
      description: "Group 3",
    },
    {
      name: "Group 4",
      description: "Group 4",
    },
  ]);
  return (
    <Box
      display="flex"
      width="100%"
      alignItems={"flex-end"}
      flexDirection="column"
      sx={{
        padding: "5px 40px",
      }}
    >
      <Button
        type="submit"
        color="primary"
        variant="contained"
        sx={{
          fontWeight: "bolder",
          textTransform: "none !important",
          marginBottom: "5px",
          padding: "10px 40px",
        }}
        size="large"
      >
        New
      </Button>
      <Box
        display="flex"
        width="80vw"
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        sx={{
          padding: "5px 40px",
        }}
      >
        {data.map((ele) => {
          return (
            <Box
              display="flex"
              width="fit-content"
              minWidth={"20vw"}
              flexDirection="column"
              sx={{
                margin: "20px 0px",
                padding: "20px 20px",
                backgroundColor: "#fff",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                borderRadius: "5px",
              }}
            >
              <Box display="flex" width="100%" justifyContent={"space-between"} sx={{
                marginBottom:"5px"
              }}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bolder", marginBottom: "20px" }}
                >
                  {ele.name}
                </Typography>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  sx={{
                    boxShadow:"none !important"
                  }}
                >
                  <Button aria-label="view" variant="contained" sx={{
                    margin:"0px 5px"
                  }}
                  onClick={()=> {
                    navigate("/dashboard/group/"+ele.name)
                  }}>
                    View
                  </Button>
                  <Button aria-label="view" variant="contained" >
                    Delete
                  </Button>
                </ButtonGroup>
              </Box>
              <Typography
                variant="h5"
                style={{ fontWeight: "bolder", marginBottom: "20px" }}
              >
                {ele.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default GroupManage;

import { Box, Button, ButtonGroup, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react'
import { tokens } from '../theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const StatisticsCard = ({title,icon,value,loadTime}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return value ?
    <Box display={"flex"} justifyContent="space-evenly" sx={{
        padding:"10px 10px",
        boxShadow: "0px 2px 6px 0px rgb(67 89 113 / 12%)",
        background: `${colors.primary[400]}`,
        margin:"0px 10px 10px 10px",
        width:"100%",
        borderRadius:"5px"
      }}
      flexDirection="column"
      >
        <ButtonGroup sx={{
            width:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between"
        }}>
            <IconButton
            variant="contained"
            size="large"
            >
            {icon}
            </IconButton>
            <IconButton
            variant="contained"
            >
            <MoreVertIcon style={{
                fontSize:"25px"
            }}/>
            </IconButton>
        </ButtonGroup>
        <Typography
          color={"#696cff"}
          fontWeight="bolder"
          variant="h5"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
          {
            value > 0 ?
            <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "30px",
              backgroundColor: "#696cff",
              margin: "0px 15px",
              animation: "ripple 1.3s infinite ease-in-out",
              border: "1px solid currentColor",
              "@keyframes ripple": {
                "0%": {
                  transform: "scale(.6)",
                  opacity: 1,
                },
                "100%": {
                  transform: "scale(1)",
                  opacity: 0,
                },
              },
            }}
          ></div>:
            null
          }
        </Typography>
        <Typography
          color={colors.grey[100]}
          fontWeight="bolder"
          variant="h2"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
            {value}
        </Typography>
        <Typography
          color={colors.grey[300]}
          variant="h9"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
            {
                moment(value.getFullYear,value.getFullMonth,value.getFullDay).fromNow()
            }
        </Typography>
      </Box>
      :
      <Box display={"flex"} justifyContent="space-evenly" sx={{
        padding:"10px 10px",
        boxShadow: "0px 2px 6px 0px rgb(67 89 113 / 12%)",
        background: `#d1d2ff`,
        margin:"0px 10px 10px 10px",
        width:"100%",
        borderRadius:"5px"
      }}
      flexDirection="column"
      >
        <IconButton
            variant="contained"
            size="large"
            >
            <VisibilityOffIcon sx={{
                      color: "#fff",
                      backgroundColor: "#696cff",
                      padding: "10px 10px",
                      fontSize: "45px",
                      borderRadius: "5px",
                    }}/>
            </IconButton>
      </Box>
}

export default StatisticsCard
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';


const Footer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


  return (
    <Box width={"97%"} height="8vh" sx={{
        boxShadow: "0px 2px 6px 0px rgb(67 89 113 / 12%)",
        background: `${colors.primary[400]}`,
        marginTop:"2vh",
        marginLeft: "20px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    }}>
            <p style={{
                fontSize:"15px",
                color: colors.grey[100]
            }}>Made with ❤️ by <b style={{color:"#696cff"}}>Mail Sync</b></p>
    </Box>
  )
}

export default Footer
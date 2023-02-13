import { Autocomplete, Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const TicketSearch = ({status,updateFilter, applyFilter}) => {

  const navigate = useNavigate();
  
  return (
    <Box sx={{
        width: "80vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        height:"5vh",
        marginBottom:"20px",
        
      }}>
        <TextField
          id="outlined-basic"
          label="Search summary"
          variant="outlined"
          size="small"
          // onChange={(event) => {
          //   setphone(event.target.value);
          // }}
          // value={phone}
          // disabled={!phoneedit}
          sx={{ width: "100%",margin: "0px 5px" }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Success","Failure"]}
          onInputChange={(event, value) => updateFilter("status",value)}
          value={status}
          sx={{ width: 300, margin:"0px 5px" }}
          renderInput={(params) => <TextField {...params} label="Status" size="small" />}
        />
       <Button
        variant="contained"
        sx={{
          display: "flex",
          width: "fit-content",
          textTransform: "none",
          margin:"0px 5px",
          height:"100%",
          padding:"20px 40px",
          fontWeight:"bolder",
          backgroundColor:"#696cff"
        }}
        onClick={applyFilter}
      >
        Apply
      </Button>
       <Button
        variant="contained"
        sx={{
          display: "flex",
          width: "fit-content",
          textTransform: "none",
          margin:"0px 5px",
          height:"100%",
          padding:"20px 40px",
          fontWeight:"bolder",
          backgroundColor:"#696cff"
        }}
        onClick={()=> navigate("/dashboard/generate")}
      >
        Create
      </Button>
      </Box>
  )
}

export default TicketSearch
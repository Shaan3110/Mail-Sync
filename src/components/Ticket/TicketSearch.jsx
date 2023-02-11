import { Autocomplete, Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import { add_ticket } from '../../apis/Ticket/Ticket';
import AddTicket from './AddTicket';

const TicketSearch = ({users,projects,stages,status,project,assignee,reporter, updateFilter, applyFilter}) => {

  const [open, setOpen] = useState(false);
  const [toggle_add_ticket, settoggle_add_ticket] = React.useState(false);
  const [submit_add_ticket, setsubmit_add_ticket] = React.useState(false);
  const [description, setdescription] = React.useState("");
  const [summary, setsummary] = React.useState("");
  const [project_name, setproject_name] = React.useState("");
  const [assignee_name, setassignee_name] = React.useState("");
  const [status_name, setstatus_name] = React.useState("");
  const [project_type, setproject_type] = React.useState("");
  const [success, setsuccess] = React.useState(false);
  const [successmessage, setsuccessmessage] = React.useState("");
  const [error, seterror] = React.useState(false);
  const [errormessage, seterrormessage] = React.useState("");

  const submitAddRequest = (event) => {
    debugger;
    console.log(event.target.description.value)
    event.preventDefault();
    setdescription(event.target.description.value);
    setsummary(event.target.summary.value);
    setassignee_name(event.target.assignee_name.value);
    setstatus_name(event.target.status_name.value);
    setproject_name(event.target.project_name.value);
    setproject_type(event.target.project_type.value);
    setsubmit_add_ticket(true);
    toggle_add_ticket
    ? settoggle_add_ticket(false)
    : settoggle_add_ticket(true);
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (submit_add_ticket) {
      add_ticket(summary,description,project_type,project_name,assignee_name,status_name)
        .then((res) => {
          if (res.status === 200) {
            setsuccess(true);
            setsuccessmessage(
              "Yay! Your project has been added successfully !"
            );
            setOpen(false);
            applyFilter();
          }
          // 401 if the user already exist on the database
          else if (res?.status === 401) {
            seterror(true);
            seterrormessage("Sorry you are unauthorized for this action");
          }
        })
        .catch((err) => {
          console.error(err.message);
          seterror(true);
          seterrormessage("Sorry some internal server error occurred");
        });
    }
  }, [toggle_add_ticket]);


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
        <AddTicket open={open} summary = {summary} submitAddRequest = {submitAddRequest} handleClose = {handleClose} error = {error} errormessage={errormessage} users={users} projects ={projects} project_name={project_name} assignee_name={assignee_name} stages={stages} status_name={status_name}/>
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
          options={projects.map((option) => option.name)}
          sx={{ width: 300, margin:"0px 5px" }}
          onInputChange={(event, value) => updateFilter("project",value)}
          value={project}
          renderInput={(params) => <TextField {...params} label="Project" size="small" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={users.map((option) => option.name)}
          onInputChange={(event, value) => updateFilter("assignee",value)}
          value={assignee}
          sx={{ width: 300, margin:"0px 5px" }}
          renderInput={(params) => <TextField {...params} label="Assignee" size="small" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={users.map((option) => option.name)}
          onInputChange={(event, value) => updateFilter("reporter",value)}
          value={reporter}
          sx={{ width: 300, margin:"0px 5px" }}
          renderInput={(params) => <TextField {...params} label="Reporter" size="small" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={stages.map((option) => option.name)}
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
        onClick={handleClickOpen}
      >
        Create
      </Button>
      </Box>
  )
}

export default TicketSearch
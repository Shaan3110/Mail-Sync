import React from "react";
import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

const AddTicket = ({
  open,
  summary,
  submitAddRequest,
  handleClose,
  error,
  errormessage,
  projects,
  users,
  project_name,
  assignee_name,
  stages,
  status_name,
}) => {

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <>
      <div style={{ padding: "10px 10px" }}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="lg"
        >
          <Stack
            spacing={2}
            sx={{ margin: "20px 30px", width: "70vw", height: "100vh" }}
          >
            <form onSubmit={submitAddRequest}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: "span 4" },
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Summary"
                  variant="outlined"
                  name="summary"
                  sx={{ width: "100%" }}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={projects.map((option) => option.name)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Project"
                      size="small"
                      name="project_name"
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={["Story", "Bug", "Task"]}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      size="small"
                      name="project_type"
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={users.map((option) => option.name)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assignee"
                      size="small"
                      name="assignee_name"
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={stages.map((option) => option.name)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status"
                      size="small"
                      name="status_name"
                    />
                  )}
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  name="description"
                />
                <Button variant="contained" type="submit">
                  Create
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  color="secondary"
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Stack>
          {error ? <Alert severity="error">{errormessage}</Alert> : null}
        </BootstrapDialog>
      </div>
    </>
  );
};

export default AddTicket;

import { Box, Button, IconButton, InputBase, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import Heading from "./Heading";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from '@mui/icons-material/Email';

const Faq = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginBottom: "20px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0,
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(2, 2, 2, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Box m="20px">
      <Heading title="Faq" subtitle="Frequently Asked Questions Page" />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Accordion sx={{ backgroundColor: colors.primary[400] }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#696cff" }} />}
        >
          <Typography color={"#696cff"} fontWeight="bolder" variant="h5">
            An Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: colors.primary[400] }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#696cff" }} />}
        >
          <Typography color={"#696cff"} fontWeight="bolder" variant="h5">
            Another Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: colors.primary[400] }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#696cff" }} />}
        >
          <Typography color={"#696cff"} fontWeight="bolder" variant="h5">
            Your Favorite Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: colors.primary[400] }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#696cff" }} />}
        >
          <Typography color={"#696cff"} fontWeight="bolder" variant="h5">
            Some Random Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: colors.primary[400] }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#696cff" }} />}
        >
          <Typography color={"#696cff"} fontWeight="bolder" variant="h5">
            The Final Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color={colors.grey[100]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        justifyContent="center"
        m={3}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            fontWeight: "bolder",
            textTransform: "none",
            fontSize: "13px",
          }}
        >
          Questions ?
        </Button>
        <Typography
          color={colors.grey[100]}
          variant="h3"
          fontWeight={"bolder"}
          sx={{
            margin: "10px 0px",
          }}
        >
          Still having questions ?
        </Typography>
        <Typography color={colors.grey[300]} variant="h6" fontWeight={"bold"}>
          If you can't find question in our FAQ, you can contact us. We'll
          answer you shortly!
        </Typography>
        <Box
          sx={{
            width: "100%",
            margin: "10px 0px",
          }}
          display="flex"
        >
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              width: "100%",
              margin: "10px 20px",
              borderRadius: "5px",
              padding: "50px 10px",
            }}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<CallIcon />}
              sx={{
                "& .MuiButton-endIcon": {
                  marginLeft: "0px !important",
                  marginRight: "0px !important",
                },
              }}
            />
            <Typography
              color={colors.grey[100]}
              variant="h3"
              fontWeight={"bolder"}
              sx={{
                marginTop: "10px",
              }}
            >
              +91-9122123198
            </Typography>
            <Typography
              color="#696cff"
              variant="h4"
              fontWeight={"bold"}
              sx={{
                marginTop: "10px",
              }}
            >
              We are always happy to help
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              width: "100%",
              margin: "10px 20px",
              borderRadius: "5px",
              padding: "10px 10px",
            }}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<EmailIcon />}
              sx={{
                "& .MuiButton-endIcon": {
                  marginLeft: "0px !important",
                  marginRight: "0px !important",
                },
              }}
            />
            <Typography
              color={colors.grey[100]}
              variant="h3"
              fontWeight={"bolder"}
              sx={{
                marginTop: "10px",
              }}
            >
              help@molecule.com
            </Typography>
            <Typography
              color="#696cff"
              variant="h4"
              fontWeight={"bold"}
              sx={{
                marginTop: "10px",
              }}
            >
              Best way to get a quick answer
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Faq;

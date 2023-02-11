import { Box } from '@mui/system'
import React from 'react'
import { Navbar } from '../components/global/Navbar';
import Sidebar from '../components/global/Sidebar';
import Tickets from '../components/Ticket/Tickets';

const TicketPage = () => {

  return (
    <div className="app">
      <Sidebar />
      <main
        className="content"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <Navbar />
        <Box m="20px">
          <Tickets />
        </Box>
      </main>
    </div>
  )
}

export default TicketPage
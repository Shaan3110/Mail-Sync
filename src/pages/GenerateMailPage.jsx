import { Box } from '@mui/system'
import React from 'react'
import GenerateMail from '../components/GenerateMail'
import { Navbar } from '../components/global/Navbar'
import Sidebar from '../components/global/Sidebar'

const GenerateMailPage = () => {

  return (
    <div className="app">
      <Sidebar />
      <main
        className="content"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <Navbar />
        <Box m="20px">
          <GenerateMail/>
        </Box>
      </main>
    </div>
  )
}

export default GenerateMailPage
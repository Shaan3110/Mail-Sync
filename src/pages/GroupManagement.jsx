import { Box } from '@mui/system'
import React from 'react'
import { Navbar } from '../components/global/Navbar'
import Sidebar from '../components/global/Sidebar'
import GroupManage from '../components/GroupManage'

const GroupManagement = () => {

  return (
    <div className="app">
      <Sidebar />
      <main
        className="content"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        <Navbar />
        <Box m="20px">
          <GroupManage/>
        </Box>
      </main>
    </div>
  )
}

export default GroupManagement
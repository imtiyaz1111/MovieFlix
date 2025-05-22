import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'

const Layout = ({children}) => {
  return (
    <Box sx={{bgcolor:"black"}}>
        <Header/>
        {children}
        <Footer/>
    </Box>
  )
}

export default Layout

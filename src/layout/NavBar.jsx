import React from 'react'
import Cart from '../pages/Cart'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { TextField } from '@mui/material';



export default function NavBar(props) {



  return (
    
    
    <div>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit"><Cart/></Button>
          <Button color="inherit">Login</Button>
          <input placeholder='Search Product' type="text" onChange={(e)=>props.setTextTerm(e.target.value)}></input>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

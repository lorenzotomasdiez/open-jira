import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { useContext } from "react"
import { UiContext } from "../../context/ui"

export const Navbar = () => {
  const {openSideMenu} = useContext(UiContext)
  return (
    <AppBar position="sticky">
        <Toolbar>
            <IconButton size='large' edge='start' onClick={openSideMenu}>
                <MenuOutlined/>
            </IconButton>
            <Typography variant='h6'>OpenJira</Typography>
        </Toolbar>
    </AppBar>
  )
}

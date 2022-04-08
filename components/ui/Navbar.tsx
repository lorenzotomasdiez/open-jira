import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import NextLink from "next/link"
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
            <NextLink href="/" passHref>
              <Link underline="none" color="white">
                <Typography variant='h6'>OpenJira</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}

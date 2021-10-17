import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const SideBar = () => {
	return (
		<div>
			<AppBar position="static" style={{width: '100%'}}>
				<Toolbar>
					<Typography variant="h4">
						Noticias
					</Typography>
					<Button startIcon={<HomeOutlined />} component={Link} to={'/prueba'} variant="text" style={{ marginLeft: '200px' }} color="inherit">
						Inicio
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default SideBar;
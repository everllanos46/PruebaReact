import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { HomeOutlined, HistoryOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
const SideBar = () => {
	return (
		<div>
			<AppBar position="static" style={{ width: '100%' }}>
				<Toolbar>
					<Grid container>
						<Grid item xs={7}>
							<Typography style={{ marginLeft: '15%' }} variant="h4">
								Noticias
							</Typography>
						</Grid>
						<Grid item xs={5}>
							<Grid style={{ marginLeft: '6%' }}container>
								<Grid item xs={2}>
									<Button startIcon={<HomeOutlined />} component={Link} to={'/'} variant="text" style={{ marginLeft: '200px' }} color="inherit">
										Inicio
									</Button>
								</Grid>
								<Grid item xs={1}>
									<Button startIcon={<HistoryOutlined />} component={Link} to={'/'} variant="text" style={{ marginLeft: '200px' }} color="inherit">
										Historial
									</Button>
								</Grid>
							</Grid>

						</Grid>


					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default SideBar;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Home from './Home';
import TableView from './TableView';
import ChartView from './ChartView';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    loginButton: {
        width: "10%",
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar({ updateUser }) {
    const classes = useStyles();
    const [showComponent, setShowComponent] = useState("home")

    const handleHome = () => {
        setShowComponent("home");
    }

    const handleTableView = () => {
        setShowComponent("tableView");
    }

    const handleChartView = () => {
        setShowComponent("chartView");
    }

    const handleLogout = () => {
        updateUser({})
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {/* Chart View */}
                    </Typography>
                    <Button onClick={handleHome} color="inherit">Home</Button>
                    <Button onClick={handleTableView} color="inherit">Table View</Button>
                    {/* <Button onClick={handleChartView} color="inherit">Chart View</Button> */}
                    <Button onClick={handleLogout} className={classes.loginButton} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            {(showComponent === "home") &&
                <Home />
            }
            {(showComponent === "tableView") &&
                <TableView />
            }
            {(showComponent === "chartView") &&
                <ChartView />
            }
        </div>
    );
}
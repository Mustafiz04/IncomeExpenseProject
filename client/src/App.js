import React from 'react'
import { Grid } from '@material-ui/core';

import Details from "./components/Details/Details.jsx"
import Main from './components/Main/Main.jsx'

import {GlobalProvider} from "./../src/context/GlobalContext";

import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    
    return (
        <GlobalProvider>
            <div>
                <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: '100vh'}}>
                    <Grid item xs={12} sm={4} className={classes.mobile}>
                        <Details title="Income" />
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.main}>
                        <Main />
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.desktop}>
                        <Details title="Income" />
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.last}>
                        <Details title="Expense" />
                    </Grid>
                </Grid>
            </div>
        </GlobalProvider>
    )
}

export default App

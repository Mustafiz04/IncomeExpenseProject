import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import { GlobalContext } from './../../context/GlobalContext';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
// import InfoCard from '../InfoCard';
import {numberWithCommas} from './../../utils/formatNumber';

const ExpenseTracker = () => {
    const classes = useStyles();
    const { balance } = useContext(GlobalContext);

    const sign = balance < 0 ? "-" : " ";

    return (
        <Card className={classes.root}>
        <CardHeader title="Expense Tracker" />
        <CardContent>
            <Typography align="center" variant="h5">Total balance in {sign}&#8377;{numberWithCommas(Math.abs(balance))}</Typography>
            <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                {/* <InfoCard /> */}
            </Typography>
            <Divider className={classes.divider} />
            <Form />
        </CardContent>
        <CardContent className={classes.cartContent}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <List />
            </Grid>
            </Grid>
        </CardContent>
        </Card>
    );
};

export default ExpenseTracker;
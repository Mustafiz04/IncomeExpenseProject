import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';


import useTransactions from "./../../useTransaction";
import {numberWithCommas} from "./../../utils/formatNumber"
import useStyles from './styles';

const DetailsCard = ({ title, subheader }) => {
    const { total, chartData } = useTransactions(title);
    const classes = useStyles();
    // const global = useContext(GlobalContext);
    // console.log(total)

    return (
        <Card className={title === 'Income' ? classes.income : classes.expense}>
        <CardHeader title={title} subheader={subheader} />
        <CardContent>
            <Typography variant="h5">&#8377;{numberWithCommas(total)}</Typography>
            <Doughnut data={chartData} />
        </CardContent>
        </Card>
    );
};

export default DetailsCard;
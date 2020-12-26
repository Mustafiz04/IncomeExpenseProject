import React, {useState, useContext} from 'react'
import {FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField, Button} from "@material-ui/core"

import useStyles from './styles'

import formatDate from '../../../utils/formatDate';
import {incomeCategories, expenseCategories } from './../../../constant/categories';
import { GlobalContext } from "./../../../context/GlobalContext";

const Form = () => {
    const classes = useStyles();
    const {addTransaction} = useContext(GlobalContext);
    
    const initialState = {
        amount : "",
        category : "",
        type : "",
        date : formatDate(new Date())
    }

    const [data, setData] = useState(initialState)

    // console.log(data)

    const createTransaction = () => {
        const transaction = {...data, amount:Number(data.amount)}
        addTransaction(transaction);
        setData(initialState);
    }

    // console.log(data);
    const selectedCategory = data.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                {/* <Typography align="center" variant="h4" gutterBottom>
                    Total balance in &#8377;{numberWithCommas(balance)}
                </Typography>    */}
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth >
                    <InputLabel>Types</InputLabel>
                    <Select name='type' value={data.type} onChange={(e) => setData({ ...data, type:e.target.value}) }>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth >
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={data.category} onChange={(e) => setData({ ...data, category:e.target.value}) }>
                    {selectedCategory.map((c) => <MenuItem key={c.type} value={c.type} >{c.type}</MenuItem>)}
                        {/* <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="Salary">Salary</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} >
                <TextField type="number" label="Amount" fullWidth name="amount" value={data.amount} onChange={(e) => setData({ ...data, amount:e.target.value}) } ></TextField>
            </Grid>
            <Grid item xs={6} >
                <TextField type="date" label="Date" fullWidth name="date" value={data.date} onChange={(e) => setData({ ...data, date:formatDate(e.target.value)}) } ></TextField>
            </Grid>
            <Button onClick={createTransaction} className={classes.button} variant='outlined' color='primary' fullWidth >Create</Button>
        </Grid>
    )
}

export default Form

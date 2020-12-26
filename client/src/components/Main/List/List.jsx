import React, { useContext, useEffect } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import {GlobalContext} from './../../../context/GlobalContext'
import useStyles from './styles';

// const transactions = [
//     {id : 1, type : 'Income', amount : 100, category : "Salary", date:'10-10-2000'}
// ]

const List = () => {
    const classes = useStyles();
    const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);

    console.log(transactions);

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <MUIList dense={false} className={classes.list}>
        {transactions.map((transaction) => (
            <Slide direction="down" in mountOnEnter unmountOnExit key={transaction._id}>
            <ListItem>
                <ListItemAvatar>
                <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                    <MoneyOff />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`} />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete"  >
                    <Delete onClick = {() => deleteTransaction(transaction._id)} />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            </Slide>
        ))}
        </MUIList>
    );
};

export default List;
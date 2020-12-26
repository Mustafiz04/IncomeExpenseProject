import React, {createContext, useReducer} from 'react';
import AppReducer from "./AppReducer";

import axios from 'axios';

const initialState = {
    transactions : [],
    error : null,
    loading : true
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getTransactions(){
        try {
            const res = await axios.get("/transactions")

            console.log(res);

            dispatch({
                type : "GET_TRANSACTION",
                payload : res.data.transaction
            })
        } catch (error) {
            dispatch({
                type : "TRANSACTION_ERROR",
                payload : error.response.data.error
            })
        }
    }

    async function deleteTransaction(id){
        try {
            await axios.delete(`/transactions/${id}`)

            dispatch({
                type : "DELETE_TRANSACTION",
                payload : id
            })
        } catch (error) {
            dispatch({
                type : "TRANSACTION_ERROR",
                payload : error.response.data.error
            })
        }
    }

    async function addTransaction(transaction){
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/transactions', transaction, config);

            dispatch({
                type : 'ADD_TRANSACTION',
                payload : res.data.transaction
            });
        } catch (error) {
            dispatch({
                type : "TRANSACTION_ERROR",
                payload : error.response.data.error
            })
        }
    }

    const balance = state.transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

    return (
        <GlobalContext.Provider value={{
            appName : "Expense Tracker",
            transactions : state.transactions,
            balance,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
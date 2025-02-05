import React, { useContext, useState } from "react"
import axios from 'axios'
const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext()
export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
    }
    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }
    const totalIncome = () => {
        let total = incomes.reduce((acc, income) => acc + income.amount, 0);
        return isFinite(total) ? total : 0;
    }
    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
    }
    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
    const totalExpenses = () => {
        let total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        return isFinite(total) ? total : 0;
    }
    const totalBalance = () => {
        let balance = totalIncome() - totalExpenses();
        return isFinite(balance) ? balance : 0;
    }
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 3)
    }
    const loginUser = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, userData)
            setUser(response)
            setError(null)
            return user
        } catch (err) {
            setError(err)
            return false
        }
    }
    const logoutUser = () => {
        setUser(null)
    }
    const signupUser = async (userData) => {
        try {
            const response = await axios.post(`${BASE_URL}signup`, userData);
            setUser(response.data);
            setError(null);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
            return false;
        }
    };
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            user,
            loginUser,
            logoutUser,
            signupUser,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
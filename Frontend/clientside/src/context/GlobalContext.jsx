import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";



export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [user_id, setUser_Id] = useState("");


    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        setUser_Id(auth?.user?._id);
    }, [user_id]);

    const getIncomes = async (params = {}) => {
        setLoading(true);
        try {
            const { category, sort } = params;
            let url = `${import.meta.env.VITE_REACT_APP_API}/api/v1/get-incomes?user_id=${user_id}`;
            if (category) url += `&category=${category}`;
            if (sort) url += `&sort=${sort}`;

            const { data } = await axios.get(url);
            if (data?.success) {
                setIncomes(data.allIncomes);
                //toast.success(data.message);
            }
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const addIncome = async (income) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1//add-income`, income);
            if (!data?.success) {
                toast.error('An error occur while adding income');
            } else {
                toast.success(data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
        getIncomes();
    }

    const deleteIncome = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/delete-income/${id}`);
            if (data?.success)
                toast.success(data.message);
            else toast.error("An error occur while deleting income")
        }
        catch (error) {
            console.log(error);
        }
        getIncomes();
    }

    const totalIncome = () => {
        const filteredIncomes = incomes.filter(income => income.user_id === user_id);
        let sum = 0;
        filteredIncomes.forEach((income) => {
            sum += income.amount;
        });
        return sum;
    }

    const getExpenses = async (params = {}) => {
        setLoading(true);
        try {
            const { category, sort } = params;
            let url = `${import.meta.env.VITE_REACT_APP_API}/api/v1/get-expenses?user_id=${user_id}`;
            if (category) url += `&category=${category}`;
            if (sort) url += `&sort=${sort}`;

            const { data } = await axios.get(url);
            if (data?.success) {
                setExpenses(data.allExpenses);
            }
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const addExpense = async (expense) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1//add-expense`, expense);
            if (data?.success) {
                toast.success(data.message);
            } else {
                toast.error('An error occur while adding expense');
            }
        }
        catch (error) {
            console.log(error);
        }
        getExpenses();
    }

    const deleteExpense = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/delete-expense/${id}`);
            if (data?.success) {
                toast.success(data.message);
            } else {
                toast.error("An error occur while deleting expense");
            }
        }
        catch (error) {
            console.log(error);
        }
        getExpenses();
    }

    const totalExpense = () => {
        const filteredExpenses = expenses.filter(expense => expense.user_id === user_id);
        let sum = 0;
        filteredExpenses.forEach((expense) => {
            sum += expense.amount;
        });
        return sum;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpense();
    }

    const transactionHistory = () => {
        const filteredExpenses = expenses.filter(expense => expense.user_id === user_id);
        const filteredIncomes = incomes.filter(income => income.user_id === user_id);
        const history = [...filteredIncomes, ...filteredExpenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 4);
    }
    return (
        <GlobalContext.Provider value={{
            addIncome,
            incomes,
            setIncomes,
            getIncomes,
            deleteIncome,
            totalIncome,
            addExpense,
            expenses,
            setExpenses,
            getExpenses,
            deleteExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            setUser_Id,
            loading,
            theme,
            toggleTheme
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;
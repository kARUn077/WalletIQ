import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import '../form.css'
import { AuthContext } from "../../../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const ExpenseForm = () => {
    const { auth } = useContext(AuthContext);
    const { addExpense } = useContext(GlobalContext);
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        user_id: auth?.user?._id
    });
    const { title, amount, date, category, description } = inputState;
    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (inputState.amount >= 0) {
            addExpense(inputState);
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
                user_id: auth?.user?._id
            });
        } else alert("The amount must be non negative Integer");
    }
    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <div className="input-control-form">
                    <input type="text" name={'title'} value={title} placeholder="Expense Title" onChange={handleInput('title')} required />
                </div>
                <div className="input-control-form">
                    <input type="number" name={'amount'} value={amount} placeholder="Expense Amount" onChange={handleInput('amount')} min="0" required />
                </div>
                <div className="input-control-form">
                    <input type="date" name={'date'} value={date} placeholder="dd/MM/yyyy" onChange={handleInput('date')} required />
                </div>
                <div className="selects input-control-form">
                    <select required value={category} name="category" id="category" onChange={handleInput('category')} aria-required>
                        <option value="" disabled >Select Option</option>
                        <option value="education">Education</option>
                        <option value="groceries">Groceries</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="takeaways">Takeaways</option>
                        <option value="clothing">Clothing</option>
                        <option value="travelling">Travelling</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="input-control-form">
                    <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')} maxLength="50" required />
                    <div style={{ fontSize: '0.8rem', color: description.length >= 50 ? 'red' : '#666', textAlign: 'right' }}>
                        {description.length}/50
                    </div>
                </div>
                <button type="submit" className="submit-btn">+Add Expense</button>
            </form>
            {/* <ToastContainer/> */}
        </>
    );
}

export default ExpenseForm;
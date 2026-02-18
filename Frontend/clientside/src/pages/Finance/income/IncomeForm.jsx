import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import '../form.css'
import { AuthContext } from "../../../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const IncomeForm = () => {
    const { auth } = useContext(AuthContext);
    const { addIncome } = useContext(GlobalContext);
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        user_id: auth?.user?._id
    });
    const { title, amount, date, category, description, user_id } = inputState;
    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (inputState.amount >= 0) {
            addIncome(inputState);
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                description: '',
                user_id: auth?.user?._id
            });
        } else alert("The amount must be non negative Integer!");
    }
    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <div className="input-control-form">
                    <input type="text" name={'title'} value={title} placeholder="Salary Title" onChange={handleInput('title')} required />
                </div>
                <div className="input-control-form">
                    <input type="number" name={'amount'} value={amount} placeholder="Salary Amount" onChange={handleInput('amount')} min="0" required />
                </div>
                <div className="input-control-form">
                    <input type="date" name={'date'} value={date} placeholder="dd/MM/yyyy" onChange={handleInput('date')} required />
                </div>
                <div className="selects input-control-form">
                    <select required value={category} name="category" id="category" onChange={handleInput('category')} aria-required>
                        <option value="" disabled >Select Option</option>
                        <option value="salary">Salary</option>
                        <option value="freelancing">Freelancing</option>
                        <option value="investments">Investments</option>
                        <option value="stocks">Stocks</option>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="youtube">Youtube</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="input-control-form">
                    <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')} maxLength="50" required />
                    <div style={{ fontSize: '0.8rem', color: description.length >= 50 ? 'red' : '#666', textAlign: 'right' }}>
                        {description.length}/50
                    </div>
                </div>
                <button type="submit" className="submit-btn">+Add Income</button>
            </form>
            {/* <ToastContainer/> */}
        </>
    );
}

export default IncomeForm;
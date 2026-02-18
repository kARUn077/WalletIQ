import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, tv, trash, trend, users, yt } from "../../utils/Icons";
import './financeItem.css'

const FinanceItems = ({ finances, deleteFinance }) => {
    const incomeCategoryIcon = (category) => {
        switch (category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance;
            case 'investments':
                return trend;
            case 'stocks':
                return stocks;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return '';
        }
    }

    const expenseCategoryIcon = (category) => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return users;
            case 'other':
                return circle;
            default:
                return '';
        }
    }
    return (
        <div className="finance-item-content">
            {finances.map((finance) => (
                <div key={finance._id} className="finance-inner-content">
                    <div className="category-icon">
                        {finance.type === 'Expense' ? expenseCategoryIcon(finance.category) : incomeCategoryIcon(finance.category)}
                    </div>
                    <div className="finance-detail">
                        <h5>
                            <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: finance.type === 'Expense' ? 'var(--danger)' : 'var(--success)'
                            }}></span>
                            {finance.title}
                        </h5>
                        <div className="finance-time">
                            <div className="finance-time-info">
                                <p className="amount-text" style={{ color: finance.type === 'Expense' ? 'var(--danger)' : 'var(--success)' }}>
                                    {dollar} {finance.amount}
                                </p>
                                <p>{calender} {new Date(finance.date).toLocaleDateString('en-GB')}</p>
                                <p style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {comment} {finance.description}
                                </p>
                            </div>
                            <button className="delete-btn" onClick={() => { deleteFinance(finance._id) }}>{trash}</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


}

export default FinanceItems;
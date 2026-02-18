import { useContext, useEffect } from 'react';
import './finance.css'
import { GlobalContext } from '../../context/GlobalContext';
import Chart from '../../components/Chart'
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { incomes, getIncomes, expenses, getExpenses, totalIncome, totalExpense, totalBalance, transactionHistory } = useContext(GlobalContext);
  const { auth } = useContext(AuthContext);
  const [...history] = transactionHistory();
  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  return (
    <div className="finance-container main-content-glass">
      <h1 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ opacity: 0.6, fontWeight: 400 }}>Overview for</span> {auth?.user?.name && auth?.user?.name.toUpperCase()}
      </h1>

      <div className='transaction-container'>
        <div className='dashboard-container'>
          <div className='chart-container'>
            <Chart />
          </div>
          <div className='amount-detail'>
            <div className='total-amount'>
              <h2>Total Incomes</h2>
              <p className='amount-value' style={{ color: 'var(--success)' }}>${totalIncome()}</p>
            </div>
            <div className='total-amount'>
              <h2>Total Expenses</h2>
              <p className='amount-value' style={{ color: 'var(--danger)' }}>${totalExpense()}</p>
            </div>
            <div className='total-amount'>
              <h2>Total Balance</h2>
              <span className='amount-value' style={{ color: (totalBalance() < 0 ? 'var(--danger)' : 'var(--success)') }}>
                ${totalBalance()}
              </span>
            </div>
          </div>
        </div>

        <div className='transaction-detail'>
          <div className="history-container">
            <h2>Recent Transactions</h2>
            {history.length > 0 ? history.map((data) => (
              <div key={data._id} className="recent-data">
                <p style={{ fontWeight: 500 }}>{data.title}</p>
                <p style={{ color: data.type === 'Expense' ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                  {data.type === 'Expense' ? `-$${data.amount}` : `+$${data.amount}`}
                </p>
              </div>
            )) : <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No recent history</p>}
          </div>

          <div className="salary-container">
            <div className="salary-title">
              <span>Min Salary</span>
              <span>Max Salary</span>
            </div>
            <div className='salary-value'>
              <p>${incomes.length > 0 ? Math.min(...incomes.map(income => income.amount)) : 0}</p>
              <p style={{ color: 'var(--border-color)' }}>|</p>
              <p>${incomes.length > 0 ? Math.max(...incomes.map(income => income.amount)) : 0}</p>
            </div>
          </div>

          <div className="expense-container">
            <div className="expense-title">
              <span>Min Expense</span>
              <span>Max Expense</span>
            </div>
            <div className='expense-value'>
              <p>${expenses.length > 0 ? Math.min(...expenses.map(expense => expense.amount)) : 0}</p>
              <p style={{ color: 'var(--border-color)' }}>|</p>
              <p>${expenses.length > 0 ? Math.max(...expenses.map(expense => expense.amount)) : 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { useContext, useEffect, useState } from 'react';
import ExpenseForm from './ExpenseForm';
import '../finance.css'
import FinanceItems from '../FinanceItem';
import { GlobalContext } from '../../../context/GlobalContext';

const Expenses = () => {
    const { expenses, getExpenses, deleteExpense, totalExpense, loading } = useContext(GlobalContext);
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('desc');

    useEffect(() => {
        getExpenses({ category, sort });
    }, [category, sort]);

    const getCategoryBreakdown = () => {
        const breakdown = {};
        expenses.forEach(item => {
            breakdown[item.category] = (breakdown[item.category] || 0) + item.amount;
        });
        return breakdown;
    };

    return (
        <div className="finance-container main-content-glass">
            <h1>Expenses</h1>
            <div className='total-finance' style={{ minHeight: "100px", flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Total {category !== 'all' ? category.charAt(0).toUpperCase() + category.slice(1) : ''} Expenses
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--danger)', fontSize: '2.5rem', fontWeight: 800 }}>${totalExpense()}</span>
                    {!loading && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>({expenses.length} items)</span>}
                </div>
            </div>

            <div className="filter-sort-container" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="category-breakdown" style={{ flex: 1, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {Object.entries(getCategoryBreakdown()).map(([cat, total]) => (
                        <div key={cat} style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 500 }}>
                            <span style={{ opacity: 0.6 }}>{cat}:</span> ${total}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="filter-control">
                        <select
                            id="category-filter"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ height: '42px' }}
                        >
                            <option value="all">All Categories</option>
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
                    <div className="sort-control">
                        <select
                            id="sort-order"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            style={{ height: '42px' }}
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="finance-content">
                <div className="form-content">
                    <ExpenseForm />
                </div>
                <div className="finance-status">
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : expenses.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'rgba(0,0,0,0.02)', borderRadius: '24px' }}>
                            <h3 style={{ fontWeight: 600, color: 'var(--text-main)' }}>No transactions found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or record a new expense.</p>
                        </div>
                    ) : (
                        <FinanceItems finances={expenses} deleteFinance={deleteExpense} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Expenses;
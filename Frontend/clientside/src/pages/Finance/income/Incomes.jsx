
import { useContext, useEffect, useState } from 'react';
import IncomeForm from './IncomeForm';
import '../finance.css'
import FinanceItems from '../FinanceItem';
import { GlobalContext } from '../../../context/GlobalContext';

const Incomes = () => {
    const { incomes, getIncomes, deleteIncome, totalIncome, loading } = useContext(GlobalContext);
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('desc');

    useEffect(() => {
        getIncomes({ category, sort });
    }, [category, sort]);

    const getCategoryBreakdown = () => {
        const breakdown = {};
        incomes.forEach(item => {
            breakdown[item.category] = (breakdown[item.category] || 0) + item.amount;
        });
        return breakdown;
    };

    return (
        <div className="finance-container main-content-glass">
            <h1>Incomes</h1>
            <div className='total-finance' style={{ minHeight: "100px", flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Total {category !== 'all' ? category.charAt(0).toUpperCase() + category.slice(1) : ''} Incomes
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--success)', fontSize: '2.5rem', fontWeight: 800 }}>${totalIncome()}</span>
                    {!loading && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>({incomes.length} items)</span>}
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
                    <IncomeForm />
                </div>
                <div className="finance-status">
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : incomes.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'rgba(0,0,0,0.02)', borderRadius: '24px' }}>
                            <h3 style={{ fontWeight: 600, color: 'var(--text-main)' }}>No transactions found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or record a new income.</p>
                        </div>
                    ) : (
                        <FinanceItems finances={incomes} deleteFinance={deleteIncome} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Incomes;
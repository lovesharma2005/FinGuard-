import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { dollar } from '../../utils/Icons';

function Expenses() {
    const {expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])

    const getHighestExpense = () => {
        if (expenses.length === 0) return 0;
        const max = Math.max(...expenses.map(item => item.amount));
        return isFinite(max) ? max : 0;
    }

    const getLatestExpense = () => {
        return expenses[0]?.amount || 0;
    }

    return (
        <ExpenseStyled>
            <InnerLayout>
                <div className="top-content">
                    <div className="header-container">
                        <h1>Expenses</h1>
                        <div className="total-expense">
                            <div className="amount">
                                <span>₹</span>
                                <span className="number">{totalExpenses()}</span>
                            </div>
                            <span className="text">Total Expense</span>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="stat-item">
                            <span className="label">Highest</span>
                            <span className="value">₹{getHighestExpense()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">Latest</span>
                            <span className="value">₹{getLatestExpense()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">Count</span>
                            <span className="value">{expenses.length}</span>
                        </div>
                    </div>
                </div>

                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-accent)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;

    .top-content {
        margin-bottom: 2rem;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--background-light);
        border-radius: var(--border-radius);
        padding: 2rem;
        box-shadow: var(--box-shadow);
        
        h1 {
            font-size: 2.5rem;
            font-weight: 600;
            margin: 0;
        }

        .total-expense {
            text-align: right;
            
            .amount {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--color-accent);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                
                .dollar {
                    font-size: 1.5rem;
                    margin-right: 0.5rem;
                }
            }

            .text {
                font-size: 1rem;
                color: var(--primary-color3);
            }
        }
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 2rem;

        .stat-item {
            background: white;
            padding: 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            
            &:hover {
                transform: translateY(-3px);
                box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.12);
            }

            .label {
                font-size: 1.1rem;
                color: var(--primary-color3);
                margin-bottom: 0.5rem;
            }

            .value {
                font-size: 1.8rem;
                font-weight: 600;
                color: var(--color-accent);
            }
        }
    }

    .expense-content {
        display: flex;
        gap: 2rem;
        
        .form-container {
            flex: 1;
            max-width: 450px;
        }

        .expenses {
            flex: 2;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }

    @media (max-width: 1200px) {
        .expense-content {
            flex-direction: column;
            
            .form-container {
                max-width: 100%;
            }
        }
    }

    @media (max-width: 768px) {
        .header-container {
            flex-direction: column;
            text-align: center;
            gap: 1rem;

            .total-expense {
                text-align: center;
            }
        }

        .stats {
            grid-template-columns: 1fr;
        }
    }
`;
export default Expenses
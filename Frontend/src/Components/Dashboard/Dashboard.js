import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { rupee } from '../../utils/Icons';
const formatAmount = (amount) => {
    if (!isFinite(amount) || isNaN(amount)) return 0;
    return amount;
};
function Dashboard() {
    const {totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    },[])
    return (
        <DashboardStyled>
            <InnerLayout>
                <div className="dashboard-content">
                    <div className="stats-con">
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <div className="amount">
                                    <p><span>₹</span>{totalIncome()}</p>
                                </div>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <div className="amount">
                                    <p><span>₹</span>{totalExpenses()}</p>
                                </div>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <div className="amount">
                                    <p><span>₹</span>{totalBalance()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history-con">
                            <History />
                            <div className="analytics">
                                <div className="analytics-item">
                                    <h2>Min/Max Values</h2>
                                    <div className="min-max-grid">
                                        <div className="analytic">
                                            <p className="title">Min Income</p>
                                            <p className="value">₹{formatAmount(Math.min(...incomes.map(item => item.amount)) || 0)}</p>
                                        </div>
                                        <div className="analytic">
                                            <p className="title">Max Income</p>
                                            <p className="value">₹{formatAmount(Math.max(...incomes.map(item => item.amount)) || 0)}</p>
                                        </div>
                                        <div className="analytic">
                                            <p className="title">Min Expense</p>
                                            <p className="value">₹{formatAmount(Math.min(...expenses.map(item => item.amount)) || 0)}</p>
                                        </div>
                                        <div className="analytic">
                                            <p className="title">Max Expense</p>
                                            <p className="value">₹{formatAmount(Math.max(...expenses.map(item => item.amount)) || 0)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .dashboard-content {
        .stats-con {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            
            .amount-con {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
                margin-bottom: 2rem;
                
                .income, .expense, .balance {
                    background: white;
                    border: 2px solid #ffffff;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    transition: all 0.3s ease-in-out;
                    
                    &:hover {
                        transform: translateY(-3px);
                        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
                    }

                    h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-bottom: 1rem;
                    }

                    .amount {
                        display: flex;
                        align-items: center;
                        
                        .rupee {
                            font-size: 1.5rem;
                            margin-right: 0.5rem;
                            color: var(--color-green);
                        }

                        p {
                            font-size: 2.5rem;
                            font-weight: 600;
                        }
                    }
                }

                .income .amount {
                    color: var(--color-green);
                }

                .expense .amount {
                    color: var(--color-accent);
                }

                .balance {
                    grid-column: 1 / 3;
                    
                    .amount {
                        color: var(--primary-color);
                        p {
                            font-size: 3rem;
                        }
                    }
                }
            }

            .history-con {
                h2 {
                    margin-bottom: 1.5rem;
                }
                
                .analytics {
                    margin-top: 2rem;
                    background: white;
                    border-radius: 20px;
                    padding: 1rem 2rem;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

                    .analytics-item {
                        h2 {
                            font-size: 1.5rem;
                            margin-bottom: 1rem;
                        }

                        .min-max-grid {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 1.5rem;

                            .analytic {
                                background: var(--background-light);
                                padding: 1rem;
                                border-radius: 10px;
                                
                                .title {
                                    font-size: 1rem;
                                    color: var(--primary-color3);
                                    margin-bottom: 0.5rem;
                                }
                                
                                .value {
                                    font-size: 1.5rem;
                                    font-weight: 600;
                                    color: var(--primary-color);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 1200px) {
        .stats-con {
            grid-template-columns: 1fr !important;
        }
    }

    @media (max-width: 768px) {
        .stats-con {
            .amount-con {
                grid-template-columns: 1fr !important;
                
                .balance {
                    grid-column: 1 !important;
                }
            }
            
            .analytics {
                .min-max-grid {
                    grid-template-columns: 1fr !important;
                }
            }
        }
    }
`;

export default Dashboard
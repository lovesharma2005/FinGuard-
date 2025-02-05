import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { rupee } from '../../utils/Icons';
function Income() {
    const {addIncome, incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])

    const getHighestIncome = () => {
        if (incomes.length === 0) return 0;
        const max = Math.max(...incomes.map(item => item.amount));
        return isFinite(max) ? max : 0;
    }

    const getLatestIncome = () => {
        return incomes[0]?.amount || 0;
    }

    return (
        <IncomeStyled>
            <InnerLayout>
                <div className="top-content">
                    <div className="header-container">
                        <h1>Incomes</h1>
                        <div className="total-income">
                            <div className="amount">
                                <span>₹</span>
                                <span className="number">{totalIncome()}</span>
                            </div>
                            <span className="text">Total Income</span>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="stat-item">
                            <span className="label">Highest</span>
                            <span className="value">₹{getHighestIncome()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">Latest</span>
                            <span className="value">₹{getLatestIncome()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="label">Count</span>
                            <span className="value">{incomes.length}</span>
                        </div>
                    </div>
                </div>

                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
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

        .total-income {
            text-align: right;
            
            .amount {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--color-green);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                
                .rupee {
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
            justify-content: center;
            align-items: center;

            &:hover {
                transform: translateY(-5px);
                box-shadow: var(--box-shadow-hover);
            }

            .label {
                font-size: 1rem;
                color: var(--primary-color3);
            }

            .value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--color-green);
            }
        }
    }

    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Income
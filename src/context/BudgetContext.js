import { createContext, useContext, useState } from "react";

const BudgetsContext = createContext();

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [ budgets, setBudgets ] = useState([]);
  const [ expenses, setExpenses ] = useState([]);

  const getBudgetExpenses = (budgetId) =>{
    return expenses.filter(expense => expense.budgetId === budgetId);
  };
  
  const addExpense = () =>{};
  const addBudget = () =>{};
  const deleteBudget = () =>{};
  const deleteExpense = () =>{};

  return(
    <BudgetsContext.Provider value={{
      budgets,
      expenses,
      getBudgetExpenses,
      addExpense,
      addBudget,
      deleteBudget,
      deleteExpense,
    }}>
      { children }
    </BudgetsContext.Provider>
  )
};
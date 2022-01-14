import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

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

  const addBudget = ({ name, max }) =>{
    setBudgets(prevBudget => {
      if(prevBudget.find(budget => budget === budget.name)){
        return prevBudget;
      };
      return [...prevBudget, { id: uuidV4(), name, max }];
    });
  };

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
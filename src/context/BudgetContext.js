import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const [ budgets, setBudgets ] = useLocalStorage("budgets", []);
  const [ expenses, setExpenses ] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) =>{
    return expenses.filter(expense => expense.budgetId === budgetId);
  };

  const addExpense = ({ budgetId, amount, description }) =>{
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), budgetId, amount, description }];
    })
  };

  const addBudget = ({ name, max }) =>{
    setBudgets(prevBudgets => {
      if(prevBudgets.find(budget => budget === budget.name)){
        return prevBudgets;
      };
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const deleteBudget = ({ id }) =>{
    // TODO deal with expenses
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id);
    });
  };

  const deleteExpense = ({ id }) =>{
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id);
    })
  };

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
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function calculateSplitAmount(totalAmount: number, numberOfPeople: number): number {
  return totalAmount / numberOfPeople;
}

export function calculateBalances(expenses: any[], userId: string) {
  const balances: { [key: string]: number } = {};
  
  expenses.forEach(expense => {
    expense.splitDetails.forEach((split: any) => {
      const splitUserId = split.user.toString();
      
      if (expense.paidBy.toString() === userId) {
        if (splitUserId !== userId) {
          balances[splitUserId] = (balances[splitUserId] || 0) - split.amount;
        }
      } else if (splitUserId === userId) {
        const paidByUserId = expense.paidBy.toString();
        balances[paidByUserId] = (balances[paidByUserId] || 0) + split.amount;
      }
    });
  });
  
  return balances;
}

export function simplifyDebts(balances: { [key: string]: number }) {
  const creditors: { userId: string; amount: number }[] = [];
  const debtors: { userId: string; amount: number }[] = [];
  
  Object.entries(balances).forEach(([userId, balance]) => {
    if (balance > 0) {
      creditors.push({ userId, amount: balance });
    } else if (balance < 0) {
      debtors.push({ userId, amount: Math.abs(balance) });
    }
  });
  
  const settlements: { from: string; to: string; amount: number }[] = [];
  
  while (creditors.length > 0 && debtors.length > 0) {
    const creditor = creditors[0];
    const debtor = debtors[0];
    
    const settleAmount = Math.min(creditor.amount, debtor.amount);
    
    settlements.push({
      from: debtor.userId,
      to: creditor.userId,
      amount: settleAmount,
    });
    
    creditor.amount -= settleAmount;
    debtor.amount -= settleAmount;
    
    if (creditor.amount === 0) {
      creditors.shift();
    }
    if (debtor.amount === 0) {
      debtors.shift();
    }
  }
  
  return settlements;
}
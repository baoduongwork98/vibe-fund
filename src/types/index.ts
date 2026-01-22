export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
    contributor?: string; // Who paid/received
}

export interface FundSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

import { FundSummary, Transaction } from "@/types";

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: '1',
        date: '2023-10-25',
        description: 'Initial Contribution - Alice',
        amount: 500000,
        type: 'income',
        category: 'Contribution',
        contributor: 'Alice',
    },
    {
        id: '2',
        date: '2023-10-25',
        description: 'Initial Contribution - Bob',
        amount: 500000,
        type: 'income',
        category: 'Contribution',
        contributor: 'Bob',
    },
    {
        id: '3',
        date: '2023-10-26',
        description: 'Grocery Shopping for BBQ',
        amount: 350000,
        type: 'expense',
        category: 'Food',
    },
    {
        id: '4',
        date: '2023-10-26',
        description: 'Drinks',
        amount: 150000,
        type: 'expense',
        category: 'Beverage',
    },
    {
        id: '5',
        date: '2023-10-27',
        description: 'Taxi to Camping Site',
        amount: 200000,
        type: 'expense',
        category: 'Transport',
    },
    {
        id: '6',
        date: '2023-10-28',
        description: 'Refund for excess purchase',
        amount: 50000,
        type: 'income',
        category: 'Refund',
    },
    {
        id: '7',
        date: '2023-10-29',
        description: 'Movie Tickets',
        amount: 400000,
        type: 'expense',
        category: 'Entertainment',
    },
];

export const getFundSummary = (transactions: Transaction[]): FundSummary => {
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
    };
};

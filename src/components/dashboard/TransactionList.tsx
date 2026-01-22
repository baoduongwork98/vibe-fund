"use client";

import { useState } from 'react';
import { Transaction, TransactionType } from '@/types';
import { ArrowDownLeft, ArrowUpRight, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionListProps {
    transactions: Transaction[];
}

type FilterType = 'all' | TransactionType;

export function TransactionList({ transactions }: TransactionListProps) {
    const [filter, setFilter] = useState<FilterType>('all');

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'all') return true;
        return t.type === filter;
    });

    return (
        <div className="rounded-xl border bg-white shadow-sm h-full">
            <div className="p-6 flex flex-row items-center justify-between border-b">
                <h3 className="font-semibold leading-none tracking-tight">Recent Transactions</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={cn("px-3 py-1 text-sm rounded-full transition-colors", filter === 'all' ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('income')}
                        className={cn("px-3 py-1 text-sm rounded-full transition-colors", filter === 'income' ? "bg-green-600 text-white" : "bg-green-50 text-green-700 hover:bg-green-100")}
                    >
                        Income
                    </button>
                    <button
                        onClick={() => setFilter('expense')}
                        className={cn("px-3 py-1 text-sm rounded-full transition-colors", filter === 'expense' ? "bg-red-600 text-white" : "bg-red-50 text-red-700 hover:bg-red-100")}
                    >
                        Expense
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {filteredTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-full flex items-center justify-center",
                                    transaction.type === 'income' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                )}>
                                    {transaction.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{transaction.description}</p>
                                    <p className="text-sm text-gray-500">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className={cn(
                                "font-bold",
                                transaction.type === 'income' ? "text-green-600" : "text-gray-900"
                            )}>
                                {transaction.type === 'income' ? '+' : '-'}{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(transaction.amount)}
                            </div>
                        </div>
                    ))}
                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-8 text-gray-500">No transactions found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

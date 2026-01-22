"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Transaction } from '@/types';
import { useMemo } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface FinanceChartProps {
    transactions: Transaction[];
}

export function FinanceChart({ transactions }: FinanceChartProps) {
    const chartData = useMemo(() => {
        // Group by date, sort by date
        const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        // For simplicity in this mock, getting unique dates
        const dates = Array.from(new Set(sorted.map(t => t.date)));

        // Cumulative balance calculation (mock logic)
        // In a real app, we'd calculate running balance from start
        let runningBalance = 0;
        const balanceData = dates.map(date => {
            const dayTransactions = transactions.filter(t => t.date === date);
            const dayDelta = dayTransactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);
            runningBalance += dayDelta;
            return runningBalance;
        });

        return {
            labels: dates.map(d => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })),
            datasets: [
                {
                    label: 'Balance',
                    data: balanceData,
                    fill: true,
                    borderColor: 'rgb(79, 70, 229)', // Indigo 600
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4,
                },
            ],
        };
    }, [transactions]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            }
        },
        scales: {
            y: {
                grid: {
                    display: true,
                    color: "rgba(0,0,0,0.05)"
                },
                ticks: {
                    color: "#6b7280"
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: "#6b7280"
                }
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="rounded-xl border bg-white shadow-sm p-6 h-full flex flex-col">
            <h3 className="font-semibold leading-none tracking-tight mb-6">Financial Overview</h3>
            <div className="flex-1 min-h-[300px]">
                <Line options={options} data={chartData} />
            </div>
        </div>
    );
}

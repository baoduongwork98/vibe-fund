import { getFundSummary, MOCK_TRANSACTIONS } from "@/data/mockData";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { FinanceChart } from "@/components/dashboard/FinanceChart";
import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function Home() {
  const summary = getFundSummary(MOCK_TRANSACTIONS);
  const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Vibe Fund Dashboard</h1>
        <p className="text-gray-500">Overview of group finances and activities.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          label="Total Balance"
          value={formatter.format(summary.balance)}
          icon={Wallet}
          className="bg-indigo-600 text-white border-0 [&_h3]:text-indigo-100 [&_div]:text-white [&_svg]:text-indigo-100"
        />
        <StatsCard
          label="Total Income"
          value={formatter.format(summary.totalIncome)}
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          label="Total Expernse"
          value={formatter.format(summary.totalExpense)}
          icon={TrendingDown}
          trend={{ value: 4, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-8 h-[500px]">
        <div className="col-span-4 lg:col-span-5 h-full">
          <FinanceChart transactions={MOCK_TRANSACTIONS} />
        </div>
        <div className="col-span-3 lg:col-span-3 h-full">
          <TransactionList transactions={MOCK_TRANSACTIONS} />
        </div>
      </div>
    </div>
  );
}

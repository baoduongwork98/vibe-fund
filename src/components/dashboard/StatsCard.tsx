import { LucideIcon } from 'lucide-react';

import { cn } from "@/lib/utils";

// Simple Card components since we don't have full shadcn setup yet, 
// but sticking to compatible naming for future potential upgrade
// Or just inline them here if shadcn is not installed. 
// Plan said "create-next-app", didn't say "install shadcn".
// I'll create a simple accessible card structure here using Tailwind directly
// to avoid "module not found" errors for components/ui/card.

interface StatsCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, className }: StatsCardProps) {
    return (
        <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm bg-white p-6", className)}>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground text-gray-500">
                    {label}
                </h3>
                <Icon className="h-4 w-4 text-muted-foreground text-gray-500" />
            </div>
            <div className="pt-2">
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                {trend && (
                    <p className={cn("text-xs mt-1", trend.isPositive ? "text-green-600" : "text-red-600")}>
                        {trend.isPositive ? "+" : ""}{trend.value}% from last month
                    </p>
                )}
            </div>
        </div>
    );
}

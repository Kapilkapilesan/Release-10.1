import React from 'react';
import { DollarSign, UserCheck, Users } from 'lucide-react';
import { SalaryStats } from '@/types/salary.types';
import { colors } from '@/themes/colors';

interface SalaryStatsCardProps {
    stats: SalaryStats;
}

export const SalaryStatsCard: React.FC<SalaryStatsCardProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
            <div className="p-4 rounded-2xl border border-primary-500/20 bg-primary-500/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                        2026-01
                    </span>
                </div>
                <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Total Payroll</h3>
                <p className="text-2xl font-black text-text-primary mt-1">
                    Rs. {stats.totalPayroll.toLocaleString()}
                </p>
                <p className="text-xs text-text-muted font-medium mt-1 uppercase tracking-tight">{stats.processedCount} salaries processed</p>
            </div>

            <div className="bg-card p-4 rounded-2xl border border-border-default/50">
                <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-muted-bg/50 rounded-xl border border-border-default/50 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-text-muted" />
                    </div>
                </div>
                <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Average Salary</h3>
                <p className="text-2xl font-black text-text-primary mt-1">
                    Rs. {stats.averageSalary.toLocaleString()}
                </p>
                <p className="text-xs text-text-muted font-medium mt-1 uppercase tracking-tight">Per employee this month</p>
            </div>

            <div className="bg-card p-4 rounded-2xl border border-border-default/50">
                <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-success-500/10 border border-success-500/20 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-success-600 dark:text-success-400" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-success-500/10 border border-success-500/10 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-success-600 dark:text-success-400" />
                    </div>
                </div>
                <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Active Headcount</h3>
                <p className="text-2xl font-black text-text-primary mt-1">
                    {stats.activeHeadcount}
                </p>
                <p className="text-xs text-text-muted font-medium mt-1 uppercase tracking-tight">{stats.eligibleForPayroll} Eligible for payroll</p>
            </div>
        </div>
    );
};

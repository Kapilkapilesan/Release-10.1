'use client';

import React from 'react';
import { FileText, TrendingUp, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { LoanStats as LoanStatsType } from '@/types/loan.types';
import { colors } from '@/themes/colors';

interface LoanStatsProps {
    stats: LoanStatsType;
}

export function LoanStats({ stats }: LoanStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="bg-card rounded-2xl border border-border-default p-4 group">
                <div className="flex items-center justify-between mb-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                        style={{ backgroundColor: `${colors.primary[600]}15` }}
                    >
                        <FileText className="w-5 h-5" style={{ color: colors.primary[600] }} />
                    </div>
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Total Loans</p>
                <p className="text-2xl font-black text-text-primary">{stats.total_count}</p>
            </div>

            <div className="bg-card rounded-2xl border border-border-default p-4 group">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center transition-colors">
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        {stats.total_count > 0 ? ((stats.active_count / stats.total_count) * 100).toFixed(0) : 0}%
                    </span>
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Active Loans</p>
                <p className="text-2xl font-black text-text-primary">{stats.active_count}</p>
            </div>

            <div className="bg-card rounded-2xl border border-border-default p-4 group">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center transition-colors">
                        <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        {stats.total_count > 0 ? ((stats.completed_count / (stats.total_count + stats.completed_count)) * 100).toFixed(0) : 0}%
                    </span>
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Completed Loans</p>
                <p className="text-2xl font-black text-text-primary">{stats.completed_count || 0}</p>
            </div>

            <div className="bg-card rounded-2xl border border-border-default p-4 group">
                <div className="flex items-center justify-between mb-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                        style={{ backgroundColor: `${colors.primary[600]}15` }}
                    >
                        <DollarSign className="w-5 h-5" style={{ color: colors.primary[600] }} />
                    </div>
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Total Disbursed</p>
                <p className="text-2xl font-black text-text-primary">LKR {(Number(stats.total_disbursed) / 1000).toFixed(0)}K</p>
            </div>

            <div className="bg-card rounded-2xl border border-border-default p-4 group">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center transition-colors">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Outstanding</p>
                <p className="text-2xl font-black text-text-primary">LKR {(Number(stats.total_outstanding) / 1000).toFixed(0)}K</p>
            </div>
        </div>
    );
}

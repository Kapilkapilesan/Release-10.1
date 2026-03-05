import React from 'react';
import { Users, UserCheck, Shield, Activity, UserX } from 'lucide-react';
import { CustomerStats as CustomerStatsType } from '../../types/customer.types';

interface CustomerStatsProps {
    stats: CustomerStatsType;
    pendingRequestsCount?: number;
}

export function CustomerStatsCard({ stats, pendingRequestsCount = 0 }: CustomerStatsProps) {
    const { totalCustomers, activeCustomers, blockedCustomers, customersWithLoans, newThisMonth } = stats;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {/* Total Customers */}
            <div className="bg-card rounded-2xl border border-border-default p-4 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 transition-transform duration-500" />
                <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/20 rounded-2xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary-500" />
                    </div>
                    <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full uppercase tracking-widest">
                        +{newThisMonth} this month
                    </span>
                </div>
                <p className="text-[10px] font-black text-text-muted mb-2 uppercase tracking-[0.3em] opacity-40">Total Customers</p>
                <p className="text-2xl font-black text-text-primary tracking-tighter transition-all duration-300">{totalCustomers}</p>
            </div>

            {/* Active Customers */}
            <div className="bg-card rounded-2xl border border-border-default p-4 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 transition-transform duration-500" />
                <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-text-muted opacity-40 uppercase tracking-widest font-mono">
                            {totalCustomers > 0 ? ((activeCustomers / totalCustomers) * 100).toFixed(0) : 0}%
                        </span>
                        <div className="w-12 h-1 bg-muted-bg rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${totalCustomers > 0 ? (activeCustomers / totalCustomers) * 100 : 0}%` }} />
                        </div>
                    </div>
                </div>
                <p className="text-[10px] font-black text-text-muted mb-2 uppercase tracking-[0.3em] opacity-40">Verified Status</p>
                <p className="text-2xl font-black text-text-primary tracking-tighter transition-all duration-300">{activeCustomers}</p>
            </div>

            {/* Disabled Customers */}
            <div className="bg-card rounded-2xl border border-border-default p-4 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 transition-transform duration-500" />
                <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center">
                        <UserX className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-text-muted opacity-40 uppercase tracking-widest font-mono">
                            {totalCustomers > 0 ? ((blockedCustomers / totalCustomers) * 100).toFixed(0) : 0}%
                        </span>
                        <div className="w-12 h-1 bg-muted-bg rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-rose-500" style={{ width: `${totalCustomers > 0 ? (blockedCustomers / totalCustomers) * 100 : 0}%` }} />
                        </div>
                    </div>
                </div>
                <p className="text-[10px] font-black text-text-muted mb-2 uppercase tracking-[0.3em] opacity-40">Disabled Customers</p>
                <p className="text-2xl font-black text-text-primary tracking-tighter transition-all duration-300">{blockedCustomers}</p>
            </div>

            {/* With Active Loans */}
            <div className="bg-card rounded-2xl border border-border-default p-4 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 transition-transform duration-500" />
                <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="text-[10px] font-black text-text-muted opacity-40 uppercase tracking-widest font-mono">
                        {totalCustomers > 0 ? ((customersWithLoans / totalCustomers) * 100).toFixed(0) : 0}%
                    </span>
                </div>
                <p className="text-[10px] font-black text-text-muted mb-2 uppercase tracking-[0.3em] opacity-40">Credit Engagement</p>
                <p className="text-2xl font-black text-text-primary tracking-tighter group-hover:tracking-tight transition-all duration-300">{customersWithLoans}</p>
            </div>

            {/* Pending Requests */}
            <div className="bg-card rounded-2xl border border-border-default p-4 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />
                <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center">
                        <Activity className="w-5 h-5 text-rose-500" />
                    </div>
                    {pendingRequestsCount > 0 && (
                        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
                                Action needed
                            </span>
                        </div>
                    )}
                </div>
                <p className="text-[10px] font-black text-text-muted mb-2 uppercase tracking-[0.3em] opacity-40">Pending Requests</p>
                <p className="text-2xl font-black text-text-primary tracking-tighter group-hover:tracking-tight transition-all duration-300">{pendingRequestsCount}</p>
            </div>
        </div>
    );
}

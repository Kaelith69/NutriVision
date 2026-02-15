import React, { useMemo, useState } from 'react';
import { UserProfile, MealLog } from '../types';
import { generateWeeklyReport, getDailySummaries, generateCSV } from '../services/analyticsService';
import { TacticalCard } from './ui/TacticalCard';
import { TacticalButton } from './ui/TacticalButton';
import { TacticalBadge } from './ui/TacticalBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FileText, Download, TrendingUp, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AnalyticsProps {
    profile: UserProfile;
    mealLogs: MealLog[];
    waterLogs: Record<string, number>;
}

const Analytics: React.FC<AnalyticsProps> = ({ profile, mealLogs, waterLogs }) => {
    const [reportType, setReportType] = useState<'weekly' | 'daily'>('weekly');

    const report = useMemo(() => {
        try {
            return generateWeeklyReport(mealLogs, waterLogs, profile);
        } catch (e) {
            return null;
        }
    }, [mealLogs, waterLogs, profile]);

    const summaries = useMemo(() => getDailySummaries(mealLogs, waterLogs, 14), [mealLogs, waterLogs]); // Last 14 days

    const handleExport = () => {
        const csv = generateCSV(summaries);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Metabolic_Report_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    if (!report) return (
        <div className="text-center p-20 text-slate-400">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-black uppercase tracking-widest">Insufficient Data for Analysis</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                        <Activity className="w-6 h-6 text-blue-600" /> Metabolic Analytics
                    </h2>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest pl-9">
                        Report Window: {report.startDate} - {report.endDate}
                    </p>
                </div>
                <TacticalButton size="sm" onClick={handleExport}>
                    <Download className="w-4 h-4" /> Export Report
                </TacticalButton>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TacticalCard className="bg-slate-900 text-white p-6 border-slate-800">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Compliance Score</span>
                        <TacticalBadge variant={report.complianceScore > 80 ? 'success' : 'warning'}>
                            {report.complianceScore > 80 ? 'OPTIMAL' : 'BELOW PREDICTION'}
                        </TacticalBadge>
                    </div>
                    <div className="text-5xl font-black tracking-tighter text-blue-400 mb-2">
                        {report.complianceScore}%
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${report.complianceScore}%` }} />
                    </div>
                </TacticalCard>

                <TacticalCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Avg Intake</span>
                        <Activity className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="text-4xl font-black tracking-tighter text-slate-900">
                        {Math.round(report.avgCalories)} <span className="text-sm text-slate-400 font-bold">kcal</span>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mt-2">
                        Target: {Math.round(profile.dailyCalorieTarget)} kcal
                        <span className={report.avgCalories > profile.dailyCalorieTarget ? "text-rose-500 ml-2" : "text-emerald-500 ml-2"}>
                            ({report.avgCalories > profile.dailyCalorieTarget ? '+' : ''}{Math.round(report.avgCalories - profile.dailyCalorieTarget)})
                        </span>
                    </p>
                </TacticalCard>

                <TacticalCard className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Predicted Weight Change</span>
                        <TrendingUp className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className={`text-4xl font-black tracking-tighter ${report.weightChangePred > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {report.weightChangePred > 0 ? '+' : ''}{report.weightChangePred.toFixed(2)} <span className="text-sm text-slate-400 font-bold">kg</span>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mt-2">
                        Based on 7-day caloric delta
                    </p>
                </TacticalCard>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TacticalCard className="p-6 h-80">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Caloric Trend (14 Days)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[...summaries].reverse()}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" hide />
                            <YAxis hide />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{
                                    background: '#0f172a',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontFamily: 'Inter',
                                    fontWeight: 'bold'
                                }}
                            />
                            <Bar dataKey="totalCalories" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </TacticalCard>

                <TacticalCard className="p-6 h-80">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Macro Distribution (Avg)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Protein', val: report.avgProtein, fill: '#3b82f6' },
                            { name: 'Fats', val: report.avgFat, fill: '#f59e0b' },
                            { name: 'Carbs', val: report.avgCarbs, fill: '#10b981' },
                        ]} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 800 }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: 'white' }} />
                            <Bar dataKey="val" barSize={32} radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </TacticalCard>
            </div>

            {/* Scientific Insights */}
            <TacticalCard className="p-8 border-l-4 border-l-blue-600 bg-slate-50/50">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> System Generated Insights
                </h3>
                <ul className="space-y-4">
                    {report.insights.map((insight, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-sm font-bold text-slate-700">
                            <span className="mt-0.5">•</span>
                            {insight}
                        </li>
                    ))}
                </ul>
            </TacticalCard>

        </div>
    );
};

export default Analytics;

'use client';
import React from 'react';
import TranscriptProcessor from '@/components/transcriptProcessor';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0c10] pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Upload your meeting transcripts and generate AI summaries.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900/50 rounded-2xl shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden backdrop-blur-sm">
                    <div className="p-6 sm:p-10">
                        <TranscriptProcessor />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

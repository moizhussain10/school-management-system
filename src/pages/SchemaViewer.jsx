import React, { useState } from 'react';
import { Database, Code2, Copy, Check } from 'lucide-react';
import { sqlSchemaCode, expressApiCode } from '../data/mockData';

const SchemaViewer = () => {
  const [activeCodeTab, setActiveCodeTab] = useState('sql');
  const [copied, setCopied] = useState(false);

  const activeCode = activeCodeTab === 'sql' ? sqlSchemaCode : expressApiCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-800">Backend MySQL Architecture & Express API</h3>
          <p className="text-xs text-gray-400">Copy database SQL queries and Node.js REST API code directly into your backend</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveCodeTab('sql')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeCodeTab === 'sql' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> schema.sql
          </button>
          <button
            onClick={() => setActiveCodeTab('api')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              activeCodeTab === 'api' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> Express Controller
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
        <div className="px-4 py-3 bg-slate-950 flex justify-between items-center border-b border-slate-800">
          <span className="text-xs font-mono text-slate-400">
            {activeCodeTab === 'sql' ? 'MySQL Database Schema Script' : 'Express.js Route Handler Sample'}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <pre className="p-4 text-xs font-mono text-emerald-400 leading-relaxed overflow-x-auto max-h-[500px]">
          <code>{activeCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default SchemaViewer;
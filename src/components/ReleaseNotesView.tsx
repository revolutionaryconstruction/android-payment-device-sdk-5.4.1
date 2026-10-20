import React from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { KNOWN_ISSUES, RELEASE_541_HIGHLIGHTS, SDK_VERSION, RELEASE_DATE } from '../data/sdkData';

export const ReleaseNotesView: React.FC<{ onOpenPdf: (id: string) => void }> = ({ onOpenPdf }) => {
  return (
    <div className="space-y-6">
      
      {/* 5.4.1 Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500 text-slate-950">
                Official Release
              </span>
              <span className="text-xs text-cyan-300 font-mono">Date: {RELEASE_DATE}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-2 tracking-tight">
              Release {SDK_VERSION} Highlights
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Major enhancements to Tap To Mobile SoftPOS, Ingenico Axium SmartPOS integration, enhanced offline transaction management, and mandatory Android dependency updates.
            </p>
          </div>

          <button
            onClick={() => onOpenPdf('recent-changes')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 flex items-center gap-2 transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Open Recent Change Guide PDF</span>
          </button>
        </div>
      </div>

      {/* Release Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RELEASE_541_HIGHLIGHTS.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">v5.4.1</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1.5">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Known Issues and Workarounds Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Release 5.4.1 Known Issues & Workarounds</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active tracking table extracted from the official SmartPOS Known Issues supplement
            </p>
          </div>

          <button
            onClick={() => onOpenPdf('known-issues')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Known Issues PDF (3 pages)</span>
          </button>
        </div>

        <div className="mt-4 divide-y divide-slate-800">
          {KNOWN_ISSUES.map((issue) => (
            <div key={issue.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">#{issue.id}</span>
                    <h4 className="font-bold text-white text-sm">{issue.summary}</h4>
                  </div>
                  <div className="text-xs text-slate-400">
                    <span className="text-slate-500">Affected Hardware:</span>{' '}
                    <span className="text-slate-300 font-medium">{issue.affectedModels}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    issue.status === 'Resolved'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : issue.status === 'Workaround Available'
                      ? 'bg-blue-950 text-blue-400 border-blue-800'
                      : 'bg-amber-950 text-amber-400 border-amber-800'
                  }`}
                >
                  {issue.status}
                </span>
              </div>

              {/* Workaround details */}
              <div className="mt-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Recommended Workaround:</span>{' '}
                  <span className="text-slate-300">{issue.workaround}</span>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Status Comment: {issue.statusComment}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Release Cadence */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          ChipDNA Mobile Version Cadence
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Historical release names and major capabilities leading up to 5.4.1 Cassiopeia
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border-2 border-cyan-500/60 shadow-lg shadow-cyan-950/20">
            <div className="flex justify-between items-center text-cyan-400 font-bold">
              <span>v5.4.1</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800">Current</span>
            </div>
            <div className="text-white font-bold text-sm mt-1">Cassiopeia</div>
            <div className="text-[11px] text-slate-400 mt-1">Cloud Commerce 6.9.0 & OfflineUploadMode</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 font-bold">v5.3.1</div>
            <div className="text-white font-bold text-sm mt-1">Andromeda</div>
            <div className="text-[11px] text-slate-400 mt-1">Axium SmartPOS enhancements & USB HID</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 font-bold">v5.2.0</div>
            <div className="text-white font-bold text-sm mt-1">Interstellar</div>
            <div className="text-[11px] text-slate-400 mt-1">Initial Axium Android integration suite</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 font-bold">v5.1.0</div>
            <div className="text-white font-bold text-sm mt-1">Fermi</div>
            <div className="text-[11px] text-slate-400 mt-1">ID TECH VP3350 BLE & Chipper 3X BT</div>
          </div>
        </div>
      </div>

    </div>
  );
};

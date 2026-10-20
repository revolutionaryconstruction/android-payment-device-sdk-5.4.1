import React from 'react';
import { 
  CreditCard, 
  Terminal, 
  Code2, 
  FileText, 
  Wrench, 
  Download, 
  Layers,
  Sparkles,
  Wifi,
  CheckCircle2
} from 'lucide-react';
import { SDK_VERSION, RELEASE_DATE } from '../data/sdkData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedDeviceName: string;
  isDeviceConnected: boolean;
  onOpenPdf: (id?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedDeviceName,
  isDeviceConnected,
  onOpenPdf,
}) => {
  const navItems = [
    { id: 'simulator', label: 'Terminal Simulator', icon: Terminal },
    { id: 'api', label: 'API Reference & Code', icon: Code2 },
    { id: 'release-notes', label: 'Release 5.4.1 Notes', icon: Sparkles },
    { id: 'setup-guide', label: 'Merchant Setup Guide', icon: Wrench },
    { id: 'documents', label: 'Official PDF Manuals', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold ring-1 ring-cyan-400/30">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">Payment Device SDK</span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/80">
                  v{SDK_VERSION}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Ingenico Axium SmartPOS & Tap To Mobile (CPOC/MPOC) • {RELEASE_DATE}
              </p>
            </div>
          </div>

          {/* Center Nav tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right status badge & actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <div className={`w-2 h-2 rounded-full ${isDeviceConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-slate-400 font-mono text-[11px] truncate max-w-[140px]">{selectedDeviceName}</span>
              <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded ${
                isDeviceConnected ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {isDeviceConnected ? 'Ready' : 'Standby'}
              </span>
            </div>

            <button
              onClick={() => onOpenPdf('api-reference')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
              title="Open Official API PDF Manual"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Official Docs</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex overflow-x-auto py-2 space-x-1 border-t border-slate-800/70">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-xs font-medium rounded-md ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

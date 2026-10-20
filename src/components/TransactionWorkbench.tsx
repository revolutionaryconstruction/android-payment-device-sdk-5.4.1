import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Printer, 
  Settings2, 
  FileCode, 
  Terminal, 
  Radio, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  Layers,
  Sparkles,
  ExternalLink,
  Info,
  ShieldCheck,
  Key
} from 'lucide-react';
import { 
  ConnectionType, 
  DeviceInfo,
  DeviceModel, 
  EventCallbackLog, 
  OfflineUploadMode, 
  TransactionStage, 
  TransactionType 
} from '../types/sdk';
import { 
  CONFIGURED_API_KEY, 
  CONFIGURED_E2EE_PROVIDER, 
  CONFIGURED_TERMINAL_ID, 
  SUPPORTED_DEVICES 
} from '../data/sdkData';

interface TransactionWorkbenchProps {
  selectedDevice: DeviceInfo;
  onSelectDevice: (device: DeviceInfo) => void;
  stage: TransactionStage;
  amount: string;
  setAmount: (val: string) => void;
  currency: string;
  setCurrency: (val: string) => void;
  transactionType: TransactionType;
  setTransactionType: (val: TransactionType) => void;
  tipAmount: string;
  setTipAmount: (val: string) => void;
  offlineMode: OfflineUploadMode;
  setOfflineMode: (val: OfflineUploadMode) => void;
  partialApproval: boolean;
  setPartialApproval: (val: boolean) => void;
  connectionType: ConnectionType;
  setConnectionType: (val: ConnectionType) => void;
  eventLogs: EventCallbackLog[];
  onInitializeSdk: () => void;
  onConnectAndConfigure: () => void;
  onStartTransaction: () => void;
  onTerminateTransaction: () => void;
  onProcessReceipt: () => void;
  onClearLogs: () => void;
  onSimulateApprovedCard: () => void;
  onSimulateDeclinedCard: () => void;
}

export const TransactionWorkbench: React.FC<TransactionWorkbenchProps> = ({
  selectedDevice,
  onSelectDevice,
  stage,
  amount,
  setAmount,
  currency,
  setCurrency,
  transactionType,
  setTransactionType,
  tipAmount,
  setTipAmount,
  offlineMode,
  setOfflineMode,
  partialApproval,
  setPartialApproval,
  connectionType,
  setConnectionType,
  eventLogs,
  onInitializeSdk,
  onConnectAndConfigure,
  onStartTransaction,
  onTerminateTransaction,
  onProcessReceipt,
  onClearLogs,
  onSimulateApprovedCard,
  onSimulateDeclinedCard,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'events' | 'payload' | 'params'>('events');

  const isBusy = stage !== 'IDLE' && stage !== 'APPROVED' && stage !== 'DECLINED' && stage !== 'TERMINATED';

  // Format currency display
  const numAmount = (parseFloat(amount || '0') / 100).toFixed(2);
  const numTip = (parseFloat(tipAmount || '0') / 100).toFixed(2);
  const total = ((parseFloat(amount || '0') + parseFloat(tipAmount || '0')) / 100).toFixed(2);

  // Active payload preview
  const currentRequestPayload = {
    "ParameterKeys.TransactionType": `ParameterValues.${transactionType}`,
    "ParameterKeys.Amount": amount,
    "ParameterKeys.Currency": currency,
    "ParameterKeys.TipAmount": tipAmount || undefined,
    "ParameterKeys.PaymentDeviceModel": `ParameterValues.${selectedDevice.id}`,
    "ParameterKeys.ConnectionType": connectionType,
    "ParameterKeys.OfflineTransactionUploadMode": `ParameterValues.${offlineMode}`,
    "ParameterKeys.PartialApproval": partialApproval ? "ParameterValues.TRUE" : "ParameterValues.FALSE",
    "ParameterKeys.ApplicationIdentifier": `RetailPOS_Term_${CONFIGURED_TERMINAL_ID}`,
    "ParameterKeys.ApiKey": `${CONFIGURED_TERMINAL_ID}|${CONFIGURED_API_KEY.slice(6, 26)}... [SafeWebServices E2EE Active]`,
    "ParameterKeys.AutoConfirm": "ParameterValues.TRUE",
    "ParameterKeys.UserReference": `INV-2026-${Date.now().toString().slice(-6)}`
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col h-full">
      
      {/* Workbench Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">
              ChipDNA Mobile POS Workbench
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 text-[11px] font-mono border border-emerald-800/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              API Key Configured: Terminal {CONFIGURED_TERMINAL_ID}
            </span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              SafeWebServices E2EE
            </span>
          </div>
        </div>

        {/* Preset Simulators */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onSimulateApprovedCard}
            disabled={isBusy}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 disabled:opacity-50 transition cursor-pointer"
          >
            ⚡ Quick Approval
          </button>
          <button
            onClick={onSimulateDeclinedCard}
            disabled={isBusy}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800 hover:bg-rose-900 disabled:opacity-50 transition cursor-pointer"
          >
            ❌ Quick Decline
          </button>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-4 border-b border-slate-800 text-xs">
        
        {/* Device Selection */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">
            Target Payment Terminal
          </label>
          <select
            value={selectedDevice.id}
            onChange={(e) => {
              const dev = SUPPORTED_DEVICES.find((d) => d.id === e.target.value);
              if (dev) onSelectDevice(dev);
            }}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-semibold focus:border-cyan-500 focus:outline-none"
          >
            {SUPPORTED_DEVICES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.category})
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Type */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">
            Transaction Type
          </label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value as TransactionType)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-semibold focus:border-cyan-500 focus:outline-none"
          >
            <option value="SALE">SALE (Purchase)</option>
            <option value="AUTH_ONLY">AUTH_ONLY (Pre-Authorization)</option>
            <option value="REFUND">REFUND (Standalone)</option>
            <option value="LINKED_REFUND">LINKED_REFUND</option>
            <option value="VOID">VOID</option>
            <option value="BALANCE_INQUIRY">BALANCE_INQUIRY</option>
          </select>
        </div>

        {/* Amount & Currency */}
        <div>
          <label className="block text-slate-400 font-medium mb-1">
            Amount (minor units: cents)
          </label>
          <div className="flex gap-1.5">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-2/3 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono font-bold focus:border-cyan-500 focus:outline-none"
              placeholder="1250"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-1/3 bg-slate-950 border border-slate-700 rounded-lg px-1.5 py-1.5 text-slate-200 font-mono font-semibold focus:border-cyan-500 focus:outline-none"
            >
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
            </select>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Formatted: <span className="text-cyan-400 font-mono font-bold">${numAmount}</span>
          </div>
        </div>

        {/* 5.4.1 NEW: Offline Upload Mode */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <label className="text-slate-400 font-medium">
              Offline Upload Mode
            </label>
            <span className="px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 font-bold text-[9px] border border-cyan-800">
              NEW 5.4.1
            </span>
          </div>
          <select
            value={offlineMode}
            onChange={(e) => setOfflineMode(e.target.value as OfflineUploadMode)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-semibold focus:border-cyan-500 focus:outline-none"
          >
            <option value="STORE_AND_FORWARD">Store & Forward (Batch)</option>
            <option value="UPLOAD_IMMEDIATE">Upload Immediate</option>
            <option value="OFFLINE_ONLY">Offline Only (Queue)</option>
          </select>
          <div className="text-[10px] text-slate-500 mt-0.5 truncate">
            ParameterKeys.OfflineTransactionUploadMode
          </div>
        </div>

      </div>

      {/* Secondary Parameters row */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={partialApproval}
              onChange={(e) => setPartialApproval(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span>Allow Partial Approval</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Gratuity / Tip:</span>
            <input
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              placeholder="0"
              className="w-20 bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-white font-mono"
            />
            <span className="text-slate-400 font-mono">(${numTip})</span>
          </div>
        </div>

        <div className="text-xs text-slate-300">
          Net Charge: <span className="font-mono font-bold text-emerald-400 text-sm">${total} {currency}</span>
        </div>
      </div>

      {/* SDK Lifecycle Action Buttons */}
      <div className="py-3 flex flex-wrap items-center gap-2 border-b border-slate-800">
        <button
          onClick={onInitializeSdk}
          disabled={isBusy}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
        >
          <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>initialize()</span>
        </button>

        <button
          onClick={onConnectAndConfigure}
          disabled={isBusy}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
        >
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>connectAndConfigure()</span>
        </button>

        <button
          onClick={onStartTransaction}
          disabled={isBusy}
          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/20 flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>startTransaction()</span>
        </button>

        {isBusy && (
          <button
            onClick={onTerminateTransaction}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>terminateTransaction()</span>
          </button>
        )}

        {selectedDevice.printer && (
          <button
            onClick={onProcessReceipt}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>processReceipt()</span>
          </button>
        )}

        <button
          onClick={onClearLogs}
          className="ml-auto px-2.5 py-1 rounded text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
        >
          Clear Logs
        </button>
      </div>

      {/* Bottom Workbench View: Event Feed, JSON Payload Inspector, or Parameter List */}
      <div className="flex-1 min-h-[220px] flex flex-col pt-3">
        {/* Sub-tabs */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setActiveSubTab('events')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                activeSubTab === 'events'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Live Callback Stream ({eventLogs.length})
            </button>
            <button
              onClick={() => setActiveSubTab('payload')}
              className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                activeSubTab === 'payload'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Request Payload (Parameters)
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            SDK v5.4.1 Active
          </div>
        </div>

        {/* Tab 1: Live Event Stream */}
        {activeSubTab === 'events' && (
          <div className="flex-1 bg-slate-950 rounded-xl p-3 border border-slate-800/80 overflow-y-auto max-h-[300px] font-mono text-xs space-y-2">
            {eventLogs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-6">
                <Terminal className="w-8 h-8 text-slate-600 mb-2" />
                <p>No SDK events recorded yet.</p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Click &quot;startTransaction()&quot; to begin a transaction and observe callbacks.
                </p>
              </div>
            ) : (
              eventLogs.map((log) => {
                const badgeColor =
                  log.level === 'success'
                    ? 'text-emerald-400 bg-emerald-950/80 border-emerald-800'
                    : log.level === 'error'
                    ? 'text-rose-400 bg-rose-950/80 border-rose-800'
                    : log.level === 'warning'
                    ? 'text-amber-400 bg-amber-950/80 border-amber-800'
                    : 'text-cyan-400 bg-cyan-950/80 border-cyan-800';

                return (
                  <div
                    key={log.id}
                    className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badgeColor}`}>
                          {log.callbackName}
                        </span>
                        <span className="text-slate-300 font-semibold">{log.eventPayload.message || log.callbackName}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                    </div>
                    <pre className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-900 overflow-x-auto mt-1">
                      {JSON.stringify(log.eventPayload, null, 2)}
                    </pre>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: JSON Payload Inspector */}
        {activeSubTab === 'payload' && (
          <div className="flex-1 bg-slate-950 rounded-xl p-3 border border-slate-800/80 overflow-y-auto max-h-[300px]">
            <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between font-mono">
              <span>Parameters payload passed to startTransaction():</span>
              <span className="text-cyan-400 font-bold">Android / iOS SDK 5.4.1</span>
            </div>
            <pre className="font-mono text-xs text-cyan-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {JSON.stringify(currentRequestPayload, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};

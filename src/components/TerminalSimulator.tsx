import React, { useState, useEffect, useRef } from 'react';
import { 
  Wifi, 
  Battery, 
  Bluetooth, 
  CreditCard, 
  Radio, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  Smartphone, 
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CardEntryMode, CvmMode, DeviceInfo, DeviceModel, ReceiptData, TransactionStage } from '../types/sdk';

interface TerminalSimulatorProps {
  device: DeviceInfo;
  stage: TransactionStage;
  amount: string;
  currency: string;
  cardEntryMode: CardEntryMode | null;
  receiptData: ReceiptData | null;
  onCardAction: (mode: CardEntryMode) => void;
  onPinSubmit: (pin: string) => void;
  onCancelTransaction: () => void;
  onSignatureAccept: () => void;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  device,
  stage,
  amount,
  currency,
  cardEntryMode,
  receiptData,
  onCardAction,
  onPinSubmit,
  onCancelTransaction,
  onSignatureAccept,
}) => {
  const [pinInput, setPinInput] = useState<string>('');
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [hasSignatureDrawn, setHasSignatureDrawn] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef<boolean>(false);

  // Auto trigger receipt animation when approved on printer-enabled devices
  useEffect(() => {
    if (stage === 'APPROVED' && device.printer) {
      setShowReceipt(true);
    }
  }, [stage, device.printer]);

  // Reset PIN when stage changes away from PIN
  useEffect(() => {
    if (stage !== 'REQUESTING_PIN') {
      setPinInput('');
    }
  }, [stage]);

  const handleKeypadPress = (val: string) => {
    if (stage !== 'REQUESTING_PIN') return;
    if (val === 'ENTER') {
      if (pinInput.length >= 4) {
        onPinSubmit(pinInput);
      }
    } else if (val === 'CLEAR') {
      setPinInput('');
    } else if (val === 'BACK') {
      setPinInput((prev) => prev.slice(0, -1));
    } else if (val === 'CANCEL') {
      onCancelTransaction();
    } else {
      if (pinInput.length < 6) {
        setPinInput((prev) => prev + val);
      }
    }
  };

  // Canvas drawing for signature capture
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setHasSignatureDrawn(true);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignatureDrawn(false);
    }
  };

  const formattedAmount = (parseFloat(amount || '0') / 100).toFixed(2);
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';

  const isTapToMobile = device.id === 'TAP_TO_MOBILE';
  const isRx5000 = device.id === 'AXIUM_RX5000';

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Outer Device Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 rounded-[40px] p-5 border-4 border-slate-700/80 shadow-2xl shadow-cyan-950/40 ring-1 ring-slate-600/40">
        
        {/* Device Brand Header */}
        <div className="flex items-center justify-between px-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-300">
              {device.manufacturer.split(' ')[0]}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-mono border border-cyan-800/70">
              {device.id.replace('AXIUM_', '')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            {isTapToMobile && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <ShieldCheck className="w-3 h-3" /> Play Integrity
              </span>
            )}
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Axium Thermal Printer Slot (only on DX8000 / DX4000) */}
        {device.printer && (
          <div className="relative mb-3">
            <div className="h-4 bg-slate-950 rounded-lg border-2 border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="w-3/4 h-1 bg-slate-800 rounded-full" />
            </div>
            <div className="text-[9px] text-center text-slate-500 font-mono mt-0.5 flex items-center justify-center gap-1">
              <Printer className="w-2.5 h-2.5" /> 58mm Thermal Printer Roll
            </div>

            {/* Sliding Receipt Paper Output */}
            {showReceipt && receiptData && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] z-30 animate-in slide-in-from-top duration-500">
                <div className="bg-amber-50 text-slate-900 p-3.5 rounded-b-lg shadow-xl font-mono text-[11px] leading-tight border-b-4 border-dashed border-slate-400">
                  <div className="text-center font-bold pb-2 border-b border-dashed border-slate-400">
                    <div className="text-xs uppercase">{receiptData.merchantName}</div>
                    <div className="text-[10px] text-slate-600">{receiptData.merchantAddress}</div>
                    <div className="text-[9px] text-slate-500 mt-1">TID: {receiptData.terminalId} • MID: {receiptData.merchantId}</div>
                  </div>

                  <div className="py-2 space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-600">TRANSACTION:</span>
                      <span className="font-bold">{receiptData.transactionType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">CARD:</span>
                      <span>{receiptData.cardScheme} {receiptData.maskedPan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">ENTRY:</span>
                      <span>{receiptData.cardEntryMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">AUTH CODE:</span>
                      <span className="font-bold">{receiptData.authCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">REF #:</span>
                      <span>{receiptData.referenceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">CVM:</span>
                      <span>{receiptData.cvmMode}</span>
                    </div>
                    {receiptData.aid && (
                      <div className="text-[9px] text-slate-500">
                        AID: {receiptData.aid}
                      </div>
                    )}
                  </div>

                  <div className="py-1.5 border-t border-b border-dashed border-slate-400 space-y-0.5 text-xs font-bold">
                    <div className="flex justify-between">
                      <span>BASE:</span>
                      <span>{currencySymbol}{receiptData.amount}</span>
                    </div>
                    {receiptData.tipAmount && parseFloat(receiptData.tipAmount) > 0 && (
                      <div className="flex justify-between text-slate-700">
                        <span>TIP:</span>
                        <span>{currencySymbol}{receiptData.tipAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-emerald-800 text-sm pt-0.5">
                      <span>TOTAL:</span>
                      <span>{currencySymbol}{receiptData.totalAmount}</span>
                    </div>
                  </div>

                  <div className="text-center pt-2 text-[10px] text-emerald-700 font-bold uppercase">
                    *** {receiptData.status} ***
                  </div>

                  <button
                    onClick={() => setShowReceipt(false)}
                    className="mt-2 w-full py-1 text-[10px] bg-slate-200 hover:bg-slate-300 rounded font-sans font-semibold text-slate-700 cursor-pointer"
                  >
                    Tear Off & Dismiss Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Terminal Glass Screen */}
        <div className="relative bg-slate-950 rounded-2xl p-3 border-2 border-slate-700/80 shadow-inner overflow-hidden min-h-[300px] flex flex-col justify-between">
          
          {/* Status Bar */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pb-2 border-b border-slate-900">
            <span className="text-cyan-400 font-semibold">12:30 PM</span>
            <div className="flex items-center gap-2">
              <Bluetooth className="w-3 h-3 text-cyan-400" />
              <Wifi className="w-3.5 h-3.5 text-slate-300" />
              <div className="flex items-center gap-0.5 text-[10px]">
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
                <span>94%</span>
              </div>
            </div>
          </div>

          {/* Center Interactive Screen Content */}
          <div className="flex-1 flex flex-col items-center justify-center my-3 text-center">
            
            {/* IDLE / READY STATE */}
            {stage === 'IDLE' && (
              <div className="space-y-3 py-4 animate-in fade-in">
                <div className="w-14 h-14 mx-auto rounded-full bg-cyan-950/60 border border-cyan-800/80 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950">
                  <CreditCard className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">READY FOR PAYMENT</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">ChipDNA Mobile SDK 5.4.1</p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                  Select &quot;Start Transaction&quot; in Workbench
                </div>
              </div>
            )}

            {/* WAITING FOR CARD */}
            {stage === 'WAITING_FOR_CARD' && (
              <div className="space-y-3 py-2 w-full animate-in zoom-in-95">
                <div className="text-xs font-semibold uppercase text-cyan-400 tracking-wider">
                  AMOUNT DUE
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                  {currencySymbol}{formattedAmount}
                </div>

                <div className="py-2 flex items-center justify-center gap-2 text-cyan-400">
                  <Radio className="w-6 h-6 animate-ping" />
                  <span className="text-xs font-semibold tracking-wide">
                    TAP, INSERT OR SWIPE CARD
                  </span>
                </div>

                {/* Quick card simulator buttons directly on screen for easy testing */}
                <div className="pt-2 grid grid-cols-2 gap-1.5 w-full">
                  <button
                    onClick={() => onCardAction('CONTACTLESS_NFC')}
                    className="p-2 rounded-lg bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-700/60 text-[11px] font-semibold text-cyan-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5 text-cyan-400" /> Tap Contactless
                  </button>
                  <button
                    onClick={() => onCardAction('EMV_CHIP')}
                    className="p-2 rounded-lg bg-indigo-900/40 hover:bg-indigo-800/60 border border-indigo-700/60 text-[11px] font-semibold text-indigo-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-indigo-400" /> Insert EMV Chip
                  </button>
                </div>
              </div>
            )}

            {/* CARD DETECTED / READING */}
            {(stage === 'CARD_DETECTED' || stage === 'READING_CHIP') && (
              <div className="space-y-3 py-4 animate-in fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-950 border border-blue-500/50 flex items-center justify-center text-blue-400 animate-spin">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">
                    {stage === 'READING_CHIP' ? 'Reading EMV Chip...' : 'Card Detected'}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    DO NOT REMOVE CARD
                  </p>
                </div>
              </div>
            )}

            {/* PIN ENTRY ON TERMINAL / PIN ON GLASS */}
            {stage === 'REQUESTING_PIN' && (
              <div className="w-full space-y-2 py-1 animate-in zoom-in-95">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  {isTapToMobile ? 'Tap To Mobile • PIN on Glass' : 'Cardholder PIN Verification'}
                </div>
                <div className="text-xs text-slate-300">
                  Total: <span className="font-mono font-bold text-white">{currencySymbol}{formattedAmount}</span>
                </div>

                {/* PIN Mask Dots */}
                <div className="flex justify-center gap-3 my-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        pinInput.length > idx
                          ? 'bg-cyan-400 border-cyan-400 shadow-sm shadow-cyan-400'
                          : 'border-slate-700 bg-slate-900'
                      }`}
                    />
                  ))}
                </div>

                {/* Virtual Numeric Pad (PIN on Glass for Tap to Mobile or on-screen Axium touch) */}
                <div className="grid grid-cols-3 gap-1.5 max-w-[220px] mx-auto pt-1 font-mono text-sm">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'OK'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        if (item === 'C') handleKeypadPress('BACK');
                        else if (item === 'OK') handleKeypadPress('ENTER');
                        else handleKeypadPress(item);
                      }}
                      className={`h-9 rounded-lg font-bold transition-all cursor-pointer ${
                        item === 'OK'
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : item === 'C'
                          ? 'bg-amber-700 hover:bg-amber-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIGNATURE CAPTURE */}
            {stage === 'REQUESTING_SIGNATURE' && (
              <div className="w-full space-y-2 py-1 animate-in zoom-in-95">
                <div className="text-xs font-bold text-cyan-300 uppercase">
                  Please Sign on Screen
                </div>
                <div className="bg-white rounded-lg p-1 border border-slate-300 shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={260}
                    height={100}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-[90px] cursor-crosshair touch-none"
                  />
                </div>
                <div className="flex gap-2 justify-center pt-1">
                  <button
                    onClick={clearCanvas}
                    className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={onSignatureAccept}
                    className="px-4 py-1 text-xs rounded font-bold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer"
                  >
                    Accept Signature
                  </button>
                </div>
              </div>
            )}

            {/* AUTHORIZING */}
            {(stage === 'ONLINE_AUTHORIZING' || stage === 'OFFLINE_AUTHORIZING') && (
              <div className="space-y-3 py-4 animate-in fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                  <Radio className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">
                    {stage === 'OFFLINE_AUTHORIZING' ? 'Processing Offline Auth...' : 'Authorizing with Gateway...'}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Contacting NMI Host
                  </p>
                </div>
              </div>
            )}

            {/* APPROVED */}
            {stage === 'APPROVED' && (
              <div className="space-y-2 py-2 animate-in zoom-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/50">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="text-base font-extrabold text-emerald-400 tracking-wide">
                  TRANSACTION APPROVED
                </div>
                <div className="text-xl font-bold font-mono text-white">
                  {currencySymbol}{receiptData?.totalAmount || formattedAmount}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Auth: <span className="text-slate-200">{receiptData?.authCode || 'OK5419'}</span> • Ref: {receiptData?.referenceNumber || '98762'}
                </div>
                {cardEntryMode === 'EMV_CHIP' && (
                  <div className="text-[11px] text-cyan-400 font-semibold animate-pulse pt-1">
                    PLEASE REMOVE CARD
                  </div>
                )}
              </div>
            )}

            {/* DECLINED / FAILED / TERMINATED */}
            {(stage === 'DECLINED' || stage === 'FAILED' || stage === 'TERMINATED') && (
              <div className="space-y-2 py-3 animate-in zoom-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-rose-950 border-2 border-rose-500 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-900/50">
                  <XCircle className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-rose-400 uppercase tracking-wide">
                  {stage === 'TERMINATED' ? 'Transaction Cancelled' : 'Card Declined'}
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {stage === 'TERMINATED' ? 'User terminated request' : 'Issuer Code: 05 - Do Not Honor'}
                </p>
              </div>
            )}

          </div>

          {/* Bottom Screen Bar */}
          <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>{device.name}</span>
            <span className="text-cyan-500 font-bold">{stage}</span>
          </div>

        </div>

        {/* Physical 15-Key Tactile Backlit Keypad (Axium RX5000 style) */}
        {isRx5000 && (
          <div className="mt-4 pt-3 border-t-2 border-slate-700/80">
            <div className="text-[9px] uppercase font-bold text-center text-slate-400 mb-2 tracking-widest font-mono">
              Tactile Backlit Keypad
            </div>
            <div className="grid grid-cols-3 gap-1.5 font-mono text-xs max-w-[260px] mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                <button
                  key={k}
                  onClick={() => handleKeypadPress(k)}
                  className="h-8 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold active:scale-95 transition-transform cursor-pointer shadow"
                >
                  {k}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5 max-w-[260px] mx-auto mt-2 text-[10px] font-bold">
              <button
                onClick={() => handleKeypadPress('CANCEL')}
                className="h-7 rounded bg-rose-900 hover:bg-rose-800 text-rose-200 uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleKeypadPress('CLEAR')}
                className="h-7 rounded bg-amber-900 hover:bg-amber-800 text-amber-200 uppercase cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => handleKeypadPress('ENTER')}
                className="h-7 rounded bg-emerald-800 hover:bg-emerald-700 text-emerald-100 uppercase cursor-pointer"
              >
                Enter
              </button>
            </div>
          </div>
        )}

        {/* Card Insertion Slot Graphic at bottom */}
        <div className="mt-4 pt-2 border-t border-slate-800 flex flex-col items-center">
          <div className="w-2/3 h-2 bg-slate-950 rounded-full border border-slate-700 shadow-inner" />
          <div className="text-[9px] text-slate-500 font-mono mt-1 flex items-center gap-1">
            <CreditCard className="w-2.5 h-2.5" /> EMV Chip Card Reader Slot
          </div>
        </div>

      </div>

      {/* Manual Hardware Triggers Bar below terminal */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-[400px]">
        <button
          onClick={() => onCardAction('CONTACTLESS_NFC')}
          disabled={stage !== 'WAITING_FOR_CARD'}
          className="px-2.5 py-1 text-xs rounded-lg font-medium bg-cyan-950 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
        >
          <Radio className="w-3.5 h-3.5" /> Tap NFC
        </button>
        <button
          onClick={() => onCardAction('EMV_CHIP')}
          disabled={stage !== 'WAITING_FOR_CARD'}
          className="px-2.5 py-1 text-xs rounded-lg font-medium bg-indigo-950 text-indigo-300 border border-indigo-800/80 hover:bg-indigo-900 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
        >
          <CreditCard className="w-3.5 h-3.5" /> Insert Chip
        </button>
        <button
          onClick={() => onCardAction('MAGSTRIPE')}
          disabled={stage !== 'WAITING_FOR_CARD'}
          className="px-2.5 py-1 text-xs rounded-lg font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
        >
          <CreditCard className="w-3.5 h-3.5" /> Swipe Magstripe
        </button>
        {stage !== 'IDLE' && stage !== 'APPROVED' && stage !== 'DECLINED' && (
          <button
            onClick={onCancelTransaction}
            className="px-2.5 py-1 text-xs rounded-lg font-medium bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 flex items-center gap-1 cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" /> Cancel
          </button>
        )}
      </div>
    </div>
  );
};

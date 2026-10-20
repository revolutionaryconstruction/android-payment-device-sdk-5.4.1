import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TerminalSimulator } from './components/TerminalSimulator';
import { TransactionWorkbench } from './components/TransactionWorkbench';
import { ApiExplorer } from './components/ApiExplorer';
import { ReleaseNotesView } from './components/ReleaseNotesView';
import { DeviceSetupGuide } from './components/DeviceSetupGuide';
import { PdfViewerModal } from './components/PdfViewerModal';
import { 
  CONFIGURED_API_KEY, 
  CONFIGURED_E2EE_PROVIDER, 
  CONFIGURED_TERMINAL_ID, 
  SUPPORTED_DEVICES 
} from './data/sdkData';
import { 
  CardEntryMode, 
  ConnectionType, 
  DeviceInfo, 
  EventCallbackLog, 
  OfflineUploadMode, 
  ReceiptData, 
  TransactionStage, 
  TransactionType 
} from './types/sdk';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [selectedDevice, setSelectedDevice] = useState<any>(SUPPORTED_DEVICES[0]); // Axium DX8000
  const [isDeviceConnected, setIsDeviceConnected] = useState<boolean>(true);
  
  // Transaction State
  const [stage, setStage] = useState<TransactionStage>('IDLE');
  const [amount, setAmount] = useState<string>('1250'); // $12.50
  const [currency, setCurrency] = useState<string>('USD');
  const [transactionType, setTransactionType] = useState<TransactionType>('SALE');
  const [tipAmount, setTipAmount] = useState<string>('200'); // $2.00
  const [offlineMode, setOfflineMode] = useState<OfflineUploadMode>('STORE_AND_FORWARD');
  const [partialApproval, setPartialApproval] = useState<boolean>(true);
  const [connectionType, setConnectionType] = useState<ConnectionType>('BLUETOOTH');
  const [cardEntryMode, setCardEntryMode] = useState<CardEntryMode | null>(null);

  // Event stream
  const [eventLogs, setEventLogs] = useState<EventCallbackLog[]>([]);

  // Receipt
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  // PDF modal viewer
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [activePdfDocId, setActivePdfDocId] = useState<string>('api-reference');

  const addEventLog = (
    callbackName: string,
    eventPayload: Record<string, any>,
    level: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) => {
    const newLog: EventCallbackLog = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleTimeString(),
      callbackName,
      eventPayload,
      level,
    };
    setEventLogs((prev) => [newLog, ...prev]);
  };

  const handleOpenPdf = (docId: string = 'api-reference') => {
    setActivePdfDocId(docId);
    setPdfModalOpen(true);
  };

  // Lifecycle SDK calls
  const handleInitializeSdk = () => {
    addEventLog('ConfigurationUpdateListener.onConfigurationUpdate', {
      status: 'INITIALIZED',
      terminalId: CONFIGURED_TERMINAL_ID,
      applicationIdentifier: `RetailPOS_Term_${CONFIGURED_TERMINAL_ID}`,
      apiKey: `${CONFIGURED_TERMINAL_ID}|${CONFIGURED_API_KEY.slice(6, 26)}... [SafeWebServices E2EE Active]`,
      e2eeProvider: CONFIGURED_E2EE_PROVIDER,
      sdkVersion: '5.4.1 (Cassiopeia)',
      environment: 'LIVE',
      targetPlatform: 'Android 14 (API 34)',
      playIntegrityAttested: selectedDevice.id === 'TAP_TO_MOBILE' ? true : 'N/A'
    }, 'success');
  };

  const handleConnectAndConfigure = () => {
    setIsDeviceConnected(true);
    addEventLog('ConnectAndConfigureFinishedListener.onConnectAndConfigureFinished', {
      result: 'SUCCESS',
      paymentDeviceModel: selectedDevice.name,
      connectionType: connectionType,
      batteryLevel: '94%',
      firmwareVersion: 'v2.8.4-PCI-PTS-6.x',
      encryptionKeys: 'INJECTED_AND_VALID'
    }, 'success');
  };

  const handleStartTransaction = () => {
    setStage('WAITING_FOR_CARD');
    setCardEntryMode(null);
    setReceiptData(null);

    addEventLog('TransactionUpdateListener.onTransactionUpdate', {
      message: 'Transaction started. Awaiting cardholder interaction.',
      transactionStage: 'WAITING_FOR_CARD',
      transactionType,
      amount,
      currency,
      offlineTransactionUploadMode: offlineMode,
      partialApprovalAllowed: partialApproval
    }, 'info');
  };

  const handleTerminateTransaction = () => {
    setStage('TERMINATED');
    addEventLog('TransactionFinishedListener.onTransactionFinished', {
      result: 'TERMINATED_BY_USER',
      errorCode: 'TRANSACTION_CANCELLED',
      message: 'Merchant or cardholder cancelled operation.'
    }, 'warning');
    setTimeout(() => setStage('IDLE'), 2500);
  };

  // Card interaction simulation
  const handleCardAction = (mode: CardEntryMode) => {
    setCardEntryMode(mode);
    setStage('CARD_DETECTED');

    addEventLog('CardDetailsListener.onCardDetails', {
      cardEntryMode: mode,
      maskedPan: '•••• •••• •••• 4242',
      paymentScheme: 'VISA',
      cardholderName: 'VALUED CUSTOMER',
      expiryDate: '12/28',
      serviceCode: '201'
    }, 'info');

    setTimeout(() => {
      if (mode === 'EMV_CHIP' || selectedDevice.id === 'TAP_TO_MOBILE') {
        setStage('REQUESTING_PIN');
        addEventLog('TransactionUpdateListener.onTransactionUpdate', {
          message: 'PIN entry requested on terminal.',
          transactionStage: 'REQUESTING_PIN',
          cvmMethod: selectedDevice.id === 'TAP_TO_MOBILE' ? 'PIN_ON_GLASS' : 'TACTILE_PIN_PAD'
        }, 'info');
      } else if (mode === 'MAGSTRIPE') {
        setStage('REQUESTING_SIGNATURE');
        addEventLog('SignatureCaptureListener.onSignatureCapture', {
          message: 'Signature capture requested for magnetic stripe fallback.',
          cvmMethod: 'SIGNATURE'
        }, 'info');
      } else {
        // Contactless no CVM
        finalizeAuthorization('NO_CVM', true);
      }
    }, 1200);
  };

  const handlePinSubmit = (pin: string) => {
    setStage('ONLINE_AUTHORIZING');
    addEventLog('TransactionUpdateListener.onTransactionUpdate', {
      message: 'PIN verified securely under DUKPT encryption. Authorizing with host...',
      transactionStage: 'ONLINE_AUTHORIZING'
    }, 'info');

    setTimeout(() => {
      finalizeAuthorization(selectedDevice.id === 'TAP_TO_MOBILE' ? 'PIN_ON_GLASS' : 'PIN', true);
    }, 1800);
  };

  const handleSignatureAccept = () => {
    setStage('ONLINE_AUTHORIZING');
    addEventLog('SignatureVerificationListener.onSignatureVerification', {
      signatureVerified: true,
      message: 'Merchant accepted cardholder signature.'
    }, 'info');

    setTimeout(() => {
      finalizeAuthorization('SIGNATURE', true);
    }, 1500);
  };

  const finalizeAuthorization = (cvm: any, approved: boolean) => {
    const baseAmt = (parseFloat(amount || '0') / 100).toFixed(2);
    const tipAmt = (parseFloat(tipAmount || '0') / 100).toFixed(2);
    const totalAmt = ((parseFloat(amount || '0') + parseFloat(tipAmount || '0')) / 100).toFixed(2);
    const auth = `OK${Math.floor(1000 + Math.random() * 9000)}`;
    const txId = `TX-${Date.now().toString().slice(-8)}`;

    if (approved) {
      setStage('APPROVED');
      const receipt: ReceiptData = {
        merchantName: 'NMI DEMO STORE',
        merchantAddress: '1450 American Lane, Schaumburg IL',
        merchantId: 'MID-99281720',
        terminalId: `TID-${selectedDevice.id.slice(-6)}`,
        transactionType,
        amount: baseAmt,
        tipAmount: tipAmt,
        totalAmount: totalAmt,
        currency,
        cardScheme: 'VISA DEBIT',
        maskedPan: '•••• 4242',
        cardEntryMode: cardEntryMode || 'CONTACTLESS_NFC',
        authCode: auth,
        transactionId: txId,
        referenceNumber: `${Math.floor(100000 + Math.random() * 900000)}`,
        cvmMode: cvm,
        aid: 'A0000000031010',
        tvr: '8000008000',
        tsi: '6800',
        dateTime: new Date().toLocaleString(),
        status: 'APPROVED'
      };
      setReceiptData(receipt);

      addEventLog('TransactionFinishedListener.onTransactionFinished', {
        result: 'SUCCESS',
        transactionId: txId,
        authCode: auth,
        totalAmount: totalAmt,
        currency,
        cardScheme: 'VISA DEBIT',
        offlineQueued: offlineMode === 'OFFLINE_ONLY',
        offlineTransactionUploadMode: offlineMode
      }, 'success');
    } else {
      setStage('DECLINED');
      addEventLog('TransactionFinishedListener.onTransactionFinished', {
        result: 'DECLINED',
        errorCode: 'CARD_DECLINED_BY_ISSUER',
        issuerResponseCode: '05',
        message: 'Do Not Honor'
      }, 'error');
    }
  };

  const handleSimulateApprovedCard = () => {
    handleStartTransaction();
    setTimeout(() => {
      handleCardAction('CONTACTLESS_NFC');
    }, 600);
  };

  const handleSimulateDeclinedCard = () => {
    handleStartTransaction();
    setTimeout(() => {
      setCardEntryMode('EMV_CHIP');
      setStage('ONLINE_AUTHORIZING');
      setTimeout(() => {
        finalizeAuthorization('PIN', false);
      }, 1200);
    }, 600);
  };

  const handleProcessReceipt = () => {
    if (!receiptData) {
      addEventLog('ProcessReceiptFinishedListener.onProcessReceiptFinished', {
        result: 'ERROR',
        message: 'No transaction data available to print. Run a transaction first.'
      }, 'warning');
      return;
    }
    addEventLog('ProcessReceiptFinishedListener.onProcessReceiptFinished', {
      result: 'SUCCESS',
      printerStatus: 'PAPER_OK',
      terminal: selectedDevice.name,
      printedCopies: ['MERCHANT_COPY', 'CUSTOMER_COPY']
    }, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDeviceName={selectedDevice.name}
        isDeviceConnected={isDeviceConnected}
        onOpenPdf={handleOpenPdf}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Tab 1: Terminal Simulator & Workbench */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Visual Hardware POS Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    Terminal Hardware Visualizer
                  </span>
                  <span className="font-mono text-cyan-400 font-semibold">{selectedDevice.category}</span>
                </div>

                <TerminalSimulator
                  device={selectedDevice}
                  stage={stage}
                  amount={amount}
                  currency={currency}
                  cardEntryMode={cardEntryMode}
                  receiptData={receiptData}
                  onCardAction={handleCardAction}
                  onPinSubmit={handlePinSubmit}
                  onCancelTransaction={handleTerminateTransaction}
                  onSignatureAccept={handleSignatureAccept}
                />
              </div>
            </div>

            {/* Right Column: Transaction Configuration Workbench & Live Event Monitor */}
            <div className="lg:col-span-7 flex flex-col">
              <TransactionWorkbench
                selectedDevice={selectedDevice}
                onSelectDevice={setSelectedDevice}
                stage={stage}
                amount={amount}
                setAmount={setAmount}
                currency={currency}
                setCurrency={setCurrency}
                transactionType={transactionType}
                setTransactionType={setTransactionType}
                tipAmount={tipAmount}
                setTipAmount={setTipAmount}
                offlineMode={offlineMode}
                setOfflineMode={setOfflineMode}
                partialApproval={partialApproval}
                setPartialApproval={setPartialApproval}
                connectionType={connectionType}
                setConnectionType={setConnectionType}
                eventLogs={eventLogs}
                onInitializeSdk={handleInitializeSdk}
                onConnectAndConfigure={handleConnectAndConfigure}
                onStartTransaction={handleStartTransaction}
                onTerminateTransaction={handleTerminateTransaction}
                onProcessReceipt={handleProcessReceipt}
                onClearLogs={() => setEventLogs([])}
                onSimulateApprovedCard={handleSimulateApprovedCard}
                onSimulateDeclinedCard={handleSimulateDeclinedCard}
              />
            </div>

          </div>
        )}

        {/* Tab 2: API Reference & Interactive Code Gen */}
        {activeTab === 'api' && <ApiExplorer />}

        {/* Tab 3: Release 5.4.1 Highlights & Known Issues */}
        {activeTab === 'release-notes' && (
          <ReleaseNotesView onOpenPdf={handleOpenPdf} />
        )}

        {/* Tab 4: Merchant Device Setup Walkthrough */}
        {activeTab === 'setup-guide' && (
          <DeviceSetupGuide onOpenPdf={handleOpenPdf} />
        )}

        {/* Tab 5: Embedded Official PDF Manuals */}
        {activeTab === 'documents' && (
          <div className="h-[800px]">
            <PdfViewerModal initialDocumentId="api-reference" isModal={false} />
          </div>
        )}

      </main>

      {/* PDF Modal if opened via Navbar or CTA buttons */}
      {pdfModalOpen && (
        <PdfViewerModal
          initialDocumentId={activePdfDocId}
          onClose={() => setPdfModalOpen(false)}
          isModal={true}
        />
      )}

      {/* Global Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <span>NMI ChipDNA Payment Device SDK Release 5.4.1 (Cassiopeia)</span>
          <span>7 Official Documents Bundled • Port 3000 Node.js 22</span>
        </div>
      </footer>

    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { 
  Search, 
  Code2, 
  Copy, 
  Check, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Smartphone, 
  Terminal, 
  Filter,
  CheckCircle2,
  ShieldCheck,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  CONFIGURED_API_KEY, 
  CONFIGURED_E2EE_PROVIDER, 
  CONFIGURED_TERMINAL_ID, 
  SDK_METHODS, 
  SDK_PARAMETERS, 
  SUPPORTED_DEVICES 
} from '../data/sdkData';
import { SdkParameter, SdkMethod } from '../types/sdk';

export const ApiExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'SMART_POS' | 'TAP_TO_MOBILE'>('ALL');
  const [activeCodeLang, setActiveCodeLang] = useState<'kotlin' | 'java' | 'swift'>('kotlin');
  const [activeCodeSnippet, setActiveCodeSnippet] = useState<'init' | 'sale' | 'connect' | 'taptomobile' | 'callbacks'>('init');
  const [showFullKey, setShowFullKey] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter parameters
  const filteredParameters = SDK_PARAMETERS.filter((param) => {
    const matchesSearch =
      param.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      param.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      param.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedFilter === 'ALL' ||
      param.applicableTo.includes(selectedFilter) ||
      param.applicableTo.includes('ALL');

    return matchesSearch && matchesCategory;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate code based on language and snippet
  const generateSnippet = () => {
    const displayKey = showFullKey
      ? CONFIGURED_API_KEY
      : `${CONFIGURED_TERMINAL_ID}|${CONFIGURED_API_KEY.slice(6, 26)}... [SafeWebServices 1474-char E2EE Cert]`;

    if (activeCodeSnippet === 'init') {
      if (activeCodeLang === 'kotlin') {
        return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 - Android Kotlin
// SDK Initialization with Terminal ${CONFIGURED_TERMINAL_ID} API Key
// ==========================================
import com.creditcall.chipdnamobile.*

fun initializeChipDnaMobile() {
    val initParams = Parameters().apply {
        // Registered POS Application Identifier
        add(ParameterKeys.ApplicationIdentifier, "RetailPOS_Term_${CONFIGURED_TERMINAL_ID}")

        // Configured E2EE API Key (SafeWebServices Schaumburg, IL)
        add(ParameterKeys.ApiKey, "${displayKey}")

        add(ParameterKeys.Environment, ParameterValues.Live) // or ParameterValues.Test
        add(ParameterKeys.AutoConfirm, ParameterValues.TRUE)
    }

    val result = ChipDnaMobile.getInstance().initialize(initParams)
    android.util.Log.i("ChipDNA", "ChipDNA Mobile initialized with Terminal ${CONFIGURED_TERMINAL_ID}")
}`;
      } else if (activeCodeLang === 'java') {
        return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 - Android Java
// SDK Initialization with Terminal ${CONFIGURED_TERMINAL_ID} API Key
// ==========================================
import com.creditcall.chipdnamobile.ChipDnaMobile;
import com.creditcall.chipdnamobile.Parameters;
import com.creditcall.chipdnamobile.ParameterKeys;
import com.creditcall.chipdnamobile.ParameterValues;

public class PaymentInit {
    public static void initialize() {
        Parameters initParams = new Parameters();
        initParams.add(ParameterKeys.ApplicationIdentifier, "RetailPOS_Term_${CONFIGURED_TERMINAL_ID}");
        
        // Configured E2EE API Key (SafeWebServices Schaumburg, IL)
        initParams.add(ParameterKeys.ApiKey, "${displayKey}");
        initParams.add(ParameterKeys.Environment, ParameterValues.Live);
        initParams.add(ParameterKeys.AutoConfirm, ParameterValues.TRUE);

        ChipDnaMobile.getInstance().initialize(initParams);
    }
}`;
      } else {
        return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 - iOS Swift
// SDK Initialization with Terminal ${CONFIGURED_TERMINAL_ID} API Key
// ==========================================
import ChipDnaMobile

func initializeChipDna() {
    let params = ChipDnaMobileSerializer.Parameters()
    params.setValue("RetailPOS_Term_${CONFIGURED_TERMINAL_ID}", forKey: ParameterKeys.applicationIdentifier)
    params.setValue("${displayKey}", forKey: ParameterKeys.apiKey)
    params.setValue(ParameterValues.live, forKey: ParameterKeys.environment)
    params.setValue(ParameterValues.TRUE, forKey: ParameterKeys.autoConfirm)

    ChipDnaMobile.sharedInstance().initialize(params)
}`;
      }
    }

    if (activeCodeLang === 'kotlin') {
      if (activeCodeSnippet === 'sale') {
        return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 (Cassiopeia) - Android Kotlin
// Initiating a SmartPOS or Tap To Mobile Transaction
// ==========================================
import com.creditcall.chipdnamobile.*

fun startPayment(amountCents: String, currency: String = "USD") {
    val transactionParams = Parameters().apply {
        // Core Transaction Parameters
        add(ParameterKeys.TransactionType, ParameterValues.Sale)
        add(ParameterKeys.Amount, amountCents) // e.g. "1250" = $12.50
        add(ParameterKeys.Currency, currency)
        add(ParameterKeys.AutoConfirm, ParameterValues.TRUE)
        add(ParameterKeys.UserReference, "INV-\${System.currentTimeMillis()}")

        // 5.4.1 NEW: Configure Offline Transaction Upload Mode
        add(ParameterKeys.OfflineTransactionUploadMode, ParameterValues.StoreAndForward)

        // SmartPOS Optional Features
        add(ParameterKeys.TipAmount, "200") // $2.00 Gratuity
        add(ParameterKeys.PartialApproval, ParameterValues.TRUE)
        add(ParameterKeys.MagstripeDebit, ParameterValues.TRUE)
    }

    // Call startTransaction on the singleton instance
    val result: Parameters = ChipDnaMobile.getInstance().startTransaction(transactionParams)
    
    if (result.getValue(ParameterKeys.Result) == ParameterValues.Success) {
        android.util.Log.i("ChipDNA", "Transaction initiated successfully")
    } else {
        val error = result.getValue(ParameterKeys.ErrorDescription)
        android.util.Log.e("ChipDNA", "Failed to start transaction: $error")
    }
}`;
      } else if (activeCodeSnippet === 'connect') {
        return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 - Android Kotlin
// Connect and Configure Ingenico Axium Device
// ==========================================
import com.creditcall.chipdnamobile.*

fun connectAxiumTerminal(bluetoothMacAddress: String) {
    val connectParams = Parameters().apply {
        add(ParameterKeys.PaymentDeviceModel, ParameterValues.AxiumDx8000)
        add(ParameterKeys.PaymentDeviceTarget, bluetoothMacAddress)
        // Or for local network IP: "192.168.1.100:8080"
    }

    // Establish link and synchronize terminal cryptographic keys
    ChipDnaMobile.getInstance().connectAndConfigure(connectParams)
}`;
      } else if (activeCodeSnippet === 'taptomobile') {
        return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 - Android Kotlin
// Tap To Mobile SoftPOS (Cloud Commerce SDK 6.9.0) Setup
// ==========================================
// Ensure build.gradle includes:
// implementation 'ch.qos.logback:logback-classic:1.5.32'
// implementation 'org.slf4j:slf4j-api:2.0.18'

import com.creditcall.chipdnamobile.*

fun setupTapToMobile(activity: androidx.appcompat.app.AppCompatActivity) {
    val initParams = Parameters().apply {
        add(ParameterKeys.ApplicationIdentifier, "RetailPOS_Term_${CONFIGURED_TERMINAL_ID}")
        add(ParameterKeys.ApiKey, "${displayKey}")
        add(ParameterKeys.Environment, ParameterValues.Live)
        
        // Tap To Mobile Required Parameters
        add(ParameterKeys.CardTapActivityClass, activity.javaClass.name)
        add(ParameterKeys.PlayIntegrityProjectNumber, "339131890987")
    }

    ChipDnaMobile.getInstance().initialize(initParams)
}`;
      } else {
        return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 - Android Kotlin Callbacks
// ==========================================
import com.creditcall.chipdnamobile.*

class PaymentCallbackHandler : 
    ITransactionUpdateListener,
    ITransactionFinishedListener,
    ICardDetailsListener {

    override fun onTransactionUpdate(parameters: Parameters) {
        val message = parameters.getValue(ParameterKeys.TransactionUpdateMessage)
        val progress = parameters.getValue(ParameterKeys.TransactionUpdateProgress)
        println("Update: $message ($progress%)")
    }

    override fun onCardDetails(parameters: Parameters) {
        val maskedPan = parameters.getValue(ParameterKeys.MaskedPan)
        val scheme = parameters.getValue(ParameterKeys.PaymentScheme)
        println("Card read: $scheme $maskedPan")
    }

    override fun onTransactionFinished(parameters: Parameters) {
        val result = parameters.getValue(ParameterKeys.Result)
        if (result == ParameterValues.Success) {
            val authCode = parameters.getValue(ParameterKeys.AuthCode)
            println("Payment APPROVED! AuthCode: $authCode")
        } else {
            val error = parameters.getValue(ParameterKeys.ErrorDescription)
            println("Payment DECLINED: $error")
        }
    }
}`;
      }
    } else if (activeCodeLang === 'java') {
      return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 - Android Java Implementation
// ==========================================
import com.creditcall.chipdnamobile.ChipDnaMobile;
import com.creditcall.chipdnamobile.Parameters;
import com.creditcall.chipdnamobile.ParameterKeys;
import com.creditcall.chipdnamobile.ParameterValues;

public class PaymentManager {

    public void processSale(String amountInCents) {
        Parameters params = new Parameters();
        params.add(ParameterKeys.TransactionType, ParameterValues.Sale);
        params.add(ParameterKeys.Amount, amountInCents);
        params.add(ParameterKeys.Currency, "USD");
        params.add(ParameterKeys.AutoConfirm, ParameterValues.TRUE);
        
        // 5.4.1 Offline upload mode
        params.add(ParameterKeys.OfflineTransactionUploadMode, ParameterValues.StoreAndForward);

        Parameters result = ChipDnaMobile.getInstance().startTransaction(params);
        if (result.getValue(ParameterKeys.Result).equals(ParameterValues.Success)) {
            System.out.println("Transaction started successfully");
        }
    }
}`;
    } else {
      return `// ==========================================
// ChipDNA Mobile SDK 5.4.1 - iOS Swift Implementation
// ==========================================
import ChipDnaMobile

class PaymentService {
    func startTransaction(amount: String, currency: String = "USD") {
        let params = ChipDnaMobileSerializer.Parameters()
        params.setValue(ParameterValues.sale, forKey: ParameterKeys.transactionType)
        params.setValue(amount, forKey: ParameterKeys.amount)
        params.setValue(currency, forKey: ParameterKeys.currency)
        params.setValue(ParameterValues.TRUE, forKey: ParameterKeys.autoConfirm)
        
        let result = ChipDnaMobile.sharedInstance().startTransaction(params)
        print("Transaction execution started")
    }
}`;
    }
  };

  const currentCode = generateSnippet();

  return (
    <div className="space-y-6">
      
      {/* Code Generator Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Interactive SDK 5.4.1 Code Generator</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                Key 23194 Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Generate native Kotlin, Java, or Swift integration code configured with Terminal {CONFIGURED_TERMINAL_ID} credentials
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveCodeLang('kotlin')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                activeCodeLang === 'kotlin' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kotlin (Android)
            </button>
            <button
              onClick={() => setActiveCodeLang('java')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                activeCodeLang === 'java' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Java (Android)
            </button>
            <button
              onClick={() => setActiveCodeLang('swift')}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                activeCodeLang === 'swift' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Swift (iOS)
            </button>
          </div>
        </div>

        {/* Snippet Flow Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-3 border-b border-slate-800 text-xs">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCodeSnippet('init')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeCodeSnippet === 'init'
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span>Initialize (Key 23194)</span>
            </button>
            <button
              onClick={() => setActiveCodeSnippet('sale')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCodeSnippet === 'sale'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              Start Sale & Offline Mode
            </button>
            <button
              onClick={() => setActiveCodeSnippet('connect')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCodeSnippet === 'connect'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              Connect Axium Terminal
            </button>
            <button
              onClick={() => setActiveCodeSnippet('taptomobile')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCodeSnippet === 'taptomobile'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              Tap To Mobile (SoftPOS 6.9.0)
            </button>
            <button
              onClick={() => setActiveCodeSnippet('callbacks')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCodeSnippet === 'callbacks'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60'
              }`}
            >
              Callback Listeners
            </button>
          </div>

          {/* Toggle Full Key vs Masked */}
          <button
            onClick={() => setShowFullKey(!showFullKey)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-mono cursor-pointer transition"
          >
            {showFullKey ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{showFullKey ? 'Mask Full Cert' : 'Show Full Key'}</span>
          </button>
        </div>

        {/* Code Editor Window */}
        <div className="relative mt-3 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-400">
              {activeCodeLang === 'kotlin' ? 'PaymentActivity.kt' : activeCodeLang === 'java' ? 'PaymentManager.java' : 'PaymentService.swift'}
            </span>
            <button
              onClick={() => handleCopy(currentCode)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            {currentCode}
          </pre>
        </div>
      </div>

      {/* Methods & Singleton API */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            ChipDnaMobile Core Singleton Methods
          </h3>
          <p className="text-xs text-slate-400">
            Primary entry points provided by the ChipDnaMobile SDK singleton
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {SDK_METHODS.map((m) => (
            <div key={m.name} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-sm font-bold text-cyan-400">
                  ChipDnaMobile.{m.name}()
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {m.returnType}
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                {m.description}
              </p>
              <div className="bg-slate-900/80 p-2 rounded font-mono text-[11px] text-slate-400 overflow-x-auto">
                {m.syntaxKotlin}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Searchable ParameterKeys Dictionary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              ParameterKeys Dictionary & Specifications
            </h3>
            <p className="text-xs text-slate-400">
              Complete parameter reference extracted directly from the Release 5.4.1 documentation
            </p>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search parameter keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Filter */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Categories</option>
              <option value="SMART_POS">Smart POS</option>
              <option value="TAP_TO_MOBILE">Tap To Mobile</option>
            </select>
          </div>
        </div>

        {/* Parameters Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Parameter Key</th>
                <th className="py-2.5 px-3">Name & Description</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Required</th>
                <th className="py-2.5 px-3">Example / Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              {filteredParameters.map((param) => (
                <tr key={param.key} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-mono text-cyan-300 font-bold whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{param.key}</span>
                      {param.isNewIn541 && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                          NEW 5.4.1
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{param.name}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5 max-w-md leading-relaxed">
                      {param.description}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {param.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {param.isRequired ? (
                      <span className="text-amber-400 font-semibold text-[11px]">Required</span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Optional</span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">
                    <div className="text-emerald-400">{param.example}</div>
                    {param.allowedValues && (
                      <div className="text-[10px] text-slate-500 mt-1">
                        Allowed: {param.allowedValues.join(', ')}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

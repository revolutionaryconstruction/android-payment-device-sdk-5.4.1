import React, { useState } from 'react';
import { 
  Wifi, 
  Bluetooth, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const DeviceSetupGuide: React.FC<{ onOpenPdf: (id: string) => void }> = ({ onOpenPdf }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: 1,
      title: 'Power On & Wi-Fi Configuration',
      summary: 'Mandatory network onboarding for Ingenico Axium terminals',
      icon: Wifi,
      content: (
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            When powering on the Ingenico Axium device for the first time, the <strong>Device Setup App</strong> will launch automatically.
          </p>
          <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-200">
            <strong>⚠ Mandatory Requirement:</strong> Wi-Fi setup cannot be skipped. An active internet connection is required to complete cryptographic key injection and device registration.
          </div>
          <ol className="list-decimal pl-5 space-y-2">
            <li>The terminal screen displays a scan of available local Wi-Fi networks.</li>
            <li>Select your store network (2.4 GHz or 5 GHz WPA2/WPA3 enterprise or personal).</li>
            <li>Enter the network security passphrase and press <strong>Connect</strong>.</li>
            <li>Once the Wi-Fi icon displays a green checkmark, the device will verify connectivity to NMI host gateways.</li>
          </ol>
        </div>
      )
    },
    {
      num: 2,
      title: 'Core System Applications Verification',
      summary: 'Confirm pre-loaded firmware packages and security apps',
      icon: Layers,
      content: (
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Ingenico Axium runs a security-hardened edition of Android. The following core applications must be present in the application launcher:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              { name: 'AppStore', desc: 'Secure repository for NMI and Ingenico updates' },
              { name: 'AXIUM Retail Core', desc: 'Payment engine executing EMV and contactless kernels' },
              { name: 'ARC Comm Config', desc: 'Communication bridge for Bluetooth, Wi-Fi, and USB' },
              { name: 'AXIUM UX', desc: 'Customer-facing transaction UI and PIN on Glass screens' },
              { name: 'View Security Settings', desc: 'PCI PTS tamper-sensor status and certificates' },
              { name: 'Device Setup App', desc: 'Initial out-of-box registration wizard' }
            ].map((app) => (
              <div key={app.name} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{app.name}</div>
                  <div className="text-[11px] text-slate-400">{app.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      num: 3,
      title: 'Bluetooth & ARC Comm Configuration',
      summary: 'Pair terminal with Android/iOS tablet or Windows POS station',
      icon: Bluetooth,
      content: (
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            To connect the Axium terminal to a merchant tablet running your ChipDNA POS app:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open the <strong>ARC Comm Config</strong> app on the Axium terminal.</li>
            <li>Select <strong>Bluetooth SPP (Serial Port Profile)</strong> as the primary communication mode.</li>
            <li>Ensure the terminal Bluetooth status is set to <strong>Discoverable</strong>. The default Bluetooth name appears as <code>AXIUM_XXXXXX</code> (matching the serial number).</li>
            <li>On your merchant Android tablet, initiate discovery in your POS app using <code>ChipDnaMobile.getInstance().getAvailablePaymentDevices()</code>.</li>
            <li>Confirm the 6-digit Bluetooth numeric pairing code on both screens.</li>
          </ol>
        </div>
      )
    },
    {
      num: 4,
      title: 'Tap To Mobile Onboarding & Google Play Integrity',
      summary: 'Security attestation keys and keystore hashing for SoftPOS',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            When utilizing <strong>Tap To Mobile (SoftPOS CPOC / MPOC)</strong> without external hardware, Google Play Integrity attestation is mandatory:
          </p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-mono text-cyan-300 text-xs font-bold">Required Credentials:</div>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>Play Integrity Project Number:</strong> Link your Google Cloud project to Google Play Console.</li>
              <li><strong>Keystore Certificate SHA-256 Hash:</strong> Submit the SHA-256 fingerprint of your app signing key to NMI provisioning portal.</li>
              <li><strong>Cloud Commerce SDK 6.9.0:</strong> Update AAR to <code>cloud-commerce-sdk-release-6.9.0.aar</code>.</li>
              <li><strong>Logback & SLF4J:</strong> Declare <code>ch.qos.logback:logback-classic:1.5.32</code> in <code>build.gradle</code>.</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              Merchant Provisioning
            </span>
            <span className="text-xs text-slate-400">Axium Series & SoftPOS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1 tracking-tight">
            Terminal Setup & Onboarding Guide
          </h2>
          <p className="text-slate-400 text-xs mt-1 max-w-2xl">
            Step-by-step walkthrough derived from the official Merchant Facing Device Setup Guide and Tap To Mobile supplement.
          </p>
        </div>

        <button
          onClick={() => onOpenPdf('merchant-facing-setup')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition cursor-pointer"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Setup Guide PDF (6 pages)</span>
        </button>
      </div>

      {/* Step Navigator and Content Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Step Buttons Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCurrent = activeStep === step.num;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                  isCurrent
                    ? 'bg-cyan-950/60 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isCurrent ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {step.num}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">{step.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{step.summary}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${isCurrent ? 'text-cyan-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Step Detailed View */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold pb-2 border-b border-slate-800">
            <span>STEP 0{activeStep} OF 04</span>
          </div>
          
          <h3 className="text-lg font-bold text-white mt-3 mb-1">
            {steps[activeStep - 1].title}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {steps[activeStep - 1].summary}
          </p>

          <div className="pt-2">
            {steps[activeStep - 1].content}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 cursor-pointer"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
              disabled={activeStep === 4}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

import { DeviceInfo, DeviceModel, PdfDocument, SdkMethod, SdkParameter } from '../types/sdk';

export const SDK_VERSION = '5.4.1 (Cassiopeia)';
export const RELEASE_DATE = 'August 14, 2026';

export const CONFIGURED_API_KEY =
  (import.meta as any).env?.VITE_CHIPDNA_API_KEY ||
  '23194|MIIERzCCAy+gAwIBAgIBADANBgkqhkiG9w0BAQsFADCBvTELMAkGA1UEBhMCVVMxETAPBgNVBAgMCElsbGlub2lzMRMwEQYDVQQHDApTY2hhdW1idXJnMRgwFgYDVQQKDA9TYWZlV2ViU2VydmljZXMxHjAcBgNVBAsMFUVuZC10by1lbmQgZW5jcnlwdGlvbjEgMB4GA1UEAwwXd3d3LnNhZmV3ZWJzZXJ2aWNlcy5jb20xKjAoBgkqhkiG9w0BCQEWG3N1cHBvcnRAc2FmZXdlYnNlcnZpY2VzLmNvbTAeFw0yNjEwMTMwNzM2NDlaFw0yNjEwMTQwNzM2NDlaMIG9MQswCQYDVQQGEwJVUzERMA8GA1UECAwISWxsaW5vaXMxEzARBgNVBAcMClNjaGF1bWJ1cmcxGDAWBgNVBAoMD1NhZmVXZWJTZXJ2aWNlczEeMBwGA1UECwwVRW5kLXRvLWVuZCBlbmNyeXB0aW9uMSAwHgYDVQQDDBd3d3cuc2FmZXdlYnNlcnZpY2VzLmNvbTEqMCgGCSqGSIb3DQEJARYbc3VwcG9ydEBzYWZld2Vic2VydmljZXMuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn0Aj9LkfPkzIyF7C8mxi/5L+cEKnZk5ZqAVUWRhYvXHXPYp6j7/OWgaK8XOOYf5SotInp32WlhHLqfe63BKqhoTmmk573V3Bm42BzTsUq5x/JjlEVnlMXPNi/+A8g46LOE/EbBvIrmnHT55pWx3obhnW9unrRd26JeOqup5c7lZuwledQL/Fd5pvks+IIxGsWwE9+XkVzfPegyuxQda3cy54o+os08N3VRkS9VbVyhnyTZC3raka2qbcXDBiGawmXTepSo3P1d8vrwajAsrytosz7cJ2wDoEpYQN93LwR4DJBV8M5b4S0ytbsfy7ZxSE24FhsKXCfinUDh8zaWiSFwIDAQABo1AwTjAdBgNVHQ4EFgQUPpLO9bZQ2sKQqxvn2wraooagD9YwHwYDVR0jBBgwFoAUPpLO9bZQ2sKQqxvn2wraooagD9YwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAlqsWSKA83s6aZDEUVBwSNmQCzf37n3F1TIpj6zFuGJYmCKEoMSAFV0K7R4qE/4vZ53eyF+nJifvUc4oWFDuRr5x9WPdctkVF0H2pd5QT4sXUHszdEKR1M0dvp8T4zGN1BzxDC1ChsETgtyYEdo6LsNBvy8gylxykROv3HJGMTzko85Z8u3rTcS3VfSbcZCbiTpLjYd1/LmiV+vRFgZWwHLjpmu9P5SRmfh8yeROWLAUx49zhyKDt6QDK1a4/Rk84BThIQCSZjEqveICCh49yuqO0ShJF6Mfpokf/fAS+D1Kv3VmhMngYmO74dI5HSdQo8CJegXNU1ffWHYWOrvSh1w==';

export const CONFIGURED_TERMINAL_ID = '23194';
export const CONFIGURED_E2EE_PROVIDER = 'SafeWebServices (Schaumburg, IL)';


export const PDF_DOCUMENTS: PdfDocument[] = [
  {
    id: 'api-reference',
    title: 'Payment Device SDK for iOS/Android - API Reference',
    category: 'API',
    fileName: 'Payment Device SDK for iOS_Android - API for Release 5.4.1 Cassiopeia (2026-08-14).pdf',
    downloadUrl: '/docs/api_reference_5.4.1.pdf',
    pages: 72,
    size: '4.85 MB',
    date: '2026-08-14',
    description: 'Complete API reference covering initialization, device management, transaction flows, callback interfaces, CVM, signature capture, surcharges, and tokenization.'
  },
  {
    id: 'tap-to-mobile',
    title: 'Tap To Mobile Supplement (CPOC / MPOC SoftPOS)',
    category: 'Tap to Mobile',
    fileName: 'Payment Device SDK for Android - Tap To Mobile Supplement for Release 5.4.1 (2026-08-14).pdf',
    downloadUrl: '/docs/tap_to_mobile_supplement.pdf',
    pages: 41,
    size: '1.65 MB',
    date: '2026-08-14',
    description: 'Integration guide for contactless Tap To Mobile using Cloud Commerce SDK 6.9.0, Play Integrity API attestation, key store hashing, and PIN on Glass.'
  },
  {
    id: 'axium-smart-pos',
    title: 'Axium Smart POS Supplement (Ingenico Android Terminals)',
    category: 'SmartPOS',
    fileName: 'Payment Device SDK for Android - Axium Smart POS Supplement for Release 5.4.1 Cassiopeia (2026-08-14).pdf',
    downloadUrl: '/docs/axium_smart_pos_supplement.pdf',
    pages: 26,
    size: '1.33 MB',
    date: '2026-08-14',
    description: 'Hardware configuration and transaction processing for Ingenico Axium RX5000, EX4000, EX6000, EX8000, DX4000, and DX8000 terminals.'
  },
  {
    id: 'recent-changes',
    title: 'Recent Change Guide (5.4.1 Cassiopeia)',
    category: 'Release Notes',
    fileName: 'Payment Device SDK for iOS_Android - Recent Change Guide for Release 5.4.1 Cassiopeia (2026-08-14).pdf',
    downloadUrl: '/docs/recent_change_guide.pdf',
    pages: 9,
    size: '250 KB',
    date: '2026-08-14',
    description: 'Migration guide and breaking change overview for Release 5.4.1, including Cloud Commerce SDK 6.9.0, SLF4J/Logback dependencies, and new parameter keys.'
  },
  {
    id: 'axium-dev-guide',
    title: 'Axium Development Guide Supplement',
    category: 'SmartPOS',
    fileName: 'Payment Device SDK for Android - Axium Development Guide Supplement for Release 5.4.1 Cassiopeia (2026-08-14).pdf',
    downloadUrl: '/docs/axium_dev_guide.pdf',
    pages: 35,
    size: '1.78 MB',
    date: '2026-08-14',
    description: 'Deep-dive developer guide for building customized Android point-of-sale applications directly on Ingenico Axium smart POS hardware.'
  },
  {
    id: 'merchant-facing-setup',
    title: 'Merchant Facing Device Setup Guide',
    category: 'Hardware',
    fileName: 'Merchant Facing Device Setup Guide - 2026-08-14.pdf',
    downloadUrl: '/docs/merchant_facing_setup_guide.pdf',
    pages: 6,
    size: '223 KB',
    date: '2026-08-14',
    description: 'Out-of-box provisioning guide for merchants, covering Wi-Fi onboarding, ARC Comm Config, and initial device pairing.'
  },
  {
    id: 'known-issues',
    title: 'Release 5.4.1 Cassiopeia - Known Issues & Workarounds',
    category: 'Release Notes',
    fileName: 'Payment Device SDK for Android - Release 5.4.1 Cassiopeia - Known Issues (2026-08-14).pdf',
    downloadUrl: '/docs/known_issues_5.4.1.pdf',
    pages: 3,
    size: '66 KB',
    date: '2026-08-14',
    description: 'Current known defects, impact assessment, and recommended workarounds for Release 5.4.1 on Axium and mobile terminals.'
  }
];

export const SUPPORTED_DEVICES: DeviceInfo[] = [
  {
    id: 'AXIUM_DX8000',
    name: 'Ingenico Axium DX8000',
    manufacturer: 'Ingenico',
    category: 'Axium SmartPOS',
    screen: '5.5" HD Touchscreen (720x1280)',
    printer: true,
    pinPad: 'Touchscreen PIN on Glass / Virtual Keypad',
    connectionMethods: ['Wi-Fi 802.11 b/g/n', '4G LTE / 3G / 2G', 'Bluetooth 4.2', 'USB-C'],
    battery: '5200 mAh Li-ion Rechargeable',
    description: 'Flagship all-in-one wireless Android SmartPOS terminal featuring high-speed 58mm thermal receipt printing and professional barcode scanner.',
    imageHint: 'Handheld POS with printer roll'
  },
  {
    id: 'AXIUM_DX4000',
    name: 'Ingenico Axium DX4000',
    manufacturer: 'Ingenico',
    category: 'Axium SmartPOS',
    screen: '4.5" WVGA Capacitive Multi-touch',
    printer: true,
    pinPad: 'Touchscreen PIN on Glass',
    connectionMethods: ['Wi-Fi', 'Bluetooth 4.2', 'USB-C'],
    battery: '2600 mAh Li-ion',
    description: 'Streamlined desktop and countertop SmartPOS terminal with integrated receipt printing and ultra-compact ergonomic footprint.',
    imageHint: 'Desktop compact POS terminal'
  },
  {
    id: 'AXIUM_EX8000',
    name: 'Ingenico Axium EX8000',
    manufacturer: 'Ingenico',
    category: 'Axium SmartPOS',
    screen: '6.0" IPS HD+ Touchscreen',
    printer: false,
    pinPad: 'Touchscreen Virtual PIN Pad (PCI PTS 6.x)',
    connectionMethods: ['Wi-Fi 5', '4G LTE / 3G', 'Bluetooth 5.0 BLE', 'NFC'],
    battery: '4000 mAh Li-ion',
    description: 'Premium ultra-slim mobile tablet POS for retail line-busting, tableside hospitality ordering, and enterprise mobile payments.',
    imageHint: 'Sleek enterprise handheld tablet'
  },
  {
    id: 'AXIUM_EX6000',
    name: 'Ingenico Axium EX6000',
    manufacturer: 'Ingenico',
    category: 'Axium SmartPOS',
    screen: '5.0" HD IPS Display',
    printer: false,
    pinPad: 'Touchscreen Virtual PIN Pad',
    connectionMethods: ['Wi-Fi', '4G LTE', 'Bluetooth 4.2', 'NFC'],
    battery: '3000 mAh Li-ion',
    description: 'Pocket-sized Android mobile payment companion designed for high portability and full payment versatility without printer bulk.',
    imageHint: 'Pocket mobile payment device'
  },
  {
    id: 'AXIUM_RX5000',
    name: 'Ingenico Axium RX5000',
    manufacturer: 'Ingenico',
    category: 'Axium SmartPOS',
    screen: '3.5" or 4.0" Color Display',
    printer: false,
    pinPad: 'Physical 15-Key Tactile Backlit PIN Pad',
    connectionMethods: ['Ethernet', 'RS232 Serial', 'USB Powered', 'Bluetooth'],
    battery: 'Countertop Powered (AC / POE)',
    description: 'Heavy-duty customer-facing countertop PIN pad engineered for high-throughput retail checkout lanes and supermarket POS integration.',
    imageHint: 'Customer countertop PIN pad'
  },
  {
    id: 'TAP_TO_MOBILE',
    name: 'Android Tap To Mobile (SoftPOS CPOC / MPOC)',
    manufacturer: 'Commercial Android Device (Samsung, Pixel, Zebra, etc.)',
    category: 'Tap To Mobile',
    screen: 'Host Android Device Display (Android 11+)',
    printer: false,
    pinPad: 'Secure PIN on Glass (Cloud Commerce SDK 6.9.0)',
    connectionMethods: ['Internal NFC Controller', 'Wi-Fi / Mobile Cellular'],
    battery: 'Device Battery',
    description: 'Turns standard NFC-enabled Android smartphones and enterprise handhelds into secure payment terminals without external hardware.',
    imageHint: 'Smartphone with contactless card'
  },
  {
    id: 'IDTECH_VP3350',
    name: 'ID TECH VP3350 BLE',
    manufacturer: 'ID TECH',
    category: 'Mobile Reader',
    screen: 'OLED Graphical Display + Status LEDs',
    printer: false,
    pinPad: 'Tactile Physical PIN Pad',
    connectionMethods: ['Bluetooth Low Energy (BLE)', 'USB HID'],
    battery: 'Rechargeable Li-Polymer',
    description: 'Compact 3-in-1 MagStripe, EMV Contact Chip, and Contactless reader with tactile PIN entry.',
    imageHint: 'Compact Bluetooth PIN Pad'
  },
  {
    id: 'BBPOS_CHIPPER_3X',
    name: 'BBPOS Chipper 3X BT',
    manufacturer: 'BBPOS',
    category: 'Mobile Reader',
    screen: 'Status LEDs',
    printer: false,
    pinPad: 'Host Device PIN on Mobile Glass',
    connectionMethods: ['Bluetooth 4.0', 'USB Type-C'],
    battery: 'Internal Rechargeable Battery',
    description: 'Ultra-portable mobile card reader supporting MSR swipe, EMV chip insertion, and NFC contactless taps.',
    imageHint: 'Mini mobile reader'
  }
];

export const SDK_PARAMETERS: SdkParameter[] = [
  {
    key: 'ParameterKeys.TransactionType',
    name: 'Transaction Type',
    type: 'String',
    description: 'Specifies the type of payment transaction to initiate. Must be one of the supported transaction type values.',
    isRequired: true,
    applicableTo: ['ALL'],
    example: 'ParameterValues.Sale',
    allowedValues: ['Sale', 'AuthOnly', 'Refund', 'LinkedRefund', 'Void', 'AccountVerification', 'BalanceInquiry']
  },
  {
    key: 'ParameterKeys.Amount',
    name: 'Transaction Amount',
    type: 'String',
    description: 'The primary financial transaction amount formatted as minor currency units (cents/pence) or standard string format.',
    isRequired: true,
    applicableTo: ['ALL'],
    example: '"1250" (for $12.50)'
  },
  {
    key: 'ParameterKeys.Currency',
    name: 'Currency Code',
    type: 'String',
    description: 'Three-letter ISO 4217 alphabetical currency code or numeric code.',
    isRequired: true,
    applicableTo: ['ALL'],
    defaultValue: '"USD"',
    example: '"USD", "GBP", "EUR", "CAD"'
  },
  {
    key: 'ParameterKeys.OfflineTransactionUploadMode',
    name: 'Offline Transaction Upload Mode',
    type: 'String',
    description: 'Controls how transactions processed offline are queued and submitted to the gateway once connectivity is restored. Introduced in Release 5.4.1.',
    isRequired: false,
    isNewIn541: true,
    applicableTo: ['SMART_POS'],
    defaultValue: 'ParameterValues.StoreAndForward',
    example: 'ParameterValues.StoreAndForward',
    allowedValues: ['StoreAndForward', 'UploadImmediate', 'OfflineOnly']
  },
  {
    key: 'ParameterKeys.PaymentDeviceModel',
    name: 'Payment Device Model',
    type: 'String',
    description: 'Target hardware model when connecting to an external terminal or configuring Axium device parameters.',
    isRequired: true,
    applicableTo: ['SMART_POS'],
    example: 'ParameterValues.AxiumDx8000',
    allowedValues: ['AxiumDx8000', 'AxiumDx4000', 'AxiumEx8000', 'AxiumEx6000', 'AxiumEx4000', 'AxiumRx5000', 'IdTechVp3350', 'BbposChipper3x']
  },
  {
    key: 'ParameterKeys.PaymentDeviceTarget',
    name: 'Payment Device Target Address',
    type: 'String',
    description: 'Bluetooth MAC address, IP address:port, or USB port identifier of the target payment device.',
    isRequired: true,
    applicableTo: ['SMART_POS'],
    example: '"00:1A:7D:DA:71:13" or "192.168.1.100:8080"'
  },
  {
    key: 'ParameterKeys.TipAmount',
    name: 'Tip Amount',
    type: 'String',
    description: 'Gratuity or tip amount to add to the base transaction amount in minor currency units.',
    isRequired: false,
    applicableTo: ['SMART_POS'],
    example: '"200" (for $2.00 tip)'
  },
  {
    key: 'ParameterKeys.MagstripeDebit',
    name: 'Magstripe Debit Allowed',
    type: 'Boolean',
    description: 'Enables or restricts debit card processing when swiped via the magnetic stripe reader.',
    isRequired: false,
    applicableTo: ['SMART_POS'],
    defaultValue: 'true',
    example: 'ParameterValues.TRUE'
  },
  {
    key: 'ParameterKeys.MagstripeSignature',
    name: 'Magstripe Signature Allowed',
    type: 'Boolean',
    description: 'Allows transactions with signature verification when card is read via magnetic stripe.',
    isRequired: false,
    applicableTo: ['SMART_POS'],
    defaultValue: 'true',
    example: 'ParameterValues.TRUE'
  },
  {
    key: 'ParameterKeys.PartialApproval',
    name: 'Partial Approval Allowed',
    type: 'Boolean',
    description: 'Permits the issuer/gateway to return a partial authorization if the cardholder account has insufficient funds for the full request amount.',
    isRequired: false,
    applicableTo: ['SMART_POS'],
    defaultValue: 'false',
    example: 'ParameterValues.TRUE'
  },
  {
    key: 'ParameterKeys.CardTapActivityClass',
    name: 'Card Tap Activity Class',
    type: 'String',
    description: 'Full canonical Java/Kotlin class name of the host Activity that will display the Tap To Mobile contactless prompt.',
    isRequired: true,
    applicableTo: ['TAP_TO_MOBILE'],
    example: '"com.example.pos.TapToMobileActivity"'
  },
  {
    key: 'ParameterKeys.PlayIntegrityProjectNumber',
    name: 'Play Integrity Cloud Project Number',
    type: 'String',
    description: 'Google Cloud project number configured with the Google Play Integrity API for hardware attestation and anti-tamper verification.',
    isRequired: true,
    applicableTo: ['TAP_TO_MOBILE'],
    example: '"339131890987"'
  },
  {
    key: 'ParameterKeys.ApplicationIdentifier',
    name: 'Application Identifier',
    type: 'String',
    description: 'Unique registered POS application identifier provided by the gateway for tracking and compliance.',
    isRequired: true,
    applicableTo: ['ALL'],
    example: '"MyCompany_RetailPOS_v5"'
  },
  {
    key: 'ParameterKeys.UserReference',
    name: 'User Reference / Invoice #',
    type: 'String',
    description: 'Custom merchant order, invoice, or ticket identifier mapped to the transaction for reconciliation.',
    isRequired: false,
    applicableTo: ['ALL'],
    example: '"INV-2026-0814-001"'
  },
  {
    key: 'ParameterKeys.AutoConfirm',
    name: 'Auto Confirm Transaction',
    type: 'Boolean',
    description: 'When set to true, automatically commits the authorized transaction without waiting for an explicit confirmTransaction() call.',
    isRequired: false,
    applicableTo: ['ALL'],
    defaultValue: 'true',
    example: 'ParameterValues.TRUE'
  }
];

export const SDK_METHODS: SdkMethod[] = [
  {
    name: 'initialize',
    className: 'ChipDnaMobile',
    description: 'Initializes the ChipDnaMobile SDK singleton with your Application Identifier, API keys, and environment settings. Must be called before any device connection or transaction.',
    syntaxKotlin: 'val result = ChipDnaMobile.getInstance().initialize(parameters)',
    syntaxJava: 'Parameters result = ChipDnaMobile.getInstance().initialize(parameters);',
    parameters: [
      { name: 'parameters', type: 'Parameters', description: 'Application ID, API Key, Environment, and configuration properties.' }
    ],
    returnType: 'Parameters',
    callbacks: ['ConfigurationUpdateListener']
  },
  {
    name: 'connectAndConfigure',
    className: 'ChipDnaMobile',
    description: 'Establishes a connection to the selected payment device (or initializes Tap to Mobile CPOC/MPOC) and synchronizes terminal keys, configuration, and firmware.',
    syntaxKotlin: 'ChipDnaMobile.getInstance().connectAndConfigure(parameters)',
    syntaxJava: 'ChipDnaMobile.getInstance().connectAndConfigure(parameters);',
    parameters: [
      { name: 'parameters', type: 'Parameters', description: 'Device model, connection target (MAC/IP), baud rate, and timeout.' }
    ],
    returnType: 'void',
    callbacks: ['ConnectAndConfigureFinishedListener', 'DeviceUpdateListener']
  },
  {
    name: 'startTransaction',
    className: 'ChipDnaMobile',
    description: 'Begins a payment transaction on the connected terminal or Tap to Mobile NFC sensor. Directs the cardholder to present card and enter PIN.',
    syntaxKotlin: 'val startResult = ChipDnaMobile.getInstance().startTransaction(parameters)',
    syntaxJava: 'Parameters startResult = ChipDnaMobile.getInstance().startTransaction(parameters);',
    parameters: [
      { name: 'parameters', type: 'Parameters', description: 'Amount, Currency, TransactionType, Tip, UserReference, and upload modes.' }
    ],
    returnType: 'Parameters',
    callbacks: ['TransactionUpdateListener', 'CardDetailsListener', 'TransactionFinishedListener', 'SignatureVerificationListener']
  },
  {
    name: 'terminateTransaction',
    className: 'ChipDnaMobile',
    description: 'Cancels the active transaction if it has not yet reached irreversible host authorization.',
    syntaxKotlin: 'ChipDnaMobile.getInstance().terminateTransaction(parameters)',
    syntaxJava: 'ChipDnaMobile.getInstance().terminateTransaction(parameters);',
    parameters: [
      { name: 'parameters', type: 'Parameters', description: 'Optional cancellation flags.' }
    ],
    returnType: 'void',
    callbacks: ['TransactionFinishedListener']
  },
  {
    name: 'getStatus',
    className: 'ChipDnaMobile',
    description: 'Retrieves current SDK state, connected terminal battery level, card reader status, and offline queue depth.',
    syntaxKotlin: 'val status = ChipDnaMobile.getInstance().getStatus(parameters)',
    syntaxJava: 'Parameters status = ChipDnaMobile.getInstance().getStatus(parameters);',
    parameters: [
      { name: 'parameters', type: 'Parameters', description: 'Query filter options.' }
    ],
    returnType: 'Parameters',
    callbacks: []
  },
  {
    name: 'processReceipt',
    className: 'ChipDnaMobile',
    description: 'Generates and renders formatted customer and merchant receipt data using the device built-in thermal printer (Axium models) or host printer.',
    syntaxKotlin: 'val receipt = ChipDnaMobile.getInstance().processReceipt(parameters)',
    syntaxJava: 'Parameters receipt = ChipDnaMobile.getInstance().processReceipt(parameters);',
    parameters: [
      { name: 'parameters', type: 'Parameters', description: 'Transaction ID, receipt type (Customer/Merchant), and styling.' }
    ],
    returnType: 'Parameters',
    callbacks: ['ProcessReceiptFinishedListener']
  },
  {
    name: 'getAvailablePaymentDevices',
    className: 'ChipDnaMobile',
    description: 'Scans for nearby paired Bluetooth card readers, local network Axium IP devices, and supported USB peripherals.',
    syntaxKotlin: 'ChipDnaMobile.getInstance().getAvailablePaymentDevices(parameters)',
    syntaxJava: 'ChipDnaMobile.getInstance().getAvailablePaymentDevices(parameters);',
    parameters: [
      { name: 'parameters', type: 'Parameters', description: 'Scan mode (Bluetooth, USB, IP) and scan timeout in seconds.' }
    ],
    returnType: 'void',
    callbacks: ['AvailablePinPadsListener']
  }
];

export interface KnownIssueItem {
  id: number;
  summary: string;
  affectedModels: string;
  status: 'Open' | 'Resolved' | 'Workaround Available';
  workaround: string;
  statusComment: string;
}

export const KNOWN_ISSUES: KnownIssueItem[] = [
  {
    id: 1,
    summary: 'Amount confirmation screen displays $ currency symbol instead of GBP on Axium hardware',
    affectedModels: 'All Axium devices (RX5000, EX-Series, DX-Series)',
    status: 'Open',
    workaround: 'Verify total in host POS application UI before directing customer to terminal. Gateway processes correct ISO 826 currency.',
    statusComment: 'Scheduled for fix in upcoming maintenance release.'
  },
  {
    id: 2,
    summary: 'Offline queue processing restricted to active configured environment',
    affectedModels: 'All Axium devices',
    status: 'Open',
    workaround: 'Do not switch environment (e.g. Staging to Production) while offline stored transactions exist in local database. Flush queue before reconfiguring.',
    statusComment: 'Offline transactions stored under Staging credentials will only flush when connected to Staging.'
  },
  {
    id: 3,
    summary: 'Firmware update attempted during active transaction can cause terminal to hang',
    affectedModels: 'All Axium devices',
    status: 'Workaround Available',
    workaround: 'Configure TMS / firmware download checks during startup or post-settlement windows only. SDK automatically blocks concurrent calls.',
    statusComment: 'Avoid calling requestTmsUpdate() while transaction state != IDLE.'
  },
  {
    id: 4,
    summary: 'Device Setup Application may restart initialization sequence once during initial power-on',
    affectedModels: 'All Axium devices',
    status: 'Open',
    workaround: 'Allow the setup wizard to complete automatically; do not interrupt power during reboot cycle.',
    statusComment: 'Self-heals and completes registration without manual intervention.'
  },
  {
    id: 5,
    summary: 'Payment Devices SDK v5.2.0 incompatible with Transaction Initiator UI v1.2.0',
    affectedModels: 'All Axium devices',
    status: 'Resolved',
    workaround: 'Upgrade all integrations to Payment Devices SDK v5.4.1 Cassiopeia.',
    statusComment: 'Fully resolved in 5.4.1.'
  }
];

export const RELEASE_541_HIGHLIGHTS = [
  {
    title: 'Cloud Commerce SDK 6.9.0 for Tap To Mobile',
    badge: 'Critical Upgrade',
    description: 'Updated the underlying Tap To Mobile engine to Cloud Commerce SDK version 6.9.0. AAR dependencies have been renamed to `cloud-commerce-sdk-debug-6.9.0.aar` and `cloud-commerce-sdk-release-6.9.0.aar`.'
  },
  {
    title: 'SLF4J & Logback Mandatory Dependencies',
    badge: 'Dependency Change',
    description: 'Tap To Mobile integrations using the `full` build flavour must now declare Logback (`ch.qos.logback:logback-classic:1.5.32`) and SLF4J (`org.slf4j:slf4j-api:2.0.18`) in `build.gradle`.'
  },
  {
    title: 'New OfflineTransactionUploadMode ParameterKey',
    badge: 'API Addition',
    description: 'Added `ParameterKeys.OfflineTransactionUploadMode` to give merchants fine-grained control over Store & Forward queuing (`StoreAndForward`, `UploadImmediate`, `OfflineOnly`).'
  },
  {
    title: 'Enhanced Axium Thermal Printer Controls',
    badge: 'SmartPOS',
    description: 'Direct hooks for paper-out detection, graphic logo caching in terminal NVRAM, and double-byte font support for international receipts on DX8000/DX4000.'
  },
  {
    title: 'Android 14 Target SDK 34 Bluetooth Permissions',
    badge: 'Compliance',
    description: 'Refined runtime permission handling for `BLUETOOTH_SCAN`, `BLUETOOTH_CONNECT`, and high-precision location requirements on Android 13/14 host tablets.'
  }
];

export type DeviceModel =
  | 'AXIUM_DX8000'
  | 'AXIUM_DX4000'
  | 'AXIUM_EX8000'
  | 'AXIUM_EX6000'
  | 'AXIUM_EX4000'
  | 'AXIUM_RX5000'
  | 'TAP_TO_MOBILE'
  | 'IDTECH_VP3350'
  | 'BBPOS_CHIPPER_3X';

export type ConnectionType = 'BLUETOOTH' | 'USB' | 'WIFI_IP' | 'ON_DEVICE_NFC';

export type TransactionType =
  | 'SALE'
  | 'AUTH_ONLY'
  | 'CAPTURE'
  | 'REFUND'
  | 'LINKED_REFUND'
  | 'VOID'
  | 'BALANCE_INQUIRY'
  | 'ACCOUNT_VERIFICATION';

export type CardEntryMode = 'CONTACTLESS_NFC' | 'EMV_CHIP' | 'MAGSTRIPE' | 'MANUAL_PAN';

export type OfflineUploadMode = 'OFFLINE_ONLY' | 'UPLOAD_IMMEDIATE' | 'STORE_AND_FORWARD';

export type CvmMode = 'PIN' | 'SIGNATURE' | 'NO_CVM' | 'PIN_ON_GLASS' | 'CONSUMER_DEVICE_CVM';

export type TransactionStage =
  | 'IDLE'
  | 'INITIALIZING'
  | 'WAITING_FOR_CARD'
  | 'CARD_DETECTED'
  | 'READING_CHIP'
  | 'REQUESTING_PIN'
  | 'PIN_ENTERED'
  | 'REQUESTING_SIGNATURE'
  | 'ONLINE_AUTHORIZING'
  | 'OFFLINE_AUTHORIZING'
  | 'PRINTING_RECEIPT'
  | 'APPROVED'
  | 'DECLINED'
  | 'FAILED'
  | 'TERMINATED';

export interface SdkParameter {
  key: string;
  name: string;
  type: string;
  description: string;
  isRequired: boolean;
  isNewIn541?: boolean;
  applicableTo: ('SMART_POS' | 'TAP_TO_MOBILE' | 'ALL')[];
  defaultValue?: string;
  example: string;
  allowedValues?: string[];
}

export interface SdkMethod {
  name: string;
  className: string;
  description: string;
  syntaxKotlin: string;
  syntaxJava: string;
  parameters: { name: string; type: string; description: string }[];
  returnType: string;
  callbacks: string[];
}

export interface EventCallbackLog {
  id: string;
  timestamp: string;
  callbackName: string;
  eventPayload: Record<string, any>;
  level: 'info' | 'success' | 'warning' | 'error';
}

export interface ReceiptData {
  merchantName: string;
  merchantAddress: string;
  merchantId: string;
  terminalId: string;
  transactionType: string;
  amount: string;
  tipAmount?: string;
  surchargeAmount?: string;
  totalAmount: string;
  currency: string;
  cardScheme: string;
  maskedPan: string;
  cardEntryMode: CardEntryMode;
  authCode: string;
  transactionId: string;
  referenceNumber: string;
  cvmMode: CvmMode;
  aid?: string;
  tvr?: string;
  tsi?: string;
  dateTime: string;
  status: 'APPROVED' | 'DECLINED' | 'VOIDED';
}

export interface PdfDocument {
  id: string;
  title: string;
  category: 'API' | 'SmartPOS' | 'Tap to Mobile' | 'Release Notes' | 'Hardware';
  fileName: string;
  downloadUrl: string;
  pages: number;
  size: string;
  date: string;
  description: string;
}

export interface DeviceInfo {
  id: DeviceModel;
  name: string;
  manufacturer: string;
  category: 'Axium SmartPOS' | 'Tap To Mobile' | 'Mobile Reader';
  screen: string;
  printer: boolean;
  pinPad: string;
  connectionMethods: string[];
  battery: string;
  description: string;
  imageHint: string;
}


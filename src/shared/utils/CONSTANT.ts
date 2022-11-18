export const ProcessorStatus = {
  Succeeded: 'Succeeded',
  Processing: 'Processing',
  Failed: 'Failed'
};
export const WalletLevel = {
  Limited: 'Limited',
  Confirmed: 'Confirmed'
};

export const WalletCurrency = {
  VND: 'VND',
  USD: 'USD'
};
export const TransactionType = {
  Authorize: 'Authorize',
  Capture: 'Capture',
  Topup: 'Topup',
  Purchase: 'Purchase'
};

export const TransactionStatus = {
  Success: 'Success',
  Processing: 'Processing',
  Cancel: 'Cancel',
  Error: 'Error'
};
export const PaymentMethod = {
  Wallet: 'Walet',
  Card: 'Card'
};

export const PaymentSubMethod = {
  TraletWallet: 'TraletWallet',
  CreditCard: 'CreditCard'
};
export const ReferenceType = {
  Topup: 'Topup',
  FoodOrder: 'FoodOrder'
};

export const NamespacesPolicies: any = {
  TraletAdmins: 'tralet-admins',
  TraletMerchantAdmins: 'tralet-merchant-admins',
  TraletMerchantMembers: 'tralet-merchant-members',
  TraletCustomer: 'tralet-customers'
};

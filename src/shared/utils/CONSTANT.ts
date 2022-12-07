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

export const PHONE_REGEX =
/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/

export const NAME_REGEX =
/[^a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u

export const EMAIL_REGEX =
  /^(([^<>()[\]\.,;!_:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
export const EMAIL_REGEX_2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const SCREEN_WIDTH = window.screen.width

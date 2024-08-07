export type User = {
  username: string;
  email: string;
  password: string;
};

export type UpdatedUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  isAdmin: boolean;
  city: string;
  state: string;
  address: string;
  mobileNumber: string;
};

export type Store = {
  _id: string;
  isApproved: boolean;
  status: "pending" | "approved" | "rejected";
  license?: string;
  ownerLivePicture?: string;
  ownerId: string;
  ownerName: string;
  storeName: string;
  address: string;
  state: string;
  city: string;
  imageUrl: string;
  mobileNumber: string;
  rejectionReasons?: string[];
};

export type MedicalStores = {
  data: Store[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type Order = {
  _id: string;
  storeId: string;
  userId: string;
  storeName: string;
  orderedBy: string; //userName
  userProfile: string;
  customerMobileNumber: string;
  prescriptionImage: string;
  prescription: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryAddress: string;
  isOrderPlaced: boolean;
  isOrderOutOffStock: boolean;
  createdAt: Date;
};

export type StoreDetails = {
  storeName: string;
  storeImage: string;
};

export type OrderOwners = {
  totalOrders: number;
  storeDetails: StoreDetails;
  orders: Order[];
};

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
  ownerId: string;
  ownerName: string;
  storeName: string;
  address: string;
  state: string;
  city: string;
  imageUrl: string;
  mobileNumber: string;
};

export type MedicalStores = {
  data: Store[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

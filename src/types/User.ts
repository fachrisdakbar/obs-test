export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    city: string;
  };
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
  street: string;
  city: string;
}
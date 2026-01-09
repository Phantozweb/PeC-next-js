export type User = {
  email: string;
  role: 'admin' | 'user';
};

export type Feedback = {
  id: string;
  sNo: number;
  deliveryDate: Date;
  customerName: string;
  phone: string;
  calledBy: string;
  salesmanComment: string;
};

export type Employee = {
  id: string;
  name: string;
};

export type AppSettings = {
    logoUrl: string;
    whatsappTemplate: string;
    employees: Employee[];
}

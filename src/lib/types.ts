export interface User {
  email: string;
  role: 'admin' | 'user';
}

export interface Feedback {
  id: string;
  sNo: number;
  deliveryDate: Date;
  customerName: string;
  phone: string;
  calledBy: string;
  comments: string;
  status: 'Pending' | 'Completed' | 'Follow-up';
}

export interface Employee {
  id: string;
  name: string;
}

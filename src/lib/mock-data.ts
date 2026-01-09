import type { Feedback, Employee } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Janarthan Veeramani' },
  { id: '2', name: 'Kunal' },
  { id: '3', name: 'Sales Person A' },
  { id: '4', name: 'Sales Person B' },
];

export const MOCK_FEEDBACK_DATA: Feedback[] = [
  {
    id: 'fb1',
    sNo: 1,
    deliveryDate: new Date('2024-07-10'),
    customerName: 'Aarav Sharma',
    phone: '9876543210',
    calledBy: 'Janarthan Veeramani',
    salesmanComment: 'Customer is very happy with the new lenses. Mentioned the clarity is excellent.',
  },
  {
    id: 'fb2',
    sNo: 2,
    deliveryDate: new Date('2024-07-11'),
    customerName: 'Saanvi Gupta',
    phone: '9876543211',
    calledBy: 'Kunal',
    salesmanComment: 'Customer had a slight issue with the frame fitting, but it was resolved quickly. Satisfied overall.',
  },
  {
    id: 'fb3',
    sNo: 3,
    deliveryDate: new Date('2024-07-11'),
    customerName: 'Vivaan Singh',
    phone: '9876543212',
    calledBy: 'Janarthan Veeramani',
    salesmanComment: 'No complaints. Customer is a returning client and is happy as always.',
  },
  {
    id: 'fb4',
    sNo: 4,
    deliveryDate: new Date('2024-07-12'),
    customerName: 'Myra Patel',
    phone: '9876543213',
    calledBy: 'Sales Person A',
    salesmanComment: 'Customer asked about our subscription plans. Potential upsell opportunity for contact lenses.',
  },
    {
    id: 'fb5',
    sNo: 5,
    deliveryDate: new Date('2024-07-13'),
    customerName: 'Advik Kumar',
    phone: '9876543214',
    calledBy: 'Sales Person B',
    salesmanComment: 'The anti-glare coating is working wonders for his long screen time. Very positive feedback.',
  },
  {
    id: 'fb6',
    sNo: 6,
    deliveryDate: new Date('2024-07-15'),
    customerName: 'Ananya Reddy',
    phone: '9876543215',
    calledBy: 'Janarthan Veeramani',
    salesmanComment: 'Customer was initially hesitant about the price but now feels it was worth it. Great experience.',
  },
];

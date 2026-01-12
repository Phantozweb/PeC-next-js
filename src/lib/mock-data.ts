import { Feedback, Employee } from './types';

const now = new Date();

export const MOCK_FEEDBACK_DATA: Feedback[] = [
  {
    id: 'fb1',
    sNo: 1,
    deliveryDate: new Date(now.setDate(now.getDate() - 1)),
    customerName: 'Aarav Sharma',
    phone: '9876543210',
    calledBy: 'Priya Patel',
    comments: 'Customer satisfied with the new spectacles.',
    status: 'Completed',
  },
  {
    id: 'fb2',
    sNo: 2,
    deliveryDate: new Date(now.setDate(now.getDate() - 2)),
    customerName: 'Saanvi Gupta',
    phone: '8765432109',
    calledBy: 'Amit Singh',
    comments: 'Wants to exchange the frame.',
    status: 'Follow-up',
  },
  {
    id: 'fb3',
    sNo: 3,
    deliveryDate: new Date(now.setDate(now.getDate() - 3)),
    customerName: 'Vivaan Reddy',
    phone: '7654321098',
    calledBy: 'Priya Patel',
    comments: 'No answer.',
    status: 'Pending',
  },
  {
    id: 'fb4',
    sNo: 4,
    deliveryDate: new Date(now.setDate(now.getDate() - 4)),
    customerName: 'Diya Mehta',
    phone: '6543210987',
    calledBy: 'Rohit Verma',
    comments: 'Happy with the service, will recommend.',
    status: 'Completed',
  },
  {
    id: 'fb5',
    sNo: 5,
    deliveryDate: new Date(now.setDate(now.getDate() - 5)),
    customerName: 'Arjun Kumar',
    phone: '9012345678',
    calledBy: 'Amit Singh',
    comments: 'Follow-up for lens adjustment.',
    status: 'Follow-up',
  },
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'emp1', name: 'Priya Patel' },
  { id: 'emp2', name: 'Amit Singh' },
  { id: 'emp3', name: 'Rohit Verma' },
  { id: 'emp4', name: 'Sunita Rao' },
];

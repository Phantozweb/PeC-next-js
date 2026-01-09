'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Feedback } from '@/lib/types';
import { Button } from '../ui/button';
import { MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

type DataTableProps = {
  data: Feedback[];
};

export function DataTable({ data }: DataTableProps) {
  
  const handleSendWhatsApp = (phone: string, customerName: string) => {
    const message = `Hello ${customerName}, thank you for choosing Lensbox. We hope you are enjoying your new lenses!`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">S.No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Called By</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sNo}</TableCell>
                  <TableCell>
                    <div className="font-medium">{item.customerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.phone}
                    </div>
                  </TableCell>
                  <TableCell>{item.calledBy}</TableCell>
                  <TableCell>{format(item.deliveryDate, 'PPP')}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSendWhatsApp(item.phone, item.customerName)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No feedback yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

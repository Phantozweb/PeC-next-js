'use client';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Stats } from '@/components/dashboard/stats';
import { DataTable } from '@/components/dashboard/data-table';
import { FeedbackForm } from '@/components/dashboard/feedback-form';
import { useState } from 'react';
import { MOCK_FEEDBACK_DATA, MOCK_EMPLOYEES } from '@/lib/mock-data';
import type { Feedback, Employee } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>(MOCK_FEEDBACK_DATA);
  const [employees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [isFormOpen, setFormOpen] = useState(false);
  const { user } = useAuth();

  const addFeedback = (newFeedback: Omit<Feedback, 'id' | 'sNo'>) => {
      const newEntry: Feedback = {
        ...newFeedback,
        id: `fb${Date.now()}`,
        sNo: feedbackData.length + 1,
      };
      setFeedbackData(prev => [newEntry, ...prev]);
      setFormOpen(false);
    };

    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
            <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Feedback
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="font-headline">Add New Feedback</DialogTitle>
                </DialogHeader>
                <FeedbackForm
                  employees={employees}
                  onSubmit={addFeedback}
                />
              </DialogContent>
            </Dialog>
          </div>

          <Stats feedbackData={feedbackData} />

          <div className="grid grid-cols-1 gap-6">
            <div className="lg:col-span-3">
              <DataTable data={feedbackData} />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

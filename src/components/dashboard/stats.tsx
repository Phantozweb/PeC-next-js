'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Feedback } from '@/lib/types';
import { BarChart, Phone, Users } from 'lucide-react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '../ui/chart';
import { useMemo } from 'react';
import { format, parseISO, startOfDay } from 'date-fns';

type StatsProps = {
  feedbackData: Feedback[];
};

export function Stats({ feedbackData }: StatsProps) {
  const totalCalls = feedbackData.length;

  const callsByEmployee = useMemo(() => {
    const counts = feedbackData.reduce((acc, call) => {
      acc[call.calledBy] = (acc[call.calledBy] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, calls]) => ({ name, calls }));
  }, [feedbackData]);

  const callsOverTime = useMemo(() => {
    const counts = feedbackData.reduce((acc, call) => {
      const day = format(startOfDay(call.deliveryDate), 'yyyy-MM-dd');
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([date, calls]) => ({ date, calls }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [feedbackData]);

  const chartConfig: ChartConfig = {
    calls: {
      label: 'Calls',
      color: 'hsl(var(--primary))',
    },
  };
    
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];


  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              Total feedback calls logged
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(feedbackData.map((c) => c.phone)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique customers contacted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                feedbackData.filter(
                  (call) =>
                    startOfDay(call.deliveryDate).getTime() ===
                    startOfDay(new Date()).getTime()
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Calls logged today
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Calls by Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64 w-full">
              <ResponsiveContainer>
                <RechartsPieChart>
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie data={callsByEmployee} dataKey="calls" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="hsl(var(--primary))">
                    {callsByEmployee.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Calls Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <RechartsBarChart data={callsOverTime}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => format(parseISO(value), "MMM d")}
                  />
                  <YAxis />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="calls" fill="var(--color-calls)" radius={4} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

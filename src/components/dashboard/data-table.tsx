'use client';

import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Feedback } from '@/lib/types';

interface DataTableProps {
  data: Feedback[];
}

export const columns: ColumnDef<Feedback>[] = [
  { accessorKey: 'sNo', header: 'S.No' },
  {
    accessorKey: 'deliveryDate',
    header: 'Date of Delivery',
    cell: ({ row }) => new Date(row.original.deliveryDate).toLocaleDateString(),
  },
  { accessorKey: 'customerName', header: 'Name of Customer' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'calledBy', header: 'Called By' },
  { accessorKey: 'comments', header: 'Comments' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={cn({
            'bg-yellow-200 text-yellow-900': status === 'Pending',
            'bg-green-200 text-green-900': status === 'Completed',
            'bg-blue-200 text-blue-900': status === 'Follow-up',
          })}
        >
          {status}
        </Badge>
      );
    },
  },
];

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="font-headline text-2xl font-bold">Recent Feedback</h3>
        <p className="text-sm text-muted-foreground">
          Overview of the latest customer interactions.
        </p>
        <Input
          placeholder="Filter by customer name..."
          value={(table.getColumn('customerName')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('customerName')?.setFilterValue(event.target.value)
          }
          className="mt-4 max-w-sm"
        />
      </div>
      <div className="border-t">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

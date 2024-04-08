import type { ColumnDef } from '@tanstack/react-table';
import { Divide, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Tooltip from '@/components/Tooltip/index';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export type Employee = {
  id: string;
  fullName: string;
  userName: string;
  workAuth: {
    title: string;
    startDate: string;
    endDate: string;
    remainingDays: number;
  };
  nextStep: string;

  visa: {
    opt_receipt: string;
    opt_ead: string;
    i983: string;
    i20: string;
  };
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'fullName',
    header: () => <div className="text-center my-0">Employee Name</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.fullName}</div>;
    },
  },

  {
    accessorKey: 'userName',
    header: () => <div className="text-center my-6">User Name</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.userName}</div>;
    },
  },

  {
    accessorKey: 'workAuth',
    header: () => <div className="text-center my-0">Work Authorization</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <div className="flex flex-col justify-center px-1 w-30 border-l-2">
            <div>
              <span>Title: {row.original.workAuth.title}</span>
            </div>
            <div>
              <span>Remaining Days: {row.original.workAuth.remainingDays}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center w-40 px-1 border-l-2">
            <div>
              <span>Start Date: {row.original.workAuth.startDate}</span>
            </div>
            <div>
              <span>End Date: {row.original.workAuth.endDate}</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'nextStep',
    header: () => <div className="text-center my-0">Next Step</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.nextStep}</div>;
    },
  },

  {
    id: 'preview',
    header: () => <div className="text-center my-0">Documents</div>,
    cell: ({ row }) => {
      const visaData = row.original.visa;

      const hasDocuments = Object.entries(visaData).map(([key, value]) => {
        const fileUrl = `/visa/${row.original.id}/${key}`;
        const downloadFile = () => {
          alert('Downloaded');
        };
        const previewFile = () => {
          // if (fileUrl) {
          //   window.open(fileUrl, '_blank');
          // }

          alert('Preview');
        };

        if (value !== 'Unsubmitted') {
          return (
            <div key={key} className="flex flex-col m-2 gap-2">
              <DropdownMenuSeparator />
              {key} : {value}
              <div className="flex gap-2">
                <Button variant="outline" onClick={previewFile}>
                  <DropdownMenuItem>Preview</DropdownMenuItem>
                </Button>

                <Button variant="outline" onClick={downloadFile}>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                </Button>
              </div>
            </div>
          );
        }
      });

      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Doc Status & Actions</DropdownMenuLabel>
              {Object.values(visaData).every(
                value => value === 'Unsubmitted',
              ) ? (
                <div className="p-2">
                  <DropdownMenuSeparator />
                  No Available Document for Preview
                </div>
              ) : (
                hasDocuments
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

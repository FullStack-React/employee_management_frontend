import type { ColumnDef } from '@tanstack/react-table';
import { handleNextStep } from '../functions';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export type Employee = {
  id: string;
  fullName: string;
  preferredName: string;
  visaTitle: string;
  visaStartDate: string;
  visaEndDate: string;
  optReceipt: {
    feedback: string;
    url: string;
    status: string;
  };
  optEad: {
    feedback: string;
    url: string;
    status: string;
  };
  i983: {
    feedback: string;
    url: string;
    status: string;
  };
  i20: {
    feedback: string;
    url: string;
    status: string;
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
    accessorKey: 'preferredName',
    header: () => <div className="text-center my-6">Preferred Name</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.preferredName}</div>;
    },
  },

  {
    accessorKey: 'workAuth',
    header: () => <div className="text-center my-0">Work Authorization</div>,
    cell: ({ row }) => {
      function formatDate(date: Date) {
        // Get month, day, and year
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const day = date.getDate();
        const year = date.getFullYear();

        // Format the date as "MM-DD-YYYY"
        const formattedDate = `${month}-${day}-${year}`;

        return formattedDate;
      }

      const startDate = new Date(row.original.visaStartDate);
      const endDate = new Date(row.original.visaEndDate);
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const now = new Date();

      const differenceMs = endDate.getTime() - now.getTime();
      const remainingDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

      return (
        <div className="flex justify-center">
          <div className="flex flex-col justify-center px-1 w-30 border-l-2">
            <div>
              <span>Title: {row.original.visaTitle}</span>
            </div>
            <div>
              <span>Remaining Days: {remainingDays}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center w-40 px-1 border-l-2">
            <div>
              <span>Start Date: {formattedStartDate} </span>
            </div>
            <div>
              <span>End Date: {formattedEndDate} </span>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: 'next',
    header: () => <div className="text-center my-6">Next Step</div>,
    cell: ({ row }) => {
      const next = handleNextStep(row.original);

      return <div className="text-center">{next}</div>;
    },
  },

  {
    id: 'preview',
    header: () => <div className="text-center my-0">Documents</div>,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const visaData = [
        row.original.optReceipt,
        row.original.optEad,
        row.original.i983,
        row.original.i20,
      ];
      const visa = ['OPT Receipt', 'OPT EAD', 'I-983', 'I-20'];
      const status = [
        row.original.optReceipt.status,
        row.original.optEad.status,
        row.original.i983.status,
        row.original.i20.status,
      ];

      async function createBlobUrlFromUrl(url: string): Promise<string> {
        try {
          // Fetch the resource at the URL
          const response = await fetch(url);

          // Get the response data as a Blob
          const blob = await response.blob();

          // Create a Blob URL from the Blob
          const blobUrl = URL.createObjectURL(blob);

          return blobUrl;
        } catch (error) {
          console.error('Error fetching or creating Blob URL:', error);
          throw error;
        }
      }

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [blobUrls, setBlobUrls] = useState<string[]>([]);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        // Loop through visaData and fetch Blob URLs
        visaData.forEach((doc, index) => {
          if (doc.status !== 'unsubmitted' && doc.status !== 'rejected') {
            createBlobUrlFromUrl(doc.url).then(blobUrl => {
              // Update blobUrls state with the new Blob URL
              setBlobUrls(prevBlobUrls => [...prevBlobUrls, blobUrl]);
            });
          }
        });
      }, [visaData]); // Empty dependency array ensures the effect runs only once

      // eslint-disable-next-line array-callback-return
      const hasDocuments = visaData.map((doc, index) => {
        if (doc.status !== 'unsubmitted' && doc.status !== 'rejected') {
          return (
            <div key={index} className="flex flex-col m-2 gap-2">
              <DropdownMenuSeparator />
              {visa[index]} : {doc.status}
              <div className="flex gap-2">
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <DropdownMenuItem>Preview</DropdownMenuItem>
                  </Button>
                </a>
                <a
                  href={blobUrls[index]}
                  download={blobUrls[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <DropdownMenuItem>Download</DropdownMenuItem>
                  </Button>
                </a>
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
              {status.every(s => s === 'unsubmitted') ? (
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

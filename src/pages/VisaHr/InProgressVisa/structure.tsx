import type { ColumnDef } from '@tanstack/react-table';
import type { Employee } from '../allVisa/structure';
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
import { Textarea } from '@/components/ui/textarea';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { handleApolloError } from '@/utils/error';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from '@/features/auth/AuthSlice';

const GIVE_FEEDBACK = gql`
  mutation VisaFeedback(
    $id: String!
    $doc: String!
    $feedback: String!
    $status: String!
  ) {
    visaFeedback(id: $id, doc: $doc, feedback: $feedback, status: $status) {
      api
      type
      status
      message
    }
  }
`;

const SEND_NOTIFICATION = gql`
  mutation SendVisaDocNotification($userId: String!) {
    sendVisaDocNotification(userId: $userId) {
      api
      type
      status
      message
    }
  }
`;

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'fullName',
    header: () => <div className="text-center my-0">Employee Name</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.fullName}</div>;
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
    id: 'actions',
    header: () => <div className="text-center my-0">Action List</div>,
    cell: ({ row }) => {
      const next = handleNextStep(row.original);

      // findout the document that needs to be approved
      let doc = { url: '', feedback: '', status: '' };
      let docName = '';
      if (next === 'OPT Receipt: wait for HR approval') {
        doc = row.original.optReceipt;
        docName = 'optReceipt';
      } else if (next === 'OPT EAD: wait for HR approval') {
        doc = row.original.optEad;
        docName = 'optEad';
      } else if (next === 'I-983: wait for HR approval') {
        doc = row.original.i983;
        docName = 'i983';
      } else if (next === 'I-20: wait for HR approval') {
        doc = row.original.i20;
        docName = 'i20';
      }

      // Define the useMutation hook to execute the mutation
      const [giveFeedback] =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useMutation(GIVE_FEEDBACK, {
          onCompleted: () => {
            toast({
              title: 'Document',
              description: 'Document review result sent successfully',
              duration: 5000,
            });
          },
          onError: handleApolloError(
            <ToastAction
              altText="Try Again"
              onClick={() => window.location.reload()}
            >
              Error review. Try again.
            </ToastAction>,
          ),
        });

      const [sendNotification] =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useMutation(SEND_NOTIFICATION, {
          onCompleted: () => {
            toast({
              title: 'Notification',
              description: 'Notification sent successfully',
              duration: 5000,
            });
          },
          onError: handleApolloError(
            <ToastAction
              altText="Try Again"
              onClick={() => window.location.reload()}
            >
              Error sending notification. Try again.
            </ToastAction>,
          ),
        });

      const handleNotification = async () => {
        await sendNotification({
          variables: {
            token,
            userId: row.original.id,
          },
        });
        // window.location.reload();
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const token = useAppSelector(selectToken);

      const handleApprove = async () => {
        await giveFeedback({
          variables: {
            token,
            id: row.original.id,
            doc: docName,
            feedback: '',
            status: 'approved',
          },
        });
        window.location.reload();
      };
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [feedback, setFeedback] = useState<string>('');

      const handleFeedback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedback(e.target.value);
      };

      const handleReject = async () => {
        await giveFeedback({
          variables: {
            token,
            id: row.original.id,
            doc: docName,
            feedback: `${feedback}`,
            status: 'rejected',
          },
        });
        window.location.reload();
      };

      if (next?.includes('Submit')) {
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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleNotification}
                >
                  Send Notification
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      } else if (next?.includes('approval')) {
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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">
                  <a
                    href={`${doc.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preview Documents
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="flex flex-col">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleApprove}
                  >
                    Approve
                  </DropdownMenuItem>
                  <div className="flex items-center">
                    <Textarea
                      placeholder="Give some feedback for reject"
                      value={feedback}
                      onChange={handleFeedback}
                    />
                    <Button
                      className="ml-2"
                      variant="outline"
                      onClick={handleReject}
                    >
                      <DropdownMenuItem>Reject</DropdownMenuItem>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      } else {
        return <div className="text-center">No Action Available</div>;
      }
    },
  },
];

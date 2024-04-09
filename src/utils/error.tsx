import type { ToastActionElement } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import type { ApolloError } from '@apollo/client';

export const handleApolloError =
  (action?: ToastActionElement) => (error: ApolloError) => {
    console.log('error', error);
    if (error.networkError) {
      toast({
        variant: 'destructive',
        title: 'Network Error',
        description: error.networkError.message,
        duration: 5000,
        action: action,
      });
    } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const errorMessages = error.graphQLErrors.reduce(
        (acc: String[], error) => {
          acc = [...acc, error.message];
          return acc;
        },
        [],
      );
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessages.join('\n'),
        duration: 5000,
        action: action,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred',
        duration: 5000,
        action: action,
      });
    }
  };

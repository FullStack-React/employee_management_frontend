import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { handleFileChange } from '@/utils/file';
import { useMutation } from '@apollo/client';
import { UPDATE_VISA } from './gql';
import { handleApolloError } from '@/utils/error';
import { Loader2 } from 'lucide-react';

interface FileInputProps {
  title: string;
  setFile: (file: File | null) => void;
  setUri: (uri: string) => void;
  setData: (data: any) => void;
  token: string;
  fileType: string;
  uri: string;
}

export const FileInput = (props: FileInputProps) => {
  const [update, { loading }] = useMutation(UPDATE_VISA, {
    onCompleted: data => {
      console.log(data);
      window.location.reload();
    },
    onError: handleApolloError(),
  });
  return (
    <div className="flex my-5 justify-between w-full">
      <div className="flex flex-col w-1/2">
        <Label className="my-1 text-md font-semibold">{props.title}</Label>
        <Input
          onChange={handleFileChange(
            500000000,
            props.setFile,
            (_: string, uri: string) => {
              props.setUri(uri);
            },
            '',
            props.token,
          )}
          type="file"
          accept="application/pdf"
        />
        <Button
          type="button"
          className="w-1/3 my-2"
          onClick={() => {
            update({
              variables: {
                fileType: props.fileType,
                uri: props.uri,
                token: props.token,
              },
            });
          }}
        >
          {loading && <Loader2 className="animate-spin mr-2" />}
          Upload
        </Button>
      </div>
    </div>
  );
};

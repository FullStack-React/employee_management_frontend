import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

export const handleFileChange =
  (
    fileLimit: number,
    setFile: (file: File | null) => void,
    setFieldValue: (field: string, url: string) => void,
    field: string,
    token: string,
  ) =>
  (e: any) => {
    e.preventDefault();
    const kb = fileLimit / 1000;
    const mb = kb / 1000;
    if (e.target.files.length > 0) {
      if (e.target.files[0].size > fileLimit) {
        toast({
          variant: 'destructive',
          description: `File size exceeds ${kb > 1 ? `${kb}KB` : `${mb}MB`}`,
          duration: 5000,
        });
      } else {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        axios
          .post('http://localhost:4000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-auth-token': token,
            },
          })
          .then(res => {
            const file = res.data.file;
            const url = `http://localhost:4000/${file.filename}`;
            setFile(e.target.files[0]);
            setFieldValue(field, url);
            toast({
              title: 'File uploaded',
              description: 'File uploaded successfully',
              duration: 5000,
            });
          })
          .catch(err => {
            toast({
              title: 'Error',
              variant: 'destructive',
              description:
                err.response.data.message || err.response.data || err.message,
              duration: 5000,
            });
          });
      }
    } else {
      setFile(null);
      setFieldValue(field, 'https://github.com/shadcn.png');
    }
  };

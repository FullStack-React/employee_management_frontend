import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

export const valuesToVariables = (values: any) => {
  return {
    avatar: values.avatar,
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    preferredName: values.preferredName,
    streetAddress: values.street,
    apartment: values.apt,
    city: values.city,
    state: values.state,
    zip: values.zip,
    email: values.email,
    cellPhone: values.phone,
    ssn: values.ssn,
    dateOfBirth: values.dateOfBirth.getTime(),
    gender: values.gender,
    citizenship: values.citizen,
    identity: values.identity,
    visa: values.visa,
    startDate: values.startDate?.getTime(),
    endDate: values.endDate?.getTime(),
    visaType: values.visaType,
    optReceipt: values.receipt,
    referralFirstName: values.referenceFirstName,
    referralMiddleName: values.referenceMiddleName,
    referralLastName: values.referenceLastName,
    referralEmail: values.referenceEmail,
    referralPhone: values.referencePhone,
    referralRelationship: values.referenceRelationship,
    emergencyContacts: values.emergencyContact.map((contact: any) => ({
      firstName: contact.firstName,
      middleName: contact.middleName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      relationship: contact.relationship,
    })),
  };
};

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

import Section from './section';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';
import { UPDATE_CONTACT_SECTION } from './gql';
import { handleApolloError } from '@/utils/error';

interface ContactSectionProps {
  initialValues: {
    cellPhone: string;
    workPhone: string;
  };
  token: string;
}

const validationSchema = object({
  cellPhone: string()
    .matches(/^\d{10}$/, 'Invalid phone number')
    .required('Cell Phone is required'),
  workPhone: string().matches(/^\d{10}$/, 'Invalid phone number'),
});

const ContactSection = (props: ContactSectionProps) => {
  const [editable, setEditable] = useState(false);

  const [update, { loading }] = useMutation(UPDATE_CONTACT_SECTION, {
    onCompleted: data => {
      console.log(data);
    },
    onError: handleApolloError(),
  });

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values);
      update({ variables: { token: props.token, data: values } });
    },
  });

  return (
    <Section
      editable={editable}
      title="Contact"
      loading={loading}
      onCancel={() => {
        toast({
          description: 'Discard Changes?',
          action: (
            <ToastAction
              altText="Yes"
              onClick={() => {
                formik.setValues(props.initialValues);
                setEditable(false);
              }}
            >
              Yes
            </ToastAction>
          ),
        });
      }}
      onEdit={() => setEditable(true)}
      onSubmit={e => {
        e.preventDefault();
        formik.handleSubmit();
        setEditable(false);
      }}
    >
      <div className="flex my-5 justify-between w-full">
        <div className="flex flex-col w-2/5">
          <Label className="my-1 text-md font-semibold">Cell Phone</Label>
          <Input
            name="cellPhone"
            value={formik.values.cellPhone}
            onChange={formik.handleChange}
            type="text"
            placeholder="Cell Phone"
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.touched.cellPhone && formik.errors.cellPhone}
          </p>
        </div>
        <div className="flex flex-col w-2/5">
          <Label className="my-1 text-md font-semibold">Work Phone</Label>
          <Input
            name="workPhone"
            value={formik.values.workPhone}
            onChange={formik.handleChange}
            type="text"
            placeholder="Work Phone"
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.touched.workPhone && formik.errors.workPhone}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;

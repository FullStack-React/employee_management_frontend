import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/datepicker';
import { Combobox } from '@/components/ui/combobox';
import { useState } from 'react';
import Section from './section';
import { visaTypes } from '../Onborading/options';
import { useFormik } from 'formik';
import { date, object, string, ref } from 'yup';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useMutation } from '@apollo/client';
import { UPDATE_EMPLOYMENT_SECTION } from './gql';
import { handleApolloError } from '@/utils/error';

interface EmploymentSectionProps {
  initialValues: {
    visa: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  token: string;
  citizenship: string;
}

const valuesToVariables = (values: any) => {
  return {
    visaType: values.visa,
    visaStartDate: values.startDate?.getTime(),
    visaEndDate: values.endDate?.getTime(),
  };
};

const validationSchema = object({
  visa: string().required('Visa is required'),
  startDate: date().required('Start Date is required'),
  endDate: date()
    .min(ref('startDate'), 'End Date must be after Start Date')
    .required('End Date is required'),
});

const EmploymentSection = (props: EmploymentSectionProps) => {
  const [editable, setEditable] = useState(false);
  const clickable = props.citizenship === 'no';
  const [visaOpen, setVisaOpen] = useState(false);

  const [update, { loading }] = useMutation(UPDATE_EMPLOYMENT_SECTION, {
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
      update({
        variables: {
          token: props.token,
          data: {
            ...valuesToVariables(values),
            citizenship: props.citizenship,
          },
        },
      });
    },
  });

  return (
    <Section
      editable={editable}
      loading={loading}
      title="Employment"
      clickable={clickable}
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
      onEdit={() => setEditable(!editable)}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex my-5 justify-between items-end w-full">
        <div className="flex flex-col w-2/5">
          <Label className="my-1 text-md font-semibold">Visa Title</Label>
          <Combobox
            open={visaOpen}
            value={formik.values.visa}
            buttonText="What is your work authorization?"
            options={visaTypes}
            disabled={!editable}
            onOpenChange={setVisaOpen}
            onSelect={currentValue => {
              formik.setFieldValue(
                'visa',
                currentValue === formik.values.visa ? '' : currentValue,
              );
              setVisaOpen(false);
            }}
          />
          <p className="text-red-600 text-sm">
            {formik.touched.visa && formik.errors.visa}
          </p>
        </div>
        <div className="flex flex-col w-1/5">
          <Label className="my-1 text-md font-semibold">Start Date</Label>
          <DatePicker
            value={formik.values.startDate}
            onSelect={(date: Date | undefined) => {
              formik.setFieldValue('startDate', date);
            }}
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.touched.startDate && formik.errors.startDate}
          </p>
        </div>
        <div className="flex flex-col w-1/5">
          <Label className="my-1 text-md font-semibold">End Date</Label>
          <DatePicker
            value={formik.values.endDate}
            onSelect={(date: Date | undefined) => {
              formik.setFieldValue('endDate', date);
            }}
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.touched.endDate && formik.errors.endDate}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default EmploymentSection;

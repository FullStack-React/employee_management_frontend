import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Combobox } from '@/components/ui/combobox';
import { states } from '../Onborading/options';
import Section from './section';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_ADDRESS_SECTION } from './gql';
import { handleApolloError } from '@/utils/error';

interface AddressSectionArgs {
  initialValues: {
    street: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
  };
  token: string;
}

const valuesToVariables = (values: any) => {
  return {
    streetAddress: values.street,
    apartment: values.apt,
    city: values.city,
    state: values.state,
    zip: values.zip,
  };
};

const validationSchema = object({
  street: string().required('Street is required'),
  apt: string(),
  city: string().required('City is required'),
  state: string().required('State is required'),
  zip: string().required('Zip is required'),
});

const AddressSection = (props: AddressSectionArgs) => {
  const [editable, setEditable] = useState(false);

  const [stateOpen, setStateOpen] = useState(false);

  const [update, { loading }] = useMutation(UPDATE_ADDRESS_SECTION, {
    onCompleted: data => {
      console.log(data);
    },
    onError: handleApolloError(),
  });

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema,
    onSubmit: values => {
      update({
        variables: {
          token: props.token,
          data: valuesToVariables(values),
        },
      });
    },
  });

  return (
    <Section
      editable={editable}
      title="Address"
      loading={loading}
      onEdit={() => setEditable(true)}
      onCancel={() => {
        toast({
          description: 'Discard changes?',
          action: (
            <ToastAction
              onClick={() => {
                formik.setValues(props.initialValues);
                setEditable(false);
              }}
              altText="Yes"
            >
              Yes
            </ToastAction>
          ),
        });
      }}
      onSubmit={e => {
        e.preventDefault();
        formik.handleSubmit();
        setEditable(false);
      }}
    >
      <div className="flex my-5 justify-between w-full">
        <div className="flex flex-col w-1/2">
          <Label className="my-1 text-md font-semibold">Street</Label>
          <Input
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            type="text"
            placeholder="Street Line"
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.errors.street && formik.errors.street}
          </p>
        </div>
        <div className="flex flex-col w-1/3">
          <Label className="my-1 text-md font-semibold">APT</Label>
          <Input
            name="apt"
            value={formik.values.apt}
            onChange={formik.handleChange}
            type="text"
            placeholder="APT#"
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.errors.apt && formik.errors.apt}
          </p>
        </div>
      </div>
      <div className="flex my-5 justify-between w-full">
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">City</Label>
          <Input
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            type="text"
            placeholder="City"
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.errors.city && formik.errors.city}
          </p>
        </div>
        <div className="flex flex-col w-1/5">
          <Label className="my-1 text-md font-semibold">State</Label>
          <Combobox
            open={stateOpen}
            value={formik.values.state}
            buttonText="State"
            options={states}
            placeholder="Select a State..."
            disabled={!editable}
            onOpenChange={setStateOpen}
            onSelect={currentValue => {
              formik.setFieldValue(
                'state',
                currentValue === formik.values.state ? '' : currentValue,
              );
              setStateOpen(false);
            }}
          />
          <p className="text-red-600 text-sm">
            {formik.errors.state && formik.errors.state}
          </p>
        </div>
        <div className="flex flex-col w-1/4">
          <Label className="my-1 text-md font-semibold">Zip Code</Label>
          <Input
            name="zip"
            value={formik.values.zip}
            onChange={formik.handleChange}
            type="text"
            placeholder="Zip Code"
            disabled={!editable}
          />
          <p className="text-red-600 text-sm">
            {formik.errors.zip && formik.errors.zip}
          </p>
        </div>
      </div>
    </Section>
  );
};

export default AddressSection;

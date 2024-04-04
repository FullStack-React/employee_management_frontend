import { useFormik } from 'formik';
import { object, string } from 'yup';
import Form from '@/components/Form';

const validationSchema = object({
  username: string().required('Username is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: 'Invalid password', excludeEmptyString: true },
    )
    .required('Password is required'),
});

const Registration = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="flex-grow">
      <div className="w-2/5 flex flex-col m-auto">
        <Form
          title="Registration"
          buttonText="Submit"
          fields={[
            {
              type: 'text',
              name: 'username',
              label: 'Uername',
              value: formik.values.username,
              placeholder: 'Enter your username',
              touched: formik.touched.username,
              error: formik.errors.username,
              onChange: formik.handleChange,
            },
            {
              type: 'text',
              name: 'email',
              label: 'Email',
              value: formik.values.email,
              placeholder: 'Enter your Email',
              touched: formik.touched.email,
              error: formik.errors.email,
              onChange: formik.handleChange,
            },
            {
              type: 'password',
              name: 'password',
              label: 'Password',
              value: formik.values.password,
              placeholder: 'Enter your password',
              touched: formik.touched.password,
              error: formik.errors.password,
              onChange: formik.handleChange,
            },
          ]}
          onSubmit={formik.handleSubmit}
        />
      </div>
    </div>
  );
};

export default Registration;

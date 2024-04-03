import React from 'react';
import Form from '@/components/Form';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const validationSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
      { message: 'Invalid password', excludeEmptyString: true },
    )
    .required('Password is required'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
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
          title="Login"
          buttonText="Login"
          fields={[
            {
              type: 'email',
              name: 'email',
              label: 'Email',
              value: formik.values.email,
              placeholder: 'Enter your email',
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
        <div className="mt-2 flex justify-between">
          <p>
            Don't have an account?{' '}
            <a className="text-blue-600 underline" href="/">
              Register here
            </a>
          </p>
          <a className="text-blue-600 underline" href="/">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

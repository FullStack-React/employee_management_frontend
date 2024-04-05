import Form from '@/components/Form';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const validationSchema = object({
  username: string().required('Username is required'),
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
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="flex flex-grow">
      <div className="w-2/5 flex flex-col m-auto">
        <Form
          title="Login"
          buttonText="Login"
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
            <a className="text-blue-600 underline" href="/register">
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

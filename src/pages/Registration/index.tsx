//TODO: add role field
import { useFormik } from 'formik';
import { object, string } from 'yup';
import Form from '@/components/Form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ToastAction } from '@/components/ui/toast';
import { handleApolloError } from '@/utils/error';

const validationSchema = object({
  username: string().required('Username is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: 'Invalid password', excludeEmptyString: true },
    )
    .required('Password is required'),
  role: string().required('Role is required'),
});

const CHECK_TOKEN = gql`
  query CheckToken($token: String!) {
    checkToken(token: $token) {
      api
      type
      status
      message
    }
  }
`;

const REGISTER = gql`
  mutation Register(
    $token: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      token: $token
      username: $username
      email: $email
      password: $password
    ) {
      api
      type
      status
      message
    }
  }
`;

const Registration = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [checkToken, { loading: checkTokenLoading, error: checkTokenError }] =
    useLazyQuery(CHECK_TOKEN);
  const [register, { loading: registerLoading }] = useMutation(REGISTER, {
    onCompleted: data => {
      navigate('/login');
    },
    onError: handleApolloError(
      <ToastAction altText="Try Again" onClick={() => window.location.reload()}>
        Try Again
      </ToastAction>,
    ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      role: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      register({ variables: { token, ...values } });
    },
  });

  useEffect(() => {
    checkToken({ variables: { token } });
  }, [checkToken, token]);

  if (checkTokenLoading) {
    return (
      <div className="flex flex-grow">
        <div className="w-2/5 flex flex-col justify-center items-center m-auto">
          <p className="text-center font-bold font-2xl">Checking Token...</p>
        </div>
      </div>
    );
  }

  if (checkTokenError) {
    return (
      <div className="flex flex-grow">
        <div className="w-2/5 flex flex-col m-auto">
          <p className="font-bold text-2xl">
            {checkTokenError.graphQLErrors[0].message}
          </p>
          <p className="font-bold text-2xl mt-10">
            Token maybe expired, please ask for a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow">
      <div className="w-2/5 flex flex-col m-auto">
        <Form
          title="Registration"
          buttonText="Submit"
          loading={registerLoading}
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
            {
              type: 'select',
              name: 'role',
              label: 'Role',
              value: formik.values.role,
              placeholder: 'Select your role',
              options: [
                { value: 'normal', label: 'Normal' },
                { value: 'hr', label: 'HR' },
              ],
              touched: formik.touched.role,
              error: formik.errors.role,
              onChange: value => {
                formik.setFieldValue('role', value);
              },
            },
          ]}
          onSubmit={formik.handleSubmit}
        />
      </div>
    </div>
  );
};

export default Registration;

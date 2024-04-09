import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Form from '@/components/Form';
import {
  auth,
  selectLoginStatus,
  selectOnboardingStatus,
  selectRole,
} from '@/features/auth/AuthSlice';
import { handleApolloError } from '@/utils/error';
import { useLazyQuery, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      token
      username
      email
      role
      status
    }
  }
`;

const Login = () => {
  const loginStatus = useAppSelector(selectLoginStatus);
  const onboardingStatus = useAppSelector(selectOnboardingStatus);
  const role = useAppSelector(selectRole);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { loading }] = useLazyQuery(LOGIN, {
    onCompleted: data => {
      dispatch(auth(data.login));
    },
    onError: handleApolloError(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      login({ variables: values });
    },
  });

  useEffect(() => {
    if (loginStatus) {
      if (onboardingStatus !== 'approved') {
        navigate('/onboarding');
      } else {
        if (role === 'normal') {
          navigate('/personal_info');
        } else {
          navigate('/profiles_hr');
        }
      }
    }
  }, [loginStatus, onboardingStatus, role, navigate]);

  return (
    <div className="flex flex-grow">
      <div className="w-2/5 flex flex-col m-auto">
        <Form
          title="Login"
          buttonText="Login"
          loading={loading}
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

import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { register, registerNull } from '../../../services/admin/action';

// ----------------------------------------------------------------------

export default function RegisterForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.adminReducer.registerStatus);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    registerNull(dispatch);
  }, []);

  useEffect(() => {
    if (registerStatus === true) {
      Swal.fire({
        title: 'Registartion was Successfull',
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          registerNull(dispatch);
          navigate('/', { replace: true });
        }

        if (result.isDismissed) {
          registerNull(dispatch);
        }
      });
    } else if (registerStatus === false) {
      Swal.fire({
        title: 'Registartion was UnSuccessfull',
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          registerNull(dispatch);
        }

        if (result.isDismissed) {
          registerNull(dispatch);
        }
      });
    }
  }, [registerStatus]);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('user name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('confirm password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegisterSchema
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    register(
      getFieldProps('firstName').value,
      getFieldProps('email').value,
      getFieldProps('password').value,
      dispatch
    );
  };

  const { errors, touched, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>  */}
          <TextField
            fullWidth
            label="User name"
            {...getFieldProps('firstName')}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />

          {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack> */}

          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            autoComplete="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          {console.log(confirmPassword, 'confirmPAssword')}

          <LoadingButton
            disabled={
              Object.keys(errors).length !== 0 ||
              getFieldProps('password').value !== getFieldProps('confirmPassword').value ||
              getFieldProps('password').value === '' ||
              getFieldProps('firstName').value === '' ||
              getFieldProps('email').value === ''
            }
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useRoutes } from 'react-router-dom';
import { withRouter } from 'react-router';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import { connect } from 'react-redux';

import { AdminLogin, AdminLoginNull } from '../services/admin/action';
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e, data) => {
    if (data === 'email') {
      setemail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handlePress = (email, password) => {
    props.AdminLogin({
      email,
      password
    });
  };

  useEffect(() => {
    props.AdminLoginNull();
  }, []);

  useEffect(() => {
    if (props.adminLoginStatus) {
      window.location = '/dashboard/app';
      // navigate('/dashboard', { replace: true });
    }
  }, [props.adminLoginStatus]);

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          {/* <AuthSocial /> */}

          <LoginForm presses={handlePress} />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

const mapStateToProps = ({ adminReducer }) => {
  const { adminLoginStatus } = adminReducer;

  return {
    adminLoginStatus
  };
};

const mapDispatchToProps = (dispatch) => ({
  AdminLogin: (payload) => dispatch(AdminLogin(payload)),
  AdminLoginNull: () => dispatch(AdminLoginNull())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

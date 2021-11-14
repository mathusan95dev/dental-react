// routes
import Router from './routes';
import AdminRouting from './adminRoutes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import DashboardLayout from './layouts/dashboard';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      {/* {sessionStorage.getItem('token') !== '' && <DashboardLayout />} */}
      {sessionStorage.getItem('token') !== '' && <Router />}
      <AdminRouting />
    </ThemeConfig>
  );
}

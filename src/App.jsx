import ToastProvider from './components/ui/ToastProvider';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <ToastProvider>
      <DashboardPage />
    </ToastProvider>
  );
}

import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppRouter } from '@/components/AppRouter';
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="header">
          <Navbar />
        </header>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

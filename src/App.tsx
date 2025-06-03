import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { paths } from '@/routes/routes';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/pages/HomePage';
import { Category } from '@/components/Category';
import type { Character, Episode, Location } from '@/components/Category';
import { DetailsPage } from '@/pages/DetailsPage';
import { NotFound } from '@/components/NotFound';
import { Signin } from '@/components/Signin';
import { AuthProvider } from '@/context/AuthProvider';
import { PrivateRoute } from '@/components/PrivateRoute';
import './App.scss';

function App() {
  const [data, setData] = useState<Character[] | Episode[] | Location[]>([]);
  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="header">
          <Navbar setData={setData} />
        </header>
        <Routes>
          <Route path={paths.home} element={<HomePage />} />
          <Route
            path="/:category"
            element={
              <PrivateRoute>
                <Category data={data} />
              </PrivateRoute>
            }
          />
          <Route
            path="/:category/:id"
            element={
              <PrivateRoute>
                <DetailsPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

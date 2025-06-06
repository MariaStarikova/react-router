import { Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { paths } from '@/routes/routes';
import { Navbar } from '@/components/Navbar';
// import { HomePage } from '@/pages/HomePage';
// import { Category } from '@/components/Category';
import type { Character, Episode, Location } from '@/components/Category';
// import { DetailsPage } from '@/pages/DetailsPage';
// import { NotFound } from '@/components/NotFound';
import { Signin } from '@/components/Signin';
import { AuthProvider } from '@/context/AuthProvider';
// import { PrivateRoute } from '@/components/PrivateRoute';
import { LazyComponent } from '@/components/LazyComponent';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import './App.scss';

// const HomePage = lazy(() =>
//   import('@/pages/HomePage').then(module => ({
//     default: module.HomePage
//   }))
// );
// const Category = lazy(() =>
//   import('@/components/Category').then(module => ({
//     default: module.Category
//   }))
// );
// const DetailsPage = lazy(() =>
//   import('@/pages/DetailsPage').then(module => ({
//     default: module.DetailsPage
//   }))
// );
// const NotFound = lazy(() =>
//   import('@/components/NotFound').then(module => ({
//     default: module.NotFound
//   }))
// );

function App() {
  const [data, setData] = useState<Character[] | Episode[] | Location[]>([]);
  // const [data, setData] = useState<(Character | Episode | Location)[]>([]);
  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="header">
          <Navbar setData={setData} />
        </header>
        {/* <Routes>
          <Route path="/login" element={<Signin />} />
          <Suspense fallback={<p>Загрузка страницы...</p>}>
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

            <Route path="*" element={<NotFound />} />
          </Suspense>
        </Routes> */}
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route
            path="*"
            element={
              <ErrorBoundary>
                <Suspense fallback={<p>Загрузка страницы...</p>}>
                  <LazyComponent data={data} />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

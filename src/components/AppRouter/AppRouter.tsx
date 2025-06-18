import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from '@/routes/routes';
import { PrivateRoute } from '@/components/PrivateRoute';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then(module => ({
    default: module.HomePage
  }))
);
const Category = lazy(() =>
  import('@/components/Category').then(module => ({
    default: module.Category
  }))
);
const DetailsPage = lazy(() =>
  import('@/pages/DetailsPage').then(module => ({
    default: module.DetailsPage
  }))
);
const NotFound = lazy(() =>
  import('@/components/NotFound').then(module => ({
    default: module.NotFound
  }))
);
const Signin = lazy(() =>
  import('@/components/Signin').then(module => ({
    default: module.Signin
  }))
);
const OfflinePage = lazy(() =>
  import('@/pages/OfflinePage').then(module => ({
    default: module.OfflinePage
  }))
);

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Suspense fallback={<p>Загрузка страницы...</p>}>
            <Signin />{' '}
          </Suspense>
        }
      />
      <Route
        path={paths.home}
        element={
          <Suspense fallback={<p>Загрузка страницы...</p>}>
            <HomePage />{' '}
          </Suspense>
        }
      />
      <Route
        path="/:category"
        element={
          <PrivateRoute>
            <Suspense fallback={<p>Загрузка страницы...</p>}>
              <Category />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/:category/:id"
        element={
          <PrivateRoute>
            <Suspense fallback={<p>Загрузка страницы...</p>}>
              <DetailsPage />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/offline"
        element={
          <Suspense fallback={<p>Загрузка...</p>}>
            <OfflinePage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<p>Загрузка страницы...</p>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

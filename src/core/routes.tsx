import { Routes, Route } from 'react-router-dom';

import { AppLayout } from '../components/appLayout';
import { FeedsPage } from '../components/feedsPage';

export const customRoutes = (
  <Routes>
    <Route
      path="/"
      element={
        <AppLayout>
          <FeedsPage />
        </AppLayout>
      }
    />
  </Routes>
);

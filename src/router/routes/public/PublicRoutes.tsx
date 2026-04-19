import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from 'react-router-dom';
import {
  LazyLockComponent,
  LazyPowerComponent,
  LazyPoweringComponent,
  LazyProvider,
  LazyStaticHostScreen,
} from '../../lazyRouting';

const createPublicRouter = (Component: React.ElementType) =>
  createBrowserRouter(
    createRoutesFromChildren(
      <Route
        path="/"
        element={<LazyProvider children={<LazyStaticHostScreen />} />}
      >
        <Route
          path=""
          element={<LazyProvider children={<Component />} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>,
    ),
  );

export const publicRouterPower = createPublicRouter(LazyPowerComponent);
export const publicRouterPowering = createPublicRouter(LazyPoweringComponent);
export const publicRouterLock = createPublicRouter(LazyLockComponent);

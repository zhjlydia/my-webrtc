import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

const GetUserMedia = lazy(() => import('@/pages/get-user-media'));
const ScreenSharing = lazy(() => import('@/pages/screen-sharing'));
const PeerConnection = lazy(() => import('@/pages/peer-connection'));

function LazyRoute({ children }: React.PropsWithChildren) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

function Routes() {
    const element = useRoutes([
        {
            path: '/getUserMedia',
            element: (
                <LazyRoute>
                    <GetUserMedia />
                </LazyRoute>
            ),
        },
        {
            path: '/screenSharing',
            element: (
                <LazyRoute>
                    <ScreenSharing />
                </LazyRoute>
            ),
        },
        {
            path: '/peerConnection',
            element: (
                <LazyRoute>
                    <PeerConnection />
                </LazyRoute>
            ),
        },
    ]);

    return element;
}

export default Routes;

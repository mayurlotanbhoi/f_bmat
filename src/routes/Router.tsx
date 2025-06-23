// src/app/Router.jsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import ErrorBoundary from '../components/ChunkError/ErrorBoundary';
import { useAuth } from '../hooks/useAuth';
import { BioDownload } from '../view/bioData';
import AppLoader from '../app/AppLoader';
import InitialInfo from '../view/plashScreens';
// import { ViewBioData } from '../view/viewBioData';

// import BioForm from '../view/bioForm';
// import UserProfile from '../view/user';
// import ChatBox from '../view/chat';
// import Matche from '../view/matches';
// import { LanguageScreen } from '../view';
// import SinginSignUp from '../view/auth';
// import Profile from '../view/profiles/Profile';
// import Home from '../view/home';

const SinginSignUp = lazy(() => import('../view/auth'));
const Profile = lazy(() => import('../view/profiles/Profile'));
const Home = lazy(() => import('../view/home'));
const LanguageScreen = lazy(() => import('../view/language'));
const Matche = lazy(() => import('../view/matches'));
const ChatBox = lazy(() => import('../view/chat'));
const UserProfile = lazy(() => import('../view/user'));
const BioForm = lazy(() => import('../view/bioForm'));
const Links = lazy(() => import('../view/links/Links'));
const ViewBioData = lazy(() => import('../view/viewBioData/viewBio'))
// import { ScrollToTop } from '../components';

// import LoadingFallback from '../components/LoadingFallback';
// import ErrorBoundary from '../components/ErrorBoundary';
// import AuthProvider from '../context/AuthProvider';

// Utility for lazy loading with error boundary
// const lazyLoad = (componentImport) =>
//     lazy(() =>
//         componentImport().catch((error) => {
//             console.error('Chunk loading error:', error);
//             return import('../components/ChunkError/ChunkError');
//         })
//     );

// Public routes
// const Home = lazyLoad(() => import('../view/home'));
// const Profile = lazyLoad(() => import('../view/profiles'));
// const PublicPage = lazyLoad(() => import('../pages/PublicPage'));

// // Protected routes
// const Dashboard = lazyLoad(() => import('../pages/Dashboard'));
// const Profile = lazyLoad(() => import('../pages/Profile'));
// const Settings = lazyLoad(() => import('../pages/Settings'));

// // Error pages
// const Page404 = lazyLoad(() => import('../pages/404'));
// const Page500 = lazyLoad(() => import('../pages/500'));

// Route protection component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const { isAuthenticated } = useAuth();
    const { isLoggedIn } = useAuth();

    console.log('isLoggedIn', isLoggedIn);


    // const isAuthenticated = true
    return isLoggedIn ? <>{children}</> : <Navigate to="/auth" replace />;
};

// Route configuration
const routes = [
    {

        // path: '/',
        // element: <Home />,

        element: <ProtectedRoute><MainLayout /> </ProtectedRoute>,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/profile/:filter',
                element: <Profile />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/matches',
                element: <Matche />,
            },
            {
                path: '/lang',
                element: <LanguageScreen />,
            },

            {
                path: '/chat',
                element: <ChatBox />,
            },
            {
                path: '/user',
                element: <UserProfile />,
            },
            {
                path: '/complet-profile',
                element: <BioForm />,
            },
            {
                path: '/bio-download',
                element: <BioDownload />,
            },
            {
                path: '/likes',
                element: <Links />,
            },

            {
                path: '/vlew-profile/:id',
                element: <ViewBioData />,
            },
            // {
            //     path: '/bio-qr/:id',
            //     element: <ViewBioData />,
            // },
            {
                path: '/initial-info',
                element: <InitialInfo />,
            }





            // {
            //     path: '/dashboard',
            //     element: (
            //         <ProtectedRoute>
            //             <Suspense fallback={<LoadingFallback />}>
            //                 <Dashboard />
            //             </Suspense>
            //         </ProtectedRoute>
            //     ),
            //     children: [
            //         {
            //             path: 'profile',
            //             element: <Profile />,
            //         },
            //         {
            //             path: 'settings',
            //             element: <Settings />,
            //         },
            //     ],
            // },
            // {
            //     path: '/500',
            //     element: <Page500 />,
            // },
            // {
            //     path: '*',
            //     element: <Page404 />,
            // },

        ],

    },
    {
        path: '/auth',
        element: <SinginSignUp />,
    },
];

const router = createBrowserRouter(routes);

export default function Router() {
    return (
        // <AuthProvider>
        <>

            <RouterProvider router={router} />
        </>
        // </AuthProvider>
    );
}
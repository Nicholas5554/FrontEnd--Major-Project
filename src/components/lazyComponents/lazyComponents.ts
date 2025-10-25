import { lazy } from 'react';

// Lazy load your pages
export const RegisterPage = lazy(() => import('../../Pages/RegisterPage/RegisterPage'));
export const LoginPage = lazy(() => import('../../Pages/LoginPage/LoginPage'));
export const CreateTask = lazy(() => import('../../Pages/CreateTask/CreateTask'));
export const CreateDiscussion = lazy(() => import('../../Pages/CreateDiscussion/CreateDiscussion'));
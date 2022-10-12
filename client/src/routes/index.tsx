import { Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import AddUser from 'pages/users/AddUser';
import EditUser from 'pages/users/EditUser';
import UsersList from 'pages/users/UsersList';
import MainLayout from 'components/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Profile from 'pages/Profile';

const Router = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Navigate replace to="/users" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/new" element={<AddUser />} />
            <Route path="/users/:id" element={<EditUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Router;
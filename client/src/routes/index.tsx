import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import AddUser from 'pages/users/AddUser';
import EditUser from 'pages/users/EditUser';
import UsersList from 'pages/users/UsersList';

const Router = () => (
    <Routes>
        <Route path="/" element={<Navigate replace to="/users" />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/new" element={<AddUser />} />
        <Route path="/users/:id" element={<EditUser />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Router;
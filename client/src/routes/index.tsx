import { Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import NotFound from 'pages/error/NotFound';
import AddUser from 'pages/users/AddUser';
import EditUser from 'pages/users/EditUser';
import UsersList from 'pages/users/UsersList';
import MainLayout from 'components/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Profile from 'pages/Profile';
import TicketsList from 'pages/tickets/TicketsList';
import AddTicket from 'pages/tickets/AddTicket';
import EditTicket from 'pages/tickets/EditTicket';
import TicketDetail from 'pages/tickets/components/TicketDetail';
import TasksList from 'pages/tasks/TasksList';
import AddTask from 'pages/tasks/AddTask';
import EditTask from 'pages/tasks/EditTask';
import { allRoles, role } from 'shared/constants/roles';
import Unauthorized from 'pages/error/Unauthorized';

const Router = () => (
    <Routes>
        <Route path="/login" element={< Login />} />
        <Route path="/" element={<ProtectedRoute>< MainLayout /></ProtectedRoute>}>
            <Route index element={<Navigate replace to="/tickets" />} />

            <Route path="/profile" element={<ProtectedRoute allowed={allRoles}>< Profile /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute allowed={[role.ADMIN]}>< UsersList /></ProtectedRoute>} />
            <Route path="/users/new" element={<ProtectedRoute allowed={[role.ADMIN]}>< AddUser /></ProtectedRoute>} />
            <Route path="/users/:id" element={<ProtectedRoute allowed={[role.ADMIN]}>< EditUser /></ProtectedRoute>} />

            <Route path="/tickets" element={<ProtectedRoute allowed={allRoles}>< TicketsList /></ProtectedRoute>} />
            <Route path="/tickets/new" element={<ProtectedRoute allowed={[role.ADMIN, role.SUPERVISOR]}>< AddTicket /></ProtectedRoute>} />
            <Route path="/tickets/:id" element={<ProtectedRoute allowed={allRoles}>< EditTicket /></ProtectedRoute>} >
                <Route path="/tickets/:id/detail" element={<ProtectedRoute allowed={allRoles}>< TicketDetail /></ProtectedRoute>} />
                <Route path="/tickets/:id/tasks" element={<ProtectedRoute allowed={allRoles}>< TasksList /></ProtectedRoute>} />
                <Route path="/tickets/:id/tasks/new" element={<ProtectedRoute allowed={[role.AGENT]}>< AddTask /></ProtectedRoute>} />
                <Route path="/tickets/:id/tasks/:taskId" element={<ProtectedRoute allowed={[role.AGENT]}>< EditTask /></ProtectedRoute>} />
            </Route>

            <Route path="/unauthorized" element={< Unauthorized />} />
        </Route>
        <Route path="*" element={< NotFound />} />
    </Routes>
);

export default Router;
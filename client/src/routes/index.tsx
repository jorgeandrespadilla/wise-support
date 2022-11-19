import { Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
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

const Router = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Navigate replace to="/users" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/new" element={<AddUser />} />
            <Route path="/users/:id" element={<EditUser />} />

            <Route path="/tickets" element={< TicketsList />} />
            <Route path="/tickets/new" element={< AddTicket />} />
            <Route path="/tickets/:id" element={< EditTicket />} >
                <Route path="/tickets/:id/detail" element={< TicketDetail />} />
                <Route path="/tickets/:id/tasks" element={< TasksList />} />
                <Route path="/tickets/:id/tasks/new" element={< AddTask />} />
                <Route path="/tickets/:id/tasks/:taskId" element={< EditTask />} />
            </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Router;
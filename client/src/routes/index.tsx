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
import CategoriesList from 'pages/categories/CategoriesList';
import AddCategory from 'pages/categories/AddCategory';
import EditCategory from 'pages/categories/EditCategory';
import StatsHome from 'pages/statistics/StatsHome';
import PerformanceStats from 'pages/statistics/PerformanceStats';
import SettingsHome from 'pages/settings/SettingsHome';
import AppearanceSettings from 'pages/settings/AppearanceSettings';
import CategoriesStats from 'pages/statistics/CategoriesStats';

const Router = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route
            path="/"
            element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }
        >
            <Route index element={<Navigate replace to="/tickets" />} />

            <Route
                path="/users"
                element={
                    <ProtectedRoute allowed={[role.ADMIN]}>
                        <UsersList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users/new"
                element={
                    <ProtectedRoute allowed={[role.ADMIN]}>
                        <AddUser />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users/:id"
                element={
                    <ProtectedRoute allowed={[role.ADMIN]}>
                        <EditUser />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tickets"
                element={
                    <ProtectedRoute allowed={allRoles}>
                        <TicketsList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/tickets/new"
                element={
                    <ProtectedRoute allowed={[role.ADMIN, role.SUPERVISOR]}>
                        <AddTicket />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/tickets/:id"
                element={
                    <ProtectedRoute allowed={allRoles}>
                        <EditTicket />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/tickets/:id/detail"
                    element={
                        <ProtectedRoute allowed={allRoles}>
                            <TicketDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tickets/:id/tasks"
                    element={
                        <ProtectedRoute allowed={allRoles}>
                            <TasksList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tickets/:id/tasks/new"
                    element={
                        <ProtectedRoute allowed={[role.AGENT]}>
                            <AddTask />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tickets/:id/tasks/:taskId"
                    element={
                        <ProtectedRoute allowed={[role.AGENT]}>
                            <EditTask />
                        </ProtectedRoute>
                    }
                />
            </Route>

            <Route
                path="/categories"
                element={
                    <ProtectedRoute allowed={[role.ADMIN]}>
                        <CategoriesList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/categories/new"
                element={
                    <ProtectedRoute allowed={[role.ADMIN]}>
                        <AddCategory />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/categories/:id"
                element={
                    <ProtectedRoute allowed={[role.ADMIN]}>
                        <EditCategory />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/stats"
                element={
                    <ProtectedRoute allowed={[role.ADMIN, role.SUPERVISOR]}>
                        <StatsHome />
                    </ProtectedRoute>
                }
            >
                <Route
                    index
                    element={<Navigate replace to="/stats/performance" />}
                />

                <Route
                    path="/stats/performance"
                    element={
                        <ProtectedRoute allowed={[role.ADMIN, role.SUPERVISOR]}>
                            <PerformanceStats />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/stats/categories"
                    element={
                        <ProtectedRoute allowed={[role.ADMIN]}>
                            <CategoriesStats />
                        </ProtectedRoute>
                    }
                />
            </Route>

            {/* Options dropdown */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute allowed={allRoles}>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute allowed={allRoles}>
                        <SettingsHome />
                    </ProtectedRoute>
                }
            >
                <Route
                    index
                    element={<Navigate replace to="/settings/appearance" />}
                />

                <Route
                    path="/settings/appearance"
                    element={
                        <ProtectedRoute allowed={allRoles}>
                            <AppearanceSettings />
                        </ProtectedRoute>
                    }
                />
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default Router;

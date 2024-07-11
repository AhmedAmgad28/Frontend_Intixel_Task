import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Components/header';
import Spinner from '../Components/spinner';

const HomePage = lazy(() => import('../Pages/homePage'));
const LoginPage = lazy(() => import('../Pages/Auth/loginPage'));
const RegisterPage = lazy(() => import('../Pages/Auth/registerPage'));
const ProfilePage = lazy(() => import('../Pages/Profile/profilePage'));
const UpdateProfilePage = lazy(() => import('../Pages/Profile/updateProfilePage'));
const SearchPage = lazy(() => import('../Pages/Search/searchPage'));
const EventsPage = lazy(() => import('../Pages/Event/eventsPage'));
const EventDetailsPage = lazy(() => import('../Pages/Event/eventDetailsPage'));
const NewEventPage = lazy(() => import('../Pages/Event/newEventPage'));
const UpdateEventPage = lazy(() => import('../Pages/Event/updateEventPage'));
const NotFoundPage = lazy(() => import('../Pages/notFoundPage'));

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavBarRoutes = ["/login", "/register"]; // Add paths where NavBar should not be shown

  return (
    <div className="App">
      { !noNavBarRoutes.includes(location.pathname) && <Header /> }
      {children}
    </div>
  );
};

function App(){
  return (
        <Suspense fallback={<Spinner />}>
          <BrowserRouter>
          <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/update" element={<UpdateProfilePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/create" element={<NewEventPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/events/:id/update" element={<UpdateEventPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Layout>
      </BrowserRouter>
        </Suspense>
  );
};

export default App;
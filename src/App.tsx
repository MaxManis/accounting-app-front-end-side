import React, { useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import 'bulma';
import { LoginForm } from './components/LoginForm'
import { Nav } from './components/Nav';
import { ExpensesList } from './components/ExpensesList';
import { CreateExpense } from './components/CreateExpense';
import { PageNotFound } from './components/PageNotFound';
import { Footer } from "./components/Footer";
import { SingUpForm } from "./components/SingUpForm";
import { HomePage } from "./components/HomePage";
import { AboutProject } from "./components/AboutProject";
import {useAppDispatch, useAppSelector} from './app/hooks';
import { setUser } from './features/user/userSlice';
import { ActivateAccount } from './components/ActivateAccount';
import { AboutAuthor } from './components/AboutAuthor';
import { CreateCategory } from './components/CreateCategory';
import { CreateFAQ } from './components/CreateFAQ';
import { MyProfile } from "./components/MyProfile";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state => state.user));

    useEffect(() => {
        const userFromStorage = localStorage.getItem('user');

        if (userFromStorage) {
            dispatch(setUser(JSON.parse(userFromStorage)))
        }
    }, []);

    useEffect(() => {
        const userFromStorage = localStorage.getItem('user');
        if (!userFromStorage) {
            dispatch(setUser(null));
            localStorage.removeItem('user');
        }
    }, [user])

    return (
      <div className="app">
          <Nav />

          <div className="main-content mt-6 mb-5 container">
              <Routes>
                  <Route index element={<HomePage />} />

                  <Route path="/expenses" element={<ExpensesList />} />

                  <Route path="/create">
                    <Route index element={<CreateExpense />} />
                    <Route path="category" element={<CreateCategory />} />
                    <Route path="create-faq" element={<CreateFAQ />} />
                  </Route>

                  <Route path="/about">
                    <Route index element={<AboutProject />} />
                    <Route path="author" element={<AboutAuthor />} />
                  </Route>

                  <Route path="/my-profile" element={<MyProfile />} />

                  <Route path="/login" element={<LoginForm />} />

                  <Route path="/singup" element={<SingUpForm />} />

                  <Route path="/activate/:token" element={<ActivateAccount />} />

                  <Route path="*" element={<PageNotFound />} />

              </Routes>
          </div>

          <Footer />
      </div>
  );
}

export default App;

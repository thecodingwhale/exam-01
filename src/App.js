import React from 'react';
import styled from 'styled-components';
import './App.css';
import { NoStackConsumer } from '@nostack/no-stack';

import { PLATFORM_ID, TYPE_USER_ID } from './config';

import NavBar from './components/NavBar';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Items from './components/List/Items';

const App = () => (
  <>
    <NavBar />
    <NoStackConsumer>
      {({ loading, currentUser }) => {
        if (loading) return null;
        if (!currentUser) {
          return (
            <>
              <style>
                {
                  '\
                    body {\
                      background-color: #4AA5D4;\
                    }\
                  '
                }
              </style>
              <div className="container mx-auto px-4 py-4">
                <div className="mt-16">
                  <AuthTabs menuTitles={['Login', 'Register']}>
                    <LoginForm />
                    <RegistrationForm
                      platformId={PLATFORM_ID}
                      userClassId={TYPE_USER_ID}
                    />
                  </AuthTabs>
                </div>
              </div>
            </>
          );
        }
        return (
          <>
            <style>
              {
                '\
                    body {\
                      background-color: #F3F8FB;\
                    }\
                  '
              }
            </style>
            <div className="container mx-auto px-4 py-4">
              <Items userId={currentUser.id} />
            </div>
          </>
        );
      }}
    </NoStackConsumer>
  </>
);

export default App;

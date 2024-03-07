import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const AuthPage = () => {
  return (
    <Tabs
      defaultValue="signIn"
      className="flex w-full flex-col items-center justify-center"
    >
      <TabsList>
        <TabsTrigger value="signIn">Sign In</TabsTrigger>
        <TabsTrigger value="signUp">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signIn">
        <LoginPage />
      </TabsContent>
      <TabsContent value="signUp">
        <RegisterPage />
      </TabsContent>
    </Tabs>
  );
};

export default AuthPage;

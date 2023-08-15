import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Discover from './Discover';
import CoreLayout from "../common/layouts/CoreLayout";
import Callback from "./Callback/components/Callback";
import SignIn from "./SignIn/components/SignIn";
import ProtectedRoute from "./ProtectedRoute";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route element={<CoreLayout />}>
        <Route index path={"/"} element={<ProtectedRoute><Discover /></ProtectedRoute>} />
      </Route>
      <Route index path={"/sign-in"} element={<SignIn />} />
      <Route index path={"/callback"} element={<Callback />} />
    </Routes>
  );
}

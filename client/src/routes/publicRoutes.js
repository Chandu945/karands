import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PublicRoute() {
    const {auth} = useAuth()
  return (
    <>
      {
        auth.token ? <Navigate to={'/'}/> : <Outlet/> 
      }
    </>
  )
}

export default PublicRoute
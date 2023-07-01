'use client'
import Head from 'next/head'
import Image from 'next/image'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { Guest } from '../components/guest'
import Loading from '../components/loading'
import Login from '../components/Login'
import { AuthConsumer, AuthProvider } from '../contexts/AuthContext'


export default function Home() {
  return (
    <>
      <AuthProvider>
        <SnackbarProvider>
          <AuthConsumer>
            {(auth) =>
              !auth.isInitialized ? (
               <Loading/>
              ) : (
                  <>
                    <main className="flex min-h-screen flex-col items-center justify-between">
                      <Login />
                    </main>
                  </>
                )
            }
          </AuthConsumer>
        </SnackbarProvider>
      </AuthProvider>
    </>
  )
}

// 'use client'
import Head from 'next/head';

import RootLayout from './layout';
import { Authenticated } from '../../components/Authenticated';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import ShowPokemon from '../../components/contents/pokemon';

async function Dashboard() {

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="container mx-auto px-10 pt-10">
        <ShowPokemon/>
      </div>
    </>
  );
}

Dashboard.getLayout = ({
    page,
  }: {
    page: React.ReactNode
  }) => (
  <Authenticated>
    <RootLayout>{page}</RootLayout>
   </Authenticated>
);

export default Dashboard;

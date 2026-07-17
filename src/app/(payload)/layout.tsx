import { importMap } from './admin/importMap.js';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import configPromise from '@payload-config';
import React from 'react';

type Args = {
  children: React.ReactNode;
};

const serverFunction = async function (args: any) {
  'use server';
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout importMap={importMap} config={configPromise} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;

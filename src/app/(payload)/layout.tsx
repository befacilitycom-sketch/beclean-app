import { importMap } from './admin/importMap.js';
import { RootLayout } from '@payloadcms/next/layouts';
import configPromise from '@payload-config';
import React from 'react';

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
  <RootLayout importMap={importMap} config={configPromise}>
    {children}
  </RootLayout>
);

export default Layout;

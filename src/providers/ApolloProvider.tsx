'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { client } from '@/api/apollo-client';

export const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
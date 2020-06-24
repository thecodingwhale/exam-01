import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { v4 } from 'uuid';

import { createAuthLink, httpLink } from '@nostack/no-stack';

import { PLATFORM_ID } from '../config';

const authLink = createAuthLink(PLATFORM_ID);

const link = ApolloLink.from([authLink, httpLink]);

export default new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id ? object.id + object.__typename : v4(),
  }),
});

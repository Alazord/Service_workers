import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { getComposedLink } from './apolloLinks';

//utils
// eslint-disable-next-line sprinklr/no-import-path -- reason: I have just added a keyField this will be fixed when code is migrated for this file.
import legacySprEnv from 'core/utils/environment';
// constants
import { INTERFACE_VS_POSSIBLE_TYPES } from './constants/possibleTypes';
import { TYPE_POLICIES } from './constants/typePolicies';
import EMPTY_OBJECT_READONLY from '@sprinklr/modules/infra/constants/emptyObject';

//types
import type { SprEnv } from 'core/contexts/sprEnv/getSprEnv';

const POLICY_TYPE = 'cache-and-network' as const;
const NEXT_POLICY_TYPE = 'cache-first' as const;

export const getCache = () =>
  new InMemoryCache({
    possibleTypes: INTERFACE_VS_POSSIBLE_TYPES,
    typePolicies: TYPE_POLICIES,
  });

const getConfig = ({ graphqlUrl, onLogout }: { graphqlUrl: string; onLogout?: () => void }) => ({
  link: getComposedLink(graphqlUrl, onLogout),
  cache: getCache(),
  assumeImmutableResults: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: POLICY_TYPE,
      nextFetchPolicy: NEXT_POLICY_TYPE,
    },
  },
  connectToDevTools: process.env.NODE_ENV !== 'production',
  typeDefs: gql`
    extend type VoiceConversation {
      conferenceData: VoiceConferenceData
    }

    type VoiceConferenceData {
      action: String
      taskId: String
      conferenceStatus: String
      directConference: Boolean
    }
  `,
});

const makeCreateGraphQLClient = () => {
  let graphQLInstance;

  return ({
    graphqlUrl,
    sprEnv = legacySprEnv,
    onLogout,
  }: { graphqlUrl?: string; sprEnv?: SprEnv; onLogout?: () => void } = EMPTY_OBJECT_READONLY): ApolloClient<any> => {
    let _graphqlUrl = graphqlUrl ?? sprEnv.graphqlUrl ?? '/ui/graphql';

    if (!graphQLInstance) {
      const config = getConfig({ graphqlUrl: _graphqlUrl, onLogout });

      graphQLInstance = new ApolloClient(config);
    }

    return graphQLInstance;
  };
};

export default makeCreateGraphQLClient();
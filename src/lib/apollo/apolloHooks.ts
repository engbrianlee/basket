import * as ApolloClient from "@apollo/client";
import { DocumentNode } from "graphql";

const useQuery = <TData = any, TVariables = ApolloClient.OperationVariables>(
  query: DocumentNode,
  options?: ApolloClient.QueryHookOptions<TData, TVariables>
): ApolloClient.QueryResult<TData, TVariables> => {
  // Use the original hook
  const result = ApolloClient.useQuery<TData, TVariables>(query, options);

  // If we have an API error, throw it!
  if (result.error) {
    throw result.error;
  }
  return result;
};

const useLazyQuery = <
  TData = any,
  TVariables = ApolloClient.OperationVariables
>(
  query: DocumentNode,
  options?: ApolloClient.LazyQueryHookOptions<TData, TVariables>
): ApolloClient.QueryTuple<TData, TVariables> => {
  // Use the original hook
  const result = ApolloClient.useLazyQuery<TData, TVariables>(query, options);

  // If we have an API error, throw it!
  if (result[1].error) {
    throw result[1].error;
  }
  return result;
};

const useMutation = <TData = any, TVariables = ApolloClient.OperationVariables>(
  mutation: DocumentNode,
  options?: ApolloClient.MutationHookOptions<TData, TVariables>
): ApolloClient.MutationTuple<TData, TVariables> => {
  // Use the original hook
  const result = ApolloClient.useMutation<TData, TVariables>(mutation, options);

  // If we have an API error, throw it!
  if (result[1].error) {
    throw result[1].error;
  }
  return result;
};

const useSubscription = <
  TData = any,
  TVariables = ApolloClient.OperationVariables
>(
  subscription: DocumentNode,
  options?: ApolloClient.SubscriptionHookOptions<TData, TVariables>
): {
  variables: TVariables | undefined;
  loading: boolean;
  data?: TData | undefined;
  error?: ApolloClient.ApolloError | undefined;
} => {
  // Use the original hook
  const result = ApolloClient.useSubscription<TData, TVariables>(
    subscription,
    options
  );

  // If we have an API error, throw it!
  if (result.error) {
    throw result.error;
  }
  return result;
};

// First export @apollo client
export * from "@apollo/client";
// Override hooks with our custom hooks
export { useQuery, useLazyQuery, useMutation, useSubscription };

/* eslint-disable no-console */
import { DocumentNode } from 'graphql'
import { useEffect } from 'react'

import {
  ApolloError,
  MutationHookOptions,
  MutationTuple,
  QueryHookOptions,
  QueryResult,
  QueryTuple,
  useLazyQuery as useLazyQueryApollo,
  useMutation as useMutationApollo,
  useQuery as useQueryApollo,
} from '@apollo/client'

export type ToastOptions = {
  displaySuccess: boolean
  displayError?: boolean
  successMessage?: string
}

export type CallbackOptions = {
  onSuccess?: <TData>(data: TData) => void
  onError?: () => void
}

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  displaySuccess: true,
}

const logErrorMessage = (error?: string): void => {
  console.error(error)
}
const logError = (error?: ApolloError): void => {
  logErrorMessage(JSON.stringify(error, null, 2))
}

const useLogError = (error?: ApolloError): void => {
  useEffect(() => {
    if (error) {
      logError(error)
    }
  }, [error])
}

export const useMutation = <TData, TVars>(
  graphql: DocumentNode,
  options?: MutationHookOptions<TData, TVars>,
  {
    displayError = true,
    displaySuccess = true,
    successMessage,
  }: {
    backgroundJob?: boolean
    displayError?: boolean
    displaySuccess?: boolean
    successMessage?: string
  } = {
    displayError: true,
    displaySuccess: true,
  },
): MutationTuple<TData, TVars> => {
  const [mutation, { data, loading, error, ...rest }] = useMutationApollo<TData, TVars>(
    graphql,
    options,
  )

  if (displayError) {
    console.error(error?.message)
  }

  useLogError(error)

  return [mutation, { data, loading, error, ...rest }]
}

export const useGeneratedMutation = <TData, TVars>(
  mutation: MutationTuple<TData, TVars>,
  {
    displaySuccess,
    displayError,
    successMessage,
    onSuccess,
    onError,
  }: CallbackOptions & ToastOptions = DEFAULT_TOAST_OPTIONS,
): MutationTuple<TData, TVars> => {
  const [, { data, loading, error }] = mutation
  if (displayError) {
    console.error(error?.message)
  }

  useEffect(() => {
    if (data && !loading && !!onSuccess) {
      onSuccess<TData>(data)
    }
    if (error && !loading && !!onError) {
      onError()
    }
    /** @deprecated */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useLogError(error)
  return mutation
}

export const useMutationWithError = <TData, TVars>(
  graphql: DocumentNode,
  options?: MutationHookOptions<TData, TVars>,
  toastOptions: ToastOptions = DEFAULT_TOAST_OPTIONS,
): MutationTuple<TData, TVars> => useMutation<TData, TVars>(graphql, options, toastOptions)

export const useGeneratedQueryWithError = <TData, TVars>(
  query: QueryResult<TData, TVars>,
): QueryResult<TData, TVars> => {
  const { error } = query

  console.error(error?.message)
  useLogError(error)
  return query
}

export const useQueryWithError = <TData, TVars>(
  graphql: DocumentNode,
  options?: QueryHookOptions<TData, TVars>,
): QueryResult<TData, TVars> => {
  const result = useQueryApollo<TData, TVars>(graphql, options)
  const { error } = result

  console.error(error?.message)
  useLogError(error)

  return result
}

export const useLazyQueryWithError = <TData, TVars>(
  graphql: DocumentNode,
  options?: QueryHookOptions<TData, TVars>,
): QueryTuple<TData, TVars> => {
  const result = useLazyQueryApollo<TData, TVars>(graphql, options)

  const [, { error }] = result

  console.error(error?.message)
  useLogError(error)

  return result
}

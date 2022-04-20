import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type IFood = {
   __typename?: 'Food',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<IFoodType>,
};

export type IFoodItemsOutput = {
   __typename?: 'foodItemsOutput',
  foodItems: Array<IFood>,
};

export type IFoodOutput = {
   __typename?: 'foodOutput',
  food?: Maybe<IFood>,
};

export type IFoodType = 
  'MEET';

export type IMutation = {
   __typename?: 'Mutation',
  deleteFoodItem?: Maybe<IFoodOutput>,
};


export type IMutationDeleteFoodItemArgs = {
  id: Scalars['String']
};

export type IQuery = {
   __typename?: 'Query',
  foodItems?: Maybe<IFoodItemsOutput>,
};

export type IDeleteFoodItemMutationVariables = {
  id: Scalars['String']
};


export type IDeleteFoodItemMutationData = (
  { __typename?: 'Mutation' }
  & { deleteFoodItem: Maybe<(
    { __typename?: 'foodOutput' }
    & { food: Maybe<(
      { __typename?: 'Food' }
      & Pick<IFood, 'id'>
    )> }
  )> }
);

export type IFoodItemsQueryVariables = {};


export type IFoodItemsQueryData = (
  { __typename?: 'Query' }
  & { foodItems: Maybe<(
    { __typename?: 'foodItemsOutput' }
    & { foodItems: Array<(
      { __typename?: 'Food' }
      & Pick<IFood, 'id' | 'name' | 'type'>
    )> }
  )> }
);


export const DeleteFoodItemDocument = gql`
    mutation deleteFoodItem($id: String!) {
  deleteFoodItem(id: $id) {
    food {
      id
    }
  }
}
    `;
export type IDeleteFoodItemMutationFn = Apollo.MutationFunction<IDeleteFoodItemMutationData, IDeleteFoodItemMutationVariables>;

/**
 * __useDeleteFoodItemMutation__
 *
 * To run a mutation, you first call `useDeleteFoodItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFoodItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFoodItemMutation, { data, loading, error }] = useDeleteFoodItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFoodItemMutation(baseOptions?: Apollo.MutationHookOptions<IDeleteFoodItemMutationData, IDeleteFoodItemMutationVariables>) {
        return Apollo.useMutation<IDeleteFoodItemMutationData, IDeleteFoodItemMutationVariables>(DeleteFoodItemDocument, baseOptions);
      }
export type DeleteFoodItemMutationHookResult = ReturnType<typeof useDeleteFoodItemMutation>;
export type DeleteFoodItemMutationResult = Apollo.MutationResult<IDeleteFoodItemMutationData>;
export type DeleteFoodItemMutationOptions = Apollo.BaseMutationOptions<IDeleteFoodItemMutationData, IDeleteFoodItemMutationVariables>;
export const FoodItemsDocument = gql`
    query foodItems {
  foodItems {
    foodItems {
      id
      name
      type
    }
  }
}
    `;

/**
 * __useFoodItemsQuery__
 *
 * To run a query within a React component, call `useFoodItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFoodItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFoodItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFoodItemsQuery(baseOptions?: Apollo.QueryHookOptions<IFoodItemsQueryData, IFoodItemsQueryVariables>) {
        return Apollo.useQuery<IFoodItemsQueryData, IFoodItemsQueryVariables>(FoodItemsDocument, baseOptions);
      }
export function useFoodItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IFoodItemsQueryData, IFoodItemsQueryVariables>) {
          return Apollo.useLazyQuery<IFoodItemsQueryData, IFoodItemsQueryVariables>(FoodItemsDocument, baseOptions);
        }
export type FoodItemsQueryHookResult = ReturnType<typeof useFoodItemsQuery>;
export type FoodItemsLazyQueryHookResult = ReturnType<typeof useFoodItemsLazyQuery>;
export type FoodItemsQueryResult = Apollo.QueryResult<IFoodItemsQueryData, IFoodItemsQueryVariables>;
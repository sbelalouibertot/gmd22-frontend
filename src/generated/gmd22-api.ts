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
  DateTime: any,
  Date: any,
  Time: any,
  JSON: any,
  JSONObject: any,
};



export type IEvent = {
   __typename?: 'Event',
  id?: Maybe<Scalars['String']>,
  type?: Maybe<IEventType>,
  userId?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['DateTime']>,
};

export type IEventInput = {
  id?: Maybe<Scalars['String']>,
  type?: Maybe<IEventType>,
  userId?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['DateTime']>,
};

export type IEventOutput = {
   __typename?: 'EventOutput',
  event?: Maybe<IEvent>,
};

export type IEventsOutput = {
   __typename?: 'EventsOutput',
  events?: Maybe<Array<Maybe<IEvent>>>,
};

export type IEventType = 
  'SHOPPING' |
  'PREPARATION';

export type IFood = {
   __typename?: 'Food',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<IFoodType>,
};

export type IFoodItemOutput = {
   __typename?: 'FoodItemOutput',
  foodItem?: Maybe<IFood>,
};

export type IFoodItemsOutput = {
   __typename?: 'FoodItemsOutput',
  foodItems: Array<IFood>,
};

export type IFoodOutput = {
   __typename?: 'FoodOutput',
  food?: Maybe<IFood>,
};

export type IFoodType = 
  'CEREALS_AND_DERIVED' |
  'FRUIT' |
  'INGREDIENT' |
  'VEGETABLE' |
  'LEGUME' |
  'FATS' |
  'OILS' |
  'NUTS_AND_SEEDS' |
  'FISH' |
  'POTATOES' |
  'AGRICULTURAL_PRODUCTS' |
  'DAIRY_PRODUCTS' |
  'SAUCES' |
  'DRESSING' |
  'SODAS' |
  'DRINKS' |
  'JUICES' |
  'MEATS';



export type IMutation = {
   __typename?: 'Mutation',
  deleteFoodItem?: Maybe<IFoodOutput>,
  newRecipe?: Maybe<IRecipeOutput>,
  replaceRecipe?: Maybe<IRecipeOutput>,
  updateUserPreferences?: Maybe<IUserPreferencesOutput>,
  updateEvent?: Maybe<IEventOutput>,
  toggleCheckShoppingListFood?: Maybe<IFoodOutput>,
};


export type IMutationDeleteFoodItemArgs = {
  id: Scalars['String']
};


export type IMutationNewRecipeArgs = {
  recipeInput?: Maybe<IRecipeInput>
};


export type IMutationReplaceRecipeArgs = {
  id: Scalars['ID'],
  eventId: Scalars['ID']
};


export type IMutationUpdateUserPreferencesArgs = {
  userPreferencesInput?: Maybe<Array<Maybe<IUserPreferenceInput>>>
};


export type IMutationUpdateEventArgs = {
  id?: Maybe<Scalars['ID']>,
  eventInput?: Maybe<IEventInput>
};


export type IMutationToggleCheckShoppingListFoodArgs = {
  id?: Maybe<Scalars['ID']>
};

export type IPagination = {
  first?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
};

export type IPaginationInfos = {
   __typename?: 'PaginationInfos',
  total?: Maybe<Scalars['Int']>,
  first?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
};

export type IPaginationOutput = {
   __typename?: 'PaginationOutput',
  first?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
};

export type IQuery = {
   __typename?: 'Query',
  foodItem?: Maybe<IFoodItemOutput>,
  foodItems?: Maybe<IFoodItemsOutput>,
  nextRecipe?: Maybe<IRecipeOutput>,
  recipes?: Maybe<IRecipesOutput>,
  recipe?: Maybe<IRecipeOutput>,
  shoppingList?: Maybe<IShoppingListOutput>,
  shoppingLists?: Maybe<IShoppingListsOutput>,
  nextShoppingList?: Maybe<IShoppingListOutput>,
  userPreferences?: Maybe<Array<Maybe<IUserPreferencesOutput>>>,
  events?: Maybe<IEventsOutput>,
  event?: Maybe<IEventOutput>,
  nextEvent?: Maybe<IEventOutput>,
};


export type IQueryFoodItemArgs = {
  id: Scalars['ID']
};


export type IQueryNextRecipeArgs = {
  userId: Scalars['ID']
};


export type IQueryRecipeArgs = {
  id: Scalars['ID']
};


export type IQueryShoppingListArgs = {
  id: Scalars['ID']
};


export type IQueryShoppingListsArgs = {
  userId: Scalars['ID']
};


export type IQueryNextShoppingListArgs = {
  userId: Scalars['ID']
};


export type IQueryUserPreferencesArgs = {
  userId?: Maybe<Scalars['ID']>
};


export type IQueryEventsArgs = {
  userId?: Maybe<Scalars['ID']>
};


export type IQueryEventArgs = {
  id?: Maybe<Scalars['ID']>
};


export type IQueryNextEventArgs = {
  userId?: Maybe<Scalars['ID']>
};

export type IRecipe = {
   __typename?: 'Recipe',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  preparationDuration?: Maybe<Scalars['Int']>,
  cookingDuration?: Maybe<Scalars['Int']>,
};

export type IRecipeInput = {
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  preparationDuration?: Maybe<Scalars['Int']>,
  cookingDuration?: Maybe<Scalars['Int']>,
};

export type IRecipeOutput = {
   __typename?: 'RecipeOutput',
  recipe?: Maybe<IRecipe>,
};

export type IRecipesOutput = {
   __typename?: 'RecipesOutput',
  recipes?: Maybe<Array<Maybe<IRecipe>>>,
};

export type IShoppingList = {
   __typename?: 'ShoppingList',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type IShoppingListOutput = {
   __typename?: 'ShoppingListOutput',
  shoppingList?: Maybe<IShoppingList>,
};

export type IShoppingListsOutput = {
   __typename?: 'ShoppingListsOutput',
  shoppingLists?: Maybe<Array<Maybe<IShoppingList>>>,
};

export type ISortDirection = 
  'asc' |
  'desc';


export type IUserPreference = {
   __typename?: 'UserPreference',
  id?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['String']>,
  type?: Maybe<IUserPreferenceType>,
  value?: Maybe<Scalars['Int']>,
};

export type IUserPreferenceInput = {
  id?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['String']>,
  type?: Maybe<IUserPreferenceType>,
  value?: Maybe<Scalars['Int']>,
};

export type IUserPreferencesOutput = {
   __typename?: 'UserPreferencesOutput',
  userPreferences?: Maybe<Array<Maybe<IUserPreference>>>,
};

export type IUserPreferenceType = 
  'MAX_RECIPES_PER_WEEK' |
  'SHOPPING_WEEKS_INTERVAL';

export type IDeleteFoodItemMutationVariables = {
  id: Scalars['String']
};


export type IDeleteFoodItemMutationData = (
  { __typename?: 'Mutation' }
  & { deleteFoodItem: Maybe<(
    { __typename?: 'FoodOutput' }
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
    { __typename?: 'FoodItemsOutput' }
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
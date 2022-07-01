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
  id: Scalars['String'],
  type: IEventType,
  userId?: Maybe<Scalars['String']>,
  date: Scalars['DateTime'],
  nextRecipe?: Maybe<IRecipe>,
  recipes?: Maybe<Array<IRecipe>>,
  shoppingList?: Maybe<IShoppingList>,
};

export type IEventOutput = {
   __typename?: 'EventOutput',
  event?: Maybe<IEvent>,
};

export type IEventsOutput = {
   __typename?: 'EventsOutput',
  events: Array<IEvent>,
};

export type IEventType = 
  'SHOPPING' |
  'PREPARATION' |
  'PERIOD_START' |
  'PERIOD_END';

export type IFood = {
   __typename?: 'Food',
  id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<IFoodType>,
  recipes?: Maybe<Array<Maybe<IRecipe>>>,
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
  updateEventDate?: Maybe<IEventOutput>,
  deleteFoodItem?: Maybe<IFoodOutput>,
  newRecipe?: Maybe<IRecipeOutput>,
  replaceRecipe?: Maybe<IRecipeEventOutput>,
  toggleCheckShoppingListFood?: Maybe<IShoppingListFoodOutput>,
  updateUserPreferences?: Maybe<IUserPreferencesOutput>,
};


export type IMutationUpdateEventDateArgs = {
  id?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['DateTime']>
};


export type IMutationDeleteFoodItemArgs = {
  id: Scalars['String']
};


export type IMutationNewRecipeArgs = {
  recipeInput?: Maybe<IRecipeInput>
};


export type IMutationReplaceRecipeArgs = {
  recipeId: Scalars['ID'],
  eventId: Scalars['ID']
};


export type IMutationToggleCheckShoppingListFoodArgs = {
  id?: Maybe<Scalars['ID']>
};


export type IMutationUpdateUserPreferencesArgs = {
  userPreferencesInput?: Maybe<Array<Maybe<IUserPreferenceInput>>>
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
  event?: Maybe<IEventOutput>,
  events: IEventsOutput,
  nextEvent?: Maybe<IEventOutput>,
  foodItem?: Maybe<IFoodItemOutput>,
  foodItems?: Maybe<IFoodItemsOutput>,
  nextRecipe?: Maybe<IRecipeOutput>,
  recipe?: Maybe<IRecipeOutput>,
  recipes?: Maybe<IRecipesOutput>,
  foodRecipes?: Maybe<IRecipesOutput>,
  shoppingList?: Maybe<IShoppingListOutput>,
  shoppingLists?: Maybe<IShoppingListsOutput>,
  userPreferences?: Maybe<IUserPreferencesOutput>,
};


export type IQueryEventArgs = {
  id?: Maybe<Scalars['ID']>
};


export type IQueryEventsArgs = {
  userId?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['DateTime']>,
  onlyCurrentPeriod?: Maybe<Scalars['Boolean']>,
  type?: Maybe<IEventType>
};


export type IQueryNextEventArgs = {
  userId?: Maybe<Scalars['ID']>,
  type?: Maybe<IEventType>
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


export type IQueryFoodRecipesArgs = {
  foodId: Scalars['ID']
};


export type IQueryShoppingListArgs = {
  id: Scalars['ID']
};


export type IQueryShoppingListsArgs = {
  userId: Scalars['ID']
};


export type IQueryUserPreferencesArgs = {
  userId?: Maybe<Scalars['ID']>
};

export type IRecipe = {
   __typename?: 'Recipe',
  id: Scalars['String'],
  name: Scalars['String'],
  preparationDuration: Scalars['Int'],
  cookingDuration: Scalars['Int'],
  recipeInstructions?: Maybe<Array<Maybe<IRecipeInstruction>>>,
};

export type IRecipeEvent = {
   __typename?: 'RecipeEvent',
  id?: Maybe<Scalars['ID']>,
  recipeId?: Maybe<Scalars['ID']>,
  eventId?: Maybe<Scalars['ID']>,
  finishedAt?: Maybe<Scalars['DateTime']>,
};

export type IRecipeEventOutput = {
   __typename?: 'RecipeEventOutput',
  recipeEvent?: Maybe<IRecipeEvent>,
};

export type IRecipeInput = {
  name?: Maybe<Scalars['String']>,
  preparationDuration?: Maybe<Scalars['Int']>,
  cookingDuration?: Maybe<Scalars['Int']>,
};

export type IRecipeInstruction = {
   __typename?: 'RecipeInstruction',
  id?: Maybe<Scalars['ID']>,
  description?: Maybe<Scalars['String']>,
  recipeId?: Maybe<Scalars['ID']>,
  duration?: Maybe<Scalars['Int']>,
  foodItems?: Maybe<Array<Maybe<IFood>>>,
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
  id: Scalars['String'],
  name: Scalars['String'],
  shoppingListItems: Array<Maybe<IShoppingListFood>>,
};

export type IShoppingListEvent = {
   __typename?: 'ShoppingListEvent',
  id?: Maybe<Scalars['String']>,
  shoppingListId?: Maybe<Scalars['String']>,
  eventId?: Maybe<Scalars['String']>,
  finishedAt?: Maybe<Scalars['DateTime']>,
  event?: Maybe<IEvent>,
  shoppingList?: Maybe<IShoppingList>,
};

export type IShoppingListEventOutput = {
   __typename?: 'ShoppingListEventOutput',
  shoppingListEvent?: Maybe<IShoppingListEvent>,
};

export type IShoppingListFood = {
   __typename?: 'ShoppingListFood',
  id?: Maybe<Scalars['ID']>,
  shoppingListId?: Maybe<Scalars['ID']>,
  foodId?: Maybe<Scalars['ID']>,
  isChecked?: Maybe<Scalars['Boolean']>,
  food?: Maybe<IFood>,
};

export type IShoppingListFoodOutput = {
   __typename?: 'ShoppingListFoodOutput',
  shoppingListFood?: Maybe<IShoppingListFood>,
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

export type INextPreparationRecipesQueryVariables = {};


export type INextPreparationRecipesQueryData = (
  { __typename?: 'Query' }
  & { nextEvent: Maybe<(
    { __typename?: 'EventOutput' }
    & { event: Maybe<(
      { __typename?: 'Event' }
      & Pick<IEvent, 'id' | 'date'>
      & { recipes: Maybe<Array<(
        { __typename?: 'Recipe' }
        & Pick<IRecipe, 'id' | 'name' | 'preparationDuration' | 'cookingDuration'>
        & { recipeInstructions: Maybe<Array<Maybe<(
          { __typename?: 'RecipeInstruction' }
          & Pick<IRecipeInstruction, 'id' | 'description' | 'recipeId' | 'duration'>
          & { foodItems: Maybe<Array<Maybe<(
            { __typename?: 'Food' }
            & Pick<IFood, 'id' | 'name' | 'type'>
          )>>> }
        )>>> }
      )>> }
    )> }
  )> }
);

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

export type IFoodItemQueryVariables = {
  foodItemId: Scalars['ID']
};


export type IFoodItemQueryData = (
  { __typename?: 'Query' }
  & { foodItem: Maybe<(
    { __typename?: 'FoodItemOutput' }
    & { foodItem: Maybe<(
      { __typename?: 'Food' }
      & Pick<IFood, 'id' | 'name' | 'type'>
      & { recipes: Maybe<Array<Maybe<(
        { __typename?: 'Recipe' }
        & Pick<IRecipe, 'id' | 'name'>
      )>>> }
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

export type ICurrentPeriodEventsQueryVariables = {};


export type ICurrentPeriodEventsQueryData = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventsOutput' }
    & { events: Array<(
      { __typename?: 'Event' }
      & Pick<IEvent, 'id' | 'type' | 'date'>
      & { recipes: Maybe<Array<(
        { __typename?: 'Recipe' }
        & Pick<IRecipe, 'id' | 'name'>
      )>> }
    )> }
  ) }
);

export type INextRecipeEventQueryVariables = {};


export type INextRecipeEventQueryData = (
  { __typename?: 'Query' }
  & { nextEvent: Maybe<(
    { __typename?: 'EventOutput' }
    & { event: Maybe<(
      { __typename?: 'Event' }
      & Pick<IEvent, 'id' | 'type' | 'date'>
      & { recipes: Maybe<Array<(
        { __typename?: 'Recipe' }
        & Pick<IRecipe, 'id' | 'name' | 'preparationDuration' | 'cookingDuration'>
      )>> }
    )> }
  )> }
);

export type IUserPreferencesQueryVariables = {};


export type IUserPreferencesQueryData = (
  { __typename?: 'Query' }
  & { userPreferences: Maybe<(
    { __typename?: 'UserPreferencesOutput' }
    & { userPreferences: Maybe<Array<Maybe<(
      { __typename?: 'UserPreference' }
      & Pick<IUserPreference, 'type' | 'value' | 'id'>
    )>>> }
  )> }
);

export type IDateEventsQueryVariables = {};


export type IDateEventsQueryData = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventsOutput' }
    & { events: Array<(
      { __typename?: 'Event' }
      & Pick<IEvent, 'id' | 'type' | 'date'>
      & { recipes: Maybe<Array<(
        { __typename?: 'Recipe' }
        & Pick<IRecipe, 'id' | 'name' | 'preparationDuration' | 'cookingDuration'>
      )>>, shoppingList: Maybe<(
        { __typename?: 'ShoppingList' }
        & Pick<IShoppingList, 'id' | 'name'>
      )> }
    )> }
  ) }
);

export type ICurrentPeriodRecipeEventsQueryVariables = {};


export type ICurrentPeriodRecipeEventsQueryData = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventsOutput' }
    & { events: Array<(
      { __typename?: 'Event' }
      & Pick<IEvent, 'id'>
      & { recipes: Maybe<Array<(
        { __typename?: 'Recipe' }
        & Pick<IRecipe, 'id' | 'name' | 'preparationDuration' | 'cookingDuration'>
      )>> }
    )> }
  ) }
);

export type IRecipeQueryVariables = {
  recipeId: Scalars['ID']
};


export type IRecipeQueryData = (
  { __typename?: 'Query' }
  & { recipe: Maybe<(
    { __typename?: 'RecipeOutput' }
    & { recipe: Maybe<(
      { __typename?: 'Recipe' }
      & Pick<IRecipe, 'id' | 'name' | 'preparationDuration' | 'cookingDuration'>
      & { recipeInstructions: Maybe<Array<Maybe<(
        { __typename?: 'RecipeInstruction' }
        & Pick<IRecipeInstruction, 'id' | 'description' | 'recipeId' | 'duration'>
        & { foodItems: Maybe<Array<Maybe<(
          { __typename?: 'Food' }
          & Pick<IFood, 'id' | 'name' | 'type'>
        )>>> }
      )>>> }
    )> }
  )> }
);

export type IReplaceRecipeMutationVariables = {
  recipeId: Scalars['ID'],
  eventId: Scalars['ID']
};


export type IReplaceRecipeMutationData = (
  { __typename?: 'Mutation' }
  & { replaceRecipe: Maybe<(
    { __typename?: 'RecipeEventOutput' }
    & { recipeEvent: Maybe<(
      { __typename?: 'RecipeEvent' }
      & Pick<IRecipeEvent, 'id' | 'recipeId' | 'eventId'>
    )> }
  )> }
);

export type ICurrentShoppingListEventQueryVariables = {};


export type ICurrentShoppingListEventQueryData = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventsOutput' }
    & { events: Array<(
      { __typename?: 'Event' }
      & Pick<IEvent, 'id'>
      & { shoppingList: Maybe<(
        { __typename?: 'ShoppingList' }
        & Pick<IShoppingList, 'id' | 'name'>
        & { shoppingListItems: Array<Maybe<(
          { __typename?: 'ShoppingListFood' }
          & Pick<IShoppingListFood, 'id' | 'shoppingListId' | 'foodId' | 'isChecked'>
          & { food: Maybe<(
            { __typename?: 'Food' }
            & Pick<IFood, 'id' | 'name' | 'type'>
          )> }
        )>> }
      )> }
    )> }
  ) }
);

export type IShoppingListQueryVariables = {
  shoppingListId: Scalars['ID']
};


export type IShoppingListQueryData = (
  { __typename?: 'Query' }
  & { shoppingList: Maybe<(
    { __typename?: 'ShoppingListOutput' }
    & { shoppingList: Maybe<(
      { __typename?: 'ShoppingList' }
      & Pick<IShoppingList, 'id' | 'name'>
      & { shoppingListItems: Array<Maybe<(
        { __typename?: 'ShoppingListFood' }
        & Pick<IShoppingListFood, 'id' | 'shoppingListId' | 'foodId' | 'isChecked'>
        & { food: Maybe<(
          { __typename?: 'Food' }
          & Pick<IFood, 'id' | 'name' | 'type'>
        )> }
      )>> }
    )> }
  )> }
);

export type IToggleCheckShoppingListFoodMutationVariables = {
  toggleCheckShoppingListFoodId?: Maybe<Scalars['ID']>
};


export type IToggleCheckShoppingListFoodMutationData = (
  { __typename?: 'Mutation' }
  & { toggleCheckShoppingListFood: Maybe<(
    { __typename?: 'ShoppingListFoodOutput' }
    & { shoppingListFood: Maybe<(
      { __typename?: 'ShoppingListFood' }
      & Pick<IShoppingListFood, 'id' | 'shoppingListId' | 'isChecked'>
    )> }
  )> }
);


export const NextPreparationRecipesDocument = gql`
    query NextPreparationRecipes {
  nextEvent(type: PREPARATION) {
    event {
      id
      date
      recipes {
        id
        name
        preparationDuration
        cookingDuration
        recipeInstructions {
          id
          description
          recipeId
          duration
          foodItems {
            id
            name
            type
          }
        }
      }
    }
  }
}
    `;

/**
 * __useNextPreparationRecipesQuery__
 *
 * To run a query within a React component, call `useNextPreparationRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNextPreparationRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextPreparationRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNextPreparationRecipesQuery(baseOptions?: Apollo.QueryHookOptions<INextPreparationRecipesQueryData, INextPreparationRecipesQueryVariables>) {
        return Apollo.useQuery<INextPreparationRecipesQueryData, INextPreparationRecipesQueryVariables>(NextPreparationRecipesDocument, baseOptions);
      }
export function useNextPreparationRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<INextPreparationRecipesQueryData, INextPreparationRecipesQueryVariables>) {
          return Apollo.useLazyQuery<INextPreparationRecipesQueryData, INextPreparationRecipesQueryVariables>(NextPreparationRecipesDocument, baseOptions);
        }
export type NextPreparationRecipesQueryHookResult = ReturnType<typeof useNextPreparationRecipesQuery>;
export type NextPreparationRecipesLazyQueryHookResult = ReturnType<typeof useNextPreparationRecipesLazyQuery>;
export type NextPreparationRecipesQueryResult = Apollo.QueryResult<INextPreparationRecipesQueryData, INextPreparationRecipesQueryVariables>;
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
export const FoodItemDocument = gql`
    query FoodItem($foodItemId: ID!) {
  foodItem(id: $foodItemId) {
    foodItem {
      id
      name
      type
      recipes {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useFoodItemQuery__
 *
 * To run a query within a React component, call `useFoodItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useFoodItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFoodItemQuery({
 *   variables: {
 *      foodItemId: // value for 'foodItemId'
 *   },
 * });
 */
export function useFoodItemQuery(baseOptions: Apollo.QueryHookOptions<IFoodItemQueryData, IFoodItemQueryVariables>) {
        return Apollo.useQuery<IFoodItemQueryData, IFoodItemQueryVariables>(FoodItemDocument, baseOptions);
      }
export function useFoodItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IFoodItemQueryData, IFoodItemQueryVariables>) {
          return Apollo.useLazyQuery<IFoodItemQueryData, IFoodItemQueryVariables>(FoodItemDocument, baseOptions);
        }
export type FoodItemQueryHookResult = ReturnType<typeof useFoodItemQuery>;
export type FoodItemLazyQueryHookResult = ReturnType<typeof useFoodItemLazyQuery>;
export type FoodItemQueryResult = Apollo.QueryResult<IFoodItemQueryData, IFoodItemQueryVariables>;
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
export const CurrentPeriodEventsDocument = gql`
    query CurrentPeriodEvents {
  events(onlyCurrentPeriod: true) {
    events {
      id
      type
      date
      recipes {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useCurrentPeriodEventsQuery__
 *
 * To run a query within a React component, call `useCurrentPeriodEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentPeriodEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentPeriodEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentPeriodEventsQuery(baseOptions?: Apollo.QueryHookOptions<ICurrentPeriodEventsQueryData, ICurrentPeriodEventsQueryVariables>) {
        return Apollo.useQuery<ICurrentPeriodEventsQueryData, ICurrentPeriodEventsQueryVariables>(CurrentPeriodEventsDocument, baseOptions);
      }
export function useCurrentPeriodEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ICurrentPeriodEventsQueryData, ICurrentPeriodEventsQueryVariables>) {
          return Apollo.useLazyQuery<ICurrentPeriodEventsQueryData, ICurrentPeriodEventsQueryVariables>(CurrentPeriodEventsDocument, baseOptions);
        }
export type CurrentPeriodEventsQueryHookResult = ReturnType<typeof useCurrentPeriodEventsQuery>;
export type CurrentPeriodEventsLazyQueryHookResult = ReturnType<typeof useCurrentPeriodEventsLazyQuery>;
export type CurrentPeriodEventsQueryResult = Apollo.QueryResult<ICurrentPeriodEventsQueryData, ICurrentPeriodEventsQueryVariables>;
export const NextRecipeEventDocument = gql`
    query NextRecipeEvent {
  nextEvent(type: PREPARATION) {
    event {
      id
      type
      date
      recipes {
        id
        name
        preparationDuration
        cookingDuration
      }
    }
  }
}
    `;

/**
 * __useNextRecipeEventQuery__
 *
 * To run a query within a React component, call `useNextRecipeEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useNextRecipeEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextRecipeEventQuery({
 *   variables: {
 *   },
 * });
 */
export function useNextRecipeEventQuery(baseOptions?: Apollo.QueryHookOptions<INextRecipeEventQueryData, INextRecipeEventQueryVariables>) {
        return Apollo.useQuery<INextRecipeEventQueryData, INextRecipeEventQueryVariables>(NextRecipeEventDocument, baseOptions);
      }
export function useNextRecipeEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<INextRecipeEventQueryData, INextRecipeEventQueryVariables>) {
          return Apollo.useLazyQuery<INextRecipeEventQueryData, INextRecipeEventQueryVariables>(NextRecipeEventDocument, baseOptions);
        }
export type NextRecipeEventQueryHookResult = ReturnType<typeof useNextRecipeEventQuery>;
export type NextRecipeEventLazyQueryHookResult = ReturnType<typeof useNextRecipeEventLazyQuery>;
export type NextRecipeEventQueryResult = Apollo.QueryResult<INextRecipeEventQueryData, INextRecipeEventQueryVariables>;
export const UserPreferencesDocument = gql`
    query UserPreferences {
  userPreferences {
    userPreferences {
      type
      value
      id
    }
  }
}
    `;

/**
 * __useUserPreferencesQuery__
 *
 * To run a query within a React component, call `useUserPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserPreferencesQuery(baseOptions?: Apollo.QueryHookOptions<IUserPreferencesQueryData, IUserPreferencesQueryVariables>) {
        return Apollo.useQuery<IUserPreferencesQueryData, IUserPreferencesQueryVariables>(UserPreferencesDocument, baseOptions);
      }
export function useUserPreferencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IUserPreferencesQueryData, IUserPreferencesQueryVariables>) {
          return Apollo.useLazyQuery<IUserPreferencesQueryData, IUserPreferencesQueryVariables>(UserPreferencesDocument, baseOptions);
        }
export type UserPreferencesQueryHookResult = ReturnType<typeof useUserPreferencesQuery>;
export type UserPreferencesLazyQueryHookResult = ReturnType<typeof useUserPreferencesLazyQuery>;
export type UserPreferencesQueryResult = Apollo.QueryResult<IUserPreferencesQueryData, IUserPreferencesQueryVariables>;
export const DateEventsDocument = gql`
    query DateEvents {
  events(onlyCurrentPeriod: true) {
    events {
      id
      type
      date
      recipes {
        id
        name
        preparationDuration
        cookingDuration
      }
      shoppingList {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useDateEventsQuery__
 *
 * To run a query within a React component, call `useDateEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDateEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDateEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDateEventsQuery(baseOptions?: Apollo.QueryHookOptions<IDateEventsQueryData, IDateEventsQueryVariables>) {
        return Apollo.useQuery<IDateEventsQueryData, IDateEventsQueryVariables>(DateEventsDocument, baseOptions);
      }
export function useDateEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IDateEventsQueryData, IDateEventsQueryVariables>) {
          return Apollo.useLazyQuery<IDateEventsQueryData, IDateEventsQueryVariables>(DateEventsDocument, baseOptions);
        }
export type DateEventsQueryHookResult = ReturnType<typeof useDateEventsQuery>;
export type DateEventsLazyQueryHookResult = ReturnType<typeof useDateEventsLazyQuery>;
export type DateEventsQueryResult = Apollo.QueryResult<IDateEventsQueryData, IDateEventsQueryVariables>;
export const CurrentPeriodRecipeEventsDocument = gql`
    query CurrentPeriodRecipeEvents {
  events(onlyCurrentPeriod: true, type: PREPARATION) {
    events {
      id
      recipes {
        id
        name
        preparationDuration
        cookingDuration
      }
    }
  }
}
    `;

/**
 * __useCurrentPeriodRecipeEventsQuery__
 *
 * To run a query within a React component, call `useCurrentPeriodRecipeEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentPeriodRecipeEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentPeriodRecipeEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentPeriodRecipeEventsQuery(baseOptions?: Apollo.QueryHookOptions<ICurrentPeriodRecipeEventsQueryData, ICurrentPeriodRecipeEventsQueryVariables>) {
        return Apollo.useQuery<ICurrentPeriodRecipeEventsQueryData, ICurrentPeriodRecipeEventsQueryVariables>(CurrentPeriodRecipeEventsDocument, baseOptions);
      }
export function useCurrentPeriodRecipeEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ICurrentPeriodRecipeEventsQueryData, ICurrentPeriodRecipeEventsQueryVariables>) {
          return Apollo.useLazyQuery<ICurrentPeriodRecipeEventsQueryData, ICurrentPeriodRecipeEventsQueryVariables>(CurrentPeriodRecipeEventsDocument, baseOptions);
        }
export type CurrentPeriodRecipeEventsQueryHookResult = ReturnType<typeof useCurrentPeriodRecipeEventsQuery>;
export type CurrentPeriodRecipeEventsLazyQueryHookResult = ReturnType<typeof useCurrentPeriodRecipeEventsLazyQuery>;
export type CurrentPeriodRecipeEventsQueryResult = Apollo.QueryResult<ICurrentPeriodRecipeEventsQueryData, ICurrentPeriodRecipeEventsQueryVariables>;
export const RecipeDocument = gql`
    query Recipe($recipeId: ID!) {
  recipe(id: $recipeId) {
    recipe {
      id
      name
      preparationDuration
      cookingDuration
      recipeInstructions {
        id
        description
        recipeId
        duration
        foodItems {
          id
          name
          type
        }
      }
    }
  }
}
    `;

/**
 * __useRecipeQuery__
 *
 * To run a query within a React component, call `useRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeQuery({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useRecipeQuery(baseOptions: Apollo.QueryHookOptions<IRecipeQueryData, IRecipeQueryVariables>) {
        return Apollo.useQuery<IRecipeQueryData, IRecipeQueryVariables>(RecipeDocument, baseOptions);
      }
export function useRecipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IRecipeQueryData, IRecipeQueryVariables>) {
          return Apollo.useLazyQuery<IRecipeQueryData, IRecipeQueryVariables>(RecipeDocument, baseOptions);
        }
export type RecipeQueryHookResult = ReturnType<typeof useRecipeQuery>;
export type RecipeLazyQueryHookResult = ReturnType<typeof useRecipeLazyQuery>;
export type RecipeQueryResult = Apollo.QueryResult<IRecipeQueryData, IRecipeQueryVariables>;
export const ReplaceRecipeDocument = gql`
    mutation ReplaceRecipe($recipeId: ID!, $eventId: ID!) {
  replaceRecipe(recipeId: $recipeId, eventId: $eventId) {
    recipeEvent {
      id
      recipeId
      eventId
    }
  }
}
    `;
export type IReplaceRecipeMutationFn = Apollo.MutationFunction<IReplaceRecipeMutationData, IReplaceRecipeMutationVariables>;

/**
 * __useReplaceRecipeMutation__
 *
 * To run a mutation, you first call `useReplaceRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceRecipeMutation, { data, loading, error }] = useReplaceRecipeMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useReplaceRecipeMutation(baseOptions?: Apollo.MutationHookOptions<IReplaceRecipeMutationData, IReplaceRecipeMutationVariables>) {
        return Apollo.useMutation<IReplaceRecipeMutationData, IReplaceRecipeMutationVariables>(ReplaceRecipeDocument, baseOptions);
      }
export type ReplaceRecipeMutationHookResult = ReturnType<typeof useReplaceRecipeMutation>;
export type ReplaceRecipeMutationResult = Apollo.MutationResult<IReplaceRecipeMutationData>;
export type ReplaceRecipeMutationOptions = Apollo.BaseMutationOptions<IReplaceRecipeMutationData, IReplaceRecipeMutationVariables>;
export const CurrentShoppingListEventDocument = gql`
    query CurrentShoppingListEvent {
  events(onlyCurrentPeriod: true, type: SHOPPING) {
    events {
      id
      shoppingList {
        id
        name
        shoppingListItems {
          id
          shoppingListId
          foodId
          isChecked
          food {
            id
            name
            type
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCurrentShoppingListEventQuery__
 *
 * To run a query within a React component, call `useCurrentShoppingListEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentShoppingListEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentShoppingListEventQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentShoppingListEventQuery(baseOptions?: Apollo.QueryHookOptions<ICurrentShoppingListEventQueryData, ICurrentShoppingListEventQueryVariables>) {
        return Apollo.useQuery<ICurrentShoppingListEventQueryData, ICurrentShoppingListEventQueryVariables>(CurrentShoppingListEventDocument, baseOptions);
      }
export function useCurrentShoppingListEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ICurrentShoppingListEventQueryData, ICurrentShoppingListEventQueryVariables>) {
          return Apollo.useLazyQuery<ICurrentShoppingListEventQueryData, ICurrentShoppingListEventQueryVariables>(CurrentShoppingListEventDocument, baseOptions);
        }
export type CurrentShoppingListEventQueryHookResult = ReturnType<typeof useCurrentShoppingListEventQuery>;
export type CurrentShoppingListEventLazyQueryHookResult = ReturnType<typeof useCurrentShoppingListEventLazyQuery>;
export type CurrentShoppingListEventQueryResult = Apollo.QueryResult<ICurrentShoppingListEventQueryData, ICurrentShoppingListEventQueryVariables>;
export const ShoppingListDocument = gql`
    query ShoppingList($shoppingListId: ID!) {
  shoppingList(id: $shoppingListId) {
    shoppingList {
      id
      name
      shoppingListItems {
        id
        shoppingListId
        foodId
        isChecked
        food {
          id
          name
          type
        }
      }
    }
  }
}
    `;

/**
 * __useShoppingListQuery__
 *
 * To run a query within a React component, call `useShoppingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useShoppingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShoppingListQuery({
 *   variables: {
 *      shoppingListId: // value for 'shoppingListId'
 *   },
 * });
 */
export function useShoppingListQuery(baseOptions: Apollo.QueryHookOptions<IShoppingListQueryData, IShoppingListQueryVariables>) {
        return Apollo.useQuery<IShoppingListQueryData, IShoppingListQueryVariables>(ShoppingListDocument, baseOptions);
      }
export function useShoppingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IShoppingListQueryData, IShoppingListQueryVariables>) {
          return Apollo.useLazyQuery<IShoppingListQueryData, IShoppingListQueryVariables>(ShoppingListDocument, baseOptions);
        }
export type ShoppingListQueryHookResult = ReturnType<typeof useShoppingListQuery>;
export type ShoppingListLazyQueryHookResult = ReturnType<typeof useShoppingListLazyQuery>;
export type ShoppingListQueryResult = Apollo.QueryResult<IShoppingListQueryData, IShoppingListQueryVariables>;
export const ToggleCheckShoppingListFoodDocument = gql`
    mutation ToggleCheckShoppingListFood($toggleCheckShoppingListFoodId: ID) {
  toggleCheckShoppingListFood(id: $toggleCheckShoppingListFoodId) {
    shoppingListFood {
      id
      shoppingListId
      isChecked
    }
  }
}
    `;
export type IToggleCheckShoppingListFoodMutationFn = Apollo.MutationFunction<IToggleCheckShoppingListFoodMutationData, IToggleCheckShoppingListFoodMutationVariables>;

/**
 * __useToggleCheckShoppingListFoodMutation__
 *
 * To run a mutation, you first call `useToggleCheckShoppingListFoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleCheckShoppingListFoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleCheckShoppingListFoodMutation, { data, loading, error }] = useToggleCheckShoppingListFoodMutation({
 *   variables: {
 *      toggleCheckShoppingListFoodId: // value for 'toggleCheckShoppingListFoodId'
 *   },
 * });
 */
export function useToggleCheckShoppingListFoodMutation(baseOptions?: Apollo.MutationHookOptions<IToggleCheckShoppingListFoodMutationData, IToggleCheckShoppingListFoodMutationVariables>) {
        return Apollo.useMutation<IToggleCheckShoppingListFoodMutationData, IToggleCheckShoppingListFoodMutationVariables>(ToggleCheckShoppingListFoodDocument, baseOptions);
      }
export type ToggleCheckShoppingListFoodMutationHookResult = ReturnType<typeof useToggleCheckShoppingListFoodMutation>;
export type ToggleCheckShoppingListFoodMutationResult = Apollo.MutationResult<IToggleCheckShoppingListFoodMutationData>;
export type ToggleCheckShoppingListFoodMutationOptions = Apollo.BaseMutationOptions<IToggleCheckShoppingListFoodMutationData, IToggleCheckShoppingListFoodMutationVariables>;
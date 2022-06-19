import { IFoodType } from '@src/generated/gmd22-api'

export const FOOD_TYPE_TO_STR: Record<IFoodType, string> = {
  AGRICULTURAL_PRODUCTS: 'Produits agricoles',
  CEREALS_AND_DERIVED: 'Céréales et produits dérivés',
  DAIRY_PRODUCTS: 'Produits laitiers',
  DRESSING: '?',
  DRINKS: 'Boissons',
  FATS: 'Matières grasses',
  FISH: 'Poissons',
  FRUIT: 'Fruits',
  INGREDIENT: 'Gâteaux et biscuits apéritifs',
  JUICES: 'Jus',
  LEGUME: 'Légumineuses',
  MEATS: 'Viandes',
  NUTS_AND_SEEDS: 'Noix et graines',
  OILS: 'Huiles',
  POTATOES: 'Pommes de terre',
  SAUCES: 'Sauces et vinaigrette',
  SODAS: 'Sodas',
  VEGETABLE: 'Légumes',
}

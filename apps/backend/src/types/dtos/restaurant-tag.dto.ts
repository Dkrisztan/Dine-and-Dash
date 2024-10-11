export const RestaurantTag: {
  [x: string]:
    | 'BURGER'
    | 'AMERICAN'
    | 'PIZZA'
    | 'SALAD'
    | 'ITALIAN'
    | 'CHICKEN'
    | 'BREAKFAST'
    | 'PASTA'
    | 'ASIAN'
    | 'VEGETARIAN'
    | 'VEGAN'
    | 'SOUP'
    | 'GYROS'
    | 'STREET'
    | 'DESSERT'
    | 'THAI'
    | 'KEBAB'
    | 'SANDWICH'
    | 'JAPANESE'
    | 'MEDITERANEAN'
    | 'MEXICAN'
    | 'SUSHI';
} = {
  BURGER: 'BURGER',
  AMERICAN: 'AMERICAN',
  PIZZA: 'PIZZA',
  SALAD: 'SALAD',
  ITALIAN: 'ITALIAN',
  CHICKEN: 'CHICKEN',
  BREAKFAST: 'BREAKFAST',
  PASTA: 'PASTA',
  ASIAN: 'ASIAN',
  VEGETARIAN: 'VEGETARIAN',
  VEGAN: 'VEGAN',
  SOUP: 'SOUP',
  GYROS: 'GYROS',
  STREET: 'STREET',
  DESSERT: 'DESSERT',
  THAI: 'THAI',
  KEBAB: 'KEBAB',
  SANDWICH: 'SANDWICH',
  JAPANESE: 'JAPANESE',
  MEDITERANEAN: 'MEDITERANEAN',
  MEXICAN: 'MEXICAN',
  SUSHI: 'SUSHI',
};

export type RestaurantTag = (typeof RestaurantTag)[keyof typeof RestaurantTag];

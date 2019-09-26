// @flow
import type { Picture, Location } from '../../components/Model';

export type Category = {
  id: string,
  title: string,
  subtitle: string,
  picture: Picture
};

export type Info = {
  link: string,
  name: string,
};

export type Career = {
  id: string,
  title: string,
  years: number,
  credits: number,
  picture: Picture,
  instructions: string[],
  ingredients: Ingredient[]
};

export type Location = {
  id: string,
  title: string,
  subtitle: string,
  ratings: number,
  reviews: number,
  picture: Picture,
  coordinate: Location,
  address: string,
  city: string,
  country: string,
  description: string,
  price: {
    from: number,
    to: number,
    expensive: number
  },
  openings: {
    from: string,
    to: string
  }
};
export type Visit = {
  title: string,
  content: string
};
export type School = {
  categories: Category[],
  careers: { [category: string]: Career[] },
  locations: Location[]
};

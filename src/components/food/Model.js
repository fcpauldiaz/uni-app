// @flow
import type {Picture, Location} from "../../components/Model";

export type Category = {
    id: string,
    title: string,
    subtitle: string,
    picture: Picture
};

export type Ingredient = {
    checked: boolean,
    name: string,
    quantity: string
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

export type Locations = {
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
export type Food = {
    categories: Category[],
    careers: { [category: string]: Career[] },
    locations: Locations[]
};

import { Maybe } from "@/generated/graphql";

export type SwipeCard = {
    id: string;
    image?: Maybe<string>;
    name: string;
};
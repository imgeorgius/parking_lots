import { Maybe } from "@/generated/graphql";

export type SwipeCard = {
  id: string;
  image?: Maybe<string>;
  title: string;
  description?: string;
};

export enum LotDragDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

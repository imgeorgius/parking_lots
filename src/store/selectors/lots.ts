import { createSelector } from "@reduxjs/toolkit";
import { selectLots } from "./slices";

export const selectAcceptedLots = createSelector(
  selectLots,
  ({ acceptedLots }) => acceptedLots
);

export const selectRejetedLots = createSelector(
  selectLots,
  ({ rejectedLots }) => rejectedLots
);

export const selectLotsOffset = createSelector(
  selectLots,
  ({ offset }) => offset
);

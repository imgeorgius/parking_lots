import { Lot } from "@/generated/graphql";
import {
  addAcceptedLot,
  addRejectedLot,
  AppDispatch,
  removeAcceptedLot,
  removeRejectedLot,
} from "@/store";

export const acceptRejectedLot = (lot: Lot) => (dispatch: AppDispatch) => {
  dispatch(removeRejectedLot(lot.id));
  dispatch(addAcceptedLot(lot));
};

export const rejectAcceptedLot = (lot: Lot) => (dispatch: AppDispatch) => {
  dispatch(removeAcceptedLot(lot.id));
  dispatch(addRejectedLot(lot));
};

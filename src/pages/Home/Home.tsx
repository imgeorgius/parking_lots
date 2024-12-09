import { useCallback, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import SwipeCards from "@/components/SwipeCards/SwipeCards";
import { Lot } from "@/generated/graphql";

import { LotDragDirection, SwipeCard } from "@/types/Lots";
import {
  addAcceptedLot,
  rejectAcceptedLot,
  setOffset,
  selectLotsOffset,
  useAppDispatch,
  useAppSelector,
} from "@/store";

const GET_PARKING_LOTS = gql`
  query GetAllParkingLots($limit: Int, $offset: Int) {
    getAllParkingLots(limit: $limit, offset: $offset) {
      id
      address
      image
      name
      name
      size
      status
    }
  }
`;

const LIMIT = 5;

const Home = () => {
  const dispatch = useAppDispatch();
  const offset = useAppSelector(selectLotsOffset);

  const { loading, error, data, refetch } = useQuery<{
    getAllParkingLots: Lot[];
  }>(GET_PARKING_LOTS, {
    variables: {
      limit: LIMIT,
      offset,
    },
    notifyOnNetworkStatusChange: true,
  });

  const cardsLots = useMemo(
    (): SwipeCard[] =>
      data?.getAllParkingLots?.map(({ id, image, name }) => ({
        id,
        image,
        name,
      })) || [],
    [data?.getAllParkingLots]
  );

  const getLot = useCallback(
    (id: string) => data?.getAllParkingLots?.find((lot) => lot.id === id),
    [data?.getAllParkingLots]
  );

  const onDrag = useCallback(
    (direction: LotDragDirection, card: SwipeCard) => {
      const lot = getLot(card.id);

      if (lot) {
        if (direction === LotDragDirection.RIGHT) {
          dispatch(addAcceptedLot(lot));
        } else if (direction === LotDragDirection.LEFT) {
          dispatch(rejectAcceptedLot(lot));
        }
      }
    },
    [getLot, dispatch]
  );

  const onLoadNextLots = useCallback(() => {
    dispatch(setOffset(offset + LIMIT));
  }, [dispatch, offset]);

  return (
    <SwipeCards
      cards={cardsLots}
      onDragLeft={onDrag.bind(this, LotDragDirection.LEFT)}
      onDragRight={onDrag.bind(this, LotDragDirection.RIGHT)}
      onLastItemSwiped={onLoadNextLots}
      loading={loading}
      error={!!error}
      onLoadNext={onLoadNextLots}
      onRefetch={refetch}
    />
  );
};

export default Home;

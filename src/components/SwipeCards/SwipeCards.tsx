import { useCallback, useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { SwipeCard } from "@/types";
import Card from "@/components/Card";

import styles from "./SwipeCards.module.scss";

type SwipeCardsProps = {
  cards: SwipeCard[];
  onDragLeft: (card: SwipeCard) => void;
  onDragRight: (card: SwipeCard) => void;
  onLastItemSwiped?: () => void;
  loading?: boolean;
  error?: boolean;
  onReject?: () => void;
  onLoadNext?: () => void;
  onRefetch?: () => void;
  onResolve?: () => void;
};

const SwipeCards: React.FC<SwipeCardsProps> = ({
  cards,
  onDragLeft,
  onDragRight,
  onLastItemSwiped,
  loading,
  error,
  onLoadNext,
  onRefetch,
}) => {
  const [cardsList, setCardsList] = useState<SwipeCard[]>([]);

  useEffect(() => {
    setCardsList([...cards]);
  }, [cards]);

  let content = (
    <>
      {cardsList.length
        ? cardsList.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              cards={cardsList}
              setCards={setCardsList}
              onSwipeLeft={onDragLeft}
              onSwipeRight={onDragRight}
              onLoadNext={onLoadNext}
              onLastItemSwiped={onLastItemSwiped}
            />
          ))
        : "No Lots Available"}
    </>
  );

  const onRetry = useCallback(() => {
    if (onRefetch) {
      onRefetch();
    }
  }, [onRefetch]);

  if (error) {
    content = (
      <div>
        <p>Error occurred when loading :(</p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    );
  }

  if (loading) {
    content = <CircularProgress />;
  }

  return <div className={styles.container}>{content}</div>;
};

export default SwipeCards;

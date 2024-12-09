import { useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "motion/react";

import { LotDragDirection, SwipeCard } from "@/types/Lots";
import SwipeButtons from "@/components/SwipeButtons";

import styles from "./Card.module.scss";

type CardProps = {
  card: SwipeCard;
  cards: SwipeCard[];
  index: number;
  isFront?: boolean;
  setCards: React.Dispatch<React.SetStateAction<SwipeCard[]>>;
  onSwipeLeft: (card: SwipeCard) => void;
  onSwipeRight: (card: SwipeCard) => void;
  onLoadNext?: () => void;
  onLastItemSwiped?: () => void;
};

const Card: React.FC<CardProps> = ({
  card,
  cards,
  index,
  setCards,
  onSwipeLeft,
  onSwipeRight,
  onLoadNext,
  onLastItemSwiped,
}) => {
  const x = useMotionValue(0);

  const animation = useAnimation();

  const isFront = card.id === cards[cards.length - 1].id;

  const { id, image, title, description } = card;

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const rotate = useTransform(() => {
    const offset = isFront ? 0.0001 : index % 2 ? 6 : -6;

    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = useCallback(() => {
    if (Math.abs(x.get()) > 100) {
      if (x.get() > 0) {
        onSwipeRight(card);
      } else {
        onSwipeLeft(card);
      }

      if (cards.length === 1 && onLastItemSwiped) {
        onLastItemSwiped();
      }

      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  }, [
    x,
    onSwipeLeft,
    onSwipeRight,
    setCards,
    onLastItemSwiped,
    cards.length,
    id,
  ]);

  const onSwipe = useCallback(
    (direction: LotDragDirection) => {
      animation.start({
        x: direction === LotDragDirection.RIGHT ? 150 : -150,
      });
    },
    [animation]
  );

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        style={{
          x,
          opacity,
          rotate,
          transition: "0.125s transform",
          boxShadow: isFront
            ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
            : undefined,
          scale: isFront ? 1 : 0.98,
        }}
        drag={isFront ? "x" : false}
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        transition={{
          duration: 0.22,
        }}
        animate={animation}
        onDragEnd={handleDragEnd}
        onAnimationComplete={handleDragEnd}
      >
        <img src={image || ""} className={styles.card__image} />

        <div className={styles.card__content}>
          <h6 className={styles.card__title}>{title}</h6>
          {description && <p className={styles.card__description}>{description}</p>}
        </div>
      </motion.div>

      {isFront && (
        <SwipeButtons
          className={styles.swipe__buttons}
          onReject={onSwipe.bind(this, LotDragDirection.LEFT)}
          onResolve={onSwipe.bind(this, LotDragDirection.RIGHT)}
          onReload={onLoadNext}
        />
      )}
    </div>
  );
};

export default Card;

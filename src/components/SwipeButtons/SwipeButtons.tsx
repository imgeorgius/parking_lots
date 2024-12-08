import { Close, Replay, Star } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import classNames from "classnames";

import styles from "./SwipeButtons.module.scss";

type SwipeButtonsProps = {
  className?: string;
  onReject: () => void;
  onReload?: () => void;
  onResolve: () => void;
};

const SwipeButtons: React.FC<SwipeButtonsProps> = ({
  className,
  onReject,
  onReload,
  onResolve,
}) => (
  <div
    className={classNames(styles.swipeButtons, className)}
    onClick={(e) => {
      e.stopPropagation();
      onReject();
    }}
  >
    <IconButton size="large" className={styles.swipeButtons__item}>
      <Close className={styles.swipeButtons__left} />
    </IconButton>

    {onReload && (
      <IconButton
        size="large"
        className={styles.swipeButtons__item}
        onClick={(e) => {
          e.stopPropagation();
          onReload();
        }}
      >
        <Replay className={styles.swipeButtons__replay} />
      </IconButton>
    )}

    <IconButton
      size="large"
      className={styles.swipeButtons__item}
      onClick={(e) => {
        e.stopPropagation();
        onResolve();
      }}
    >
      <Star className={styles.swipeButtons__right} />
    </IconButton>
  </div>
);

export default SwipeButtons;

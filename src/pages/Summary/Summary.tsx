import { useCallback, useMemo, useState } from "react";
import { Modal, Fade } from "@mui/material";

import { Lot, Maybe } from "@/generated/graphql";
import { LotStatus } from "@/constants/Lots";
import {
  useAppSelector,
  selectAcceptedLots,
  selectRejetedLots,
  useAppDispatch,
  acceptRejectedLot,
  rejectAcceptedLot,
} from "@/store";
import LotsTable from "@/components/LotsTable";
import LotsFilters from "@/components/LotsFilters";
import { useLotsFiltered } from "./hooks";

import styles from "./Summary.module.scss";

const Summary = () => {
  const acceptedLots = useAppSelector(selectAcceptedLots);
  const rejectedLots = useAppSelector(selectRejetedLots);

  const dispatch = useAppDispatch();

  const [lotStatus, setLotStatus] = useState<LotStatus>(LotStatus.ACCEPTED);
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const [isModalOpen, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const lots = useMemo(
    () => (lotStatus === LotStatus.ACCEPTED ? acceptedLots : rejectedLots),
    [lotStatus, acceptedLots, rejectedLots]
  );

  const lotsFiltered = useLotsFiltered(lots, sort, filter);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onSetCurrentModalImage = useCallback(
    (imgUrl?: Maybe<string>) => {
      if (imgUrl) {
        setModalImage(imgUrl);
        setOpenModal(true);
      }
    },
    [setModalImage, setOpenModal]
  );

  const onAcceptLot = useCallback(
    (lot: Lot) => {
      dispatch(acceptRejectedLot(lot));
    },
    [dispatch]
  );

  const onRejectLot = useCallback(
    (lot: Lot) => {
      dispatch(rejectAcceptedLot(lot));
    },
    [dispatch]
  );

  return (
    <>
      <LotsFilters
        lotStatus={lotStatus}
        setLotStatus={setLotStatus}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      <LotsTable
        rows={lotsFiltered}
        onSetCurrentModalImage={onSetCurrentModalImage}
        lotStatus={lotStatus}
        onAcceptLot={onAcceptLot}
        onRejectLot={onRejectLot}
      />

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        className={styles.modal}
      >
        <Fade in={isModalOpen} timeout={300}>
          <img src={modalImage} className={styles.modal__image} />
        </Fade>
      </Modal>
    </>
  );
};

export default Summary;

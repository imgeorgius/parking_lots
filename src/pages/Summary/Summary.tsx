import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
  Fade,
  Box,
} from "@mui/material";

import { Lot, Maybe } from "@/generated/graphql";
import { filterOptions, sortOptions } from "@/constants/Lots";
import {
  useAppSelector,
  selectAcceptedLots,
  selectRejetedLots,
  useAppDispatch,
  acceptRejectedLot,
  rejectAcceptedLot,
} from "@/store";
import { useLotsFiltered } from "./hooks";

import styles from "./Summary.module.scss";

enum LotStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

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

  const onSetCurrentModalImage = (imgUrl?: Maybe<string>) => {
    if (imgUrl) {
      setModalImage(imgUrl);
      setOpenModal(true);
    }
  };

  const onResetFilters = () => {
    setFilter("");
    setSort("");
  };

  const onFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const onSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const onAcceptLot = (lot: Lot) => {
    dispatch(acceptRejectedLot(lot));
  };

  const onRejectLot = (lot: Lot) => {
    dispatch(rejectAcceptedLot(lot));
  };

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filters__left}>
          <ToggleButtonGroup
            className={styles["filters__button--toggle"]}
            color="primary"
            value={lotStatus}
            exclusive
            onChange={(_event, value) => setLotStatus(value)}
            aria-label="Platform"
          >
            <ToggleButton value={LotStatus.ACCEPTED}>Accepted</ToggleButton>
            <ToggleButton value={LotStatus.REJECTED}>Rejected</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className={styles.filters__right}>
          <Button
            className={styles["filters__button--reset"]}
            variant="contained"
            onClick={onResetFilters}
          >
            Reset
          </Button>
          <Select
            value={filter}
            onChange={onFilterChange}
            displayEmpty
            size="small"
            sx={{ width: 200 }}
          >
            <MenuItem value="">
              <em>Choose filter</em>
            </MenuItem>
            {filterOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={sort}
            onChange={onSortChange}
            displayEmpty
            size="small"
            sx={{ width: 200 }}
          >
            <MenuItem value="">
              <em>Choose sorting</em>
            </MenuItem>
            {sortOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <Box className={styles.table__wrap}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Size</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lotsFiltered.length > 0 ? (
              lotsFiltered.map((lot) => (
                <TableRow key={lot.id}>
                  <TableCell component="th" scope="row">
                    {lot.image && (
                      <img
                        className={styles.table__image}
                        src={lot.image}
                        onClick={() => onSetCurrentModalImage(lot.image)}
                      />
                    )}
                  </TableCell>
                  <TableCell>{lot.name}</TableCell>
                  <TableCell>{lot.address}</TableCell>
                  <TableCell>{lot.size}</TableCell>
                  <TableCell>
                    {lotStatus === LotStatus.REJECTED ? (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => onAcceptLot(lot)}
                      >
                        Accept
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => onRejectLot(lot)}
                      >
                        Reject
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className={styles.nofound__cell} colSpan={6}>
                  No items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

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

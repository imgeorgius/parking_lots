import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { LotStatus } from "@/constants/Lots";
import { Lot, Maybe } from "@/generated/graphql";

import styles from "./LotsTable.module.scss";

type LotsTableProps = {
  rows: Lot[];
  onSetCurrentModalImage: (imgUrl?: Maybe<string>) => void;
  lotStatus: LotStatus;
  onAcceptLot: (lot: Lot) => void;
  onRejectLot: (lot: Lot) => void;
};

const LotsTable: React.FC<LotsTableProps> = ({
  rows,
  onAcceptLot,
  onRejectLot,
  onSetCurrentModalImage,
  lotStatus,
}) => (
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
        {rows.length > 0 ? (
          rows.map((lot) => (
            <TableRow key={lot.id}>
              <TableCell component="th" scope="row">
                {lot.image && (
                  <div
                    className={styles.table__image__wrap}
                    onClick={() => onSetCurrentModalImage(lot.image)}
                  >
                    <Search className={styles.table__image__icon} />
                    <img className={styles.table__image} src={lot.image} />
                  </div>
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
);

export default LotsTable;

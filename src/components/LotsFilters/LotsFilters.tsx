import {
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { filterOptions, LotStatus, sortOptions } from "@/constants/Lots";

import styles from "./LotsFilters.module.scss";

type LotsFiltersProps = {
  lotStatus: LotStatus;
  setLotStatus: React.Dispatch<React.SetStateAction<LotStatus>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

const LotsFilters: React.FC<LotsFiltersProps> = ({
  lotStatus,
  setLotStatus,
  filter,
  setFilter,
  sort,
  setSort,
}) => {
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

  return (
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
  );
};

export default LotsFilters;

import { ArrowBackIos, Home, List } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import classNames from "classnames";
import { Routes } from "@/constants/Routes";

import styles from "./Header.module.scss";

import logo from "@/assets/logo.png";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === Routes.HOME;

  const goBack = () => navigate(-1);

  return (
    <header className={classNames(styles.header, className)}>
      {isHome ? (
        <Link to="/">
          <IconButton size="large">
            <Home />
          </IconButton>
        </Link>
      ) : (
        <IconButton size="large" onClick={goBack}>
          <ArrowBackIos />
        </IconButton>
      )}

      <img src={logo} className={styles.header__logo} alt="Wemolo" />

      <Link to="/summary">
        <IconButton size="large">
          <List />
        </IconButton>
      </Link>
    </header>
  );
};

export default Header;

import Header from "@/components/Header";

import styles from "./Layout.module.scss";

type LayoutProps = {
  Component: React.ElementType;
};

const Layout: React.FC<LayoutProps> = ({ Component }) => (
  <div className={styles.layout}>
    <Header className={styles.layout__header} />
    <Component />
  </div>
);

export default Layout;

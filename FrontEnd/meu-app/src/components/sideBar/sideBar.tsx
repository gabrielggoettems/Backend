import { Link } from "react-router-dom";
import styles from "./sideBar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>EasyPC</h2>

      <nav className={styles.menu}>
        <Link to="/home">Inicio</Link>
        <Link to="/loja">Loja</Link>
        <Link to="/comparacao">Comparacao</Link>
        <Link to="/carrinho">Carrinho</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;

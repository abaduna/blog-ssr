import Link from "next/link"
import styles from "./navbar.module.css"

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className={styles.navContainer}>
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <Link href="/login/registrarse" className={styles.navLink}>
          Registrate
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/login/signIn" className={styles.navLink}>
          Ingresar sesión
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default Navbar
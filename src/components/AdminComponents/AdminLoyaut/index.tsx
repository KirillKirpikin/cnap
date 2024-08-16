import styles from './loyaut-admin.module.scss';
import { NavLink } from 'react-router-dom';

const AdminLoyaut = () => {

  const setActive = ({isActive}: { isActive: boolean })=> isActive ? `${styles.btn} ${styles.btn_active}` : styles.btn;
  return (
    <div className={styles.loyaut}>
        <NavLink className={setActive} to="online">Онлайн послуги</NavLink>
        <NavLink className={setActive} to="offline">Оффлайн послуги</NavLink>
        <NavLink className={setActive} to="question">Питання-відповіді</NavLink>
        <NavLink className={setActive} to="contacts">Центри послуг</NavLink>
        <NavLink className={setActive} to="news">Новини</NavLink>
        <NavLink className={setActive} to="chat">Чат</NavLink>
    </div>
  )
}

export default AdminLoyaut;

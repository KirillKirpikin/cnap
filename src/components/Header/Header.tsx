import { Link } from 'react-router-dom'
import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
          <Link to='/'>
              <h1>Центр надання адміністративних послуг м. Дніпра</h1>    
          </Link>
        </div>        
    </header>
  )
}

export default Header
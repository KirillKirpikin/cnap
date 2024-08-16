import Spiner from './Spiner'
import styles from './spiner.module.scss'

const Preloader = () => {
  return (
    <div className={styles.proloader}>
        <Spiner w='100%'/>
    </div>
  )
}

export default Preloader
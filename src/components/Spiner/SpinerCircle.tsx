import styles from './spiner.module.scss'

interface IProps{
  w?: string,
  h?: string,
  height?: string,
  mr?:string,
}

const SpinerCircle = ({w, h, height, mr}: IProps) => {
  return (
    <div className={styles.circle} style={{height: height ? height : '100%', marginRight: mr ? mr : 0}}>
        <div className={styles.obj } style={{width: w ? w : '75px', height: h ? h : '75px'}}></div>
    </div>
  )
}

export default SpinerCircle
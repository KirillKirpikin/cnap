import Spiner from "./Spiner";
import styles from "./spiner.module.scss";
const SendLoader = ({ load }: { load: boolean }) => {
    if (load) {
        return (
            <div className={styles.send}>
                <div className={styles.spin}>
                    <Spiner />
                </div>
            </div>
        );
    } else return;
};

export default SendLoader;

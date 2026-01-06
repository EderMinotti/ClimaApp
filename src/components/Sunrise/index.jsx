import styles from "./sunrise.module.css"

export const Sunrise = ({ dados }) => {
    return (
        <div className={styles.sunrise}>
            <p>
                Nascer do sol: {dados.sunrise} | Por do sol: {dados.sunset}
            </p>
        </div>
    )
}
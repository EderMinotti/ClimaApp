import styles from "./containercard.module.css"

export const ContainerCard = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
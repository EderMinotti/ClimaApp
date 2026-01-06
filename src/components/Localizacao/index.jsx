import styles from "./localizacao.module.css"



export const Localizacao = ({ climaPorLocalizacao }) => {
    return <button onClick={climaPorLocalizacao} className={styles.localizacao}>Usar localizacão atual</button>
}
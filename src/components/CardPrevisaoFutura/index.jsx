import styles from "./cardprevisaofutura.module.css"

export const CardPrevisaoFutura = ({dados,diaDaSemana}) => {
    return (
        <div className={styles.card}>
            <h3>{diaDaSemana}</h3>
            <p>({dados.date})</p>
            <img src={`./icons-weather/${dados.condition}.svg`} alt="" />
            <p>{dados.min}/{dados.max}</p>
        </div>
    )
}
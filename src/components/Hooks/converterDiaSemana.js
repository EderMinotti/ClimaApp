
export function converterDiaSemana(data) {
    const [dia, mes, ano] = data.split("/").map(Number)
    const dataConvertida = new Date(ano, mes-1, dia)


    if(
        dataConvertida.getFullYear() !== ano ||
        dataConvertida.getMonth() !== mes-1 ||
        dataConvertida.getDate() !== dia 
    ) {
        return "Data invalida"
    }

    const diaEmNumero = dataConvertida.getDay()
    const diasSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"] 
    const diaObtido = diasSemana[diaEmNumero]

    return diaObtido
    
}
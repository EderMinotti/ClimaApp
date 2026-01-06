import { useState } from "react";
import "./styles.css";

const SearchBar = ({ alterarCidade }) => {

const [cidadeDigitada, setcidadeDigitada] = useState("")

const handleSubmit = (e) => {
  e.preventDefault()
  alterarCidade(cidadeDigitada)
  
  
}

  return (
    <form onSubmit={handleSubmit} className="form-search">
      <label className="search-bar">
        <input 
        value={cidadeDigitada}
        onChange={(e)=>setcidadeDigitada(e.target.value)}
        type="text" 
        placeholder="Digite a cidade"
        />
        <button type="submit">
          <img src="./search.svg" alt="ícone de busca" />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;

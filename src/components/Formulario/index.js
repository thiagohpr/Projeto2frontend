import {useState} from "react";
import axios from "axios";

import "./index.css";
export default function Formulario(props){
    const [titleIngrediente, setTitle] = useState("");
    

    const titleChanged = (event) =>{
        setTitle(event.target.value);
    }


    const CreateIngrediente = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:8000/api/recipes/", {title:titleIngrediente})
            .then((response) => {
                setTitle("");
                props.onSubmitFormulario();
            });
    }

    return (
        <form className="form-card" onSubmit={CreateIngrediente}>
            <input
            className="form-card-title"
            type="text"
            name="titulo"
            placeholder="Título"
            value={titleIngrediente}
            onChange={titleChanged}
            />
            <button className="btn" type="submit">Criar</button>
        </form>
    );
}
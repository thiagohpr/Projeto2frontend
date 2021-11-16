import { useEffect, useState } from "react";
import axios from "axios";
import Ingrediente from "./components/Ingrediente";
import Formulario from "./components/Formulario";
// import Receita from "./components/Receita";
import "./App.css";
import Receita from "./components/Receita";

function App() {

  const [ingredientes, setIngredientes] = useState([]);
  const [lista, setLista] = useState([]);

  const [receitas, setReceitas] = useState([]);


  const callback = (childCallback) =>{setReceitas(childCallback)}
  const loadData = () => {
    axios
      .get("http://localhost:8000/api/recipes/")
      .then((res) => {
        setIngredientes(res.data)
        console.log(res.data)
        var auxiliar=[]
        for (var i in res.data){
          auxiliar.push(res.data[i]['title'])
        }
        var auxiliar2=""
        for (var e in auxiliar){
          var ing = auxiliar[e]
          if (e!=auxiliar.length-1){
            auxiliar2+=ing + ","
          }
          else{
            auxiliar2+=ing
          }
        }
        setLista(auxiliar2)
      });
      console.log(receitas)
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
          <div className="appbar">
            <span className="subtitle">Como a Geladeira, mas online</span>
          </div>
          <main className="container">
            <Formulario onSubmitFormulario={loadData}/>
            <div className="card-container">
              {ingredientes.map((ingrediente) => (
                <Ingrediente key={`ingrediente__${ingrediente.id}`} title={ingrediente.title} id={ingrediente.id} onSubmitFormulario={loadData} callback={callback}>
                </Ingrediente>
              ))}
            </div>
            {/* <div>Parâmetros para a API: <b>{lista}</b></div> */}
            <div>
            {receitas.map((receita) => (
                <Receita link={receita[0]} nome={receita[1]}>
                </Receita>
              ))}

            </div>
          </main>
        </div>
      );
}

export default App;
import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
export default function Ingrediente(props) {
  const pesquisaReceita=(event)=>{
    event.preventDefault();
    var options = {
      method: 'GET',
      url: 'https://tasty.p.rapidapi.com/recipes/list',
      params: {from: '0', size: '20', tags: 'under_30_minutes', q: props.title},
      headers: {
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
        'x-rapidapi-key': '75ab88809dmsh0902c0532bc10ffp17c414jsna1ff3ea2e49c'
      }}
  
    axios.request(options).then(function (response) {
        var lista=[]
        for (var i in response.data.results){
            if (lista.length<3){
              if (response.data.results[i].original_video_url!= null){
                lista.push([response.data.results[i].original_video_url,response.data.results[i].name])}
        }else{break}};
        props.callback(lista)
        props.onSubmitFormulario();
    }).catch(function (error) {
      console.error(error);
    });
  }

  const DeleteIngrediente = (event) => {
    event.preventDefault();
    axios
        .delete(`http://localhost:8000/api/recipes/${props.id}`)
        .then((response) => {
            props.onSubmitFormulario();
        });
}
  return (
    <div className="card">
      <h3 className="card-title">{props.title}</h3>

      <form  onSubmit={DeleteIngrediente}>
      <button className="btn" type="submit">Deletar</button></form>

      <form  onSubmit={pesquisaReceita}>
      <button className="btn" type="submit">Receita</button></form>


      </div>
  );
}
import React from 'react'
import ReactPlayer from 'react-player'
import "./index.css";
export default function Receita(props) {
    return (
        <div className="card-video">
        {props.nome}
        <ReactPlayer url={props.link} className="card-content" controls={true} width={320} height={180}/> </div>)
}



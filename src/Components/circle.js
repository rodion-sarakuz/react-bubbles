import React from 'react';
//
import "./bubbles.css";



export default function circle(props) {
    return (
            <div className="circle" style={{
                backgroundColor: "gray",
                    backgroundImage: 'url("' + props.data.img  + '")'
                }}>
                {props.data.intention ? <span className="name" style={{backgroundColor: props.data.color, opacity: 1}}>{props.data.name}</span> : <span className="name">{props.data.name}</span> }
                <span className="distance">{props.data.distance}</span>



                {props.data.intention ?  <span className="emoji" style={{backgroundColor: props.data.color}}>{props.data.emoji}</span> : ''}
                {props.data.intention ?  <div className="circle-out" style={{borderColor: props.data.color}}></div> : ''}

            </div>
    )



}

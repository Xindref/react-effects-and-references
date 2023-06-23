import React, { useState } from "react";
import "./Card.css";
import defaultCardImage from "./defaultCard.png";

const Card = ({ image }) => {

    const getRandomRotation = () => {
        const minRotation = -35;
        const maxRotation = 35;
        return Math.floor(Math.random() * (maxRotation - minRotation + 1) + minRotation);
    }

    const getRandomOffset = () => {
        const minOffset = -35;
        const maxOffset = 35;
        return Math.floor(Math.random() * (maxOffset - minOffset + 1) + minOffset);
    }

    const [xOffset] = useState(getRandomOffset());
    const [yOffset] = useState(getRandomOffset());
    const [rotation] = useState(getRandomRotation());

    const transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;

    if (image === defaultCardImage) {
        return (
            <img
                className="card"
                src={image}
            ></img>
        )
    } else return (
        <img
            className="card"
            src={image}
            style={{ transform }}
        ></img>
    )
};

export default Card;

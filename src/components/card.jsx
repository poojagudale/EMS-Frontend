import React from "react";
import "./card.css"; 

const Card = ({ title, content, image, footer }) => {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p>{content}</p>
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
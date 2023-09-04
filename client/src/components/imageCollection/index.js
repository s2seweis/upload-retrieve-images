import React from 'react';
import {useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';

import data from "../../assets/json/images.json"


const ImageCollection = () => {
  return (
    <div style={{display:"flex", marginBottom:"100px"}} className="level_1">

      <div style={{display:"flex", margin:"auto", gap:"30px"}} className="level_2">
        {data.map (({id, title, img, link}) => (
          <li key={id}>
            <span>{title}</span>
            <div className="level_3">
              <img style={{height:"150px", width:"auto"}} src={img + '.jpg'} alt={title} />
            </div>
            <a href={link}>Link</a>
          </li>
        ))}
      </div>

    </div>
  );
};

export default ImageCollection;

import React from 'react';
import {useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';

import data from "../../assets/json/images.json"

// was used as a custom hook - .filter method 

// const removeImage = ({ id, name }) => {
//     const items = imageFile[name].filter((item) => item.id !== id);

//     setImageFile({
//       ...imageFile,
//       [name]: items
//     });
//   };


const ImageCollection = () => {


    const [state, setState] = useState(data)
    console.log("line:100", state);

    // const deleteById = id => {
    //   setFruits(oldValues => {
    //     return oldValues.filter(fruit => fruit.id !== id)
    //   })
    // }


    const deleteById = id => {
      console.log("line:200", id);
      setState(oldValues => {
        return oldValues.filter(fruit => fruit.id !== id)
      })
    }


  return (
    <div style={{display:"flex", marginBottom:"100px"}} className="level_1">

      <div style={{display:"flex", margin:"auto", gap:"30px"}} className="level_2">
        {state.map (fruit => (
          <li key={fruit.id}>
            <span>{fruit.title}</span>
            <div className="level_3">
              <img style={{height:"150px", width:"auto"}} src={fruit.img + '.jpg'} alt={fruit.title} />
            </div>
            {/* <a href={link}>Link</a> */}
            <Button
            onClick={() => deleteById(fruit.id)}
            >Delete</Button>
          </li>
        ))}
      </div>

    </div>
  );
};

export default ImageCollection;

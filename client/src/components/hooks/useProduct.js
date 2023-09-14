import React, {useEffect, useState, useContext} from 'react';


import  useDidMount  from '../hooks/useDidMount';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import firebase from 'services/firebase';

import { UserContext } from '../../App';

import {useParams} from 'react-router-dom';


const useProduct = (storeProduct, id) => {




  const storedArrayOfObjects = JSON.parse(localStorage.getItem('users'));
  console.log("line:1 - Where???", storedArrayOfObjects);


  const [product, setProduct] = useState(storedArrayOfObjects);
  console.log("line:2", product);
  console.log("line:3", product.find (o => o._id == id));

  const newBuildProductInstance = product.find (o => o._id == id);
  console.log("line:3.1", newBuildProductInstance);


  // console.log("line:20", id);
  console.log("line:4", storeProduct);
  console.log("line:5", id);
  console.log("line:6", storeProduct.find (o => o._id == id));
  const storeProduct1 = storeProduct.find (o => o._id == id)
  console.log("line:7", storeProduct1);
// #

  // get and check if product exists in store

  // const storeProduct = useContext (UserContext);
  // console.log("line21", storeProduct);

  // const doc = storeProduct.find (o => o._id == id)
  // console.log("line:22", doc);

  // const storeProduct = useSelector((state) => state.products.items.find((item) => item.id === id));

  // const [product, setProduct] = useState(storeProduct1);
  // console.log("line:23", product);
  // console.log("line:24", product?._id);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!product || product._id !== id) {
          setLoading(true);
          const doc = await storeProduct.find (o => o._id == id);
          console.log("line:8 ???", doc);

          if (doc.exists) {
            // const data = { ...doc.data(), id: doc.ref.id };
            console.log("line:9 ???" );

            if (didMount) {
              setProduct(storeProduct1);
              setLoading(false);
            }
          } else {
            setError('Product not found.');
          }
        }
      } catch (err) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || 'Something went wrong.');
        }
      }
    })();
  }, [id]);

 






  // const userid = useParams ();
  // console.log("line:50", userid);
  // const id1 = userid.userid

  // useEffect (
  //   () => {
  //     if (storeProduct.length == 0) {
  //       console.log ('no products found');
  //     } else {
  //       // setTotalUsers (users);
  //       setProduct (doc);
  //       console.log('line:500 Where?');
  //     }
  //   },
  //   []
  //   // [users]
  // );

  return { product, isLoading, error, newBuildProductInstance };
};

export default useProduct;

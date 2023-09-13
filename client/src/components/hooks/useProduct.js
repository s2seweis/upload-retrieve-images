import React, {useEffect, useState, useContext} from 'react';


// import { useDidMount } from '../hooks/useDidMount';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import firebase from 'services/firebase';

import { UserContext } from '../../App';

import {useParams} from 'react-router-dom';


const useProduct = (id) => {
  console.log("line:23", id);


  // get and check if product exists in store

  const storeProduct = useContext (UserContext);
  console.log("line22", storeProduct);

  // const storeProduct = useSelector((state) => state.products.items.find((item) => item.id === id));

  const [product, setProduct] = useState(storeProduct);
  console.log("line:24", product);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const didMount = useDidMount(true);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (!product || product.id !== id) {
  //         setLoading(true);
  //         const doc = await firebase.getSingleProduct(id);

  //         if (doc.exists) {
  //           const data = { ...doc.data(), id: doc.ref.id };

  //           if (didMount) {
  //             setProduct(data);
  //             setLoading(false);
  //           }
  //         } else {
  //           setError('Product not found.');
  //         }
  //       }
  //     } catch (err) {
  //       if (didMount) {
  //         setLoading(false);
  //         setError(err?.message || 'Something went wrong.');
  //       }
  //     }
  //   })();
  // }, [id]);

  // const userid = useParams ();
  // console.log("line:50", userid);
  // const id1 = userid.userid

  useEffect (
    () => {
      if (storeProduct.length == 0) {
        console.log ('no products found');
      } else {
        // setTotalUsers (users);
        setProduct (storeProduct.find (o => o._id == id));
        // console.log('line:500', user);
      }
    },
    [product]
    // [users]
  );

  return { product, isLoading, error };
};

export default useProduct;

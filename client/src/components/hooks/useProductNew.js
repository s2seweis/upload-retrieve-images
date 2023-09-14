import React, { useEffect, useState, useContext, useRef } from 'react';


import useDidMount from '../hooks/useDidMount';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import firebase from 'services/firebase';

import { UserContext } from '../../App';

import { useParams } from 'react-router-dom';


const useProductNew = (storeProduct, id) => {



    console.log("line:22", storeProduct);
    console.log("line:23", id);

    const storedArrayOfObjects = JSON.parse(localStorage.getItem('users'));
    console.log("line:33 - Where???", storedArrayOfObjects);


    const [product, setProduct] = useState(storedArrayOfObjects);
    console.log("line:25", product);
    console.log("line:26", product.find (o => o._id == id));


  

    // console.log("line:26", product?._id);
    const [isLoading, setLoading] = useState(true);
    // console.log("line:27", isLoading);
    const [error, setError] = useState(null);
    const didMount = useDidMount(true);



    



   




    //   useEffect(() => {
    //     (async () => {
    //       try {
    //         if (!product || product._id !== id) {
    //           setLoading(true);
    //           const doc = await storeProduct.find (o => o._id == id);
    //           console.log("line:25 ???", doc);

    //           if (doc.exists) {
    //             // const data = { ...doc.data(), id: doc.ref.id };
    //             console.log("line:26 ???" );

    //             if (didMount) {
    //             //   setProduct(storeProduct1);
    //               setLoading(false);
    //             }
    //           } else {
    //             setError('Product not found.');
    //           }
    //         }
    //       } catch (err) {
    //         if (didMount) {
    //           setLoading(false);
    //           setError(err?.message || 'Something went wrong.');
    //         }
    //       }
    //     })();
    //   }, [id]);


    //     useEffect((e) => {
    //     const timer = setTimeout(() => {
    //         setProduct (doc);
    //         setLoading(false)
    //     }, 5000);
    //     return () => clearTimeout(timer);
    //   }, [product]);




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

    return { product, isLoading, error };
};

export default useProductNew;

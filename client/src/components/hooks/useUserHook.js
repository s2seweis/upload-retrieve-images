import { useEffect, useState } from 'react';
import useDidMount from './useDidMount';

const useUserHook = (storeProduct, id) => {

  const storedArrayOfObjects = JSON.parse(localStorage.getItem('users'));
  const [product, setProduct] = useState(storedArrayOfObjects);
  const newBuildProductInstance = product.find(o => o._id == id);
  const storeProduct1 = storeProduct.find(o => o._id == id);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!product || product._id !== id) {
          setLoading(true);
          const doc = await storeProduct.find(o => o._id == id);
          if (doc.exists) {

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

  return { product, isLoading, error, newBuildProductInstance };
};

export default useUserHook;

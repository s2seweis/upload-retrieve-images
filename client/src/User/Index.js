import { LoadingOutlined } from '@ant-design/icons';
import  useProduct  from '../components/hooks/useProduct';
import React, { lazy, Suspense } from 'react';
// import { useDispatch } from 'react-redux';
// import { Redirect, withRouter } from 'react-router-dom';
// import { editProduct } from 'redux/actions/productActions';

import {useParams} from 'react-router-dom';


const EditForm = lazy(() => import('../User/EditUserNew'));

const EditUserTop = ({ match }) => {

  const userid = useParams ();
  console.log("line:50", userid.userid);
  const id = userid.userid;

  // console.log("line:40", match);
  // useDocumentTitle('Edit Product | Dign');
  // useScrollTop();

//   the useProduct hook goes and check if the user exists in the store
// ### - pass down the user id already ?
  // const { product, error, isLoading } = useProduct(match.params.id);
  const { product, error, isLoading } = useProduct(userid.userid);
  console.log("line51", product);
  // const dispatch = useDispatch();


//   const onSubmitForm = (updates) => {
//     dispatch(editProduct(product.id, updates));
//   };

  return (
    <div className="product-form-container">
      {/* {error && <Redirect to="/dashboard/products" />} */}
      <h2>Edit Product</h2>
      {product && (
        <Suspense fallback={(
          <div className="loader" style={{ minHeight: '80vh' }}>
            <h6>Loading ... </h6>
            <br />
            <LoadingOutlined />
          </div>
        )}
        >

            {/* ### possible to pass down functions? */}
          <EditForm
            isLoading={isLoading}
            // onSubmit={onSubmitForm}
            product={product}
          />
        </Suspense>
      )}
    </div>
  );
};

// EditUserNew.propTypes = {
//   match: PropType.shape({
//     params: PropType.shape({
//       id: PropType.string
//     })
//   }).isRequired
// };

export default EditUserTop;

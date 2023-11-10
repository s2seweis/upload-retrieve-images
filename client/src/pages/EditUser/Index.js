import { LoadingOutlined } from '@ant-design/icons';
import useProduct from '../../components/hooks/useProduct';
import React, { lazy, Suspense, useEffect, useState, useContext } from 'react';
import { UserContext } from '../../AppRouter';
import { useParams } from 'react-router-dom';

const EditForm2 = lazy(() => import('../../User/PlaygroundEditUser2'));

const EditUserTop = ({ match }) => {

  const storeProduct = useContext(UserContext);
  const userid = useParams();
  const id = userid.userid;
  const { product, error, isLoading, newBuildProductInstance } = useProduct(storeProduct, id);

  return (
    <div className="product-form-container">
      {product && (
        <Suspense fallback={(
          <div className="loader" style={{ minHeight: '80vh' }}>
            <h6>Loading ... </h6>
            <br />
            <LoadingOutlined />
          </div>
        )}
        >
          <EditForm2
            isLoading={isLoading}
            product={newBuildProductInstance}

          />
        </Suspense>
      )}
    </div>
  );
};

export default EditUserTop;

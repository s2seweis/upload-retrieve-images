import { LoadingOutlined } from '@ant-design/icons';
import useUserHook from '../../../components/hooks/useUserHook';
import React, { lazy, Suspense, useContext } from 'react';
import { UserContext } from '../../../AppRouter';
import { useParams } from 'react-router-dom';

const EditUserForm = lazy(() => import('./EditFilesForm'));

const Index = () => {

  const storeProduct = useContext(UserContext);
  const userid = useParams();
  const id = userid.userid;
  const { product, isLoading, newBuildProductInstance } = useUserHook(storeProduct, id);

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
          <EditUserForm
            isLoading={isLoading}
            product={newBuildProductInstance}

          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;

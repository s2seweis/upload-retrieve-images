import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, Link } from 'react-router-dom';
// import { UserContext } from '../../AppRouter';
import './Files.css';

const Files = () => {
  const history = useNavigate();

  // const users = useContext(UserContext);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(data));
  }, [data]);

  // const context = useContext(data);
  const [show, setShow] = useState(false);

  const getUserData = async () => {
    const res = await axios.get('/getfiles', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log('errror');
    } else {
      setData(res.data.getUser);
    }
  };

  const dltUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log('errror');
    } else {
      getUserData();
      setShow(true);
    }
  };

  const onClickEdit = (id) => {
    history(`/editfiles/${id}`);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          User Delete
        </Alert>
      ) : (
        ''
      )}
      <div className="container mt-2">
        <h3 className="text-center mt-2">
          Image/File Upload 
        </h3>
        <div className="text-end">
        <Button variant="primary">
            <Link
              to="/addfiles"
              className="text-decoration-none text-light"
            >
              Add File
            </Link>
          </Button>
        </div>

        <div className="row d-flex justify-content-between align-iteams-center mt-5">
          {data.length > 0
            ? data.map((el) => {
                return (
                  <>
                    <Card
                      style={{
                        width: '22rem',
                        height: 'auto',
                        margin: '20px auto',
                      }}
                      className="mb-3"
                    >
                      <div style={{ margin: 'auto' }}>
                        <img
                          style={{ width: '100px', margin: '20px auto' }}
                          src={`/uploads/${el.imgpath}`}
                        />
                        <img
                          style={{ width: '100px', margin: '20px auto' }}
                          src={el.image}
                        />
                      </div>
                      <h5 style={{ fontSize: '10px', textAlign: 'center' }}>
                        Right - Image:convertToBase64
                      </h5>
                      <Card.Body className="text-center">
                        <Card.Title>User Name : {el.fname}</Card.Title>
                        <Card.Text>
                          Date Added :{moment(el.date).format('L')}
                        </Card.Text>
                        {/* <h4>{el._id}</h4> */}
                        <h4>{el.imgpath}</h4>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                          }}
                        >
                          <Button
                            variant="danger"
                            className=""
                            onClick={() => dltUser(el._id)}
                          >
                            Delete1
                          </Button>
                          <Button
                            variant="danger"
                            className="edit-button"
                            onClick={() => onClickEdit(el._id)}
                          >
                            Edit1
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                );
              })
            : ''}
        </div>
      </div>
    </div>
  );
};

export default Files;

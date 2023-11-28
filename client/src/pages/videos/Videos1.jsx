// Video.js
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
// import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import styles from './Videos.css'; // Import the CSS module

const Video1 = () => {
  const [data, setData] = useState([]);

  const getUserData = async () => {
    const res = await axios.get('/getvideo', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log('error');
    } else {
      setData(res.data.getVideo);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <div className="container mt-2">
        <h3 className="text-center mt-2">Video Upload</h3>
        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/addvideo" className="text-decoration-none text-light">
              Add Video
            </NavLink>
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
                      <Card.Body className="text-center">
                        <Card.Title>Video File : {el.fname}</Card.Title>

                        {/* <h4>{el._id}</h4> */}
                        <h4>{el.imgpath}</h4>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                          }}
                        >
                          <Link
                            to={`/editvideo/${el._id}`}
                            className={styles['video-edit-link']}
                          >
                            Edit
                          </Link>
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

export default Video1;

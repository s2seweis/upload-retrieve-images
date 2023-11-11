// Video.js
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { useNavigate } from 'react-router-dom';
import styles from './Videos.module.css'; // Import the CSS module

const Video = () => {
  const history = useNavigate();
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
    <div className={styles['video-container']}>
      <div className="container mt-2">
        <h3 className={styles['video-header']}>
        Video Upload
        </h3>
        <div className="text-end">
          <Button variant="primary">
            <NavLink
              to="/addvideo"
              className="text-decoration-none text-light"
            >
              Add Video
            </NavLink>
          </Button>

          <div className="row d-flex justify-content-between align-iteams-center mt-5" />

          {data.length > 0
            ? data.map((el, i) => (
              <div key={el._id}>
                <Card className={styles['video-card']}>
                  <div className={styles['video-card-inside']}>
                    <h4>Video</h4>
                    <h4>{el._id}</h4>
                    <h4>{el.imgpath}</h4>
                    <h4>Test</h4>
                    <Link
                      to={`/editvideo/${el._id}`}
                      className={styles['video-edit-link']}
                    >
                      Edit
                    </Link>
                  </div>
                </Card>
              </div>
            ))
            : ''}
        </div>
      </div>
    </div>
  );
};

export default Video;

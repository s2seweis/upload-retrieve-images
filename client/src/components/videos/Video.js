import React, {useEffect, useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import {Link} from 'react-router-dom';

import VideoPlayer from './VideoPlayer';

import {useNavigate, withRouter} from 'react-router-dom';

const Video = () => {
  const history = useNavigate ();

  const [data, setData] = useState ([]);
  console.log ('line:20', data);

  // const[totalusers, setTotalUsers] = useState([]);
  // console.log("line:3", totalusers);

  //   const [show, setShow] = useState (false);

  const getUserData = async () => {
    const res = await axios.get ('/getvideo', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log ('errror');
    } else {
      setData (res.data.getVideo);
    }
  };

  //   const dltUser = async id => {
  //     const res = await axios.delete (`/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (res.data.status === 401 || !res.data) {
  //       console.log ('errror');
  //     } else {
  //       getUserData ();
  //       setShow (true);
  //     }
  //   };

  //   const onClickEdit = id => {
  //     // history.push(`${ADMIN_PRODUCT_OVERVIEW}/${product.id}`);
  //     history (`/editusernew/${id}`);
  //   };

  useEffect (() => {
    getUserData ();
  }, []);

  // useEffect(() => {
  //     setTotalUsers(data)
  // }, [data])

  return (
    <div>

      <div className="container mt-2">
        <h3 className="text-center mt-2">
          MERN(Mango,Express,React,Node) Image Upload Project
        </h3>
        {/* ### */}
        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add User
            </NavLink>
          </Button>

          <div className="row d-flex justify-content-between align-iteams-center mt-5" />

          {data.length > 0
            ? data.map ((el, i) => {
                return (
                  <div>
                    <Card
                      style={{
                        width: '22rem',
                        height: 'auto',
                        margin: '20px auto',
                      }}
                      className="mb-3"
                    >

                      <h4>Video</h4>
                      <h4>{el._id}</h4>
                      <h4>{el.imgpath}</h4>
                      <h4>Test</h4>

                      {/* <video
                        controls // Add the controls attribute to display video controls (play, pause, volume, etc.)
                        width="400" // Set the width of the video element
                        src={`/videos/${el.imgpath}`}
                      /> */}

                      {/* <VideoPlayer videoUrl={`/videos/${el.imgpath}`}></VideoPlayer> */}

                      <Link
                        // to={`/editusernew/${el._id}`}
                        to={`/editvideo/${el._id}`}
                      >
                        Edit
                      </Link>

                    </Card>
                  </div>
                );
              })
            : ''}
        </div>
        {/* ### */}
      </div>
    </div>
  );
};

export default Video;

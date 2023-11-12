import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonItem = () => {
  return (
    <section>
      <h2 className="section-title">
        <Skeleton duration={1} height={30} width={300} />
      </h2>
      <h2 className="sectioan-title">
        <Skeleton duration={1} height={20} width={100} />
      </h2>
      <ul className="list">
        {Array(17)
          .fill()
          .map((item, index) => (
            <li className="card" key={index}>
              <Skeleton height={180} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SkeletonItem;

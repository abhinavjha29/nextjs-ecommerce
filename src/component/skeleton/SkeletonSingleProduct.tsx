import React from "react";
import styles from "./SkeletenSingleProduct.module.css";

const SkeletonSingleProduct: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className={`${styles.skeleton} ${styles.skeletonText}`} />
          <p className={`${styles.skeleton} ${styles.skeletonText}`} />
          <p className={`${styles.skeleton} ${styles.skeletonText}`} />
          <div>
            <h5>Select Size:</h5>
            <div className="btn-group" role="group">
              <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
              <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
              <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
            </div>
          </div>
          <div className="mt-3">
            <p className={`${styles.skeleton} ${styles.skeletonText}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSingleProduct;

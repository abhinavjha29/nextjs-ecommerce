import React from "react";
import styles from "./SkeletenProduct.module.css";

const SkeletonProduct: React.FC = () => {
  return (
    <div className={`card h-100 ${styles.productCard}`}>
      <div className={`card-img-top ${styles.imageWrapper}`}>
        <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
      </div>
      <div className="card-body">
        <h5 className={`${styles.skeleton} ${styles.skeletonText}`} />
        <p className={`${styles.skeleton} ${styles.skeletonText}`} />
        <p className={`${styles.skeleton} ${styles.skeletonText}`} />
      </div>
      <div className="d-flex justify-content-between">
        <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
        <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
      </div>
    </div>
  );
};

export default SkeletonProduct;

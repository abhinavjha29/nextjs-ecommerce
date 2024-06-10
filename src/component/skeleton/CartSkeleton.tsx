import "./CartSkeleton.css";

const CartSkeleton = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Cart</h1>
      <ul className="list-group">
        {[...Array(5)].map((_, index) => (
          <li className="list-group-item" key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div
                  className="skeleton-animation mb-2"
                  style={{ width: "200px", height: "20px" }}
                ></div>
                <div
                  className="skeleton-animation mb-2"
                  style={{ width: "100px", height: "20px" }}
                ></div>
                <div
                  className="skeleton-animation"
                  style={{ width: "100px", height: "20px" }}
                ></div>
              </div>
              <div>
                <div
                  className="skeleton-animation"
                  style={{ width: "100px", height: "36px" }}
                ></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-success mt-4">
        <div
          className="skeleton-animation"
          style={{ width: "100px", height: "36px" }}
        ></div>
      </button>

      {/* Modal Skeleton */}
    </div>
  );
};

export default CartSkeleton;

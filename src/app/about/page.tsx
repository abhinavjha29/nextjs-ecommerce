import React from "react";

const Page: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">About Our E-Commerce Project</h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Overview</h2>
          <p className="card-text">
            Our e-commerce project is a comprehensive platform designed to
            provide a seamless shopping experience. It includes an admin panel
            for managing products, orders, and users, as well as a user-friendly
            front end for customers.
          </p>

          <h2 className="card-title mt-4">Features</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Admin Panel:</strong> Manage products, orders, and users
              efficiently.
            </li>
            <li className="list-group-item">
              <strong>Product Management:</strong> Add, update, and delete
              products.
            </li>
            <li className="list-group-item">
              <strong>Order Management:</strong> Track and update order
              statuses.
            </li>
            <li className="list-group-item">
              <strong>User Management:</strong> Manage user roles and access.
            </li>
            <li className="list-group-item">
              <strong>Shopping Cart:</strong> Add products to the cart and
              proceed to checkout.
            </li>
            <li className="list-group-item">
              <strong>Authentication:</strong> Secure login and registration for
              users and admins.
            </li>
          </ul>

          <h2 className="card-title mt-4">Technologies Used</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Backend:</strong> Node.js, Express, TypeScript
            </li>
            <li className="list-group-item">
              <strong>Frontend:</strong> Next.js, React, Redux
            </li>
            <li className="list-group-item">
              <strong>Database:</strong> MongoDB
            </li>
            <li className="list-group-item">
              <strong>Styling:</strong> Bootstrap 5.3
            </li>
          </ul>

          <h2 className="card-title mt-4">Project Structure</h2>
          <p className="card-text">
            The project is organized into different modules for better
            maintainability and scalability. The main components include:
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>API:</strong> RESTful API built with Express and
              TypeScript.
            </li>
            <li className="list-group-item">
              <strong>Client:</strong> Frontend application using Next.js and
              Redux for state management.
            </li>
            <li className="list-group-item">
              <strong>Database:</strong> MongoDB for storing product, order, and
              user data.
            </li>
            <li className="list-group-item">
              <strong>Authentication:</strong> JWT-based authentication for
              secure access.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;

// components/UserTable.tsx
"use client";
import React, { useState } from "react";
// import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "@/app/lib/AxiosClient";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const mutation = useMutation(
    async (updatedUser: User) => {
      // const userData = {
      //   ...updatedUser,
      //   isAdmin: updatedUser.isAdmin === 'true' ? true : false, // Adjust this logic as per your data structure
      // };
      console.log(updatedUser);
      console.log("Updating user:", updatedUser);
      const response = await axiosClient.patch(
        "http://localhost:3004/user/updateprofile",
        updatedUser
      );
      console.log(response);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        toast.success("Updated Succesfully");
        setShowModal(false);
      },
      onError: (err) => {
        console.log(err);
        toast.error("something went wrong!! Please try again");
      },
    }
  );

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSave = () => {
    if (selectedUser) {
      mutation.mutate(selectedUser);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedUser && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="formName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="formName"
                      name="name"
                      value={selectedUser.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="formEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="formEmail"
                      name="email"
                      value={selectedUser.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-check mt-3">
                    <label>Is Admin:</label>
                    <div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="isAdminTrue"
                          name="isAdmin"
                          value="true"
                          checked={selectedUser.isAdmin === true}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="isAdminTrue"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="isAdminFalse"
                          name="isAdmin"
                          value="false"
                          checked={selectedUser.isAdmin === false}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="isAdminFalse"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;

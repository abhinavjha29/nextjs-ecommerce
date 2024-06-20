// pages/admin.tsx
"use client";
import React from "react";

import axios from "axios";
import { useQuery } from "react-query";
import UserTable from "@/component/admin/UserTable";
import { toast } from "react-toastify";
import axiosClient from "@/app/lib/AxiosClient";

const fetchUsers = async () => {
  try {
    const response = await axiosClient.get(
      "http://localhost:3004/user/getalluser"
    );
    console.log(response);
    return response.data.User;
  } catch (error) {
    toast.error("Something went wrong");
    throw new Error();
  }
};

const page: React.FC = () => {
  const { data: users, isLoading, isError } = useQuery(["users"], fetchUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="container">
      <h1 className="my-4">User Management</h1>
      <UserTable users={users} />
    </div>
  );
};

export default page;

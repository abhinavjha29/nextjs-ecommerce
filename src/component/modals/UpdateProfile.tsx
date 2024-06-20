// components/ContactModal.tsx
"use client";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { updateProfile } from "@/app/api/user/route";
import { toast } from "react-toastify";
import { PROFILE } from "@/utils/constants";
import Cookies from "js-cookie";
interface IFormInputs {
  Contact: string;
}

const schema = yup.object().shape({
  Contact: yup
    .string()
    .matches(/^\d+$/, "Contact number must be a number.")
    .required("Contact number is required."),
});

const ContactModal: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = useMutation(updateProfile, {
    onSuccess: (data) => {
      toast.success("Profile Updated Succesfully");
    },
    onError: (err) => {
      toast.error("Something went wrong");
      console.log(err);
    },
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    // Implement your form submission logic here
    // For example, you can send data to an API
    // Then close the modal and reset the form
    mutate(data);
    setShowModal(false);
    Cookies.set(PROFILE, "true");
    reset(); // Reset form fields
    modalRef.current?.dispatchEvent(new Event("hide.bs.modal")); // Close modal
  };

  return (
    <>
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button> */}

      {showModal && (
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
          ref={modalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Update Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.Contact ? "is-invalid" : ""
                      }`}
                      id="contactNumber"
                      {...register("Contact")}
                    />
                    {errors.Contact && (
                      <div className="invalid-feedback">
                        {errors.Contact.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;

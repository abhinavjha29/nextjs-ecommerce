import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { updateContact, updateProfile } from "@/app/api/user/route";
import { toast } from "react-toastify";
import { PROFILE } from "@/utils/constants";
import Cookies from "js-cookie";
interface ProfileModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}
interface IFormInputs {
  Contact: string;
}
const schema = yup.object().shape({
  Contact: yup
    .string()
    .matches(/^\d+$/, "Contact number must be a number.")
    .required("Contact number is required."),
});

const ProfileModal: React.FC<ProfileModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = useMutation(updateContact, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Profile Updated Succesfully");
      localStorage.setItem(PROFILE, "true");
      Cookies.set(PROFILE, "true");
      setShowModal(false);
    },
    onError: (err) => {
      toast.error("Something went wrong");
      console.log(err);
    },
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

    mutate(data);
    reset(); // Reset form fields
    modalRef.current?.dispatchEvent(new Event("hide.bs.modal")); // Close modal
  };
  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      tabIndex={-1}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Complete Your Profile</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
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
  );
};

export default ProfileModal;

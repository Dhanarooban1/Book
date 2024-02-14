import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [Done, setDone] = useState(false);
  const [UseName, SetName] = useState("");
  const  [isHovered,setIsHovered] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onsubmit = () => {
    setDone(true);
  };

  if (Done) {
    navigate("/", { state: { firstName: watch("FirstName") } });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">Register</div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="card p-3" onSubmit={handleSubmit(onsubmit)}>
            <input
              type="text"
              name="FirstName"
              className="form-control mb-2"
              placeholder="Enter First Name"
              {...register("FirstName", {
                required: "Please enter your first name!",
              })}
            />
            {errors.FirstName && (
              <div className="alert alert-danger">
                {errors.FirstName.message}
              </div>
            )}

            <input
              type="text"
              name="LastName"
              className="form-control mb-2"
              placeholder="Enter Last Name"
              {...register("LastName", {
                required: "Please enter your Last name!",
              })}
            />
            {errors.LastName && (
              <div className="alert alert-danger">
                {errors.LastName.message}
              </div>
            )}

            <input
              type="text"
              name="Email"
              className="form-control mb-2"
              placeholder="Enter Email"
              {...register("Email", {
                required: "Please enter your Email!",
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.Email && (
              <div className="alert alert-danger">{errors.Email.message}</div>
            )}

            <input
              type="password"
              name="password"
              className="form-control mb-2"
              placeholder="Enter your Password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 4,
                  message: "password must be more than 4 characters",
                },
                maxLength: {
                  value: 20,
                  message: "password must be less than 20 characters",
                },
              })}
            />
            {errors.password && (
              <div className="alert alert-danger">
                {errors.password.message}
              </div>
            )}
            <button
              className="btn btn-success text-white"
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
                <p className="text-black">  <span className={isHovered ? "hidden" : "inline"}>Hover me</span></p>
            
              <span className={isHovered ? "inline" : "hidden"}>Register</span>
            </button>
          </form>
        </div>
      </div>
      {Done ? <h1>Hello{watch("FirstName")}</h1> : null}
    </div>
  );
}

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import "./auth.css";

const SignUpForm = () => {
   const [errors, setErrors] = useState({});
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const user = useSelector((state) => state.session.user);
   const dispatch = useDispatch();

   const onSignUp = async (e) => {
      e.preventDefault();

      const data = await dispatch(
         signUp(username, email, password, confirmPassword)
      );
      if (data) {
         setErrors(data);
      }
   };

   const updateUsername = (e) => {
      setUsername(e.target.value);
   };

   const updateEmail = (e) => {
      setEmail(e.target.value);
   };

   const updatePassword = (e) => {
      setPassword(e.target.value);
   };

   const updateConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
   };

   if (user) {
      return <Redirect to="/" />;
   }

   return (
      <form className="signup-form auth-form" onSubmit={onSignUp}>
         {errors?.username && <label className="errors">{errors?.username}</label>}
         <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            placeholder="Username"
         ></input>

         {errors?.email && <label className="errors">{errors?.email}</label>}
         <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            placeholder="Email"
         ></input>

         {errors?.password && <label className="errors">{errors?.password}</label>}
         <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            placeholder="Password"
         ></input>

         {errors?.confirm && <label className="errors">{errors?.confirm}</label>}
         <input
            type="password"
            name="confirm"
            onChange={updateConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
         ></input>
         <button type="submit">Sign Up</button>
      </form>
   );
};

export default SignUpForm;

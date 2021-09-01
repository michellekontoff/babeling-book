import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

import "./auth.css";

const LoginForm = () => {
   const [errors, setErrors] = useState([]);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const user = useSelector((state) => state.session.user);
   const dispatch = useDispatch();

   const demoLogin = async () => {
      const data = await dispatch(login("demo@aa.io", "password"));
      if (data) {
         setErrors(data);
      }
   };

   const onLogin = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
         setErrors(data);
      }
   };

   const updateEmail = (e) => {
      setEmail(e.target.value);
   };

   const updatePassword = (e) => {
      setPassword(e.target.value);
   };

   if (user) {
      return <Redirect to="/" />;
   }

   return (
      <form className="login-form auth-form" onSubmit={onLogin}>
         {errors?.email && <label className="errors">{errors?.email}</label>}
         <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
         />

         {errors?.password && <label className="errors">{errors?.password}</label>}
         <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
         />
         <div>
            <button type="submit">Log In</button>
            <button type="button" onClick={demoLogin}>
               Demo
            </button>
         </div>
      </form>
   );
};

export default LoginForm;

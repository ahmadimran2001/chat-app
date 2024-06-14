import React, { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  //The signup function will handle all the user inputs, clientside validation and signup logic
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    // if success = false, it will move out of the signup function
    const sucess = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!sucess) return;

    setLoading(true);
    try {
      //using fetch to call the api

      //before adding proxy in vite.config.js
      // const res = await fetch("http//localhost:5000/api/auth/signup", {

      // after adding proxyin vite.config.js, we remove the http part
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      // response will be data sent
      //initially we have a CORS Error but I have added proxy in vite.config to resolve teh CORS error
      const data = await res.json();
      console.group(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

//clientside validations
function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters ");
    return false;
  }
  return true;
}

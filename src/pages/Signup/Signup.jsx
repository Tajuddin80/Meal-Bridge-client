import { useState, use } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
// import { Helmet } from "react-helmet";
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const { handleEmailSignup, setUser, setEmail, setUsername,handleGoogleSignIn, setPhoto } =
    use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleEmailSignupFunc = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, photourl, email, password } = Object.fromEntries(
      formData.entries()
    );

    const isValidLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    if (!isValidLength || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a special character."
      );
      return;
    }

    setError("");

    try {
      const result = await handleEmailSignup(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photourl,
      });

      const userInfo = { name, photo: photourl, email };

      fetch("http://localhost:3000/adduser", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Signup Successful!",
              showConfirmButton: false,
              timer: 2000,
            });
            setUser(user);
            setUsername(user?.displayName)
            setEmail(user?.email);
            setPhoto(user?.photoURL);
            navigate(from, { replace: true });
          } else {
            throw new Error("Failed to save user data");
          }
        });
    } catch (err) {
      // console.error("Signup error:", err.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Signup Failed",
        text: err.message,
        showConfirmButton: true,
      });
      setError(err.message);
    }
  };



  const handleGoogleClick = async () => {
    try {
      const result = await handleGoogleSignIn();
      const user = result.user;

      const userInfo = {
        name: user?.displayName,
        photo: user?.photoURL,
        email: user?.email,
      };

      await fetch("http://localhost:3000/adduser", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Google Sign-in Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            setUser(user);
            setSuccess("Google Sign-in Successful");
            navigate(from, { replace: true });
          }
        });
    } catch (error) {
      setError(error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Sign-in Failed",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 my-20 rounded-md shadow sm:p-8 bg-base-100 text-base-content">
            {/* <Helmet>
                <title>Plant Book 🌱 Register</title>
            </Helmet> */}
      <h2 className="mb-3 text-3xl font-semibold text-center">
        Register your account
      </h2>

      <div className="my-6 space-y-4">
        <button
          onClick={handleGoogleClick}
          aria-label="Register with Google"
          className="flex items-center justify-center w-full p-4 space-x-4 btn border rounded-md border-neutral text-base-content"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
          </svg>
          <p>Register with Google</p>
        </button>
      </div>

      <div className="flex items-center w-full my-4">
        <hr className="w-full border-base-300" />
        <p className="px-3 text-base-content/70">OR</p>
        <hr className="w-full border-base-300" />
      </div>

      <form onSubmit={handleEmailSignupFunc} className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-base-content">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="e.g., Taj Uddin"
              className="w-full px-3 py-2 border rounded-md border-base-300 bg-base-100 text-base-content"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="photourl"
              className="block text-sm text-base-content"
            >
              Photo URL
            </label>
            <input
              type="text"
              name="photourl"
              id="photourl"
              required
              placeholder="https://example.com/photo.jpg"
              className="w-full px-3 py-2 border rounded-md border-base-300 bg-base-100 text-base-content"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-base-content">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="your@email.com"
              className="w-full px-3 py-2 border rounded-md border-base-300 bg-base-100 text-base-content"
            />
          </div>

       <div className="space-y-2">
      <label
        htmlFor="password"
        className="block text-sm text-base-content"
      >
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          required
          placeholder="********"
          className="w-full px-3 py-2 border rounded-md border-base-300 bg-base-100 text-base-content pr-10"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-content"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
        </div>

        <div className="text-red-500 text-sm text-center">{error}</div>
        <div className="text-green-500 text-sm text-center">{success}</div>

        <button
          type="submit"
          className="w-full px-8 py-3 font-semibold btn cursor-pointer rounded-md bg-primary text-primary-content"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-base-content/70">
          Already have an account?{" "}
          <Link
            to="/signin"
            state={{ from: location.state?.from }}
            className="text-primary font-medium"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

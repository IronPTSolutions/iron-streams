import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { authenticate } from "../../services/stream-service";

function LoginScreen() {
  const navigation = useNavigate();
  const value = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleLogin = (data) => {
    authenticate(data)
      .then((data) => {
        value.setUser(data);
        navigation("/");
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          console.log(errors);
          Object.keys(error.response.data.errors).forEach((error) => {
            setError(error, { message: errors[error].message });
          });
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-user fa-fw"></i>
          </span>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email..."
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-key fa-fw"></i>
          </span>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password..."
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <div className="d-grid mt-2">
          <button className="btn btn-primary" type="submit" disabled={!isValid}>
            Login
          </button>

          <a
            className="btn btn-danger mt-2"
            href="http://localhost:3001/api/v1/authenticate/slack"
          >
            <i className="fa fa-slack me-2"></i>
            Login with Slack
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;

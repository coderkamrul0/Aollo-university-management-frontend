import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });

  
  const [login, { data, error }] = useLoginMutation();
  console.log("data ==>", data);
  console.log("error ==>", error);

  const onSubmit = (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "300px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ marginBottom: "10px", width: "100%" }}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            {...register("id")}
            style={{
              padding: "8px",
              boxSizing: "border-box",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px", width: "100%" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            {...register("password")}
            style={{
              padding: "8px",
              boxSizing: "border-box",
              width: "100%",
            }}
          />
        </div>
        <Button htmlType="submit" style={{ width: "100%" }}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

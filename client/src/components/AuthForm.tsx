import { useState } from "react";
import Button from "../UI/Button";
import Input from "./Input";
import { routes } from "../router/routes";
import { useNavigate } from "react-router";

const AuthForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isAccountExists, setIsAccountExists] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    fetch("http://localhost:5001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          sessionStorage.setItem("isLogedIn", JSON.stringify(true));
          const data = await res.json();
          console.log(data);

          sessionStorage.setItem("userId", JSON.stringify(data.userId));
          navigate(routes.MAIN);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      alert("Please fill in all fields");
      return;
    }

    let id;
    const interests = null;
    const picture = null;

    await fetch("http://localhost:5001/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (res.status === 201) {
          sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
          const data = await res.json();
          console.log(data);

          id = data.userId;

          sessionStorage.setItem("userId", JSON.stringify(data.userId));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`http://localhost:5001/api/v1/profile?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, interests, picture }),
    })
      .then(async (res) => {
        if (res.status === 201) {
          navigate(routes.MAIN);
        }
      })
      .catch((err) => {
        window.alert(err);
        console.log(err);
      });
  };

  const handleSubmit = () => {
    isAccountExists ? handleLogin() : handleRegister();
  };

  return (
    <div className="bg-lime-600 border-gray-200 py-8 px-6 rounded-2xl flex flex-col items-center gap-4 w-2xl border-lime-200">
      {!isAccountExists && (
        <Input
          placeholder={"name"}
          type="text"
          changeHandler={(value) => setName(value as string)}
        />
      )}
      <Input
        placeholder={"email"}
        type="text"
        changeHandler={(value) => setEmail(value as string)}
      />
      <Input
        placeholder={"password"}
        type="text"
        changeHandler={(value) => setPassword(value as string)}
      />
      <div className="flex gap-2">
        <Button callback={handleSubmit}>Submit</Button>
        {!isAccountExists ? (
          <Button callback={() => setIsAccountExists(true)}>
            Already have an account?
          </Button>
        ) : (
          <Button callback={() => setIsAccountExists(false)}>
            Don't have an account?
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;

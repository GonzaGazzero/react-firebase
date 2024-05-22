import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard");
      }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const credentialUser = await login({ email, password });
            console.log(credentialUser);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Ingrese email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Ingrese constraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </>
    )
};

export default Login;

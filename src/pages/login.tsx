import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useLogin } from "../context/Login";

const Login = () => {
    const { signIn } = useLogin();
    const router = useRouter();
    const [formData, setFormData] = useState({
        user: undefined,
        password: undefined
    });
    const [isButtonDisabled, setButtonDisabled] = useState(!formData.password || !formData.user);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

        setButtonDisabled(!formData.user || !formData.password);
    }

    const handleSubmit = async (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        await signIn(formData.user, formData.password);
        router.push('/books');
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <form style={{
                background: '#CACACA',
                maxHeight: '40%',
                padding: '56px',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <label>
                    Usuário:
                    <input onChange={handleChange} type="text" name="user" />
                </label>
                <label>
                    Senha:
                    <input onChange={handleChange} type="text" name="password" style={{ marginTop: '16px' }} />
                </label>
                <input onClick={handleSubmit} type="submit" value="login" style={{ marginTop: '16px' }} disabled={isButtonDisabled} />
            </form>
        </div>
    )
}

export default Login;
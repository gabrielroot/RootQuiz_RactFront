import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'

export default function Login() {
    const [loginForm, setLoginForm] = useState({nome: '', senha:''})
    
    function handleSubmit(e){
        console.log(loginForm)
    }
    function handleChange(e){
        setLoginForm({...loginForm, [e.target.name]:e.target.value})
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                        <label>Nome</label>
                        <input value={loginForm.nome} name='nome' onChange={handleChange} placeholder='Nome' />
                    </Form.Field>
                    <Form.Field>
                        <label>Senha</label>
                        <input type='password' value={loginForm.senha} name='senha' onChange={handleChange}  placeholder='Senha' />
                    </Form.Field>
                    <Form.Field>
                </Form.Field>
                <Button color='green' type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

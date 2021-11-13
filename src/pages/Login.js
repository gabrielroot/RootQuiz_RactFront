import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'
import  {useNavigate } from 'react-router-dom'

import services from '../services/api'
import Alert from '../components/Alert'


export default function Login() {
    const [openPortal, setOpenPortal] = useState({open:false,header:'Bem vindo!',type:'positive',message:'Operação bem sucedida.'})
    const [loginForm, setLoginForm] = useState({username: '', password:''})
    const navigate = useNavigate()
    
    async function HandleSubmit(e){

        let response = {}
        try{
            if(loginForm.password.length === 0 || loginForm.username.length === 0){
                setOpenPortal({open:true,header:'Erro!',type:'negative',message:'Preencha todos os campos.'})
                return
            }

            response = await services.Api.post(`/usuario/login`, {
                ...loginForm
            })


            if(response.status === 200){
                localStorage.setItem('userId', response.data.id)
                localStorage.setItem('userName', response.data.nome)
                localStorage.setItem('userRole', response.data.role)
                navigate('/')
            }

        }catch(err){
            setOpenPortal({open:true,header:'Oops!',type:'negative',message:'Usuário ou senha incorretos.'})
        }

    }
    function handleChange(e){
        setLoginForm({...loginForm, [e.target.name]:e.target.value})
    }
    return (
        <div>
            <Alert openPortal={openPortal}/>
            <Form onSubmit={HandleSubmit}>
                <Form.Field>
                        <label>Nome</label>
                        <input value={loginForm.username} name='username' onChange={handleChange} placeholder='Nome' />
                    </Form.Field>
                    <Form.Field>
                        <label>Senha</label>
                        <input type='password' value={loginForm.password} name='password' onChange={handleChange}  placeholder='Senha' />
                    </Form.Field>
                    <Form.Field>
                </Form.Field>
                <Button color='green' type='submit'>Entrar</Button>
                <p>Criar conta</p>
            </Form>
        </div>
    )
}

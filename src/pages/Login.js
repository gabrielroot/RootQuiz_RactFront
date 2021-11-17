import React, {useState} from 'react'
import { 
    Button, 
    Form, 
    Modal,
    Label,
    Input,
    Grid,
    Header
} from 'semantic-ui-react'
import  {useNavigate } from 'react-router-dom'
import {LoginFormStyled, 
        ButtomStyled, 
        LinkSignupStyled, 
        LogoStyled, 
        LoginGridStyled,
        QuizStyled,
        HashTagStyled,
        RootStyled,
        InputStyled
}  from '../styles'

import services from '../services/api'
import Alert from '../components/Alert'


export default function Login() {
    const [openPortal, setOpenPortal] = useState({open:false,header:'Bem vindo!',type:'positive',message:'Operação bem sucedida.'})
    const [loginForm, setLoginForm] = useState({username: '', password:'', nome: ''})
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()

    function handleInputs(e){
        const name = e.target.name
        const value = e.target.value
        setLoginForm({...loginForm,[name]:value})
    }

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
            let status
            status = err.response === undefined?null:err.response.status
            switch (status) {
                case 401:
                    setOpenPortal({open:true,header:'Oops!',type:'negative',message:'Login e/ou senha incorretos.'})
                    break;
                    
                default:
                    setOpenPortal({open:true,header:'Oops!',type:'negative',message:'Erro no servidor.'})
                    break;
            }
        }

    }

    async function registrarUsuario(){
        let response = {}
        try{
            if(loginForm.password.length === 0 || loginForm.username.length === 0 || loginForm.nome.length === 0){
                setOpenPortal({open:true,header:'Erro!',type:'negative',message:'Preencha todos os campos.'})
                return
            }
            response = await services.Api.post(`/usuario/signup`, {
                ...loginForm
            })


            if(response.status === 201){
                setOpenPortal({open:true,header:'Sucesso!',type:'positive',message:'Usuário cadastrado.'})
                setOpenModal(false)
            }

        }catch(err){
            switch (err.response.status) {
                case 409:
                    setOpenPortal({open:true,header:'Oops!',type:'negative',message:'Usuário já existe.'})
                    break;
            
                default:
                    break;
            }
        }
    }

    function handleChange(e){
        setLoginForm({...loginForm, [e.target.name]:e.target.value})
    }
    return (
        <div style={{display: 'grid', height:'100vh'}}>
            <Alert openPortal={openPortal}/>
            <LoginGridStyled centered>
                <Grid.Column stretched width={5}>
                    <Grid.Row verticalAlign='middle'>
                        <LogoStyled onClick={()=>navigate('/')}>
                            <QuizStyled>Quiz</QuizStyled>
                            <HashTagStyled>#</HashTagStyled>
                            <RootStyled>Root</RootStyled>
                        </LogoStyled>
                        <LoginFormStyled onSubmit={HandleSubmit}>
                            <Form.Field>
                                    <label>Login</label>
                                    <input value={loginForm.username} name='username' onChange={handleChange} placeholder='Login' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Senha</label>
                                    <input type='password' value={loginForm.password} name='password' onChange={handleChange}  placeholder='Senha' />
                                </Form.Field>
                                <Form.Field>
                            </Form.Field>
                            <ButtomStyled color='green' type='submit'>Entrar</ButtomStyled>
                            <LinkSignupStyled onClick={()=>setOpenModal(true)}>Criar uma conta</LinkSignupStyled>
                        </LoginFormStyled>
                    </Grid.Row>
                </Grid.Column>
            </LoginGridStyled>
            <Modal
                closeIcon
                open={openModal}
                onClose={()=>{setOpenModal(false); }}
                onOpen={() => setOpenModal(true)}
                >
                <Header icon='add' as='h2' content='Novo Usuário' />
                <Modal.Content>
                    <Grid columns='2' centered>
                        <Grid.Row>
                            <Grid.Column>
                                <Input labelPosition='left' size='big' type='text' placeholder='Login'>
                                    <Label basic>Login</Label>
                                    <InputStyled required name='username' value={loginForm.username} onChange={(e)=>handleInputs(e)} />
                                </Input>

                                <Input labelPosition='left' size='big' type='text' placeholder='Nome'>
                                    <Label basic>Nome</Label>
                                    <InputStyled required name='nome' value={loginForm.nome} onChange={(e)=>handleInputs(e)} />
                                </Input>

                                <Input labelPosition='left' size='big' type='password' placeholder='Senha'>
                                    <Label basic>***</Label>
                                    <InputStyled type='password' required name='password' value={loginForm.password} onChange={(e)=>handleInputs(e)} />
                                </Input>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={()=>setOpenModal(false)} content='Cancelar' icon='cancel' labelPosition='left'/>
                    <Button color='blue' onClick={()=>registrarUsuario()} content='Salvar' icon='save' labelPosition='right'/>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

import React, {useEffect, useState} from 'react'
import { Button, 
         List, 
         Header,
         Icon,
         Modal,
         Grid,
         Label,
         Input,
         Radio
} from 'semantic-ui-react'
import  {useNavigate } from 'react-router-dom'

import services from '../services/api'
import Alert from '../components/Alert'

export default function AdminPessoas(props) {
    const [usuarios, setUsuarios] = useState([])
    const [edit, setEdit] = useState({
        "id": -1,
        "nome": "",
        "username": "",
        "roles": ['ROLE_USER'],
        "password": ""
    })
    const [openPortal, setOpenPortal] = useState({open:false,header:'Sucesso!',type:'positive',message:'Operação bem sucedida.'})
    const navigate = useNavigate()

    useEffect(() => {
        carregarUsuarios()
    },[])

    async function carregarUsuarios(){
        try{

            const response = await services.Api.get(`/usuario`)
            setUsuarios(response.data)
        }catch(err){
            navigate('/login')
        }
    }

    async function apagarPergunta(e, id){
        e.stopPropagation()
        try{

            let updateData = await services.Api.delete(`/usuario/${id}`)
            if(updateData.status === 200){
                setOpenPortal({open:true,header:'Sucesso!',type:'positive',message:'O usuário foi removido.'})
            }
            
            updateData = usuarios.filter(item=> item.id !== id)
            setUsuarios(updateData)
        }catch(err){
            navigate('/login')
        }
    }

    function handleQuestao(e){
        const name = e.target.name
        const value = e.target.value
        setEdit({...edit,[name]:value})
    }

    function carregarDados(pergunta){
        edit.id = pergunta.id
        edit.nome = pergunta.nome
        edit.username = pergunta.username
        edit.roles = [pergunta.roles[0]]


        props.setOpenModal(true)
    }

    function limparDados(){
        edit.id = -1 
        edit.nome = '' 
        edit.username = '' 
        edit.roles = ['ROLE_USER'] 
        edit.password = "" 
    }

    async function salvarPergunta(){
        let isEdit = false
        if(edit.id > -1)
            isEdit = true

        if(edit.nome.length === 0){
            setOpenPortal({open:true,header:'Falha!',type:'negative',message:'Insira um nome.'})
            return
        }

        if(!isEdit && edit.senha.length === 0){
            setOpenPortal({open:true,header:'Falha!',type:'negative',message:'Insira uma senha.'})
            return
        }

        let response
        if(isEdit){
            localStorage.setItem('userRole', edit.roles[0])
            localStorage.setItem('userName', edit.username)
            response = await services.Api.put(`/usuario/${edit.id}`, {
                nome: edit.nome,
                username: edit.username,
                roles: edit.roles,
            })
        }else
        response = await services.Api.post(`/usuario`, {
            ...edit,
        })
        
        if((response.status === 201 && !isEdit) || (response.status === 200 && isEdit)){
            limparDados()
            if(isEdit)
            setOpenPortal({open:true,header:'Sucesso!',type:'positive',message:'O usuário foi alterado.'})
            else
            setOpenPortal({open:true,header:'Sucesso!',type:'positive',message:'O usuário foi criado.'})
            
            carregarUsuarios()
            props.setOpenModal(false)
        }

    }

    return (
        <div>
            <Alert openPortal={openPortal}/>
            <Grid centered columns={1}>
                <Grid.Column textAlign='center' width='15'>
                    <Grid.Row>
                        <Header as='h3'>Painel Root: Gerencie os usuários</Header>
                        <List animated divided verticalAlign='middle'>
                            {usuarios.map((item, i)=>
                                    <List.Item key={item.id}>
                                        <Grid centered columns={4}>
                                            <Grid.Column textAlign='center'>
                                                <Grid.Row>
                                                    <Icon size='big' bordered name='user' />
                                                </Grid.Row>
                                            </Grid.Column>

                                            <Grid.Column textAlign='center'>
                                                <Grid.Row>
                                                    <List.Content>{item.nome}</List.Content>
                                                </Grid.Row>
                                            </Grid.Column>

                                            <Grid.Column textAlign='center'>
                                                <Grid.Row>
                                                    <List.Content>{item.roles[0] === 'ROLE_ADMIN'?<><b>Admin</b></>:<><b>Comum</b></>}</List.Content>
                                                </Grid.Row>
                                            </Grid.Column>
                                            
                                            <Grid.Column textAlign='center'>
                                                <Grid.Row>
                                                    <List.Content floated='right'>
                                                        <Button color='green' onClick={()=>carregarDados(item)} animated='vertical'>
                                                            <Button.Content visible>Editar</Button.Content>
                                                            <Button.Content hidden>
                                                                <Icon name='edit' />
                                                            </Button.Content>
                                                        </Button>
                                                        <Button color='red' onClick={(e)=>apagarPergunta(e,item.id)} animated='fade'>
                                                            <Button.Content visible>Apagar</Button.Content>
                                                            <Button.Content hidden>
                                                                <Icon name='trash' />
                                                            </Button.Content>
                                                        </Button>
                                                    </List.Content>
                                                </Grid.Row>
                                            </Grid.Column>
                                            
                                        </Grid>
                                    </List.Item>
                            )}
                        </List>
                    </Grid.Row>
                </Grid.Column>
            </Grid>

            {props.openModal?
            <Modal
                closeIcon
                open={props.openModal}
                onClose={()=>{props.setOpenModal(false);limparDados()}}
                onOpen={() => props.setOpenModal(true)}
                >
                {edit.id > -1?
                    <Header icon='add' as='h2' content='Editar Usuário' />
                :
                    <Header icon='add' as='h2' content='Novo Usuário' />
                }
                <Modal.Content>
                    <Grid columns='2' centered>
                        <Grid.Row>
                            <Grid.Column>
                                <Input labelPosition='left' size='big' type='text' placeholder='Login'>
                                    <Label basic>Login</Label>
                                    <input required name='username' value={edit.username} onChange={(e)=>handleQuestao(e)} />
                                </Input>
                                <Input labelPosition='left' size='big' type='text' placeholder='Nome'>
                                    <Label basic>Nome</Label>
                                    <input required name='nome' value={edit.nome} onChange={(e)=>handleQuestao(e)} />
                                </Input>
                                <Radio 
                                    toggle 
                                    label="Administrador" 
                                    onClick={()=>setEdit({...edit, roles: edit.roles[0] === 'ROLE_ADMIN'? ['ROLE_USER']: ['ROLE_ADMIN']})} 
                                    checked={edit.roles[0] === 'ROLE_ADMIN'} 
                                />
                                {edit.id > -1?null:
                                    <Input labelPosition='left' size='big' type='password' placeholder='Senha'>
                                        <Label basic>***</Label>
                                        <input required name='password' value={edit.password} onChange={(e)=>handleQuestao(e)} />
                                    </Input>
                                }

                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={()=>props.setOpenModal(false)} content='Cancelar' icon='cancel' labelPosition='left'/>
                    <Button color='blue' content='Salvar' onClick={()=>salvarPergunta()} icon='save' labelPosition='right'/>
                </Modal.Actions>
            </Modal>:null}
        </div>
    )
}

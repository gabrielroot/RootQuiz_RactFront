import React, {useEffect, useState} from 'react'
import { Button,
         List, 
         Header,
         Icon,
         Modal,
         Grid,
         Label,
         Input,
} from 'semantic-ui-react'
import  {useNavigate } from 'react-router-dom'

import services from '../services/api'
import Alert from '../components/Alert'
import {
    GridDataStyled,
    InputStyled,
    InputBigStyled
} from '../styles'

export default function AdminPergunta(props) {
    const [perguntas, setPerguntas] = useState([])
    const [edit, setEdit] = useState({
        "id":-1,
        "questao": '',
        "respostaCorreta": 'a',
    })
    const [respostas, setRespostas] = useState([
        {id: -1, alternativa: ""}, 
        {id: -1, alternativa: ""},
        {id: -1, alternativa: ""}, 
        {id: -1, alternativa: ""}
    ]);
    const [openPortal, setOpenPortal] = useState({open:false,header:'Sucesso!',type:'positive',message:'Operação bem sucedida.'})
    const navigate = useNavigate()


    useEffect(() => {
        carregarPerguntas()
        //eslint-disable-next-line
    },[])

    async function carregarPerguntas(){
        try{
            let response
            if(localStorage.getItem('userRole')==='ROLE_ADMIN')
                response = await services.Api.get(`/pergunta`)
            else
                response = await services.Api.get(`/pergunta/minhas`)
            setPerguntas(response.data)
        }catch(err){
            let status
            status = err.response === undefined?null:err.response.status
            switch (status) {
                case 401:
                    navigate('/login')
                    break;
            
                default:
                    break;
            }
        }

    }

    async function apagarPergunta(e, id){
        e.stopPropagation()
        let updateData = await services.Api.delete(`/pergunta/${id}`)
        if(updateData.status === 200){
            setOpenPortal({open:true,header:'Sucesso!',type:'positive',message:'A pergunta foi removida.'})
        }

        updateData = perguntas.filter(item=> item.id !== id)
        setPerguntas(updateData)
    }

    function handleQuestao(e){
        const name = e.target.name
        const value = e.target.value
        setEdit({...edit,[name]:value})
    }

    function handleRespostas(e,i){
        const value = e.target.value

        let newArray = [...respostas]
        newArray[i].alternativa = value

        setRespostas(newArray)
    }

    function limparDados(){
        edit.id = -1 
            edit.questao = '' 
            edit.respostaCorreta = 'a' 
            
            for(let i=0; i<respostas.length; i++){
                let newArray = [...respostas]
                newArray[i].alternativa = ''
                newArray[i].id = -1
                setRespostas(newArray)
            }
    }

    function carregarDados(pergunta){
        const opcoes = ['a', 'b', 'c', 'd']
        for(let i=0;i<pergunta.respostas.length;i++){
            if(pergunta.respostas[i].alternativa === pergunta.respostaCorreta){
                edit.respostaCorreta = opcoes[i]
            }
            let newArray = respostas
            newArray[i].id = pergunta.respostas[i].id
            newArray[i].alternativa = pergunta.respostas[i].alternativa
            setRespostas(newArray)
        }

        edit.id = pergunta.id
        edit.questao = pergunta.questao


        props.setOpenModal(true)
    }

    async function salvarPergunta(){
        let isEdit = false
        if(edit.id > -1)
            isEdit = true

        if(edit.questao.length === 0){
            setOpenPortal({open:true,header:'Falha!',type:'negative',message:'Insira uma pergunta.'})
            return
        }
        
        
        let isEmpt = false
        for(let i=0; i<respostas.length; i++){
            if(respostas[i].alternativa.length === 0){
                isEmpt = true
            }
        }
        
        if(isEmpt){
            setOpenPortal({open:true,header:'Falha!',type:'negative',message:'Preencha TODAS as alternativas.'})
            return
        }

        switch(edit.respostaCorreta){
            case 'a': edit.respostaCorreta = respostas[0].alternativa; break
            case 'b': edit.respostaCorreta = respostas[1].alternativa; break
            case 'c': edit.respostaCorreta = respostas[2].alternativa; break
            case 'd': edit.respostaCorreta = respostas[3].alternativa; break
            default : break;
        }
        try{

            let response
            if(isEdit)
            response = await services.Api.put(`/pergunta/${edit.id}`, {
                ...edit,
                respostas
            })
            else
            response = await services.Api.post(`/pergunta`, {
                ...edit,
                respostas
            })
            
            if((response.status === 201 && !isEdit) || (response.status === 200 && isEdit)){
                limparDados()
                
                if(isEdit)
                setOpenPortal({open:true,header:'Sucesso!',type:'positive',message:'A pergunta foi alterada.'})
                else
                setOpenPortal({open:true,header:'Sucesso!',type:'positive',message:'A pergunta foi criada.'})

                carregarPerguntas()
                props.setOpenModal(false)
            }
        }catch(err){
            let status
            status = err.response === undefined?null:err.response.status
            switch (status) {
                case 401:
                    navigate('/login')
                    break;
            
                default:
                    break;
            }
        }

    }

    return (
        <div>
            <Alert openPortal={openPortal}/>
            <GridDataStyled centered verticalAlign='middle' columns={1} >
                <Grid.Column textAlign='center'  width='14'>
                    <Grid.Row>
                        <Header as='h3'>Painel Root: Gerencie suas perguntas</Header>
                        <List animated divided verticalAlign='middle'>
                            {perguntas.length === 0
                            ?
                                <p style={{color:'red', marginTop:'100px'}}> Você não cadastrou nenhuma pergunta ainda :/</p>
                            :null
                            }
                            {perguntas.map((item, i)=>
                                    <List.Item key={item.id}>
                                        <Grid centered verticalAlign='middle' columns={3}>
                                            <Grid.Column textAlign='center'>
                                                <Grid.Row>
                                                <Icon size='big' bordered name='question' />
                                                </Grid.Row>
                                            </Grid.Column>
               
                                            <Grid.Column textAlign='center'>
                                                <Grid.Row>
                                                    <List.Content>{item.questao}</List.Content>
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
            </GridDataStyled>

            {props.openModal?
            <Modal
                closeIcon
                open={props.openModal}
                onClose={()=>{props.setOpenModal(false); limparDados()}}
                onOpen={() => props.setOpenModal(true)}
                >
                {edit.id > -1?
                    <Header icon='edit' as='h3' content='Editar Pergunta' />
                :
                    <Header icon='add' as='h3' content='Nova Pergunta' />
                }
                <Modal.Content>
                    <Grid columns='2' centered>
                        <Grid.Row>
                            <Grid.Column>
                                <Input labelPosition='left' size='big' type='text' placeholder='Insira a questão'>
                                    <Label basic>?</Label>
                                    <InputBigStyled required name='questao' value={edit.questao} onChange={(e)=>handleQuestao(e)} />
                                </Input>

                                <Input labelPosition='right' type='text' placeholder='Insira uma alternativa'>
                                    <Label basic>A</Label>
                                    <InputStyled required name='a' value={respostas[0].alternativa} onChange={(e)=>handleRespostas(e, 0)} />
                                    <Button toggle name="respostaCorreta" value="a" active={edit.respostaCorreta === 'a'} onClick={(e)=>handleQuestao(e)}>
                                        Correta
                                    </Button>
                                </Input>
                                <Input labelPosition='right' type='text' placeholder='Insira uma alternativa'>
                                    <Label basic>B</Label>
                                    <InputStyled required name='b' value={respostas[1].alternativa} onChange={(e)=>handleRespostas(e, 1)}/>
                                    <Button toggle name="respostaCorreta" value="b" active={edit.respostaCorreta === 'b'} onClick={(e)=>handleQuestao(e)}>
                                        Correta
                                    </Button>
                                </Input>
                                <Input labelPosition='right' type='text' placeholder='Insira uma alternativa'>
                                    <Label basic>C</Label>
                                    <InputStyled required name='c' value={respostas[2].alternativa} onChange={(e)=>handleRespostas(e, 2)}/>
                                    <Button toggle name="respostaCorreta" value="c" active={edit.respostaCorreta === 'c'} onClick={(e)=>handleQuestao(e)}>
                                        Correta
                                    </Button>
                                </Input>
                                <Input labelPosition='right' type='text' placeholder='Insira uma alternativa'>
                                    <Label basic>D</Label>
                                    <InputStyled required={true} name='d' value={respostas[3].alternativa} onChange={(e)=>handleRespostas(e, 3)}/>
                                    <Button toggle name="respostaCorreta" value="d" active={edit.respostaCorreta === 'd'} onClick={(e)=>handleQuestao(e)}>
                                        Correta
                                    </Button>
                                </Input>
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

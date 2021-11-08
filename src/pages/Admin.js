import React, {useEffect, useState} from 'react'
import { Button, 
         List, 
         Header,
         Icon,
         Modal,
         Grid,
         Label,
         Input
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import Navigation from '../components/Navigation'
import services from '../services/api'

export default function Admin() {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState({})
    const [respostaCorreta, setRespostaCorreta] = useState({'alternativa':'a'})
    const [open, setOpen] = useState(false)

    useEffect(() => {
        carregarPerguntas()
    },[])

    async function carregarPerguntas(){
        const response = await services.Api.get(`/perguntas`)
        setData(response.data)
    }

    async function apagarPergunta(e, id){
        e.stopPropagation()
        let updateData = await services.Api.delete(`/pergunta/${id}`)
        updateData = data.filter(item=> item.id !== id)
        setData(updateData)
    }

    return (
        <div>
            <Navigation />
            <Header as='h3'>PAINEL ROOT: Gerencie suas perguntas</Header>
            <List animated divided verticalAlign='middle'>
                {data.map((item, i)=>
                    <List.Item key={item.id} onClick={()=>setOpen(true)}>
                        <List.Content floated='right'>
                        <Button color='green' icon='edit' content='Editar'/>
                        <Button color='red' onClick={(e)=>apagarPergunta(e,item.id)} icon='trash' content='Apagar'/>
                            </List.Content>
                            <Icon size='big' bordered name='question' />
                        <List.Content>{item.questao}</List.Content>
                    </List.Item>
                )}
            </List>
            <Link to='/'>
                <Button color='grey' size='big' animated>
                    <Button.Content visible>Voltar para o Quiz</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left' />
                    </Button.Content>
                </Button>
            </Link>
            <Button color='green'  onClick={() => setOpen(true)} size='big' animated='fade'>
                <Button.Content visible>Nova Pergunta</Button.Content>
                <Button.Content hidden>
                    <Icon name='add' />
                </Button.Content>
            </Button>

            {open?
            <Modal
                closeIcon
                open={open}
                onClose={()=>setOpen(false)}
                onOpen={() => setOpen(true)}
                >
                <Header icon='add' as='h2' content='Nova Pergunta' />
                <Modal.Content>
                    <Grid columns='2' centered>
                        <Grid.Row>
                            <Grid.Column>
                                <Input labelPosition='left' size='big' type='text' placeholder='Insira a questão'>
                                    <Label basic>?</Label>
                                    <input />
                                </Input>

                                <Input labelPosition='right' type='text' placeholder='Insira uma alternativa'>
                                    <Label basic>A</Label>
                                    <input />
                                    <Button toggle active={respostaCorreta.alternativa === 'a'} onClick={()=>setRespostaCorreta({alternativa: 'a'})}>
                                        Correta
                                    </Button>
                                </Input>
                                <Input labelPosition='right' type='text' placeholder='Insira uma alternativa'>
                                    <Label basic>B</Label>
                                    <input />
                                    <Button toggle active={respostaCorreta.alternativa === 'b'} onClick={()=>setRespostaCorreta({alternativa: 'b'})}>
                                        Correta
                                    </Button>
                                </Input>
                                <Input labelPosition='right' type='text' placeholder='Insira uma alternativa'>
                                    <Label basic>C</Label>
                                    <input />
                                    <Button toggle active={respostaCorreta.alternativa === 'c'} onClick={()=>setRespostaCorreta({alternativa: 'c'})}>
                                        Correta
                                    </Button>
                                </Input>
                                <Input labelPosition='right' type='text' placeholder='Insira uma alternativa'>
                                    <Label basic>D</Label>
                                    <input />
                                    <Button toggle active={respostaCorreta.alternativa === 'd'} onClick={()=>setRespostaCorreta({alternativa: 'd'})}>
                                        Correta
                                    </Button>
                                </Input>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={()=>setOpen(false)} content='Cancelar' icon='cancel' labelPosition='left'/>
                    <Button color='blue' content='Salvar' icon='save' labelPosition='right'/>
                </Modal.Actions>
            </Modal>:null}
        </div>
    )
}

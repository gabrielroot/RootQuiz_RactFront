import React, {useEffect, useState} from 'react'
import { Grid,
         Button,
         Header,
         Modal 
} from 'semantic-ui-react'

import Navigation from '../components/Navigation'
import services from '../services/api'

export default function Quiz() {
    const [data, setData] = useState({})
    const options = ['font', 'bold', 'copyright', 'dochub']
    const [open, setOpen] = useState(false)
    const [resposta, setResposta] = useState('')
    const [userStatistics, setUserStatistics] = useState({})
    

    useEffect(() => {
        proximaPergunta()
    },[])

    async function proximaPergunta(){
        const response = await services.Api.get(`/pergunta/aleatoria`)
        setData(response.data)
    }

    function closeModal(){
        setOpen(false)
        proximaPergunta()
    }

    async function responder (answer){
        await services.Api.post(`/tentativa`, {
            "status": data.respostaCorreta === answer ? true : false,
            "usuario_id": 3,
            "pergunta_id": data.id
        })

        const usuario = await services.Api.get(`/usuario/3`)
        setUserStatistics(usuario.data)

        setOpen(true)
        setResposta(answer)
    }

    return (
        <>
            <Navigation />


            <Grid centered columns={1} >
                <div className='header'>
                    <Grid.Row>
                        <Header as='h2'>{data.questao}</Header>
                    </Grid.Row>
                </div>
                <Grid.Row >
                    <Grid.Column width={8}>
                        <Button.Group vertical labeled icon>
                            {data.id?options.map((item,i)=>
                                    <Button key={data.id+i} onClick={()=>responder(data.respostas[i].alternativa)} size='massive' color='green' icon={item} content={data.respostas[i].alternativa} />
                            ):null}
                            </Button.Group> 
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {open?
            <Modal
                closeIcon
                open={open}
                onClose={closeModal}
                onOpen={() => setOpen(true)}
                >
                <Header icon='slack hash' as='h1' content={data.respostaCorreta === resposta?'ACERTOU':'ERROU'} />
                <Modal.Content>
                    <Grid columns='2' centered>
                        <Grid.Row>
                            {userStatistics.nome?userStatistics.nome:'Nome do Usuário'}
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <p>{new Array(...userStatistics.tentativas).filter(tentativa => tentativa.status === true).length}</p>
                                <p>Acertos</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>{new Array(...userStatistics.tentativas).filter(tentativa => tentativa.status === false).length}</p>
                                <p>Erros</p>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue' onClick={closeModal} content='Próxima pergunta' icon='arrow right' labelPosition='right'/>
                </Modal.Actions>
            </Modal>:null}
        </>
    )
}

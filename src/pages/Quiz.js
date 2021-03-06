import React, {useEffect, useState} from 'react'
import { Grid,
         Button,
         Header,
         Modal 
} from 'semantic-ui-react'
import  {useNavigate } from 'react-router-dom'

import Navigation from '../components/Navigation'
import services from '../services/api'
import {
    PerguntaStyled, 
    ButtonAlternativaStyled,
    DivErroStyled,
    DivAcertoStyled,
    PointsStyled
} from '../styles'

export default function Quiz() {
    const [data, setData] = useState({})
    const options = ['font', 'bold', 'copyright', 'dochub']
    const [open, setOpen] = useState(false)
    const [resposta, setResposta] = useState('')
    const [userStatistics, setUserStatistics] = useState({})
    const navigate = useNavigate()
    

    useEffect(() => {
        proximaPergunta()
        //eslint-disable-next-line
    },[])

    async function proximaPergunta(){
        try{

            const response = await services.Api.get(`/pergunta/aleatoria`)
            setData(response.data)
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

    function closeModal(){
        setOpen(false)
        proximaPergunta()
    }

    async function responder (answer){
        try{

            await services.Api.post(`/tentativa`, {
                "status": data.respostaCorreta === answer ? true : false,
                "pergunta_id": data.id
            })
            
            const usuario = await services.Api.get(`/usuario/${localStorage.getItem('userId')}`)
            setUserStatistics(usuario.data)
            
            setOpen(true)
            setResposta(answer)
        }catch(err){
            navigate('/login')
        }
    }

    return (
        <>
            <Navigation />


            <Grid centered columns={1} >
                <div className='header'>
                    <Grid.Row>
                        <PerguntaStyled as='h2'>{data.questao}</PerguntaStyled>
                    </Grid.Row>
                </div>
                <Grid.Row >
                    <Grid.Column width={8}>
                        <Button.Group vertical labeled icon>
                            {data.id?options.map((item,i)=>
                                    <ButtonAlternativaStyled key={data.id+i} onClick={()=>responder(data.respostas[i].alternativa)} size='massive' color='green' icon={item} content={data.respostas[i].alternativa} />
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
                            
                            <Header as='h2'>{userStatistics.nome?userStatistics.nome:'Nome do Usu??rio'}</Header>
                        </Grid.Row>
                        <Grid.Row>
                                
                                <Grid.Column width='4'>
                                    <DivAcertoStyled>
                                        <PointsStyled>{new Array(...userStatistics.tentativas).filter(tentativa => tentativa.status === true).length}</PointsStyled>
                                        <b>Acertos</b>
                                    </DivAcertoStyled>
                                </Grid.Column>
                                <Grid.Column  width='4'>
                                    <DivErroStyled>
                                        <PointsStyled>{new Array(...userStatistics.tentativas).filter(tentativa => tentativa.status === false).length}</PointsStyled>
                                        <b>Erros</b>
                                    </DivErroStyled>
                                </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue' onClick={closeModal} content='Pr??xima pergunta' icon='arrow right' labelPosition='right'/>
                </Modal.Actions>
            </Modal>:null}
        </>
    )
}

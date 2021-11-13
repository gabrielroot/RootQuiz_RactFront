import React, {useState} from 'react'
import { Grid, Menu, Segment, Button, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import AdminPergunta from '../components/AdminPergunta'
import AdminPessoas from '../components/AdminPessoas'
import Navigation from '../components/Navigation'

export default function Admin() {
    const [activeItem, setActiveItem] = useState('Perguntas')
    const [openModal, setOpenModal] = useState(false)

    function alterarTabMenu(e){
        setActiveItem(e.target.innerHTML)
    }

    return (
        <div>
            <Navigation />
            <Grid>
            <Grid.Column stretched width={14}>
                {activeItem === 'Perguntas'?
                    <Segment>
                        <AdminPergunta openModal={openModal} setOpenModal={setOpenModal} />
                    </Segment>
                :
                    <Segment>
                        <AdminPessoas openModal={openModal} setOpenModal={setOpenModal} />
                    </Segment>
                }
            </Grid.Column>

            <Grid.Column width={2}>
                <Menu fluid vertical tabular='right'>
                    <Menu.Item
                    name='Perguntas'
                    active={activeItem === 'Perguntas'}
                    onClick={alterarTabMenu}
                    />
                    {localStorage.getItem('userRole') === 'ROLE_ADMIN'?
                        <Menu.Item
                        name='Pessoas'
                        active={activeItem === 'Pessoas'}
                        onClick={alterarTabMenu}
                        />
                    :null
                    }
                </Menu>
            </Grid.Column>

            <Link to='/'>
                <Button color='grey' size='big' animated>
                    <Button.Content visible>Voltar para o Quiz</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left' />
                    </Button.Content>
                </Button>
            </Link>
            
            <Button color='green'  onClick={() => setOpenModal(true)} size='big' animated='fade'>
                {activeItem === 'Perguntas'?
                    <Button.Content visible>Nova Pergunta</Button.Content>
                :
                    <Button.Content visible>Novo Usuário</Button.Content>
                }
                <Button.Content hidden>
                    <Icon name='add' />
                </Button.Content>
            </Button>
        </Grid>
        </div>
    )
}

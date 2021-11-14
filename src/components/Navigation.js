import React, {useState} from 'react'
import { Header,
         Image,
         Menu,
         Grid,
         Button,
         Popup
} from 'semantic-ui-react'
import {useNavigate} from 'react-router-dom'
import services from '../services/api'
import {LogoStyled, QuizStyled, HashTagStyled, RootStyled, PopupProfileStyled, HeaderAdminStyled} from '../styles'


export default function Navigation() {
const [dropdownUser, setDropdownUser] = useState(false)
const navigate = useNavigate()

function encerrarSessao(){
    localStorage.setItem('userId', '')
    localStorage.setItem('userName', '')
    localStorage.setItem('userRole', '')
    services.Api.get('/usuario/logout')
    navigate('/login')
}

return (
    <Menu size='massive'>
        <Menu.Menu position='left'>
            <Grid.Column width='16'>
                <Grid.Row>
                    <LogoStyled onClick={()=>navigate('/')}>
                    <QuizStyled>Quiz</QuizStyled>
                            <HashTagStyled>#</HashTagStyled>
                            <RootStyled>Root</RootStyled>
                    </LogoStyled>
                </Grid.Row>
            </Grid.Column>
        </Menu.Menu>

        <Menu.Menu position='right'>
                <Menu.Item
                >
                    <HeaderAdminStyled as='h4' onClick={()=>navigate('/admin')}>
                        Admin
                    </HeaderAdminStyled>
                </Menu.Item>

        <Menu.Item>
            <Grid  columns={1}>
                <div onClick={()=>setDropdownUser(!dropdownUser)}>

                    <Grid.Column floated='right' width='16'>
                        <Grid.Row>
                            <PopupProfileStyled>
                                <Popup wide trigger={

                                        <Header as='h4'>
                                            <Image circular src='/nonProfile.png' /> 
                                            <Header.Content>
                                            {localStorage.getItem('userName')}    
                                            </Header.Content>
                                        </Header>} on='click'>
                                    <Grid>
                                    <Grid.Column>
                                        <Button color='red' onClick={()=>encerrarSessao()} content='Encerrar Sessão' fluid />
                                    </Grid.Column>
                                    </Grid>
                                </Popup>
                            </PopupProfileStyled>
                        </Grid.Row>
                    </Grid.Column>
                </div>
            </Grid>
        </Menu.Item>
        </Menu.Menu>
    </Menu>
)
}

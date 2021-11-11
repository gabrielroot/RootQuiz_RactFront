import React from 'react'
import { Header,
         Image,
         Menu,
         Grid 
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function Navigation() {

return (
    <Menu size='massive'>
        <Menu.Menu position='left'>
            <Grid.Column width='16'>
                <Grid.Row>
                    <div className='title'>
                        <span>
                            <p>Quiz</p>
                            <p>#</p>
                            <p>Root</p>
                        </span>
                    </div>
                </Grid.Row>
            </Grid.Column>
        </Menu.Menu>

        <Menu.Menu position='right'>
        <Menu.Item
            name='Admin'
        />

        <Menu.Item>
            <Grid  columns={1}>
                <Grid.Column floated='right' width='16'>
                    <Grid.Row>
                        <Header as='h4'>
                            <Image circular src='/nonProfile.png' /> NOME
                        </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        </Menu.Item>
        </Menu.Menu>
    </Menu>
)
}

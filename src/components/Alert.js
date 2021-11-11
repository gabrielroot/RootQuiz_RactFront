import React, {useEffect, useState} from 'react'
import {
        Segment,
        Portal,
        Message,
        TransitionablePortal
} from 'semantic-ui-react'

export default function Alert(props) {
    const [openPortal, setOpenPortal] = useState({})

    useEffect(() => {
        const padrao = {open:true,header:'Sucesso!',type:'positive',message:'Operação bem sucedida.'}
        setOpenPortal(props.openPortal?props.openPortal:padrao)
    },[props.openPortal])

    return (
        <TransitionablePortal
            closeOnTriggerClick
            onClose={()=>setOpenPortal({...openPortal,open:false})}
            open={openPortal.open}
            transition={{animation:'fly up', duration:800}}
        >
            <Segment
            onClick={()=>setOpenPortal({...openPortal, open:false})}
            style={{
                left: '60%',
                position: 'fixed',
                top: '0',
                zIndex: 1000,
            }}
            >

                <Message negative={openPortal.type==='negative'} positive={openPortal.type==='positive'} size='large'>
                    <Message.Header>{openPortal.header}</Message.Header>
                    <p>
                        {openPortal.message}
                    </p>
                </Message>

            </Segment>
        </TransitionablePortal>
    )
}

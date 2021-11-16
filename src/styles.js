import styled from 'styled-components'
import { Button, Input, Grid, Form, Header } from 'semantic-ui-react'

export const BackgroudStyled = styled.div`
    position: absolute;
    filter: blur(9px);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    top: -14px;
    z-index: -1;
    margin-top: 14px;
`;

export const LogoStyled = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 0px;
    justify-self: center;
`;

export const RootStyled = styled.p`
    color: #db6600aa;
    font-size: 35px;
    cursor: pointer;
    `;

export const HashTagStyled = styled.p`
    color: #1f1e20aa;
    font-size: 60px;
    margin-top: -20px;
    font-weight: bolder;
    cursor: pointer;
`;

export const QuizStyled = styled.p`
    color: #0e9b13aa;
    font-size: 35px;
    cursor: pointer;
`;

export const PopupProfileStyled = styled(Header)`
    cursor: pointer;
`;

export const HeaderAdminStyled = styled(Header)`
    cursor: pointer;
`;

/////LOGIN

export const LoginGridStyled = styled(Grid)`
    align-self: center;
    max-height: 620px;
    min-width: 1020px;
`;

export const LoginFormStyled = styled(Form)`
    box-shadow: #cbcbcb 0px 10px 20px 0px;
    padding: 150px 15px 50px 15px;
    min-height: 300px;
    display: grid;
`;

export const ButtomStyled = styled(Button)`
    width: 200px;
    justify-self: center;
`;

export const LinkSignupStyled = styled.p`
    color: #1600c5aa;
    text-decoration: underline;
    justify-self: center;
    cursor: pointer;
`;

///QUIZ

export const PerguntaStyled = styled(Header)`
    color: #1f1e20aa;
    font-size: 35px;
    padding: 0 50px;
    margin-top: 70px !important;
`;

export const ButtonAlternativaStyled = styled(Button)`
    color: #1f1e20aa;
    text-align: left !important;
    font-size: 40px;
    width: 50vw !important;
    min-width: 300px;
    margin-top: 5px !important;
`;

///ADMIN

export const DivFloatedStyled = styled.div`
    display: flex;
    position: fixed;
    bottom: 0;
    margin-left: 14px ;  
    width: 100vw !important;
    height: 20vh;
    margin-top: 5px ;
    background-color: white;
    box-shadow: #cbcbcb 0px 2px 20px 0px;
    align-items: center;
    z-index: 2;
    justify-content: space-evenly;
`;

export const GridDataStyled = styled(Grid)`
    max-height: 65vh;
    overflow: auto;
`;

export const ButtonBackStyled = styled(Button)`
    box-shadow: #ababab 0px 5px 11px 4px !important;
`;

export const ButtonPerguntaStyled = styled(Button)`
    box-shadow: #9acba6 0px 5px 11px 4px !important;
`;

//QUIZ

export const PointsStyled = styled.p`
    font-size: 3em;
    margin: 0 ;
`;

export const DivAcertoStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: #bdffbd;
    box-shadow: #cedbce 0px 0px 9px;
    height: 140px;
    font-size: 1.5em;
`;

export const DivErroStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: #ffc7c7;
    box-shadow: #dbcece 0px 0px 9px;
    height: 140px;
    font-size: 1.5em;
`;

//MODALS

export const InputStyled = styled.input`
    width: 60%;
    margin-bottom: 100px;
`;

export const InputBigStyled = styled.input`
    width: 100%;
`;

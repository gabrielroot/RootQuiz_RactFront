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
    font-size: 40px;
    margin-top: 70px !important;
`;

export const ButtonAlternativaStyled = styled(Button)`
    color: #1f1e20aa;
    text-align: left !important;
    font-size: 40px;
    width: 50vw !important;
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
    background-image: linear-gradient(to bottom, white 60%, #84ebb2);
    box-shadow: #4a4a4a 0px 2px 20px 0px;
    align-items: center;
    z-index: 2;
    justify-content: space-evenly;
`;

export const GridDataStyled = styled(Grid)`
    max-height: 65vh;
    overflow: auto;
`;
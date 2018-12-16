import React from 'react';
import styled from 'styled-components';

import {
  IoIosPlay, IoIosPause, IoIosDownload
} from 'react-icons/io';

const Base = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

// TODO: theming shadow? Black/white. Now just set to grey.
const Btn = styled.button`
    width: 1.8rem;
    height: 1.8rem;
    box-shadow: 0px 2px 4px rgba(126, 126, 126, 0.9);
    border-radius: 2px;
    border-color: black;
    border-style: none;
    border-width: 0;
    padding: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.0em;

    :focus {
        outline-color: tomato;
    }
`;

const OtherBtn = styled(Btn)`
    background-color: #222222;
    color: white;
`;

const MainBtn = styled(Btn)`
    background-color: #7cb342;
    color: white;
`;

const SpecialBtn = styled(Btn)`
    background-color: #fbc02d;
    color: white;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    button + button {
        margin-left: 5px;
    }
`;

const Controls = props =>
    <Base>
        {props.visualize.ready ?
            <ButtonRow>
                {!props.canvasrecorder.rec
                    ? <MainBtn onClick={props.toggle}><IoIosPlay /></MainBtn>
                    : <SpecialBtn onClick={props.toggle}><IoIosPause /></SpecialBtn>}
                <OtherBtn onClick={props.download}><IoIosDownload /></OtherBtn>
            </ButtonRow>
            : null
        }
    </Base>;

export default Controls;

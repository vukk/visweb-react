import React from 'react';
import styled from 'styled-components';

import {
  IoIosSkipBackward, IoIosRewind, IoIosPlay, IoIosPause, IoIosFastforward, IoIosSkipForward
} from 'react-icons/io';

const Base = styled.div`
  flex: 1;

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
    background-color: #558b2f;
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
    /* flex: 1; */

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    button + button {
        margin-left: 5px;
    }

    margin-left: 10px;
    margin-right: 10px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InputText = styled.div`font-size: 8px;`;

// TODO THEME
const InputVal = styled.input`
    color: white;
    font-size: inherit;
    text-align: center;

    background-color: inherit;
    border-width: 0;
    border-style: initial;
    border-bottom: 1px solid tomato;

    width: 2em;

    :focus {
        outline-color: tomato;
    }

    :disabled {
        border-bottom: 1px solid rgba(0, 0, 0, 0);;
    }
`;

const InputRow = styled.div`
    /* flex: 1; */

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    div + div {
        margin-left: 5px;
    }
`;

const setInterval = props => event => {
    const str = event.target.value;
    const val = parseInt(str);
    if (str && val > 0) props.setInterval(val);
};

// Changed to a class for lifecycle.
class Controls extends React.Component {
    constructor() {
        super();
        this.el = null;
    }

    componentDidMount() {
        this.props.attachTimerDisplay(this.el);
    }

    componentWillUnmount() {
        this.props.deattachTimerDisplay();
    }

    render() {
        const props = this.props;
        return (
            <Base>
            <InputRow>
                <InputWrapper>
                    <InputText>Model</InputText>
                    {/* <>{props.currentModel}/{props.numModels}</> */}
                    <InputVal disabled value={props.currentModel + '/' + props.numModels}/>
                </InputWrapper>
            </InputRow>
            <ButtonRow>
                <OtherBtn onClick={props.first}><IoIosSkipBackward /></OtherBtn>
                <OtherBtn onClick={props.previous}><IoIosRewind /></OtherBtn>
                <MainBtn onClick={props.play}><IoIosPlay /></MainBtn>
                <SpecialBtn onClick={props.pause}><IoIosPause /></SpecialBtn>
                <OtherBtn onClick={props.next}><IoIosFastforward /></OtherBtn>
                <OtherBtn onClick={props.last}><IoIosSkipForward /></OtherBtn>
            </ButtonRow>
            <InputRow>
                {/*<InputWrapper><InputText>Next</InputText><>0.5</></InputWrapper>*/}
                <InputWrapper>
                    <InputText>Next</InputText>
                    <InputVal ref={el => { this.el = el; }} disabled />
                </InputWrapper>
                <InputWrapper>
                    <InputText>Interval</InputText>
                    <InputVal
                        id='interval'
                        name='interval'
                        type='number'
                        min={1}
                        value={props.interval}
                        onChange={setInterval(props)}
                    />
                </InputWrapper>
            </InputRow>
          </Base>);
    }
}

export default Controls;

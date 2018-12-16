import React from 'react';
import styled from 'styled-components';

import PageBase from '../../../common/components/PageBase';
import Title from '../../../common/components/Title';
import WrapTop from '../../../common/components/WrapTop';
import Card from '../../../common/components/Card';
import WidthRestrict from '../../../common/components/WidthRestrict';

import Header from '../../header';
import visualizers from '../../visualize/visualizers';

import Form from './Form';

const Contents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const TitleWrapper = styled.div`max-width: 60%;`;
const WidthCard = styled(Card)`max-width: 420px;`;

const New = props =>
  <PageBase className={props.className}>
    <WrapTop content={<Header openMenu={props.openMenu} />}>
      <WidthRestrict>
        <Contents>
          <TitleWrapper>
            <Title large>New visualization</Title>
          </TitleWrapper>
          <WidthCard strength="3" depth="1">
            <Form
              handleSubmit={props.formSubmit}
              parseError={props.new.parseError}
              visualizerChoices={visualizers.available}
              visualizerOptionComponents={visualizers.components.options}
              visualizerChosen={props.form.new_form && props.form.new_form.values.visualizer}
              initialValues={Object.assign({
                  'visualizer': Object.keys(visualizers.available)[0],
                },
                /* defaults for some visualizers are here */
                visualizers.optionDefaults
              )}
            />
          </WidthCard>
        </Contents>
      </WidthRestrict>
    </WrapTop>
  </PageBase>;

export default New;

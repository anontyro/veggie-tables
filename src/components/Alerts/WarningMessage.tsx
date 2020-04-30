import React from 'react';
import styled from 'styled-components';

interface MsgContainerProps {
  isShown: boolean;
}

const MessageContainer = styled.div<MsgContainerProps>`
  ${(props: MsgContainerProps) =>
    props.isShown ? 'animation: fadeIn ease-in 0.5s;' : 'opacity: 0;'}
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100%;
    }
  }
`;

export interface WarningMsgProps {
  isShown: boolean;
  header?: string;
  text?: string;
}

const WarningMessage: React.FC<WarningMsgProps> = ({ isShown = false, header = '', text = '' }) => (
  <React.Fragment>
    {isShown && (
      <MessageContainer isShown={isShown}>
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
          role="alert"
        >
          <p className="font-bold text-orange-700">{header}</p>
          <p className="text-orange-700">{text}</p>
        </div>
      </MessageContainer>
    )}
  </React.Fragment>
);

export default WarningMessage;

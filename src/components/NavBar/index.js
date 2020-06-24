import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { NoStackConsumer, LogoutButton } from '@nostack/no-stack';
import Logo from '../../assets/images/logo.png';

const Wrapper = styled.div.attrs({
  className: 'bg-white shadow-md'
})`
  & {
    div.NavBar__baseContainer {
      ${tw`container h-16 mx-auto px-4 flex items-center`}
    }
    img.NavBar__Logo {
      ${tw`h-12`}
    }
  }
`;

const NavBar = () => (
  <NoStackConsumer>
    {({ currentUser }) => {
      const isUserLogin =
        currentUser !== null
          ? 'justify-between'
          : 'justify-center sm:justify-between';
      return (
        <Wrapper>
          <div className={`NavBar__baseContainer ${isUserLogin}`}>
            <div>
              <img className="NavBar__Logo" src={Logo} />
            </div>
            <div>
              <LogoutButton />
            </div>
          </div>
        </Wrapper>
      );
    }}
  </NoStackConsumer>
);

export default NavBar;

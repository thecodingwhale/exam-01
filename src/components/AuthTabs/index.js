import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Wrapper = styled.div`
  button.buttonAuth {
    ${tw`hover:opacity-75 opacity-25 focus:outline-none text-xs text-white uppercase font-bold px-2 py-2 mb-2 no-underline outline-none`}
    &.buttonSelectedTab {
      ${tw`opacity-100`}
    }
  }
`;

const AuthTabs = ({ menuTitles, children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Wrapper>
      <div className="text-center">
        {menuTitles.map((title, index) => {
          return (
            <button
              className={
                index === selectedTab
                  ? 'buttonAuth buttonSelectedTab'
                  : 'buttonAuth'
              }
              onClick={e => {
                e.preventDefault();
                setSelectedTab(index);
              }}
            >
              {title}
            </button>
          );
        })}
      </div>
      <div>
        {React.Children.map(children, (child, index) => {
          if (index !== selectedTab) {
            return null;
          }
          return <div class="test">{child}</div>;
        })}
      </div>
    </Wrapper>
  );
};

export default AuthTabs;

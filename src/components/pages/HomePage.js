import React from "react";
import Styled from "styled-components";

import EstimaterForm from "../forms/EstimaterForm";

const SizingDiv = Styled.div`
  display: inline-block;
  text-align: center;
  width: 85%;
`;

const MainBody = Styled.body`
  text-align: center;
`;
function HomePage() {
  return (
    <MainBody>
      <SizingDiv>
        <br />
        <EstimaterForm />
      </SizingDiv>
    </MainBody>
  );
}

export default HomePage;

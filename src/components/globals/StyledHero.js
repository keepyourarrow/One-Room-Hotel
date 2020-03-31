import styled from "styled-components";

const StyledHero = styled.header`
  background: url(${(props) => props.img}) center/cover no-repeat;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export default StyledHero;

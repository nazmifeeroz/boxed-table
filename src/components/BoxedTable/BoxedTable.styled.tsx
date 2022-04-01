import styled from "styled-components";

export const PaginationWrapper = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button.attrs({
  type: "button",
})`
  width: 2rem;
  height: 2rem;
  background: #e8d170;
  font-weight: bold;
  font-size: 15px;
  border: 0 none;
  border-radius: 50%;
  cursor: pointer;
  margin: 0.3rem;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const PageInput = styled.input.attrs({
  type: "number",
})`
  width: 1.9rem;
  margin: 0 0.3rem;
  padding: 0.3rem;
  font-size: 1rem;
  border: 0 none;
`;

export const GotoPageBox = styled.span`
  margin: 0 0.3rem;
  border-radius: 5px;
  border: 0.05rem solid grey;
  padding: 0.4rem;
`;

export const SearchBox = styled.input.attrs({
  type: "text",
})`
  font-size: 1rem;
  margin: 0 0.3rem;
  width: 20rem;
  border: 0 none;
  padding: 0.4rem;
  border-radius: 5px;
  border: 0.05rem solid grey;
`;

export const Select = styled.select`
  font-size: 1rem;
  margin: 0 0.3rem;
  padding: 0.4rem;
  border-radius: 5px;
  border: 0.05rem solid grey;
`;

export const TableHeader = styled.th`
  cursor: "pointer";
`;

import styled from "styled-components";

function PostCard() {
  return <StyledPostCard>Test</StyledPostCard>;
}

const StyledPostCard = styled.article`
  width: 100%;
  color: #818384;
  background-color: rgba(26, 26, 27, 0.8);
  border: 1px solid #343536;
  margin-bottom: 10px;

  @media (min-width: 640px) {
    border-radius: 4px;
    padding-left: 40px;
  }
`;

export default PostCard;

import styled from "styled-components";

function Comment({ commentData }) {
  return (
    <>
      {commentData.level === 1 ? (
        <StyledComment>{commentData.text}</StyledComment>
      ) : null}
    </>
  );
}

const StyledComment = styled.div`
  margin-top: 16px;
  padding: 8px 0 0 16px;
`;

const StyledReply = styled.div`
  padding-left: ${({ level }) => level * 16 + "px"};
`;

export default Comment;

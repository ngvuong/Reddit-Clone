import Container from "../components/Container";
import Post from "../components/Post";
import Aside from "../components/Aside";

function Comments({ postData, username }) {
  return (
    <Container>
      <Post postData={postData} username={username} />
      <Aside width="1120" />
    </Container>
  );
}

export default Comments;

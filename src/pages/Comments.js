import Container from "../components/Container";
import Post from "../components/Post";
import Aside from "../components/Aside";

function Comments() {
  return (
    <Container>
      <Post />
      <Aside width="1120" />
    </Container>
  );
}

export default Comments;

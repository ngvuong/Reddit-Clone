import Container from "../components/Container";
import Post from "../components/Post";
import Aside from "../components/Aside";

function Comments({ postData, username }) {
  return (
    <Container>
      <Post postData={postData} username={username} />
      <Aside media="1120" mt="32" ml="0" />
    </Container>
  );
}

export default Comments;

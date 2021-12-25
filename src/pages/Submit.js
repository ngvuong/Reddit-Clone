import Container from "../components/Container";
import CreatePost from "../components/CreatePost";
import Aside from "../components/Aside";

function Submit({ username }) {
  return (
    <Container>
      <CreatePost user={username} />
      <Aside />
    </Container>
  );
}

export default Submit;

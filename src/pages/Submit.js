import Container from "../components/Container";
import CreatePost from "../components/CreatePost";
import Aside from "../components/Aside";

function Submit({ username }) {
  return (
    <Container>
      <CreatePost user={username} />
      <Aside media="960" mt="36" ml="24" />
    </Container>
  );
}

export default Submit;

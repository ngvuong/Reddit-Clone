import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewPostBox from "./NewPostBox";
import PostOptions from "./PostOptions";
import PostCard from "./PostCard";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

function MainContent({ isLoggedIn, username }) {
  const [docs, setDocs] = useState([]);
  const [sortBy, setSortBy] = useState("new");

  useEffect(() => {
    (async function fetchPosts() {
      const searchQuery = query(
        collection(getFirestore(), "posts"),
        orderBy("time", "desc")
      );
      const querySnapshot = await getDocs(searchQuery);
      querySnapshot.forEach((doc) => {
        setDocs((prevDocs) => {
          const docData = doc.data();
          docData.id = doc.id;
          return [...prevDocs, docData];
        });
      });
    })();
  }, []);

  useEffect(() => {
    if (sortBy === "top") {
      setDocs(docs.sort((a, b) => a.votes - b.votes));
    } else if (sortBy === "new") {
      setDocs(docs.sort((a, b) => b.time - a.time));
    } else setDocs(docs.sort((a, b) => a.comments.length - b.comments.length));
  }, [sortBy, docs]);

  const posts = docs.map((doc) => {
    return (
      <React.Fragment key={doc.id}>
        <PostCard data={doc} username={username} />
        {/* <Routes>
          <Route path="/comments/:postId" element={<Comments />} />
        </Routes> */}
      </React.Fragment>
    );
  });

  return (
    <StyledMain>
      {isLoggedIn && <NewPostBox />}
      <div className="section-heading">Popular posts</div>
      <PostOptions onSort={(sortBy) => setSortBy(sortBy)} />
      {posts}
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .section-heading {
    width: 100%;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }

  @media (min-width: 960px) {
    width: 640px;
  }

  @media (max-width: 639px) {
    .section-heading {
      margin-top: 20px;
    }
  }
`;

export default MainContent;

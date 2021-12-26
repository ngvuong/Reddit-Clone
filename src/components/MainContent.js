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

function MainContent({ isLoggedIn }) {
  const [docs, setDocs] = useState([]);

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

  const posts = docs.map((doc) => {
    return <PostCard key={doc.id} data={doc} />;
  });

  return (
    <StyledMain>
      {isLoggedIn && <NewPostBox />}
      <div className="section-heading">Popular posts</div>
      <PostOptions />
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

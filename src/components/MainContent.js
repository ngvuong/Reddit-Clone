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

function MainContent({ isLoggedIn, username, sortBy, onSort }) {
  const [docs, setDocs] = useState([]);
  // Initial posts fetch and sort
  useEffect(() => {
    let field;
    if (sortBy === "top") {
      field = "votes";
    } else if (sortBy === "new") {
      field = "time";
    } else field = "latestComment";

    if (!docs.length) {
      (async function fetchPosts() {
        const searchQuery = query(
          collection(getFirestore(), "posts"),
          orderBy(`${field}`, "desc")
        );
        const querySnapshot = await getDocs(searchQuery);
        const postData = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          docData.id = doc.id;
          postData.push(docData);
        });
        setDocs(postData);
      })();
    }
  }, [sortBy, docs]);

  const onSortPost = (option) => {
    if (option !== sortBy) {
      onSort(option);
      sortBy = option;
    }
    if (sortBy === "top") {
      setDocs([...docs].sort((a, b) => b.votes - a.votes));
    } else if (sortBy === "new") {
      setDocs([...docs].sort((a, b) => b.time - a.time));
    } else setDocs([...docs].sort((a, b) => b.latestComment - a.latestComment));
  };

  const posts = docs.map((doc) => {
    return (
      <React.Fragment key={doc.id}>
        <PostCard data={doc} username={username} />
      </React.Fragment>
    );
  });

  return (
    <StyledMain>
      {isLoggedIn && <NewPostBox />}
      <div className="section-heading">Popular posts</div>
      <PostOptions onSortPost={onSortPost} sortBy={sortBy} />
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

import React, { useEffect } from "react";

import { GETPUBLICATION } from "../gql/post";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { size } from "lodash";

import Profile from "../components/User/Profile";
import Publications from "../components/Publications/";

export default function User() {
  const { username } = useParams();

  const { data: publicationsFetch, loading, startPolling, stopPolling } = useQuery(GETPUBLICATION, {
    variables: {
      username,
    },
  });
  useEffect(() => {
    startPolling(1000);
    return () => {stopPolling()}
  }, [startPolling,stopPolling])



  if (loading) return null;
  return (
    <>
      <Profile
        username={username}
        totalPublicationsFetch={size(publicationsFetch.getPublication)}
      />
      <Publications publicationsFetch={publicationsFetch} />
    </>
  );
}

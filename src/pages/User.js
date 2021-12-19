import React, { useEffect } from "react";

import { GETPUBLICATION } from "../gql/post";
import { useQuery,useApolloClient } from "@apollo/client";
import { useParams } from "react-router-dom";
import { size } from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Profile from "../components/User/Profile";
import Publications from "../components/Publications/";


export default function User() {
  const { username } = useParams();
  const history = useHistory();
  const aClient = useApolloClient();
  const {logout } = useAuth();

  const {
    data: publicationsFetch,
    loading,
    startPolling,
    stopPolling,
    error,
  } = useQuery(GETPUBLICATION, {
    variables: {
      username,
    },
  });
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  if (error) {
    toast.warning("Sesion expirada");
    aClient.clearStore()
    logout()
    history.push("/");
  }
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

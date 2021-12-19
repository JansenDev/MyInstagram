import "./HeaderProfile.scss";
import "../../../../index.scss";

import React, { useState } from "react";

import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { ISFOLLOW, FOLLOW, UNFOLLOW } from "../../../../gql/follow";

function HeaderProfile(props) {
  const { getUser, auth, handlerModal } = props;

  const { data, loading, refetch } = useQuery(ISFOLLOW, {
    variables: { username: getUser.username },
  });

  const [follow] = useMutation(FOLLOW, {
    update(cache, { data: { follow } }) {
      cache.writeQuery({
        query: ISFOLLOW,
        variables: { username: getUser.username },
        data: {
          isFollow: true,
        },
      });
    },
  });

  const [unFollow] = useMutation(UNFOLLOW, {
    update(cache, { data: { unFollow } }) {
      cache.writeQuery({
        query: ISFOLLOW,
        variables: { username: getUser.username },
        data: {
          isFollow: false,
        },
      });
    },
  });

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <Button onClick={onUnFollow} className="btn-danger">
          Dejar de seguir
        </Button>
      );
    } else {
      return (
        <Button onClick={onFollow} className="btn-action">
          Seguir
        </Button>
      );
    }
  };

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username: getUser.username,
        },
      });
      // refetch()
    } catch (error) {}
  };

  const onUnFollow = async () => {
    try {
      await unFollow({
        variables: {
          username: getUser.username,
        },
      });
      // refetch();
    } catch (error) {}
  };

  return (
    <div className="header-profile">
      <h2>{getUser.username}</h2>
      {getUser.username === auth.username ? (
        <Button onClick={() => handlerModal("settings")}>Ajustes</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
}

export default HeaderProfile;

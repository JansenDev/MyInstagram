import "./Followers.scss";

import React, { useEffect, useState } from "react";

import { GETFOLLOWERS, GETFOLLOWINGS } from "../../../../gql/follow";
import { useQuery } from "@apollo/client";

import { size } from "lodash";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUser from "../../ListUser";

function Followers(props) {
  const { username, totalPublicationsFetch } = props;

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  const {
    data: dataGetFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GETFOLLOWERS, {
    variables: {
      username,
    },
  });

  const {
    data: dataFollowing,
    loading: loadingFollowing,
    startPolling: startPollingFollowing,
    stopPolling: stopPollingFollowing,
  } = useQuery(GETFOLLOWINGS, {
    variables: { username },
  });

  useEffect(() => {
    startPollingFollowers(1000);

    return () => {
      stopPollingFollowers();
    };
  }, [startPollingFollowers, stopPollingFollowers]);

  useEffect(() => {
    startPollingFollowing(1000);

    return () => {
      stopPollingFollowing();
    };
  }, [startPollingFollowing, stopPollingFollowing]);

  const openFollowersModal = () => {
    setShowModal(true);
    setTitleModal("Seguidores");
    setChildrenModal(
      <ListUser
        setShowModal={setShowModal}
        userList={dataGetFollowers.getFollowers}
      />
    );
  };

  const openFollowingsModal = () => {
    setShowModal(true);
    setTitleModal("Seguidos");
    setChildrenModal(
      <ListUser
        setShowModal={setShowModal}
        userList={dataFollowing.getFollowing}
      />
    );
  };

  if (loadingFollowers || loadingFollowing) return null;

  return (
    <div className="followers">
      <p>
        <span>{totalPublicationsFetch}</span> publicaciones
      </p>
      <p className="link" onClick={openFollowersModal}>
        <span>{size(dataGetFollowers.getFollowers)}</span> seguidores
      </p>
      <p className="link" onClick={openFollowingsModal}>
        <span>{size(dataFollowing.getFollowing)}</span> Siguidos
      </p>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </div>
  );
}

export default Followers;

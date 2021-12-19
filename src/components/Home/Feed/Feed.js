import "./Feed.scss";

import React, { useEffect, useState } from "react";

import { map, size } from "lodash";
import { Image } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";
import { GET_POST_OF_FOLLOWEDS } from "../../../gql/post";

import ImageNotFound from "../../../assets/avatar.png";
import Action from "../../Modal/ModalPublication/Action";
import CommentFrm from "../../Modal/ModalPublication/CommentFrm";
import ModalPublication from "../../Modal/ModalPublication";

import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function Feed() {
  const { data, loading, startPolling, stopPolling, error } = useQuery(
    GET_POST_OF_FOLLOWEDS
  );
  const [show, setShow] = useState(false);
  const [publication, setPublication] = useState(null);

  const { logout } = useAuth();
  const aClient = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    startPolling(3000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return null;
  if (error) {
    toast.warning("Sesion Expirada.");
    aClient.clearStore();
    logout();
    history.push("/");
  }

  const { getPostsFolloweds } = data || [];
  const onPublication = (post) => {
    setPublication(post);
    setShow(true);
  };
  return (
    <>
      <div className="feed">
        {map(getPostsFolloweds, (post, index) => (
          <div key={index} className="feed__box">
            <Link key={index} to={`/${post.idUser.username}`}>
              <div className="feed__box-user">
                <Image
                  key={index}
                  src={post.idUser.avatar || ImageNotFound}
                  avatar
                />
                <span> {post.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${post.file}")` }}
              onClick={() => onPublication(post)}
            ></div>
            <div className="feed__box-action">
              <Action publicationId={post.id} style="position:relative" />
            </div>
            <div className="feed__box-commentFrm">
              <CommentFrm publicationId={post.id} />
            </div>
          </div>
        ))}
      </div>
      {publication && (
        <ModalPublication
          show={show}
          setShow={setShow}
          publication={publication}
        />
      )}
    </>
  );
}
export default Feed;

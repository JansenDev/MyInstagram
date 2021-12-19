import "./Comments.scss";

import React, { useEffect } from "react";

import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GETCOMMENTS } from "../../../../gql/comment";

import { map } from "lodash";

function Comments(props) {
  const { publicationId } = props;

  const { data, loading, startPolling, stopPolling } = useQuery(GETCOMMENTS, {
    variables: {
      idPost: publicationId,
    },
  });
  useEffect(() => {
    startPolling(1000);
    return ()=> stopPolling()
  }, [startPolling,stopPolling])

  if (loading) return null;

  const { getComments } = data;

  return (
    <div className="comments">
      {map(getComments, (comment, index) => (
        <Link key={index} to={`/${comment.idUser.username}`} className="comment">
          <Image src={comment.idUser.avatar} avatar />
          <div>
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Comments;

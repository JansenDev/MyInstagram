import "./Action.scss";

import React, { useState } from "react";

import { Icon } from "semantic-ui-react";

import { useMutation, useQuery } from "@apollo/client";
import { LIKE, ISLIKE, DELETELIKE, COUNTLIKES } from "../../../../gql/like";

function Action(props) {
  const { publicationId } = props;
  const [loadingAction, setLoadingAction] = useState(false);

  const [like] = useMutation(LIKE, {
    update(cache, { data: { like } }) {
      cache.writeQuery({
        query: ISLIKE,
        variables: {
          idPost: publicationId,
        },
        data: {
          isLiked: like,
        },
      });
    },
  });

  const [deleteLike] = useMutation(DELETELIKE, {
    update(cache, { data: { deleteLike } }) {
      cache.writeQuery({
        query: ISLIKE,
        variables: {
          idPost: publicationId,
        },
        data: {
          isLiked: !deleteLike,
        },
      });
    },
  });

  const { data: isLikeData, loading: isLikeLoading } = useQuery(ISLIKE, {
    variables: {
      idPost: publicationId,
    },
  });

  const {
    data: countData,
    loading: loadingData,
    refetch: refetchCount,
  } = useQuery(COUNTLIKES, {
    variables: {
      idPost: publicationId,
    },
  });

  const onLike = async () => {
    setLoadingAction(true);
    try {
      await like({
        variables: {
          idPost: publicationId,
        },
      });
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onDeleteLike = async () => {
    setLoadingAction(true);
    try {
      await deleteLike({
        variables: {
          idPost: publicationId,
        },
      });
      refetchCount();
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  const onAction = () => {
    if (!loadingAction) {
      if (isLiked) {
        onDeleteLike();
      } else {
        onLike();
      }
    }
  };

  if (isLikeLoading || loadingData) return null;

  const { isLiked } = isLikeData;
  const { countLikes } = countData;

  return (
    <div>
      <div className="actions-container" onClick={onAction}>
        <Icon
          name={isLiked ? "heart" : "heart outline"}
          className={isLiked ? "like active" : "like"}
        />
        {countLikes} {countLikes === 1 ? "Like" : "Likes"}
      </div>
    </div>
  );
}

export default Action;

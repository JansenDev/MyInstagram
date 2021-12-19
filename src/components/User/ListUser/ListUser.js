import "./ListUser.scss";
import React from "react";
import { useHistory } from "react-router-dom";

import { map, size } from "lodash";
import { Image } from "semantic-ui-react";
import ImageNotFound from "../../../assets/avatar.png";

function ListUser(props) {
  const { userList } = props;

  const history = useHistory();

  const goToUser = (username) => {
    history.push(`/${username}`);
  };

  return (
    <div>
      {size(userList == 0) ? (
        <p className="list-users__not-users">No se han encontrado usuarios</p>
      ) : (
        map(userList, (user, index) => (
          <div key={index} className="list-users__user">
            <Image src={user.avatar || ImageNotFound} avatar />
            <div onClick={() => goToUser(user.username)}>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ListUser;

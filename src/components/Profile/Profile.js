import React from "react";
import "./Profile.scss";
import { Grid, Image } from "semantic-ui-react";

import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";
import ImageNotFound from "../../assets/avatar.png";

import  UserNotFound  from "../UserNotFound";

export default function Profile(props) {
  const { username } = props;
  const result = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  const { data, loading, error } = result;
  
  // Validaciones
  if (loading) return null;
  if (error) return <UserNotFound/>;
  const { getUser } = data;

  console.log(getUser);

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image src={ImageNotFound} avatar/>
        </Grid.Column>

        <Grid.Column width={11} className="profile__right">
            <div   >HEADERPROFILE </div>        
            <div>Followers</div>
            <div className="other">
                <p className="name">{ getUser.name }</p>

                { getUser.siteweb && (
                <a href={ getUser.siteweb } target="__blank" className="siteWeb">
                    { getUser.siteweb }</a>
                ) }

                { getUser.description && (
                    <p className="description">{ getUser.description }</p>
                ) }
                
            </div>
        </Grid.Column>

      </Grid>
    </>
  );
}

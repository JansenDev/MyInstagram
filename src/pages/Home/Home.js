import "./Home.scss";

import { Grid } from "semantic-ui-react";

import Feed from "../../components/Home/Feed/Feed";
import NotFolloweds from "../../components/Home/NotFolloweds/NotFolloweds";

export default function Home() {
  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <Feed />
      </Grid.Column>
      <Grid.Column className="home__right" width={5}>
        <NotFolloweds />
      </Grid.Column>
    </Grid>
  );
}

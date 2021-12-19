import "./Publications.scss";
import React from "react";

import { map } from "lodash";
import { Grid } from "semantic-ui-react";

import PreviewPublication from "./PreviewPublication";

function Publications(props) {
  const { publicationsFetch } = props;

  const { getPublication } = publicationsFetch;

  return (
    <div className="publications">
      <h1>Publicaciones</h1>
      <Grid columns={4}>
        {map(getPublication, (publication, index) => (
          <Grid.Column key={index}>
            <PreviewPublication publication={publication} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}

export default Publications;

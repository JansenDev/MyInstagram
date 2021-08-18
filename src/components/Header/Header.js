//  components/header/Header.js

import React from "react";
import "./Header.scss";
import { Container, Grid, Image } from "semantic-ui-react";
import logo from "../../assets/instagram.png";
import RightHeader from "./RightHeader";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

export default function Header() {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="Header__logo">
            <Link to="/">
              <Image alt="Instagram" src={logo} />
            </Link>
          </Grid.Column>

          <Grid.Column width={10}>
            <SearchBar />
          </Grid.Column>

          <Grid.Column width={3}>
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

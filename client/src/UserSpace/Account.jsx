import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

//import components
import usercard from "../components/UserCard/UserCard";
import { Card } from "../components/Card/Card.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-3.jpg";

export default class Account extends Component {
  componentDidMount = () => {};
  render() {
    const user = {};
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name={
                  user.firstName &&
                  user.lastName &&
                  `${user.firstName} ${user.lastName}`
                }
                userName={user.userName}
                description={
                  <span>
                    ({user.category})
                    <br />
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                    <Button simple>
                      <i class="fa fa-linkedin" />
                    </Button>
                  </div>
                }
              />
            </Col>
            <Card
              title={`username`}
              category={` firstname lastname profile `}
              content={<h1>hello</h1>}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

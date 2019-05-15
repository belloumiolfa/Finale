import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

//import routing dependencies
import { Link } from "react-router-dom";

//import components
import Card from "components/Card/Card";
import UserCard from "../components/UserCard/UserCard";
import Button from "../components/CustomButton/CustomButton";
/******************************************************************************************************* */
class Icons extends Component {
  handleViewAccount = id => {
    console.log(id);
    this.props.history.push(`/user/account/${id}`);
  };

  render() {
    const { title, profiles } = this.props;
    var handleName = "";

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={title}
                ctAllIcons
                category={<span>Handcrafted by our friends from </span>}
                content={
                  <Row>
                    {profiles.map((profile, key) => {
                      if (
                        profile.user.category === "client" ||
                        profile.user.category === "freelance"
                      ) {
                        if (profile.user.firstName)
                          handleName = profile.user.firstName;
                        else handleName = "";
                        if (profile.user.lastName)
                          handleName = profile.user.lastName;
                        else handleName = "";
                      }

                      if (profile.user.category === "company")
                        handleName = profile.user.nameCompany;

                      if (profile.user.category === "association")
                        handleName = profile.user.nameAssociation;

                      return (
                        <Col
                          md={4} //3items
                          sm={6} //2items
                          xs={12} //1item
                          className="font-icon-list"
                          key={key}
                        >
                          <Link to={`/user/account/${profile._id}`}>
                            {" "}
                            <UserCard
                              bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                              avatar={profile.user.avatar}
                              name={handleName}
                              userName={profile.user.userName}
                              description={
                                <span>
                                  ({profile.user.category})
                                  <br />
                                  <br />
                                </span>
                              }
                              socials={
                                <div>
                                  {/**  <Button simple bsStyle="info">
                                    <Link to={`/user/profile`} simple>
                                      <i className="pe-7s-look" />
                                    </Link>
                                  </Button>*/}

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
                          </Link>
                        </Col>
                      );
                    })}
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Icons;

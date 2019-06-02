import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { RefuseUser, AcceptAction } from "../Redux/Actions/AuthAction";
import Card from "components/Card/Card.jsx";
import UserServices from "Services/UserServices";
import Button from "../components/CustomButton/CustomButton";
/***************************************************************************************************** */
class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      accepted: Boolean,
      confirmed: Boolean,
      refused: Boolean
    };
  }
  /**************************************************************************************************** */
  componentWillReceiveProps(nextProps) {
    if (nextProps.Auth) {
      this.setState({
        accepted: nextProps.Auth.accepted,
        confirmed: nextProps.Auth.confirmed,
        refused: nextProps.Auth.refused
      });
      //get users
      UserServices.getUsers().then(res => {
        this.setState({ users: res.data.users });
      });
    }
  }
  /**************************************************************************************************** */

  componentDidMount() {
    //get users
    UserServices.getUsers().then(res => {
      this.setState({ users: res.data.users });
    });
  }
  /**************************************************************************************************** */

  handleInfos = id => {
    //redirect to user account
    this.props.history.push(`/admin/account/${id}`);
  };
  /**************************************************************************************************** */

  handleAccept = id => {
    this.props.AcceptAction(id);
  };
  /**************************************************************************************************** */

  handleRefuse = id => {
    this.props.RefuseUser(id);
  };
  /**************************************************************************************************** */

  render() {
    const { users } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Card
            title="Users"
            category="Here is all users we have in the plateforme"
            ctTableFullWidth
            ctTableResponsive
            content={
              <Table striped hover>
                <thead />
                <tbody>
                  {users.map((user, key) => {
                    return (
                      <tr key={key}>
                        <Row className="content">
                          <Col xs={12} md={9}>
                            <h4>
                              {user.userName} ( {user.category} )
                            </h4>
                            <span>
                              {user.firstName} {user.lastName}
                            </span>
                          </Col>
                          <Col xs={12} md={3}>
                            {!user.confirmed && (
                              <div>
                                {" "}
                                <Button
                                  color="info"
                                  pullRight
                                  className="button-margin"
                                  onClick={() => this.handleInfos(user._id)}
                                  size="xs"
                                  style={{ marginLeft: "10px" }}
                                >
                                  <i className="pe-7s-look" />
                                </Button>
                                {user.accepted ? (
                                  <Button
                                    disabled
                                    color="info"
                                    pullRight
                                    className="button-margin"
                                    onClick={() => this.handleAccept(user._id)}
                                    size="xs"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <i className="pe-7s-smile" />
                                  </Button>
                                ) : (
                                  <Button
                                    color="info"
                                    pullRight
                                    className="button-margin"
                                    onClick={() => this.handleAccept(user._id)}
                                    size="xs"
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <i className="pe-7s-like2" />
                                  </Button>
                                )}
                                <Button
                                  type="submit"
                                  pullRight
                                  color="info"
                                  className="button-margin"
                                  onClick={() => this.handleRefuse(user._id)}
                                  size="xs"
                                  style={{ marginLeft: "10px" }}
                                >
                                  <i className=" pe-7s-trash" />
                                </Button>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            }
          />
        </Grid>
      </div>
    );
  }
}

//map store's state to component's props
//authentification comes from root reducer the attribut that content AuthReducer
const mapStateToProps = state => ({
  Auth: state.Authentification,
  Alert: state.Alert
});

//map actions and state
export default connect(
  mapStateToProps,
  { RefuseUser, AcceptAction }
)(withRouter(UserList));

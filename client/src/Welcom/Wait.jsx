import React from "react";
import { Container } from "reactstrap";

//import redux dependencis
import { connect } from "react-redux";

//import services

//import actions

/**************************************************************************************************** */

class Wait extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }
  /**************************************************************************************************** */
  componentWillReceiveProps(nextProps) {
    if (nextProps.Auth) {
      if (nextProps.Auth.user.confirmed)
        this.props.history.push("/user/profile");
      if (nextProps.Auth.user.refused) this.props.history.push("/home/sorry");
    }
  }
  componentDidMount = () => {
    //get id from url
    let user = this.props.match.params.user;
    this.setState({
      user: user
    });
  };

  /**************************************************************************************************** */
  render() {
    return (
      <Container>
        <h1 className="title">wait </h1>
      </Container>
    );
  }
}
//map store's state to component's props
//authentification comes from root reducer the attribut that content AuthReducer
const mapStateToProps = state => ({
  Auth: state.Authentification
});

//map actions and state
export default connect(
  mapStateToProps,
  {}
)(Wait);

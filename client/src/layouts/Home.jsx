import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";
//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { CurrentProfileAction } from "../Redux/Actions/ProfileAction";
import Footer from "../components/Footer/Footer";
import HomeNavBar from "../components/Navbars/HomeNavBar";
import { style } from "variables/Variables.jsx";

import routes from "../routes";

import image from "assets/img/sidebar-3.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>TrustiT.WORK</b>-There are no secrets to success. It is
          the result of preparation, hard work, and learning from failure.
          "Colin Powell"
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/home") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.homeRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes.homeRoutes[i].layout + routes.homeRoutes[i].path
        ) !== -1
      ) {
        return routes.homeRoutes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>TrustiT.WORK</b> -Keep your dreams alive. Understand to
          achieve anything requires faith and belief in yourself, vision, hard
          work, determination, and dedication. Remember all things are possible
          for those who believe. "Gail Devers"
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15
    });
    this.props.CurrentProfileAction();
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />

        <div id="main-panel" ref="mainPanel">
          <HomeNavBar {...this.props} />
          <Switch>{this.getRoutes(routes.homeRoutes)}</Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

//map store's state to component's props
//authentification comes from root reducer the attribut that content AuthReducer
const mapStateToProps = state => ({
  Auth: state.Authentification,
  Alert: state.Alert,
  Profile: state.Profile
});

//map actions and state
export default connect(
  mapStateToProps,
  { CurrentProfileAction }
)(withRouter(Home));

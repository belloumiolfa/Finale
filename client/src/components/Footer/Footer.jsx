import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { Link } from "react-router-dom";
/************************************************************************************************** */
class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <Link to="/home/welcom">Home</Link>
              </li>
              <li>
                <Link to="/home/blog">Blog</Link>
              </li>
              <li>
                <Link to="/home/about-as">About as</Link>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()} <Link to="/">TrustiT.WORK</Link>,
            made with love for a better career.
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;

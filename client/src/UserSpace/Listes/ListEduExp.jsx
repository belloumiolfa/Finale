import React, { Component } from "react";
import { Row, Col, Table } from "reactstrap";
import Moment from "react-moment";
//import routing dependencis
import { withRouter } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import {
  deleteEducation,
  deleteExperience
} from "../../Redux/Actions/ProfileAction";

import Card from "components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton";
/*************************************************************************************************** */
class ListEduExp extends Component {
  handleDelete = id => {
    if (this.props.title === "Experience") this.props.deleteExperience(id);
    else this.props.deleteEducation(id);
  };
  handleView = () => {
    console.log("get experience by id ");
  };
  render() {
    const { attribute, value, title } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md={12}>
            <Card
              title={title}
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {attribute.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {value.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {" "}
                          <td key={key}>
                            {prop.title} {prop.school}
                          </td>
                          <td key={key}>
                            {prop.company} {prop.degree}
                          </td>
                          <td key={key}>
                            <Moment format="YYYY/MM/DD">{prop.from}</Moment> -
                            {prop.to === null ? (
                              " Now"
                            ) : (
                              <Moment format="YYYY/MM/DD">{prop.to}</Moment>
                            )}{" "}
                          </td>
                          <td key={key}>
                            <Button
                              bsStyle="secondary"
                              pullRight
                              simple
                              onClick={() => this.handleView(prop._id)}
                            >
                              <i className="pe-7s-look" />
                            </Button>
                            <Button
                              bsStyle="secondary"
                              pullRight
                              simple
                              onClick={() => this.handleDelete(prop._id)}
                            >
                              <i className="pe-7s-trash" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

//map actions and state
export default connect(
  null,
  { deleteEducation, deleteExperience }
)(withRouter(ListEduExp));

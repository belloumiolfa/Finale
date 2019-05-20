import React, { Component } from "react";
import { Row, Col, Collapse, CardBody } from "reactstrap";
//import routing dependencis
import { withRouter, Link } from "react-router-dom";

//import redux dependencis
import { connect } from "react-redux";

//import actions
import { SearchAction } from "../../../Redux/Actions/JobAction";

//import compenent
import SelectInput from "../../../components/SelectInput/SelectInput";
import Radio from "../../../components/CustomRadio/CustomRadio";
import Button from "../../../components/CustomButton/CustomButton";
import { Card } from "../../../components/Card/Card";

//import variables
import { sector, contract, region } from "../../../variables/Variables";
/*********************************************************************************************** */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      exp: {},
      current: false,
      disabled: false,
      errors: {},
      filter: {}
    };
  }
  /********************************************************************************************* */
  handleChange = e => {
    this.setState({
      filter: { ...this.state.filter, [e.target.name]: e.target.value }
    });
  };
  /******************************************************************************************** */
  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  };
  /********************************************************************************************* */
  handleSubmit = e => {
    e.preventDefault();
    this.props.SearchAction(this.state.filter);
  };
  /******************************************************************************************** */
  render() {
    const { filter } = this.state;

    return (
      <div>
        <Button
          bsStyle="info"
          simple
          pullRight
          type="submit"
          onClick={this.toggle}
        >
          Specify your search
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            <Card
              title="Specify your search "
              content={
                <form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col xs={12} md={10}>
                      <Row>
                        <Col xs={3} md={4}>
                          <SelectInput
                            options={sector}
                            properties={{
                              label: "Sector ",
                              value: filter.sector,
                              name: "sector",
                              onChange: this.handleChange
                            }}
                          />
                        </Col>

                        <Col xs={3} md={4}>
                          <SelectInput
                            options={contract}
                            properties={{
                              label: "Contract",
                              value: filter.contract,
                              name: "contract",
                              onChange: this.handleChange
                            }}
                          />
                        </Col>

                        <Col xs={3} md={4}>
                          <SelectInput
                            options={region}
                            properties={{
                              label: "Region ",
                              value: filter.region,
                              name: "region",
                              onChange: this.handleChange
                            }}
                          />
                        </Col>

                        <Col xs={12} md={12}>
                          <Row>
                            <Col md={3}>
                              <Radio
                                number="1"
                                label="Part time"
                                value="Part time"
                                name="schedule"
                                onChange={this.handleChange}
                              />
                            </Col>
                            <Col md={3}>
                              <Radio
                                number="2"
                                label="Full time"
                                value="Full time"
                                name="schedule"
                                onChange={this.handleChange}
                              />
                            </Col>
                            <Col md={3}>
                              <Radio
                                number="3"
                                label="Intership"
                                value="Intership"
                                name="schedule"
                                onChange={this.handleChange}
                              />
                            </Col>
                            <Col md={3}>
                              <Radio
                                number="4"
                                label="Freelancing"
                                value="Freelancing"
                                name="schedule"
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12} md={2}>
                      {" "}
                      <Button bsStyle="info" pullRight type="submit">
                        Search
                      </Button>
                    </Col>
                  </Row>
                </form>
              }
            />
          </CardBody>
        </Collapse>
      </div>
    );
  }
}
//map store's state to component's props
//authentification comes from root reducer the attribut that content AuthReducer
const mapStateToProps = state => ({
  Auth: state.Authentification,
  Alert: state.Alert,
  Job: state.Job
});

//map actions and state
export default connect(
  mapStateToProps,
  { SearchAction }
)(withRouter(Search));

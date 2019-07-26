import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addQuest } from "../../actions/quests";

export class Form extends Component {
  state = {
    header: "",
    description: ""
  };

  static propTypes = {
    addQuest: PropTypes.func.isRequired
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    const { header, description } = this.state;
    const quest = { header, description };
    this.props.addQuest(quest);
    this.setState({
      header: "",
      description: ""
    });
  };

  render() {
    const { header, description } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Quest</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Header</label>
            <input
              className="form-control"
              type="text"
              name="header"
              onChange={this.onChange}
              value={header}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              type="text"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addQuest }
)(Form);

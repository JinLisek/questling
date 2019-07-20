import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  };

  componentDidUpdate(previousProps) {
    const { errors, messages, alert } = this.props;

    if (errors !== previousProps.errors) {
      if (errors.msg.header) alert.error(`Name: ${errors.msg.header.join()}`);
      if (errors.msg.author) alert.error(`Author: ${errors.msg.author.join()}`);
      if (errors.msg.description)
        alert.error(`Description: ${errors.msg.description.join()}`);
    }

    if (messages !== previousProps.messages) {
      if (messages.deleteQuest) alert.success(messages.deleteQuest);
      if (messages.addQuest) alert.success(messages.addQuest);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));

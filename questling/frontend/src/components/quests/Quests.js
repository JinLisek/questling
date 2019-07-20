import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuests, deleteQuest } from "../../actions/quests";

export class Quests extends Component {
  static propTypes = {
    quests: PropTypes.array.isRequired,
    getQuests: PropTypes.func.isRequired,
    deleteQuest: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getQuests();
  }

  render() {
    return (
      <Fragment>
        <h2>Quests</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>header</th>
              <th>description</th>
              <th>author</th>
              <th>created_at</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.quests.map(quest => (
              <tr key={quest.id}>
                <td>{quest.id}</td>
                <td>{quest.header}</td>
                <td>{quest.description}</td>
                <td>{quest.author}</td>
                <td>{quest.created_at}</td>
                <td>
                  <button
                    onClick={this.props.deleteQuest.bind(this, quest.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  quests: state.quests.quests
});

export default connect(
  mapStateToProps,
  { getQuests, deleteQuest }
)(Quests);

import React from 'react';
import PropTypes from 'prop-types';

import { Button, Table } from 'semantic-ui-react';
import { loginUtility } from '../Login/LoginUtility';

export default class IndexTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  componentWillMount() {
    this.removeOnChangeObserver = loginUtility.onChange(() => {
      this.setState({ isLoggedIn: loginUtility.isLoggedIn() });
    });
  }

  componentWillUnmount() {
    this.removeOnChangeObserver();
  }

  render() {
    const { lectures } = this.props;
    const { isLoggedIn } = this.state;

    const tableBody = lectures.map((lecture) => {
      const button = (
        <a href={`/slides/${lecture.id}`}>
          <Button content="Join" floated="right" primary />
        </a>
      );
      return (
        <Table.Row>
          <Table.Cell verticalAlign="middle">
            {lecture.get('name')}
            {isLoggedIn ? button : ''}
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div className="IndexTable">
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Active Lectures</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tableBody}
          </Table.Body>

        </Table>
      </div>);
  }
}
IndexTable.propTypes = {
  lectures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

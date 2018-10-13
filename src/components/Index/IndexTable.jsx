import React from 'react';
import PropTypes from 'prop-types';

import { Button, Table } from 'semantic-ui-react';

export default function IndexTable({ lectures }) {
  const tableBody = lectures.map(lecture => (
    <Table.Row>
      <Table.Cell verticalAlign="middle">
        {lecture}
        <Button content="Join" floated="right" primary />
      </Table.Cell>
    </Table.Row>
  ));

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
IndexTable.propTypes = {
  lectures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

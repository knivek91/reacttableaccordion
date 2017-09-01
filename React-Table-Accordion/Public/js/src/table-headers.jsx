import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ cssClass, value }) => (
    <th className={cssClass}>{value}</th>
);

class TableHeaders extends React.Component {
    render() {
        const tds = this.props.columns.map((column, index) => <Cell key={index} cssClass={column.class} value={column.value} />)
        return (
            <thead>
                <tr>
                    {tds}
                </tr>
            </thead>
        )
    }
}

TableHeaders.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        class: PropTypes.string,
        value: PropTypes.string.isRequired
    }))
}

export default TableHeaders;
import React from 'react';
import PropTypes from 'prop-types';

class TableSearch extends React.Component {
    render() {
        const { placeholder, modalTarget } = this.props
        return (
            <div className="col-md-3 col-xs-6">
                <div className="form-group">
                    <input type="text" className="form-control-2" placeholder={placeholder} />
                    <a href="" data-toggle="modal" data-target={modalTarget}>
                        <i className="fa fa-search"></i>
                    </a>
                </div>
            </div>
        )
    }
}

TableSearch.propTypes = {
    placeholder: PropTypes.string,
    modalTarget: PropTypes.string.isRequired
}

export default TableSearch;
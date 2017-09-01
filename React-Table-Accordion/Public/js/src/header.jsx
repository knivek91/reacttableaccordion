import React from 'react';
import PropTypes from 'prop-types';

import TableSearch from './table-search';
import ModalSearch from './modal-search';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onChange(e) {
        this.props.onPaginationChange(e);
    }

    onKeyPress(e) {
        if (e.which === 13)
            this.props.onPaginationChange();
    }

    render() {
        const { paginationNumber, placeholder, modalTarget, tableHeaders, modalId, onCheckAll, onDelete } = this.props
        return (
            <div className="row">
                <div className="col-md-9 col-xs-6">
                    <div className="table-header">
                        <input type="checkbox" id="chkAll" name="chkAll" onChange={onCheckAll} />
                        <label htmlFor="chkAll">
                            <span></span>
                        </label>
                        <button type="button" className="btn btn-default btn-flat" onClick={onDelete}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
                <TableSearch placeholder={placeholder} modalTarget="#articulos" />
                <ModalSearch tableHeaders={tableHeaders} modalId="articulos" />

                <label> Ingrese el número por el cual se debe paginar la tabla.</label>
                <input type="number" className="form-control" name="paginationNumber" value={paginationNumber}
                    onChange={this.onChange} onKeyPress={this.onKeyPress} />
                <br />
            </div>
        )
    }
}

Header.propTypes = {
    placeholder: PropTypes.string,
    modalTarget: PropTypes.string.isRequired,
    modalId: PropTypes.string.isRequired,
    tableHeaders: PropTypes.any.isRequired,
    onCheckAll: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onPaginationChange: PropTypes.func
}

export default Header;
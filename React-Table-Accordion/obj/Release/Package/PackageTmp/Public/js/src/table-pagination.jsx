import React from 'react';
import PropTypes from 'prop-types';

const PageNumber = ({ cssClass, number, children, onClick }) => {
    return (
        <li className={cssClass} onClick={() => { onClick(number)}}>
            <span>
                {number}
                {children}
            </span>
        </li>
    );
};


class TablePagination extends React.Component {

    render() {

        const { rowNumber, paginationNumber, currentPage, onClickPageNumber } = this.props

        if (rowNumber == 0)
            return null

        const navs = Math.ceil(rowNumber / paginationNumber)
        let numbers = []
        for (var i = 0; i < navs; i++) {
            const number = i + 1;
            if (number == currentPage) {
                numbers.push(<PageNumber key={number} number={number} cssClass="active" onClick={onClickPageNumber}/>)
            } else {
                numbers.push(<PageNumber key={number} number={number} cssClass="" onClick={onClickPageNumber}><span className="sr-only">(current)</span></PageNumber>)
            }
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <nav className="text-center">
                        <ul className="pagination">
                            <li className={paginationNumber == 1 ? "disabled" : ""} onClick={() => { onClickPageNumber(1) }}>
                                <span>
                                    <span aria-hidden="true">&laquo;</span>
                                </span>
                            </li>
                            {numbers}
                            <li className="" onClick={() => { onClickPageNumber(navs) }}>
                                <span>
                                    <span aria-hidden="true">&raquo;</span>
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

TablePagination.propTypes = {
    rowNumber: PropTypes.number.isRequired,
    paginationNumber: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onClickPageNumber: PropTypes.func.isRequired
}

export default TablePagination;
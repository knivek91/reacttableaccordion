import React from 'react';
import PropTypes from 'prop-types';

class ModalSearch extends React.Component {
    render() {
        const { tableHeaders, modalId } = this.props
        return (
            <div className="modal fade" id={modalId} role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Buscar Productos</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-xs-10">
                                    <span className="input-label">Artículo</span>
                                    <input type="text" className="form-control" placeholder="#" />
                                </div>
                                <div className="col-xs-2 top20">
                                    <button type="button" className="btn btn-success">Buscar</button>
                                </div>
                            </div>
                            
                            <div className="table-responsive">
                                <table className="table default-table top20">
                                    {tableHeaders}
                                    <tbody>
                                        <tr>
                                            <td className="details">
                                                <input type="checkbox" id="c2" name="cc" /><label htmlFor="c2"><span></span></label>
                                            </td>
                                            <td className="details">7854</td>
                                            <td className="details">Nombre del Producto</td>
                                            <td className="details">1</td>
                                            <td>
                                                <div className="quantity">
                                                    <button className="plus">+</button>
                                                    <input type="text" name="1" value="1" />
                                                    <button className="plus">-</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="quantity">
                                                    <button className="plus">+</button>
                                                    <input type="text" name="1" value="1" />
                                                    <button className="plus">-</button>
                                                </div>
                                            </td>
                                            <td className="details">12 000.00</td>
                                        </tr>
                                        <tr className="animated fadeInUp delay">
                                            <td className="product-details">
                                                <input type="checkbox" id="c3" name="cc" /><label htmlFor="c3"><span></span></label>
                                            </td>
                                            <td className="details">7854</td>
                                            <td className="details">Nombre del Producto</td>
                                            <td className="details">2</td>
                                            <td>
                                                <div className="quantity">
                                                    <button className="plus">+</button>
                                                    <input type="text" name="1" value="1" />
                                                    <button className="plus">-</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="quantity">
                                                    <button className="plus">+</button>
                                                    <input type="text" name="1" value="1" />
                                                    <button className="plus">-</button>
                                                </div>
                                            </td>
                                            <td className="details">12 000.00</td>
                                        </tr>
                                        <tr className="animated fadeInUp delay">
                                            <td className="product-details">
                                                <input type="checkbox" id="c5" name="cc" /><label htmlFor="c5"><span></span></label>
                                            </td>
                                            <td className="details">7854</td>
                                            <td className="details">Nombre del Producto</td>
                                            <td className="details">1</td>
                                            <td>
                                                <div className="quantity">
                                                    <button className="plus">+</button>
                                                    <input type="text" name="1" value="1" />
                                                    <button className="plus">-</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="quantity">
                                                    <button className="plus">+</button>
                                                    <input type="text" name="1" value="1" />
                                                    <button className="plus">-</button>
                                                </div>
                                            </td>
                                            <td className="details">12 000.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <nav className="text-center">
                                        <ul className="pagination">
                                            <li className="disabled">
                                                <span>
                                                    <span aria-hidden="true">«</span>
                                                </span>
                                            </li>
                                            <li className="active">
                                                <span>1 <span className="sr-only">(current)</span></span>
                                            </li>
                                            <li className="disable">
                                                <span>2</span>
                                            </li>
                                            <li className="disable">
                                                <span>3</span>
                                            </li>
                                            <li className="disable">
                                                <span>4</span>
                                            </li>
                                            <li className="disabled">
                                                <span>
                                                    <span aria-hidden="true">»</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h4>Total: 50,000.00</h4>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal">Agregar</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ModalSearch.propTypes = {
    tableHeaders: PropTypes.any.isRequired,
    modalId: PropTypes.string.isRequired
}

export default ModalSearch;
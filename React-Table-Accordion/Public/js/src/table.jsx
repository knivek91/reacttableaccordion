import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import Numeral from 'numeral';
import _findIndex from 'lodash/findIndex';

import TableHeaders from './table-headers';
import TablePagination from './table-pagination';
import Header from './header';

Numeral.defaultFormat('$0,0.00');
const Columns = [{ class: '', value: '' }, { class: '', value: 'Código' }, { class: '', value: 'Nombre' }, { class: '', value: 'Cantidad' }, { class: '', value: 'Descuento' }, { class: '', value: 'Costo' }, { class: '', value: 'Total' }, { class: '', value: '' }];

import Datos from './data'

const Row = ({ tabIndex, target, id, nombre, costo, cantidad, descuento, total, checked, onChange, onChangeCheck }) => (
    <tr className="open clickable">
        <td className="checkbox-table">
            <input type="checkbox" id={`chk${id}`} name={`chk${id}`} checked={checked} onChange={() => { onChangeCheck(id) }} />
            <label htmlFor={`chk${id}`}><span></span></label>
        </td>
        <td className="details">{id}</td>
        <td className="details">{nombre}</td>
        <td>
            <div className="quantity">
                <button type="button" className="plus">-</button>
                <input type="text" name="Cantidad" value={cantidad} onChange={(e) => { onChange(e, id) }} tabIndex={tabIndex-2} />
                <button type="button" className="plus">+</button>
            </div>
        </td>
        <td>
            <input type="text" className="input-text-table" name="Descuento" value={descuento} onChange={(e) => { onChange(e, id) }} tabIndex={tabIndex - 1}/>
        </td>
        <td>
            <input type="text" className="input-text-table" name="Costo" value={costo} onChange={(e) => { onChange(e, id) }} tabIndex={tabIndex}/>
        </td>
        <td className="details">{Numeral(total).format()}</td>
        <td className="details">
            <a data-toggle="collapse" data-target={target}><i className="fa fa-chevron-down"></i></a>
        </td>
    </tr>
);

const InnerTDRowSpan = ({ title, value }) => (
    <td>
        <span className="input-label">{title}</span>
        <span className="text-disable">{value}</span>
    </td>
);

const InnerTDRowInput = ({ title, children }) => (
    <td>
        <span className="input-label">{title}</span>
        {children}
    </td>
);

const InnerRow = ({ id, colspan, transito, pvd, maximo, factor, cubicaje, empaque, bonificacion, cantidadOrden, cantidadEnviada, onChange }) => (
    <tr className="table-condensed shadow collapse panel-collapse" id={id}>
        <td colSpan={colspan} className="table-open">
            <table className="table table-condensed">
                <tbody>
                    <tr>

                        <InnerTDRowSpan title="Tran" value={transito} />
                        <InnerTDRowSpan title="PVD" value={pvd} />
                        <InnerTDRowSpan title="Máximo" value={maximo} />
                        <InnerTDRowSpan title="Factor" value={factor} />
                        <InnerTDRowSpan title="Cubicaje" value={cubicaje} />
                        <InnerTDRowSpan title="Empaque" value={empaque} />

                        <InnerTDRowInput title="Bonificac.">
                            <div className="select">
                                <select value={bonificacion} name="Bonificacion" onChange={onChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <div className="select__arrow"></div>
                            </div>
                        </InnerTDRowInput>

                        <InnerTDRowInput title="Cant. Orden">
                            <input type="text" className="input-text-table" name="CantidadOrdenada"
                                value={cantidadOrden} onChange={onChange} />
                        </InnerTDRowInput>

                        <InnerTDRowInput title="Cant. Enviada">
                            <input type="text" className="input-text-table" name="CantidadEnviada"
                                value={cantidadEnviada} onChange={onChange} />
                        </InnerTDRowInput>

                    </tr>
                    <tr><td></td></tr>
                    <tr></tr>
                </tbody>
            </table>
        </td>
    </tr>
);

const InfoFooter = ({ title, value, hasSimbol }) => (
    <div className="col-md-2 col-xs-6 text-center">
        <span>{title}</span>
        <p>{Numeral(value).format(hasSimbol ? '$0,0.00' : '0.00')}</p>
    </div>
);

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ordenes: [],
            tableHeaders: Columns,
            paginationsRows: [],
            paginationNumber: 50,
            currentPage: 1,
            rowNumber: 0,
            cantidadOrdenada: 0,
            cantidadEnviada: 0,
            descuento: 0,
            cubicaje: 0,
            total: 0
        };
        this.onCheckAll = this.onCheckAll.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.onDeleteRows = this.onDeleteRows.bind(this);
        this.onChange = this.onDeleteRows.bind(this);
        this.onClickPageNumber = this.onClickPageNumber.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.getRowsForPage = this.getRowsForPage.bind(this);
    }

    componentWillMount() {
        let cantidadOrdenada = 0, cantidadEnviada = 0, descuento = 0, cubicaje = 0, total = 0;
        const ordenes = Datos.map((item) => {
            cantidadOrdenada += item.CantidadOrdenada;
            cantidadEnviada += item.CantidadEnviada;
            descuento += item.Descuento;
            cubicaje += item.Cubicaje;
            total += (item.Costo * item.Cantidad);
            return Object.assign({}, item, { Checked: false, Total: (item.Costo * item.Cantidad) })
        });
        const paginationsRows = this.getRowsForPage(ordenes, this.state.paginationNumber, this.state.currentPage);
        const rowNumber = ordenes.length;
        this.setState({ ordenes, paginationsRows, paginationsRows, rowNumber, cantidadOrdenada, cantidadEnviada, descuento, cubicaje, total });
    }

    onChange(e, id) {
        //const name = e.target.name;
        //const value = e.target.value;
        //this.setState({ [name]: value });
    }

    onCheckAll(e) {
        const checked = e.target.checked;
        const ordenes = this.state.ordenes.map(item => Object.assign({}, item, { Checked: checked }));
        const paginationsRows = this.getRowsForPage(ordenes, this.state.paginationNumber, this.state.currentPage);
        this.setState({ ordenes, paginationsRows });
    }

    onChangeCheck(id) {
        const oldOrdenes = this.state.ordenes;
        const index = _findIndex(oldOrdenes, { Id: id });
        const oldItem = oldOrdenes[index];
        const updatedItem = Object.assign({}, oldItem, { Checked: !oldItem.Checked });
        const ordenes = [
            ...oldOrdenes.slice(0, index),
            updatedItem,
            ...oldOrdenes.slice(index + 1)
        ];
        const paginationsRows = this.getRowsForPage(ordenes, this.state.paginationNumber, this.state.currentPage);
        this.setState({ ordenes, paginationsRows });
    }

    onDeleteRows() {
        const ordenes = this.state.ordenes.filter(item => !item.Checked);
        const paginationsRows = this.getRowsForPage(ordenes, this.state.paginationNumber, this.state.currentPage);
        const rowNumber = ordenes.length;
        const currentPage = 1;
        this.setState({ ordenes, paginationsRows, rowNumber, currentPage });
    }

    onClickPageNumber(currentPage) {
        const paginationsRows = this.getRowsForPage(this.state.ordenes, this.state.paginationNumber, currentPage);
        this.setState({ currentPage, paginationsRows });
    }

    onPaginationChange(e) {
        if (typeof e !== typeof undefined) {
            this.setState({ paginationNumber: e.target.value });
        } else {
            const currentPage = 1;
            const { paginationNumber } = this.state;
            const paginationsRows = this.getRowsForPage(this.state.ordenes, paginationNumber, currentPage);
            this.setState({ currentPage, paginationsRows });
        }
    }

    calcularTotales(ordenes) {
        let cantidadOrdenada = 0, cantidadEnviada = 0, descuento = 0, cubicaje = 0, total = 0;
    }

    getRowsForPage(ordenes, paginationNumber, currentPage) {
        const start = paginationNumber * (currentPage - 1);
        const end = paginationNumber * currentPage;
        return ordenes.slice(start, end);
    }

    render() {
        const { cantidadOrdenada, cantidadEnviada, paginationsRows, descuento, cubicaje, total, paginationNumber, currentPage, rowNumber } = this.state
        const tableHeaders = <TableHeaders columns={this.state.tableHeaders} />
        const rows = paginationsRows.map((item, index) => [<Row target={`#${item.Id}`}
            tabIndex={ (index + 1) * 3}
            id={item.Id}
            nombre={item.Nombre}
            costo={item.Costo}
            cantidad={item.Cantidad}
            descuento={item.Descuento}
            total={item.Total}
            checked={item.Checked}
            onChange={this.onChange}
            onChangeCheck={this.onChangeCheck}
        />,
        <InnerRow colspan="12" id={item.Id} transito={item.Transito} pvd={item.PVD} maximo={item.Maximo}
            factor={item.Factor} cubicaje={item.Cubicaje} empaque={item.Empaque} bonificacion={item.Bonificacion}
            cantidadOrden={item.CantidadOrdenada} cantidadEnviada={item.CantidadEnviada} onChange={this.onChange} />
        ])
        return (
            <div>
                <div className="wrapper">
                    <div className="content-wrapper">
                        <section className="content">
                            <div className="box">
                                <div className="box-body with-border">

                                    <Header placeholder="Buscar Articulo" modalTarget="#articulos"
                                        tableHeaders={tableHeaders} modalId="articulos"
                                        paginationNumber={paginationNumber}
                                        onCheckAll={this.onCheckAll} onDelete={this.onDeleteRows}
                                        onPaginationChange={this.onPaginationChange}
                                    />
                                    
                                    <div className="row">
                                        <div className="col-md-12 table-responsive">
                                            <table className="table default-table">
                                                {tableHeaders}
                                                <tbody>
                                                    {rows}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <TablePagination rowNumber={rowNumber}
                                        paginationNumber={paginationNumber}
                                        currentPage={currentPage}
                                        onClickPageNumber={this.onClickPageNumber}
                                    />

                                    <div className="totals">
                                        <div className="row">
                                            <InfoFooter title="Cant. Orden" value={cantidadOrdenada} hasSimbol={false} />
                                            <InfoFooter title="Cant. Enviada" value={cantidadEnviada} hasSimbol={false} />
                                            <InfoFooter title="Descuento" value={descuento} hasSimbol={true} />
                                            <InfoFooter title="Cubicaje" value={cubicaje} hasSimbol={false} />
                                            <InfoFooter title="Total" value={total} hasSimbol={true} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="control-sidebar-bg"></div>
                </div>
            </div>
        );
    }

}

ReactDOM.render(
    <Table />,
    document.getElementById('app')
);
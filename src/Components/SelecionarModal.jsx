import React, {
    Component
} from 'react';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import Map from './Map'

class SelecionarModal extends Component {
    constructor (props) {
        super(props);
        this.state = {selectedCar: 0};
    }

    handleCarClick(i) {
        this.setState({selectedCar: i});
    }

    handleConfirmClick() {
        //console.log(this.props.onSelection(this.props.items[this.state.selectedCar]));
        this.props.onSelection( 
            this.props.items[this.state.selectedCar],
            this.state.selectedCar);
        
        window.$('#selecionar-modal').modal('toggle');
    }
    
    render() {
        return (
            <Router>
                <div className="modal fade" id="selecionar-modal" tabIndex="-1" role="dialog" aria-labelledby="selecionar-modal-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="selecionar-modal-label">Selecione o carro</h5>
                                <button id="selecionarModalClose" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            {this.props.items.map((car, i) =>{
                                    return <button  key={i}
                                                    type="button"
                                                    className={
                                                        (() => {
                                                            const classes = 
                                                            "btn btn-outline-primary btn-lg btn-block "
                                                            if (this.state.selectedCar === i)
                                                                return classes + "active";
                                                            return classes;
                                                        }
                                                        )()
                                                    }
                                                    onClick={() => this.handleCarClick(i)}>
                                                {car.name} <br />
                                                {car.email}
                                            </button>
                                })} 
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary" 
                                        onClick={() => this.handleConfirmClick()}>
                                        Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default SelecionarModal;
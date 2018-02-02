import React, {
    Component
} from 'react';
import FontAwesome from 'react-fontawesome';

class SelecionarModal extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedCar: -1 };
    }

    handleCarClick(i) {
        this.setState({ selectedCar: i });
    }

    handleConfirmClick() {
        this.props.onSelection(
            this.props.items[this.state.selectedCar],
            this.state.selectedCar);

        window.$('#selecionar-modal').modal('toggle');
    }

    render() {
        return (
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
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg btn-block"
                                onClick={() => this.handleCarClick(-1)}>
                                <div className={
                                    (() => {
                                        const classes = "check-position "
                                        if (this.state.selectedCar === -1)
                                            return classes + "fas fa-check-circle fa-2x";
                                        return classes + "far fa-circle fa-2x";
                                    }
                                    )()
                                } />
                                <div>Todos os carros</div>
                            </button>
                            {this.props.items.map((car, i) => {
                                return <button key={i}
                                    type="button"
                                    className="btn btn-secondary btn-lg btn-block "
                                    onClick={() => this.handleCarClick(i)}>
                                    <div className={
                                        (() => {
                                            const classes = "check-position "
                                            if (this.state.selectedCar === i)
                                                return classes + "fas fa-check-circle fa-2x";
                                            return classes + "far fa-circle fa-2x";
                                        }
                                        )()
                                    } />
                                    <div>
                                        <div>{car.name}</div>
                                        <div className="car-name">{car.email}</div>
                                    </div>
                                </button>
                            })}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                onClick={() => this.handleConfirmClick()}>
                                Confirmar
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelecionarModal;

import React, {
    Component
} from 'react';

import yawp from 'yawp';

class CadastrarModal extends Component {
    constructor (props) {
        super(props);

        this.state = {valueName: '', valueEmail: ''};

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName = (event)  => {
        this.setState({valueName: event.target.value});
    }

    handleChangeEmail = (event) => {
        this.setState({valueEmail: event.target.value});
    }

    handleSubmit(e) {
        alert(this.state.valueName + this.state.valueEmail);

        yawp('/cars').create({name: this.state.valueName, email: this.state.valueEmail+'@dextra-sw.com', location: '-22.812926,-47.045779'}).then(function (car) {
            console.log('Created: ' + car);
        })

        e.preventDefault();

        window.$('#cadastrar-modal').modal('toggle');
        
        this.setState({valueName: ''});
        this.setState({valueEmail: ''});
    }
    
    render() {
        return (
            <div className="modal fade" id="cadastrar-modal" tabIndex="-1" role="dialog" aria-labelledby="cadastrar-modal-label" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cadastrar-modal-label">Cadastrar carro</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <input type="text" value={this.state.valueName} onChange={this.handleChangeName} className="form-control" placeholder="Nome" aria-describedby="basic-addon1"/>
                                <div className="input-group">
                                    <input type="text" value={this.state.valueEmail} onChange={this.handleChangeEmail} className="form-control" placeholder="e-mail" aria-describedby="basic-addon2"/>
                                    <span className="input-group-addon" id="basic-addon2">@dextra-sw.com</span>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <input type="submit" value="Cadastrar" className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CadastrarModal;

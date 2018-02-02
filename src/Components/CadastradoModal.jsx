import React, {
    Component
} from 'react';

class CadastradoModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" id="cadastrado-modal" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="vertical-alignment-helper">
                    <div className="modal-dialog vertical-align-center" role="document">
                        <div className="modal-content">
                            <div id="aviso-modal-content" className="modal-body">
                                <i id="check-icon" className="fas fa-check-circle"></i><br /><br />
                                NOVO CARRO CADASTRADO
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CadastradoModal;

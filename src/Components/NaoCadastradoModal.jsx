import React, {
    Component
} from 'react';

class NaoCadastradoModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" id="nao-cadastrado-modal" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="vertical-alignment-helper">
                    <div className="modal-dialog vertical-align-center" role="document">
                        <div className="modal-content">
                            <div id="aviso-modal-content" className="modal-body">
                                <i id="error-icon" className="fas fa-times-circle"></i><br /><br />
                                ERRO AO CADASTRAR
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NaoCadastradoModal;

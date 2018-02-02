import React, {
    Component
} from 'react';

class AvisoPosicionadoModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" id="aviso-posicionado-modal" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div className="modal-dialog vertical-align-center" role="document">
                        <div className="modal-content">
                            <div id="aviso-modal-content" className="modal-body">
                                <i id="check-icon" className="fas fa-check-circle"></i><br /><br />
                                A POSIÇÃO DO CARRO FOI SALVA
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AvisoPosicionadoModal;

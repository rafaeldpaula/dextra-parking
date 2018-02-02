import React, {
    Component
} from 'react';

class AvisoLimiteModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" id="aviso-limite-modal" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div className="modal-dialog vertical-align-center" role="document">
                        <div className="modal-content">
                            <div id="aviso-modal-content" className="modal-body">
                                <i id="error-icon" className="fas fa-times-circle"></i><br /><br />
                                A POSIÇÃO DO CARRO ESTA LONGE PARA UM CARALHO
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AvisoLimiteModal;

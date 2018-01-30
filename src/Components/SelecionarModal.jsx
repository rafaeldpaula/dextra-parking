import React, {
    Component
} from 'react';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

class SelecionarModal extends Component {
    render() {
        return (
            <Router>
                <div className="modal fade" id="selecionar-modal" tabIndex="-1" role="dialog" aria-labelledby="selecionar-modal-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="selecionar-modal-label">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.items.map((car, i) =>{
                                    return <p key={i}>{car.name} => {car.email}</p>
                                })}  
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default SelecionarModal;

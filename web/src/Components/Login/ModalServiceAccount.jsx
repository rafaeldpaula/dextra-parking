import React, { Component } from 'react';

export class ModalServiceAccount extends Component {
    render() {
        return <div className="modal-dialog">
            <div className="modal-dialog-overlay" onClick={() => this.props.onCancel()} />
            <div className="modal-dialog-content">
                HUE
            </div>
        </div>;
    }
}

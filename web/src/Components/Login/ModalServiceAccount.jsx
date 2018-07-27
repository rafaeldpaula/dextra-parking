import React, { Component } from 'react';

export class ModalServiceAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
        };
    }

    render() {
        return <div className="modal-dialog">
            <div className="modal-dialog-overlay" onClick={() => this.props.onCancel()} />
            <div className="modal-dialog-content">
                <p>
                    <label>
                        <span>Username:</span>
                        <input type="text" onChange={(e) => this.setState({ user: e.target.value })} />
                    </label>
                </p>
                <p>
                    <label>
                        <span>Password:</span>
                        <input type="text" onChange={(e) => this.setState({ pass: e.target.value })} />
                    </label>
                </p>
                <p>
                    <input type="button" value="Login" onClick={() => this.props.onSubmit(this.state.user, this.state.pass)} />
                    <input type="button" value="Cancel" onClick={() => this.props.onCancel()} />
                </p>
            </div>
        </div>;
    }
}

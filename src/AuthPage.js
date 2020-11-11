import React, { Component } from 'react'

export default class SignUp extends Component {

    state = {
        email: '',
        password: ''
    }










    render() {
        return (
            <div>
                <h1>Sign-up or Login!</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input
                            onChang={(e) => this.setState({ email: e.target.value })}
                            value={this.state.password} type="password" />
                    </label>
                </form>

            </div>
        )
    }
}

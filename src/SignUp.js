import React, { Component } from 'react'
import request from 'superagent';

export default class SignUp extends Component {

    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const user = await request
            .post('https://rocky-plains-30100.herokuapp.com/auth/signup')
            .send(this.state);

        this.setState({ loading: false })

        this.props.changeTokenAndUsername(user.body.email, user.body.token);

        this.props.history.push('/todos');
    }



    render() {
        return (

            <div>
                <div className='auth-form'>
                    <form className='auth-form' onSubmit={this.handleSubmit}>
                        <h2>First time user? Start here!</h2>
                        <label>
                            Email:
                            <input
                                onChange={(e) => this.setState({ email: e.target.value })}
                                value={this.state.email} type='email' required />
                        </label>
                        <label>
                            Password:
                            <input
                                onChange={(e) => this.setState({ password: e.target.value })}
                                value={this.state.password} type='password' />
                        </label>
                        {
                            this.state.loading
                                ? 'Loaadddiinnnnggggggg'
                                : <button>
                                    Sign-up!
                            </button>
                        }
                    </form>
                </div>
            </div>
        )
    }
}

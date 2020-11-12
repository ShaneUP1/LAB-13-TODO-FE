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
        try {
            const user = await request
                .post('https://rocky-plains-30100.herokuapp.com/auth/signin')
                .send(this.state);

            this.setState({ loading: false })
            this.props.changeTokenAndUsername(user.body.email, user.body.token);

            this.props.history.push('/todos');
        }

        catch (e) {
            this.setState({ loading: false })
            alert("Sorry, it looks like you've entered an invalid username/password.")
        }
    }



    render() {
        return (

            <div>
                <div className='auth-form'>
                    <form className='auth-form' onSubmit={this.handleSubmit}>
                        <h2>Welcome back! Enter your username and password.</h2>
                        <p>If you're new, please create an account through the Sign-up link!</p>
                        <label>
                            Username:
                            <input
                                onChange={(e) => this.setState({ email: e.target.value })}
                                value={this.state.email} />
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

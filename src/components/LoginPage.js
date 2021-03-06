import React, { Component } from 'react'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { gql, graphql, compose } from 'react-apollo'

class LoginPage extends Component {

    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        name: ''
    }

        //Inline IF logic   
        //See for more details: https://facebook.github.io/react/docs/conditional-rendering.html#inline-if-with-logical--operator
    
    render() {
        return (
            <div className="pageHeader">
                <h4>{this.state.login ? 'Login' : 'Sign Up'}</h4>
                <div  className="loginArea">
                    {!this.state.login && 
                        <input className="nameArea"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                            type='text'
                            placeholder='Your name'
                        />
                    }
                            Email
                    <input className="emailArea"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        type='text'
                        placeholder='Your email address'
                    />
                            Password
                    <input className="passwordArea"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        type='password'
                        placeholder='Choose a safe password'
                    />
                </div>
                <div>
                    <button className="login_create"
                        onClick={() => this._confirm()}
                    >
                        {this.state.login ? 'login' : 'create account' }
                    </button>
                    <button className="accountBtn"
                        onClick={() => this.setState({ login: !this.state.login })}
                    >
                    {this.state.login ? 'Need to create an account?' : 'already have an account?'}
                    </button>
                </div>
            </div>
        )
    }

    _confirm = async () => {
        const { name, email, password } = this.state
        if (this.state.login) {
            const result = await this.props.signinUserMutation({
            variables: {
                email,
                password
            }
            })
            const id = result.data.signinUser.user.id
            const token = result.data.signinUser.token
            this._saveUserData(id, token)
            } else {
            const result = await this.props.createUserMutation({
                variables: {
                    name,
                    email,
                    password
                }
            })
            const id = result.data.signinUser.user.id
            const token = result.data.signinUser.token
            this._saveUserData(id, token)
        }
        this.props.history.push(`/`)
    }

    _saveUserData = (id, token) => {
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
    }

}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(LoginPage)
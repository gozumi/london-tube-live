import * as React from 'react'
import { connect } from 'react-redux'
import { AuthState } from '../../types/enums'
import { attemptSignIn } from '../../state/action-creators'
import { attemptSignOut } from '../../state/action-creators'

export interface AuthProps {
  user: any,
  attemptSignIn: any,
  attemptSignOut: any
}

export interface LocalState {
  // user: any
}

class Auth extends React.Component<AuthProps, LocalState> {
  constructor() {
    super()
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignIn() {
    console.log('sign in button clicked')
    this.props.attemptSignIn()
  }

  handleSignOut() {
    console.log('sign out button clicked')
    this.props.attemptSignOut()
  }

  render() {
    console.log(this.props)
    return (
      <section>
        {
          this.props.user
          ?
            <button onClick={this.handleSignOut} >
              Sign out
            </button>
          :
            <button onClick={this.handleSignIn} >
              Sign in
            </button>
        }
      </section>
    )
  }
}

const mapPropsToState = (state: any): any => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    attemptSignIn() { dispatch(attemptSignIn()) },
    attemptSignOut() { dispatch(attemptSignOut()) }
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(Auth)

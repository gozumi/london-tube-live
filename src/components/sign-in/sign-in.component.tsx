import * as React from 'react'
import './sign-in.component.less'

export const SignIn = ({ signIn }: { signIn: any }): React.ReactElement<{}> => {
  return (
    <div className='sign-in'>
      <button
        className='sign-in__button'
        onClick={signIn}
      >
        Sign in
      </button>
    </div>
  )
}

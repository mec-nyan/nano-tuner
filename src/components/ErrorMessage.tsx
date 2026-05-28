import { useState } from 'react'
import './ErrorMessage.css'

interface ErrorMessageProps {
  error: string | null
}

const microphoneAccessError = /^Couldn't access microphone/

export default function ErrorMessage({ error }: ErrorMessageProps) {
  const [hidden, setHidden] = useState(false)

  return (
    <>
      {hidden === false && (
        <div className='error-container'>
          <div className='error-message-border'>
            <div className='error-message'>
              <h2>Oh f**k!</h2>
              {error !== null && microphoneAccessError.test(error) ? (
                <p>
                  Sorry mate, it seems we couldn't access the microphone on your
                  device...
                  <br />
                  <br />
                  Try reloading and allowing the app to use the microphone.
                </p>
              ) : (
                <p>
                  Sorry mate, it seems that something didn't quite work as
                  expected...
                  <br />
                  <br />
                  Try reloading and allowing the app to use the microphone.
                </p>
              )}
              <div className='error-close' onClick={() => setHidden(true)}>
                Got it!
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

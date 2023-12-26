import ReactDOM from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import store from './reducers/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store = {store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

renderApp()
store.subscribe(() => {renderApp()})
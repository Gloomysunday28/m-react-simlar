import React from './React'
import ReactDOM from './ReactDOM'
import App from './App.js'

const Header = <header>header</header>

function Welcome( props ) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <div>
  <Header />
  <Welcome name="321"/>
</div>

ReactDOM.render(
  <App />,
  document.getElementById( 'root' )
);

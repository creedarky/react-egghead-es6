import React from 'react';
import ReactDOM from 'react-dom';
import {App, App2, App3, Wrapper, App5, App6, App7, App8, JSXCompiler} from './App';


class Main extends React.Component {
  render() {
    return (
      <div >
        <JSXCompiler/>
        <App8/>
        <App  cat={5} />
        <App2  cat={5} />
        <App3  cat={5} />
        <Wrapper />
        <App5 val={0}/>
        <App6 />
        <App7/>
      </div>
    );
  }
}



export default Main;



ReactDOM.render(<Main  />, document.getElementById('app'));


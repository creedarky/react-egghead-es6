import React from 'react';
import ReactDOM from 'react-dom';


/** No state **/
const AppConst = () => <h1>Hello Eggheads</h1>;
/** Has state **/
export class App extends React.Component {
  constructor() {
    super();
    this.state = {txt: 'this is the state text', cat: 0};
    this.update = this.update.bind(this);
  }

  update(e) {
    this.setState({txt: e.target.value});
  }

  render() {
    let txt = this.props.txt;
    return (
      <div>
        <h1>Hello World</h1>
        <h2>Props: {this.props.txt}</h2>
        <h2>Variables: {txt}</h2>
        <h2>State: {this.state.txt}</h2>
        <input type="text" onChange={this.update.bind(this)} />
        <br/>
        <Widget txt={this.state.txt} update={this.update} />
        <br/>
        <Widget txt={this.state.txt} update={this.update} />
        <br/>
        <Widget txt={this.state.txt} update={this.update} />


        <AppConst/>
      </div>
    );
  }
}

const Widget = (props) => {
  return (
    <div>
      <input type="text" onChange={props.update} />
      <h2>{props.txt}</h2>
    </div>
  );
};

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
};

App.defaultProps = {
  txt: 'this is the default txt'
};

// ref example
export class App2 extends React.Component {
  constructor() {
    super();
    this.state = {
      green: 0,
      red: 0,
      blue: 0
    };
    this.update = this.update.bind(this);
  }

  update(e) {
    console.log('asdf');
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
    })
  }

  render() {
    return (
      <div>
        <Slider ref="red" update={this.update} />
        {this.state.red}
        <br />
        <Slider ref="green" update={this.update} />
        {this.state.green}
        <br />
        <Slider ref="blue" update={this.update} />
        {this.state.blue}
        <br />
      </div>
    );
  }
}

class Slider extends React.Component {
  render() {
    return (
      <div>
        <input ref="inp"  type="range" min="0" max="255" onChange={this.props.update} />
      </div>
    )
  }
}


// access children values


export class App3 extends React.Component {
  render() {
    return (
      <Button>
        I <Heart/> React
      </Button>
    );
  }
}

class Button extends React.Component {
  render(){
    console.log(this.props.children);
    return <button>{this.props.children}</button> // props.children to access the content inside
  }
}

const Heart = () => <span className="glyphicon glyphicon-heart"></span>;



class App4 extends React.Component {
  constructor() {
    super();
    this.state = {val: 0};
    this.update = this.update.bind(this);

  }
  update() {
    this.setState({val: this.state.val + 1});
  }
  // It's fully prepared and it's ready to get into the DOM
  componentWillMount() {
    this.setState({m: 2});
  }

  componentDidMount() {
    console.log('mounted');
    console.log(ReactDOM.findDOMNode(this));
    this.inc = setInterval(this.update, 500)

  }

  componentWillUnmount() {
    console.log('unmount');
    clearInterval(this.inc);
  }

  render() {
    console.log('rendering');
    return (
      <button onClick={this.update}>{this.state.val * this.state.m}</button>
    );
  }
}

export class Wrapper extends React.Component {
  constructor(){
    super();
  }
  mount(){
    ReactDOM.render(<App4 />, document.getElementById('a'))
  }
  unmount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('a'))
  }
  render(){
    return (
      <div>
        <button onClick={this.mount.bind(this)}>Mount</button>
        <button onClick={this.unmount.bind(this)}>Unmount</button>
        <div id="a"></div>
      </div>
    )
  }
}

App4.propTypes = {};
App4.defaultProps = {};




export class App5 extends React.Component {
  constructor() {
    super();
    this.state = {increasing: false};
    this.update = this.update.bind(this);

  }
  update() {
    ReactDOM.render(
      <App5 val={this.props.val + 1} />, document.getElementById('app5')
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({increasing: nextProps.val > this.props.val});
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.val % 5 === 0;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
  }


  render() {
    console.log(this.state.increasing);
    return (
      <button onClick={this.update}>{this.props.val}</button>
    );
  }
}

// Higher order components to replace mixins

let Mixin = InnerComponent => class extends React.Component {
  constructor(){
    super();
    this.update = this.update.bind(this);
    this.state = {val: 0}
  }
  update(){
    this.setState({val: this.state.val + 1})
  }
  componentWillMount(){
    console.log('will mount')
  }
  render(){
    return <InnerComponent
      update={this.update}
      {...this.state}
      {...this.props} />
  }
  componentDidMount(){
    console.log('mounted')
  }
};

const Button2 = (props) => <button
  onClick={props.update}>
  {props.txt} - {props.val}
</button>;

const Label = (props) => <label
  onMouseMove={props.update}>
  {props.txt} - {props.val}
</label>;

let ButtonMixed = Mixin(Button2);
let LabelMixed = Mixin(Label);

export class App6 extends React.Component {

  render(){
    return (
      <div>
        <ButtonMixed txt="Button" />
        <LabelMixed txt="Label" />
      </div>
    );
  }

}

// Composable components

export class App7 extends React.Component {
  constructor(){
    super();
    this.state = {
      red: 0
    };
    this.update = this.update.bind(this)
  }
  update(e){
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value
    })
  }
  render(){
    return (
      <div>
        <NumInput
          ref="red"
          min={0}
          max={255}
          step={0.01}
          val={+this.state.red}
          label="Red"
          type="number"
          update={this.update} />
      </div>
    );
  }
}


class NumInput extends React.Component {
  render(){
    let label = this.props.label !== '' ?
      <label>{this.props.label} -  {this.props.val}</label> : ''
    return (
      <div>
        <input ref="inp"
               type={this.props.type}
               min={this.props.min}
               max={this.props.max}
               step={this.props.step}
               defaultValue={this.props.val}
               onChange={this.props.update} />
        {label}
      </div>
    );
  }
}
// proptypes
NumInput.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  val: React.PropTypes.number,
  label: React.PropTypes.string,
  update: React.PropTypes.func.isRequired, //function only and it's required
  type: React.PropTypes.oneOf(['number', 'range']) // to accept an array of possible values
};
// default props
NumInput.defaultProps = {
  min: 0,
  max: 0,
  step: 1,
  val: 0,
  label: '',
  type: 'range'
};


// generating components from data
export class App8 extends React.Component {
  constructor(){
    super();
    this.state = {data: [
      {id: 1, name: "Simon Bailey"},{id: 2, name: "Thomas Burleson"},
      {id: 3, name: "Will Button"},{id: 4, name: "Ben Clinkinbeard"},
      {id: 5, name: "Kent Dodds"},{id: 6, name: "Trevor Ewen"},
      {id: 7, name: "Aaron Frost"},{id: 8, name: "Joel Hooks"},
      {id: 9, name: "Jafar Husain"},{id: 10, name: "Tim Kindberg"},
      {id: 11, name: "John Lindquist"},
      {id: 12, name: "Joe Maddalone"},
      {id: 13, name: "Tyler McGinnis"},{id: 14, name: "Scott Moss"},
      {id: 15, name: "Robert Penner"},{id: 16, name: "Keith Peters"},
      {id: 17, name: "Lukas Ruebbelke"},
      {id: 18, name: "Brett Shollenberger"}
    ]}
  }
  render(){
    let rows = this.state.data.map( person => {
      return <PersonRow key={person.id} data={person} />
    });
    return <table>
      <tbody>{rows}</tbody>
    </table>
  }
}

const PersonRow = (props) => {
  return <tr>
    <td>{props.data.id}</td>
    <td>{props.data.name}</td>
  </tr>
};

// jsx compiler
export class JSXCompiler extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '/* add jsx here */',
      output: '',
      err: ''
    }
    this.update = this.update.bind(this)
  }
  update(e){
    let code = e.target.value
    try {
      this.setState({
        output: babel.transform(code, {
          stage: 0,
          loose: "all"
        }).code,
        err: ''
      })
    }
    catch(err){
      this.setState({
        err: err.message
      })
    }
  }
  render(){
    return (
      <div>
        <header>&nbsp;{this.state.err}</header>
        <div className="container">
          <textarea onChange={this.update} defaultValue={this.state.input}>
          </textarea>
          <pre>
            {this.state.output}
          </pre>
        </div>
      </div>
    )
  }
}




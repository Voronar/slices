import React from 'react';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  state = {
    component: () => <span>placeholder</span>,
  };
  handleClick = (path1: string) => {
    import(`src/${path1}`).then(m =>
      this.setState({
        component: () => (
          <span>
            {React.createElement(m.default)}
            {path1}
          </span>
        ),
      }),
    );
  }
  render() {
    // tslint:disable-next-line:variable-name
    const Component = this.state.component;

    return (
      <div>
        <div>
          <Button
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => this.handleClick('comp/Checkbox')}
            variant="contained"
            color="primary"
          >
            Awesome button
          </Button>
        </div>
        <div>
          <Component />
        </div>
      </div>
    );
  }
}

export default App;

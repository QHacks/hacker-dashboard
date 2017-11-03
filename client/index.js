import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-less/semantic.less";

const App = () => {
  return (
		<div>
			<p>Nice! Looks like things are setup, lets build a UI! Yay!</p>
			<button class="ui button">
				Hello
			</button>
		</div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

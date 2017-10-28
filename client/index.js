import React from 'react';
import ReactDOM from 'react-dom';
import style from './assets/main.scss';

const App = () => {
  return (
		<div>
			<p>Nice! Looks like things are setup, lets build a UI! Yay!</p>
		</div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, ComicDetails } from './pages';

function App(props) {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='/:id' element={<ComicDetails />} />
			</Routes>
		</Router>
	);
}

export default App;

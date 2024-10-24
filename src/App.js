// src/App.js
import React from 'react'
import Clock from './components/Clock'
import Header from './components/Header'
import './styles.css'

function App() {
	return (
		<div className='App'>
			<Header />
			<Clock />
		</div>
	)
}

export default App

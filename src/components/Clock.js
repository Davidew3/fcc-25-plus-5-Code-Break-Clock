import React, { useState, useEffect, useRef } from 'react'

const Clock = () => {
	// State for break, session, timer, and running status
	const [breakTime, setBreakTime] = useState(5)
	const [sessionTime, setSessionTime] = useState(25)
	const [timeLeft, setTimeLeft] = useState(sessionTime * 60)
	const [isRunning, setIsRunning] = useState(false)
	const [isSession, setIsSession] = useState(true)
	const alarmRef = useRef(null)

	// Format time helper
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`
	}

	// Update display when timer changes
	useEffect(() => {
		setTimeLeft(sessionTime * 60)
	}, [sessionTime])

	// Timer functionality
	useEffect(() => {
		let timerInterval = null
		if (isRunning) {
			timerInterval = setInterval(() => {
				setTimeLeft((prevTime) => {
					if (prevTime > 0) {
						return prevTime - 1
					} else {
						alarmRef.current.play() // Play the alarm sound
						if (isSession) {
							setIsSession(false) // Switch to break
							return breakTime * 60 // Set time for break
						} else {
							setIsSession(true) // Switch back to session
							return sessionTime * 60 // Set time for session
						}
					}
				})
			}, 1000)
		}
		return () => clearInterval(timerInterval) // Clear interval on unmount or when not running
	}, [isRunning, breakTime, sessionTime, isSession])

	// Increment and Decrement Functions
	const incrementTime = (type) => {
		if (type === 'break') setBreakTime((prev) => Math.min(prev + 1, 60))
		if (type === 'session') setSessionTime((prev) => Math.min(prev + 1, 60))
	}

	const decrementTime = (type) => {
		if (type === 'break') setBreakTime((prev) => Math.max(prev - 1, 1))
		if (type === 'session') setSessionTime((prev) => Math.max(prev - 1, 1))
	}

	// Start/Stop Timer
	const startStopTimer = () => {
		setIsRunning(!isRunning)
	}

	// Reset Timer
	const resetTimer = () => {
		setIsRunning(false)
		setIsSession(true)
		setBreakTime(5)
		setSessionTime(25)
		setTimeLeft(25 * 60)
		alarmRef.current.pause()
		alarmRef.current.currentTime = 0
	}

	return (
		<div className='wrapper'>
			<div className='grid-container'>
				<header>25 + 5 Clock</header>

				{/* Break Controls */}
				<div id='break-label'>Break-Length</div>
				<button
					className='btn px-1'
					id='break-increment'
					onClick={() => incrementTime('break')}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='#0984e3'
						className='bi bi-caret-up-fill break'
						viewBox='0 0 16 16'
					>
						<path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
					</svg>
				</button>

				<div id='break-length' className='break-display'>
					{breakTime}
				</div>

				<button
					className='btn px-1'
					id='break-decrement'
					onClick={() => decrementTime('break')}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='#0984e3'
						className='bi bi-caret-down-fill break'
						viewBox='0 0 16 16'
					>
						<path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
					</svg>
				</button>

				{/* Session Controls */}
				<div id='session-label'>Session-Length</div>
				<button
					className='btn px-1'
					id='session-increment'
					onClick={() => incrementTime('session')}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='#0984e3'
						className='bi bi-caret-up-fill'
						viewBox='0 0 16 16'
					>
						<path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
					</svg>
				</button>

				<div id='session-length' className='session-display'>
					{sessionTime}
				</div>

				<button
					className='btn px-1'
					id='session-decrement'
					onClick={() => decrementTime('session')}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='#0984e3'
						className='bi bi-caret-down-fill'
						viewBox='0 0 16 16'
					>
						<path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' />
					</svg>
				</button>

				{/* Timer Display */}
				<div id='timer-label'>{isSession ? 'Session' : 'Break Time!'}</div>
				<div id='time-left'>{formatTime(timeLeft)}</div>

				{/* Start/Stop Button */}
				<button id='start_stop' className='btn mx-3' onClick={startStopTimer}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='#0984e3'
						className='bi bi-play-fill'
						viewBox='0 0 16 16'
					>
						<path d='m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393' />
					</svg>
				</button>

				{/* Reset Button */}
				<button id='reset' className='btn px-3' onClick={resetTimer}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						fill='currentColor'
						className='bi bi-arrow-clockwise'
						viewBox='0 0 16 16'
					>
						<path
							fillRule='evenodd'
							d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z'
						/>
						<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466' />
					</svg>
				</button>

				{/* Alarm */}
				<audio
					id='beep'
					preload='auto'
					ref={alarmRef}
					src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav'
				></audio>
			</div>
		</div>
	)
}

export default Clock

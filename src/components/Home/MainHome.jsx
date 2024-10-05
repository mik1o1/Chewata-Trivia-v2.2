import categories from '@/assets/categories.json'
import PageFooter from '../PageFooter'
import playSound from '@/helpers/playSound'

export default function MainHome () {
	function handleTitleHover (e) {
		e.target.classList.add('jello-vertical')
		e.target.style.color = categories[Math.floor(Math.random() * categories.length)].color
		e.target.addEventListener('animationend', () => e.target.classList.remove('jello-vertical'))
	}

	const handleTitleLeave = (e) => (e.target.style.color = 'white')

	function handlePlay () {
		playSound('pop')
		document.getElementById('newGameDialog')?.showModal()
	}

	return (
		<main className='mainHome relative  mx-auto h-screen flex gap-4 flex-col justify-between items-center px-5 py-20 text-center text-white w-full'>
			<article>
				<h1 className='text-8xl font-medium w-full uppercase z-10 relative' translate='no'>
					{'አራዳ'.split('').map((letter, index) => (
						<span key={index} id={letter + index + 10} className='relative inline-block transition-all duration-300' onMouseEnter={handleTitleHover} onMouseLeave={handleTitleLeave}>
							{letter}
						</span>
					))}
				</h1>
				<div className='bg-[#1c233a] absolute w-full lg:w-[41.7vw] h-40 top-16 left-0'></div>
				<p className=' mb-20 relative'>
				   አዋቂ እራሱን ይፈትናል!
				</p>
			</article>
			<button onClick={handlePlay} id='play' href="play" className='btn-primary uppercase px-6 py-4 text-lg max-w-md w-full mx-auto mt-10' >
			እንጫወት
			</button>
			<PageFooter />
		</main >
	)
}

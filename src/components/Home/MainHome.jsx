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
				<h1 className='text-8xl font-medium w-full uppercase z-50 relative relative inline-block transition-all duration-300' translate='no'>
					አራዳ
				</h1>
				<div className='bg-[#1c233a] absolute w-full h-40 top-16 left-0'></div>
				<p className=' mb-20 relative'>
				Powerd By ጨዋታ አዋቂ
				</p>
			</article>
			<button onClick={handlePlay} id='play' href="play" className='btn-primary uppercase px-6 py-4 text-lg max-w-md w-full mx-auto mt-10' >
			እንጫወት
			</button>
			<PageFooter />
		</main >
	)
}

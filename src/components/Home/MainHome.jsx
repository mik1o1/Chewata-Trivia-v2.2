import { useEffect, useRef } from 'react';
import categories from '@/assets/categories.json';
import PageFooter from '../PageFooter';
import playSound from '@/helpers/playSound';

export default function MainHome() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const words = ['አ', 'ራ', 'ዳ', 'ጨ', 'ዋ', 'ታ', 'ሀ','ለ','ሐ','መ','ሰ','ረ','ሰ','ሸ','ቀ','በ','ተ','ቸ','አ','ነ','ኘ','ዐ','ወ','ገ','ደ','የ','ዘ','ጸ','ጰ','ፐ','ሪ','ኮ','ፋ','ጨ','ዋ','ታ','አ','ዋ','ቂ','እ','ፉ','ዬ']; // Custom words

		const setCanvasSize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		const updateFontSize = () => {
			// Set font size based on screen width with a minimum size of 5
			const baseFontSize = 25; // Default font size
			const fontSize = Math.max(baseFontSize, Math.floor(window.innerWidth / 100)); // Scale based on width
			ctx.font = `${fontSize}px Arial`;
			return fontSize;
		};

		const drawMatrixRain = () => {
			const fontSize = updateFontSize();
			const columns = Math.floor(canvas.width / fontSize);
			const drops = Array(columns).fill(1); // Array to hold the drops position

			// Main drawing function
			const matrixRain = () => {
				ctx.fillStyle = '#2563ebaa'; // Clear canvas with a translucent black
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = '#3b82f6'; // Green color for the text

				drops.forEach((drop, index) => {
					const text = words[Math.floor(Math.random() * words.length)];
					const x = index * fontSize;
					const y = drop * fontSize;

					ctx.fillText(text, x, y);

					// Reset drop position if it goes off the screen
					if (y > canvas.height && Math.random() > 0.975) {
						drops[index] = 0; // Reset drop position
					}

					drops[index]++;
				});
			};

			const interval = setInterval(matrixRain, 50); // Call the function every 50ms

			return () => clearInterval(interval); // Cleanup on unmount
		};

		setCanvasSize();
		window.addEventListener('resize', () => {
			setCanvasSize();
			drawMatrixRain(); // Restart drawing on resize
		});

		drawMatrixRain(); // Initial drawing

		return () => {
			window.removeEventListener('resize', setCanvasSize);
		};
	}, []);

	function handlePlay() {
		playSound('pop');
		document.getElementById('newGameDialog')?.showModal();
	}
	

	return (
		<main className='mainHome relative mx-auto h-screen flex gap-4 flex-col justify-center items-center px-5 py-20 text-center text-white w-full'>
			<canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
			<article className='relative z-1'>
				<h1
					style={{ color: '#ffffff' }}
					className='text-[150px]  md:text-[200px] font-bold w-full uppercase inline-block md '
					translate='no'
				>
					አዋቂ
				</h1>
				<p className='mb-20 relative' style={{ color: '#ffffff' }}>
					Powered By ጨዋታ አዋቂ
				</p>
			</article>
			<button
				onClick={handlePlay}
				id='play'
				className='btn-primary uppercase px-6 py-4 text-[25px] md:text-[25px] max-w-md w-full mx-auto mt-10'
			>
				እንጫወት
			</button>
			<PageFooter />
		</main>
	);
}
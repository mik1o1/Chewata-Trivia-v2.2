import '@/styles/globals.css'
import Head from 'next/head'
import NewGameForm from '@/components/Form/NewGameForm'

export default function App ({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
			<NewGameForm />
			
		</>
	)
}

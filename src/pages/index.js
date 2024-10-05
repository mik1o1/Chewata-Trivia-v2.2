import Head from 'next/head'
import MainHome from '@/components/Home/MainHome'
import GameModes from '@/components/Home/GameModes'
import Categories from '@/components/Home/Categories'
import { useEffect } from 'react'
import DataLoader from '@/components/DataLoader'; // Adjust the import path as necessary



export default function Main () {
	useEffect(() => { window.onbeforeunload = () => null }, [])

	return (
		<>
			<Head>
				<title>አራዳ | Arada</title>
			</Head>
			<MainHome />
			<GameModes />
			<Categories />
			<DataLoader /> {/* This will refresh data on load */}
			<style>
				{`
				display: grid;
			
			  `}
			</style>
		</>
	)
}

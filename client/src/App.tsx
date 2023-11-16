import React from 'react';
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./pages/Header";
import {Footer} from "./pages/Footer";
import {Main} from "./pages/Main";
import { Navbar, ChannelDetail, Feed, SearchFeed, VideoDetail} from "./components";
import {Box} from "@mui/material";

function App() {
	const url: string = window.location.pathname;

    return (
		<div className="App">
			{/*<Header />*/}
			<BrowserRouter>
				<Box sx={{ backgroundColor: '#000'}}>
					<Navbar />
					<Routes>
						{/*<Route path={url} element={<Main url={url}/>}></Route>*/}
						<Route path={"/"} element={<Feed />} />
						<Route path={"/video/:id"}  element={<VideoDetail />} />
						<Route path={"/channel/:id"}  element={<ChannelDetail />} />
						<Route path={"/search/:searchTerm"}  element={<SearchFeed />} />
					</Routes>
				</Box>
			</BrowserRouter>
			<Footer />
		</div>
    );
}

export default App;

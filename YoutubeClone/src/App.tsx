import React, { useEffect, useState, useContext } from "react";
import Header from "./Header"
import RecommendedVideos from "./RecommendedVideos"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SearchPageResults from "./SearchPageResults"
import VideoPlayer from "./VideoPlayer";
import Grid from "@material-ui/core/Grid";
const App = () => {
		return (
			<>
			<Router>
				<Header/>
				<Route exact path="/">
				<Grid container>
			 
						<RecommendedVideos BreakPoints={{"xs":12,"sm": 6, "md": 4}} />
					 
				</Grid>
				</Route>
				<Route path="/search/:searchQuery">
				<SearchPageResults />
				</Route>

				<Route path="/video/:videoId">

					<VideoPlayer />
				</Route>
			</Router>
			</>
		)

};

export default App;

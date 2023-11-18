import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";
import "./SearchFeed.scss";

export const SearchFeed = () => {
	const [videos, setVideos] = useState(null);
	const { searchTerm } = useParams();

	useEffect(() => {
		fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
			.then((data) => setVideos(data.items))
	}, [searchTerm]);

	return (
		<div id={"search-feed"}>
			<p id={"results"}>Search Results for <span>{searchTerm}</span> videos</p>
			<div id={"flex"}>
				{<Videos videos={videos} />}
			</div>
		</div>
	);
};
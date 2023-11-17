import { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import "./Feed.scss";

export const Feed = () => {
	const [selectedCategory, setSelectedCategory] = useState("New");
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		// setVideos(null);

		fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
			.then((data) => setVideos(data.items))
	}, [selectedCategory]);

	return (<div id={"feed"}>
				<div id={"feed-sidebar"}>
					<Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
				</div>
				<div id={"selected-category"}>
					{selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
					<Videos videos={videos} />
				</div>
		</div>

	)
}
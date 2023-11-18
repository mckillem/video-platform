import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

export const VideoDetail = () => {
	const [videoDetail, setVideoDetail] = useState(null);
	const [videos, setVideos] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
			.then((data) => setVideoDetail(data.items[0]))

		fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
			.then((data) => setVideos(data.items))
	}, [id]);

	if(!videoDetail?.snippet) return <Loader />;

	const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

	return (
		<div id={"video-detail"}>
			<div id={"flex"}>
				<div id={"react-player"}>
					<ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
					<p id={"title"}>{title}</p>
					<div id={"channel"}>
						<Link to={`/channel/${channelId}`}>
							<p id={"channel-title"}>{channelTitle}</p>
						</Link>
						<div id={"statistics"}>
							{parseInt(viewCount).toLocaleString()} views
							{parseInt(likeCount).toLocaleString()} likes
						</div>
					</div>
				</div>
				<div id={"videos"}>
					<Videos videos={videos}/>
				</div>
			</div>
		</div>
	);
};
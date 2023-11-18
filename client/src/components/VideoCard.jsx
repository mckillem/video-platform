import { Link } from "react-router-dom";
import "./VideoCard.scss";
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

export const VideoCard = ({ video: {id: {videoId}, snippet} }) => {

	return (
		<div id={"video-card"}>
			<Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY` }>
				<img id={"image"} src={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title} />
			</Link>
			<div id={"content"}>
				<Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
					<p id={"title"}>{snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}</p>
				</Link>
				<Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
					<p id={"channel-title"}>{snippet?.channelTitle || demoChannelTitle}</p>
				</Link>
				<p id={"published-at"}>{snippet?.publishedAt || demoChannelTitle}</p>
			</div>
		</div>
	)
}
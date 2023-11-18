import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';
import "./ChannelCard.scss";

export const ChannelCard = ({ channelDetail }) => (
	<div id={"channel-card"}>
		<Link to={`/channel/${channelDetail?.id?.channelId}`}>
			<div id={"content"}>
				<img id={"image"}
					src={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
					alt={channelDetail?.snippet?.title}
				/>
				{channelDetail?.snippet?.title}{' '}
				{channelDetail?.statistics?.subscriberCount && (
					<p id={"subscribers-count"}>{parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers</p>
				)}
			</div>
		</Link>
	</div>
);
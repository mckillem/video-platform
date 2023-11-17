import { ChannelCard, Loader, VideoCard } from "./";
import "./Videos.scss";

export const Videos = ({ videos, direction }) => {
	if(!videos?.length) return <Loader />;

	return (
		<div id={"videos"}>
			{videos.map((item, idx) => (
				<div key={idx}>
					{item.id.videoId && <VideoCard video={item} /> }
					{item.id.channelId && <ChannelCard channelDetail={item} />}
				</div>
			))}
		</div>
	)
}
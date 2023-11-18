import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import "./ChannelDetail.scss";

export const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		const fetchResults = async () => {
			const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

			setChannelDetail(data?.items[0]);

			const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

			setVideos(videosData?.items);
		};

		fetchResults();
	}, [id]);

	return (
		<div id={"channel-detail"}>
			<div id={"top-image"} />
				<ChannelCard channelDetail={channelDetail} />
			<div id={"content"}>
				<Videos videos={videos} />
			</div>
		</div>
	);
};
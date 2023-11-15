import "./Main.scss";
import "../grid.scss"
import {Videos} from "../mockData/Videos";
import {VideoObject} from "../implementations/VideoObject";
import {useState} from "react";
import {CreatorObject} from "../implementations/CreatorObject";
import {Creators} from "../mockData/Creators";

export const Main = ({url}: {url: string}) => {
	const [slicedURL, setSlicedURL] = useState(url.slice(1));
	let content;

	const handleOnClick = (id: number) => {
		window.location.pathname = "/video" + id;
		setSlicedURL("video" + id);
	}

	if (slicedURL.slice(0, 5) === "video") {
		content = Videos.filter((video: VideoObject): boolean => video.id === parseInt(slicedURL.slice(5)))
			.map(({id, title, creator, video, description}: VideoObject) => {
				let creatorName:string = Creators.filter((creatorObject: CreatorObject): boolean => creatorObject.id === creator)
					.map(({username}: CreatorObject) => username)[0];

				return <div key={id}>
					<h1>{title}</h1>
					<video src={video} width="800" controls={true} autoPlay={false}/>
					<h2 onClick={() => {
						window.location.pathname = "/@" + creatorName;
						setSlicedURL("@" + creatorName);
					}}>{creatorName}</h2>
					<p>{description}</p>
				</div>
			})
	} else if (slicedURL.slice(0, 1) === "@") {
		content = Creators.filter((creator: CreatorObject): boolean => creator.username === slicedURL.slice(1))
			.map(({id, username, email, videosList, playlists, description}: CreatorObject) => {

			return <div key={id} id={"video"}>
				<h1>{username}</h1>
				<p>Kontakt: {email}</p>
				<h4>Videa: </h4>
				<ul>
					{Videos.filter((video: VideoObject) => {
						for (let i: number = 0; i < videosList.length; i++) {
							if (video.id === videosList[i]) {
								return video.id;
							}
						}
					}).map(({title}: VideoObject) => <li key={title}>{title}</li>)}
				</ul>
				<h4>Playlisty: </h4>
				<ul>
					<li>{playlists}</li>
				</ul>
				<p>{description}</p>
			</div>
		})
	} else {
		content = Videos.map(({id, title, creator, video, description, createdAt, publishedAt}: VideoObject) => {

			return <div key={id} id={"video"} className={"col span-1-of-3"}>
				<h1>{title}</h1>
				<video src={video} width="400" controls={false} autoPlay={false} onClick={() => handleOnClick(id)}/>
				<h2>{creator}</h2>
				<p>{description}</p>
				<p>{createdAt}</p>
				<p>{publishedAt}</p>
			</div>
		})
	}

	return (
		<div id={"main"}>
			{content}
		</div>
	);
};
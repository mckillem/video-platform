import "./Main.scss";
import "../grid.scss"
import {Videos} from "../mockData/Videos";
import {VideoObject} from "../implementations/VideoObject";
import {useState} from "react";
import {CreatorObject} from "../implementations/CreatorObject";
import {Creators} from "../mockData/Creators";

export const Main = ({url}: {url: string}) => {
	const [parsedURL, setParsedURL] = useState(parseInt(url.slice(1)));
	let content;

	const handleOnClick = (id: number) => {
		window.location.pathname = "/" + id;
		setParsedURL(id);
	}
	console.log(parsedURL)
	if (parsedURL > 0) {
		content = Videos.filter((video: VideoObject): boolean => video.id === parsedURL)
			.map(({id, title, creator, video, description}: VideoObject) => {

				return <div key={id}>
					<h1>{title}</h1>
					<video src={video} width="800" controls={true} autoPlay={false}/>
					{/*todo: zprovoznit. Vlastní metoda, univerzální a ne jen na /jedna*/}
					<h2 onClick={() => {
						window.location.pathname = "/jedna";
						setParsedURL(creator);
					}}>{creator}</h2>
					<p>{description}</p>
				</div>
			})
	} else if (url.slice(1) === "jedna") {
		content = Creators.filter((creator: CreatorObject): boolean => creator.username === "jedna").map(({id, username, email, videosList, playlists, description}: CreatorObject) => {

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
					}

					).map(({title}: VideoObject) => <li>{title}</li>)}
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
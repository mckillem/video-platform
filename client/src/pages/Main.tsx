import "./Main.scss";
import "../grid.scss"
import {Videos} from "../mockData/Videos";
import {VideoObject} from "../implementations/VideoObject";
import {useState} from "react";
import {CreatorObject} from "../implementations/CreatorObject";
import {Creators} from "../mockData/Creators";

export const Main = ({url}: {url: string}) => {
	const [slicedURL, setSlicedURL] = useState(url.slice(1));
	const [changeList, setChangeList] = useState(true);
	let content;

	const handleOnClick = (id: number) => {
		window.location.pathname = "/video" + id;
		setSlicedURL("video" + id);
	}

	const handleChangeList = (username: string, type: string) => {
		window.location.pathname = "/@" + username + "/" + type;
		setSlicedURL("@" + username + "/" + type);
	  // setChangeList(!changeList);
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
		console.log(slicedURL.slice(-9))
		let username: string = slicedURL.slice(1, -6) ? slicedURL.slice(1, -6) : slicedURL.slice(1, -9) ? slicedURL.slice(1, -9) : slicedURL.slice(1);

		content = Creators.filter((creator: CreatorObject): boolean => creator.username === username)
			.map(({id, username, email, videosList, playlists, description}: CreatorObject) => {

			return <div key={id}>
				<h1>{username}</h1>
				<p>Kontakt: {email}</p>
				<p>{description}</p>
				<h4 onClick={() => handleChangeList(username, "videa")}>Videa</h4>
				<h4 onClick={() => handleChangeList(username, "playlisty")}>Playlisty</h4>

				{slicedURL.slice(-5) === "videa" ?
					Videos.filter((video: VideoObject) => {
						for (let i: number = 0; i < videosList.length; i++) {
							if (video.id === videosList[i]) {
								return video.id;
							}
						}
					})
						.sort((a: VideoObject, b: VideoObject) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
						.map(({title, video}: VideoObject) =>  {
							return <>
								<h3 key={title}>{title}</h3>
								<video src={video} width={400} controls={true} className={"col span-2-of-2"}></video>
							</>
					}) :
					slicedURL.slice(-9) === "playlisty" ?
					<ul>
						<li>prvi{playlists}</li>
					</ul> :
					<ul></ul>
				}
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
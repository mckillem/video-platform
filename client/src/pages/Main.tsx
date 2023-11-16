import "./Main.scss";
import "../grid.scss"
import {Videos} from "../mockData/Videos";
import {VideoObject} from "../implementations/VideoObject";
import {useState} from "react";
import {ChannelObject} from "../implementations/ChannelObject";
import {Channels} from "../mockData/Channels";
import {Sidebar} from "./Sidebar";
import {UserObject} from "../implementations/UserObject";
import {Users} from "../mockData/Users";

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
			.map(({id, title, creator, video, description, publishedAt}: VideoObject) => {
				let userName:string = Users.filter((userObject: UserObject): boolean => userObject.id === creator)
					.map(({firstName, lastName}: UserObject) => firstName + "-" + lastName)[0];

				return <div key={id}>
					<h1>{title}</h1>
					<video src={video} width="800" controls={true} autoPlay={false}/>
					<h2 onClick={() => {
						window.location.pathname = "/@" + userName;
						setSlicedURL("@" + userName);
					}}>{userName}</h2>
					<p className={"options"}>Odebíráno/odebírat</p>
					<p className={"options"}>Líbí/nelíbí</p>
					<p>Publikováno: {publishedAt}</p>
					<p>{description}</p>
				</div>
			})
	} else if (slicedURL.slice(0, 1) === "@") {
		// let username: string = slicedURL.slice(1, -6) ? slicedURL.slice(1, -6) : slicedURL.slice(1, -9) ? slicedURL.slice(1, -9) : slicedURL.slice(1);
		let username: string = slicedURL.slice(1) ? slicedURL.slice(1) : slicedURL.slice(1, -6) ? slicedURL.slice(1, -6) : slicedURL.slice(1, -9);
		// console.log(username.slice(-5))
		console.log(username)
		content = Users.filter((user: UserObject): boolean => user.firstName + "-" + user.lastName === username)
			.map(({id, firstName, lastName, email, channel}: UserObject) => {
				let videosList: ChannelObject[] = Channels.map((value: ChannelObject) => value);

			return <div key={id}>
				<h1>{firstName + "-" + lastName}</h1>
				<p>Kontakt: {email}</p>
				<p>{videosList[0].description}</p>
				<h4 onClick={() => handleChangeList(firstName + "-" + lastName, "videa")}>Videa</h4>
				<h4 onClick={() => handleChangeList(firstName + "-" + lastName, "playlisty")}>Playlisty</h4>

				{username.slice(-5) === "videa" ?
					Videos.filter((video: VideoObject) => {
						for (let i: number = 0; i < videosList.length; i++) {
							if (video.id === videosList[i].id) {
								return video.id;
							}
						}
					})
						.sort((a: VideoObject, b: VideoObject) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
						.map(({title, video}: VideoObject) =>  {

							return <>
								<h3 key={title}>{title}</h3>
								<video src={video} width={400} controls={true} id={"creatorVideo"} className={"col span-2-of-2"}></video>
							</>
					}) :
					slicedURL.slice(-9) === "playlisty" ?
					<ul>
						{/*<li>prvi{playlists}</li>*/}
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
		<>
			<Sidebar></Sidebar>
			<div id={"main"}>
				{content}
			</div>
		</>
	);
};
import { useEffect, useState } from "react";
import Item from "./ItemComponent";
import "./index.css";

class CardObject {
	constructor(name, img) {
		this.name = name;
		this.img = img;
		this.id = name + img;
	}

	static GenerateCard(name, img) {
		return new CardObject(name, img);
	}
}

function GetData() {
	const [objectArray, setObjectArray] = useState([]);
	const [score, setScore] = useState(0);
	const [maxScore, setMaxScore] = useState(0);
	const [clicked, setClicked] = useState([]);
	const [shuffling, setShuffling] = useState(false);

	async function fetchData() {
		const response = await fetch(
			`https://gateway.marvel.com/v1/public/characters?limit=30&offset=${Math.floor(
				Math.random() * 2000
			)}&ts=1719369308228&apikey=7b8afad76ccf71f95807ed5d89e2a407&hash=a73f86b0a70c03174f7b04429000f26c`,
			{ mode: "cors" }
		);
		const data = await response.json();
		const characters = data.data.results;
		const fetchedData = characters
			.map((character) => {
				const name = character.name;
				const img =
					character.thumbnail.path + "." + character.thumbnail.extension;
				return CardObject.GenerateCard(name, img);
			})
			.filter(
				(card) =>
					card.img !==
						"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" &&
					card.img !==
						"http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
			);
		setObjectArray(fetchedData);
	}

	useEffect(() => {
		fetchData();
	}, []);

	const ResetGame = () => {
		setScore(0);
		fetchData();
		setClicked([]);
	};

	const shuffleArray = (array) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};

	const handleCardClick = (cardId) => {
		if (clicked.includes(cardId)) {
			setScore(0);
			setClicked([]);
		} else {
			setScore(score + 1);
			if (score + 1 > maxScore) {
				setMaxScore(score + 1);
			}
		}

		setClicked((prevClicked) => [...prevClicked, cardId]);

		setShuffling(true);
		setTimeout(() => {
			setObjectArray(shuffleArray(objectArray));
			setShuffling(false);
		}, 500);
	};
	return (
		<>
			<div className="flex justify-between items-center border-b-4 shadow-lg border-black bg-gradient-to-r  from-sky-500 to-indigo-500 mb-4">
				<button
					className="ml-4 text-2xl active:brightness-200 bg-neutral-900 font-Bebas text-white p-1 rounded-md"
					onClick={ResetGame}
				>
					New game
				</button>
				<div className=" bg-red-600 p-1 m-1 text-center text-white">
					<h1 className=" font-Bebas h-10 font-extrabold text-5xl">
						Memory Heroes
					</h1>
				</div>
				<div className="gap-4 mr-6 text-2xl flex font-Bebas">
					<p>
						Score: <span className="text-red-600"> {score} </span>
					</p>
					<p>
						Max Score: <span className="text-red-600">{maxScore} </span>
					</p>
				</div>
			</div>
			<div className="grid grid-cols-6 gap-4 ml-5 mr-5">
				{objectArray.map((card) => (
					<button
						className={`text-3xl font-bold ${
							shuffling ? "shuffle-animation" : ""
						}`}
						key={card.id}
						onClick={() => handleCardClick(card.id)}
					>
						<Item name={card.name} img={card.img} />
					</button>
				))}
			</div>
		</>
	);
}

export default GetData;

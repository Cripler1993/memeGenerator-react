import React, { useEffect, useState } from "react";

export default function Meme() {
  const [allMemes, setAllMemes] = useState([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImg: "https://i.imgflip.com/21tqf4.jpg",
  });
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((json) => setAllMemes(json.data.memes));
  }, []);
  function handleChange(event) {
    console.log(event.target);
    const { name, value } = event.target;
    setMeme((prev) => ({ ...prev, [name]: value }));
  }
  function getRandomImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    setMeme((prev) => ({ ...prev, randomImg: allMemes[randomNumber].url }));
  }

  return (
    <main>
      <div className="form">
        <input
          onChange={handleChange}
          value={meme.topText}
          type="text"
          placeholder="Top text"
          name="topText"
          className="form--input"
        />
        <input
          onChange={handleChange}
          value={meme.bottomText}
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          className="form--input"
        />
        <button onClick={getRandomImage} className="form--button">
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImg} alt="meme" className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

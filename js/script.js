
console.log("let write java script");
let songs;
let curfolder;
const popup = document.getElementById('popup');
const blurBackground = document.createElement('div');
const closeBtn = document.getElementById('close-popup');
blurBackground.className = 'blur-background';




// document.body.appendChild(blurBackground);
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}















let currentsong = new Audio();


async function getsongs(folder) {
    curfolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`)//open with live server in vs code and please replace your ip address and port 
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }
    // console.log(songs)

    // --------------------
    let songul = document.querySelector(".song-list").getElementsByTagName("ul")[0]
    songul.innerHTML = "";
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>  <img class="invert" width="24px" height="24px" src="img/music.svg" alt="">
        <div class="info">
            <div class="songname ">${song.replaceAll("%20", " ")}</div>
            <div class="songartist">Bapun</div>
        </div>
        <div class="playnow">
            <span>Play </span>
            <img  class="invert"  src="img/play.svg" alt="">
        </div>

          </li> `;



    }
    Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })

    })
    return songs;





}
const playmusic = (track, pause = false) => {
    currentsong.src = `/${curfolder}/` + track;
    if (!pause) {
        currentsong.play();
        popup.style.display = 'block';
        document.body.appendChild(blurBackground);
        blurBackground.style.display = 'block';
        play.src = "img/pause.svg";



    }

    // currentsong.play();
    // play.src = "play.svg";
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songinfoo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";



}
async function displayalbum() {

    let a = await fetch(`http://127.0.0.1:5500/songs/`)//open with live server in vs code and please replace your ip address and port 
    let response = await a.text();
    console.log(response + "okok");
    let div = document.createElement("div");
    div.innerHTML = response;
    let ancor = div.getElementsByTagName("a");
    let cardcontainer = document.querySelector(".card-container")

    let arr = Array.from(ancor);
    for (let index = 0; index < arr.length; index++) {
        const e = arr[index];

        console.log(e+"okj");


        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-1)[0];
            console.log(e.href.split("/").slice(-1)[0])
            console.log(folder);
            // get the metdata of the folder
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)//open with live server in vs code and please replace your ip address and port 
            let response = await a.json();
            // console.log(response);
            cardcontainer.innerHTML = cardcontainer.innerHTML +
                `<div data-folder= ${folder} class="card ">
                        <div  class="play">

                            <div class="play-container">
                                <svg class="svgg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                                    <path
                                        d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
                                </svg>

                            </div>
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="image">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>

                    </div>`


        }
    };
    //load songs
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            playmusic(songs[0])

        })
    })

}


async function main() {

    songs = await getsongs("songs/cs");
    playmusic(songs[0], true)
    // ------------------------------------------------------
    // console.log(songs);
    // let songul = document.querySelector(".song-list").getElementsByTagName("ul")[0]
    // for (const song of songs) {
    //     songul.innerHTML = songul.innerHTML + `<li>  <img class="invert" width="24px" height="24px" src="music.svg" alt="">
    //     <div class="info">
    //         <div class="songname ">${song.replaceAll("%20", " ")}</div>
    //         <div class="songartist">Bapun</div>
    //     </div>
    //     <div class="playnow">
    //         <span>Play </span>
    //         <img  class="invert"  src="play.svg" alt="">
    //     </div>

    //       </li> `;



    // }
    // Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e =>{
    //     e.addEventListener("click",element=>{
    //         // console.log(e.querySelector(".info").firstElementChild.innerHTML);
    //         playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    //     })

    // })
    // -----------------------------------------------------
    //display all the albus on the page
    displayalbum();



    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            popup.style.display = 'block';
            document.body.appendChild(blurBackground);
            blurBackground.style.display = 'block';
            play.src = "img/pause.svg";
        }
        else {
            currentsong.pause();
            popup.style.display = 'none';
            blurBackground.style.display = 'none';
            play.src = "img/play.svg";
        }
    })
    playy.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "img/pause.svg";
        }
        else {
            currentsong.pause();
            play.src = "img/play.svg";
        }
    })
    closeBtn.addEventListener('click', () => {
        currentsong.pause();
        play.src = "img/play.svg";
        popup.style.display = 'none';
        // blurBackground.style.display = 'block';
        document.body.removeChild(blurBackground);



    });
    // listen for time update
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime,currentsong.duration)
        document.querySelector(".songtime").innerHTML = `
        
        ${secondsToMinutesSeconds(Math.floor(currentsong.currentTime))}/
        ${secondsToMinutesSeconds(Math.floor(currentsong.duration))}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";


    })
    // add an eceent to a seek bar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    })
    // add hamberger
    document.querySelector(".hamberger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });
    // add event for close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });
    // add an event to privious to next and prev
    prev.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if (index - 1 >= 0) {
            playmusic(songs[index - 1]);
        } else {
            index = songs.length - 1;
            playmusic(songs[index]);

        }
    })
    prevv.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if (index - 1 >= 0) {
            playmusic(songs[index - 1]);
        } else {
            index = songs.length - 1;
            playmusic(songs[index]);

        }
    })
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        console.log(index);
        if (index + 1 < songs.length) {
            playmusic(songs[index + 1]);
        }
        else {
            index = 0;
            playmusic(songs[index]);

        }
    })
    nextt.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        console.log(index);
        if (index + 1 < songs.length) {
            playmusic(songs[index + 1]);
        }
        else {
            index = 0;
            playmusic(songs[index]);

        }
    })
    // ann event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", e => {
        currentsong.volume = parseInt(e.target.value) / 100;
    })
    // load songs when clicked on the card
    // Array.from(document.getElementsByClassName("card")).forEach( e=>{
    //     e.addEventListener("click",async item=>{
    //         songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);

    //     })
    // })

    //add cross to volume...
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentsong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;

        }
    })










}


main();



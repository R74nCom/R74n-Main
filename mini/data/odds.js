SPA.data = { odds: [
{
	name: "Being struck by lightning",
	extra: "in a year",
	pool: 1222000
},
{
	name: "Dying in a plane crash",
	pool: 11000000
},
{
	name: "Having twins",
	pool: 89
},
{
	name: "Having triplets",
	pool: 7921
},
{
	name: "Having quadruplets",
	pool: 704969
},
{
	name: "Dying in a tornado",
	pool: 13000000
},
{
	name: "Winning any Powerball prize",
	pool: 38
},
{
	name: "Winning the Mega Millions jackpot",
	pool: 302600000
},
{
	name: "Dying by meteorite impact",
	pool: 1600000
},
{
	name: "Finding a four-leaf clover",
	pool: 10000
},
{
	name: "Getting audited by the IRS",
	pool: 220
},
{
	name: "Bowling a perfect game",
	extra: "as a casual player",
	pool: 11500
},
{
	name: "Living to 100 years",
	pool: 5000
},
{
	name: "Rolling a snake eyes",
	pool: 36
},
{
	name: "Flipping a coin on "+choose(["heads","tails"]),
	pool: 2
},
{
	name: "Getting your car stolen",
	extra: "in a year",
	pool: 333.333333
},
{
	name: "Getting accepted into Harvard",
	pool: 31.25
},
{
	name: "Losing something in the mail",
	pool: 25.974026
},
{
	name: "Having O- blood type",
	pool: 15.1515152
},
{
	name: "Rolling a "+choose([1,2,3,4,5,6])+" on a die",
	pool: 6
},
{
	name: "Dying from a shark attack",
	pool: 3700000
},
{
	name: "Guessing someone's credit card number",
	pool: 1.0e16
},
{
	name: "Guessing a 4-digit pincode",
	pool: 10000
},
{
	name: "Being born with hearing loss",
	pool: 400
},
{
	name: "Finding a double-yolked egg",
	pool: 1000
},
{
	name: "Having a peanut allergy",
	pool: 50
},
{
	name: "Catching a Shiny Pokémon",
	extra: "in Generations 1–5",
	pool: 8192
},
{
	name: "Being dealt a royal flush",
	pool: 649740
},
{
	name: "Being born on leap day",
	pool: 1461
},
{
	name: "Rolling a Yahtzee in a single roll",
	pool: 1296
},
{
	name: "Finding a pearl in an oyster",
	pool: 10000
},
{
	name: "Picking a perfect March Madness bracket",
	pool: 9.22337E+18
},
{
	name: "Dying from a vending machine",
	pool: 112000000
},
{
	name: "Being dealt pocket aces",
	pool: 221
},
{
	name: "Finding a full End Portal in Minecraft",
	pool: 1000000000000
},
{
	name: "Two people meeting each other",
	extra: "in a lifetime",
	pool: 100000
},
{
	name: "Performing a hole-in-one",
	pool: 12000
},
{
	name: "Getting the Wordle on the first guess",
	pool: 15000
},
{
	name: "Picking a Joker in a deck of cards",
	pool: 27
},
{
	name: "Winning a perfect Battleship match",
	pool: 6.64894E+17
},
{
	name: "Picking the same tree on Earth as someone else",
	pool: 30400000000
},
{
	name: "Picking the same star in the Milky Way as someone else",
	pool: 2500000000
},
{
	name: "Chance of being accepted into a pro soccer league",
	pool: 83.33333333
},
{
	name: "Two people sharing the same fingerprint",
	pool: 64000000000
},
{
	name: "Two people sharing the same birthday",
	pool: 365.25
},
{
	name: "An atom of Tellurium-128 decaying",
	extra: "in a year",
	pool: 3.33333E+24
},
{
	name: "A lobster being blue",
	pool: 2000000
},
{
	name: "A Minecraft sheep spawning pink",
	pool: 641.8485237
},
{
	name: "A Minecraft sheep spawning pink and a baby",
	pool: 12195.12195
},
{
	name: "Being left-handed",
	pool: 9.090909091
},
{
	name: "Being born in the United States",
	pool: 28.57142857
},
{
	name: "Being on the autism spectrum",
	pool: 40
},
{
	name: "Being attacked by a bear",
	extra: "per encounter",
	pool: 11600
},
{
	name: "Your password being '123456'",
	pool: 25
},
{
	name: "Reacting severely to a vaccination",
	extra: "per health.ny.gov",
	pool: 1000000
},
{
	name: "Two files having the same SHA-256 has",
	extra: "known as a collision",
	pool: 2**256
},
] }

SPA.data.odds.sort((a, b) => a.pool - b.pool)

SPA.data.odds.push({
	name: "Being born",
	pool: 4E+17
});

SPA.onload = () => {
	for (let i = 0; i < SPA.data.odds.length; i++) {
		const item = SPA.data.odds[i];
		item.chance = 1 / item.pool;
		let pool = (Math.round(item.pool * 10) / 10).toLocaleString();
		SPA.main.insertAdjacentHTML("beforeend", `
<section class="page centered" page="${i}">
	<div>
		<div class="title">${item.name}</div>
		${ item.extra ? `<div class="subtitle">${item.extra}</div>` : "" }
		<div class="pop${pool.length > 40 ? " longest" : pool.length > 20 ? " longer" : pool.length > 13 ? " long" : ""}">1 in ${pool}</div>
		<div class="subtitle">${
			(item.chance * 100).toString().includes("e") ? item.chance * 100 :
			(item.chance * 100).toString().match(/^0\.0+[1-9]{1,2}|^\d+(\.\d{1,2})?/)[0]
		}%</div>
		<div class="extra">
		${
			i === SPA.data.odds.length - 1 ? 

			`<div class="title">And yet, here you are!</div>
			<div class="pop">
				<button onclick="R74n.home()">More Games</button>
				<button onclick="location.href='https://r74n.com/contact?message=My%20minigame%20suggestion:%20'">Submit Your Idea</button>
				<button onclick="SPA.snap(0)">Start Over</button>
			</div>`

			: `<div class="title">At 100 tries per second, this has happened</div>
			<div class="pop"><span>0</span> times</div>
			<div class="subtitle">since opening this page</div>`
		}
		</div>
	</div>
	<div class="controls">
		${ i < SPA.data.odds.length-1 ? `<img class="doodle down" src="../doodle/down.gif" role="button" onclick="SPA.snap(${i + 1})">` : "" }
		<img class="doodle" src="../doodle/share.gif" role="button" id="share-${i}">
	</div>
</section>
`);
		let share = document.getElementById("share-"+i);
		let num = i;
		share.addEventListener("click", () => {
			let text = SPA.main.querySelector(`.page[page="${num}"] > div > .title`).innerText + " has a " +
					   SPA.main.querySelector(`.page[page="${num}"] > div > .pop`).innerText + " chance... See all the rarest events: ";
			R74n.share(text);
		})
	}

	SPA.tick(() => {
		SPA._ticks = (SPA._ticks || 0) + 1
		let index = SPA._page;
		let chance = SPA.data.odds[index].chance;
		let pageElem = SPA.main.querySelector('.page[page="'+index+'"]');
		pageElem.setAttribute("last-tick", SPA._ticks);
		if (Math.random() < chance) {
			let elem = SPA.main.querySelector('.page[page="'+index+'"] .extra > .pop > span');
			elem.innerText = parseInt(elem.innerText) + 1;
		};
	}, 1000 / 100);
	
	SPA.onPage = () => {
		let index = SPA._page;
		let elem = SPA.main.querySelector('.page[page="'+index+'"] .extra > .pop > span');
		if (!elem) return;
		let chance = SPA.data.odds[index].chance;
		let pageElem = SPA.main.querySelector('.page[page="'+index+'"]');
		let lastTick = pageElem.getAttribute("last-tick") || 0;
		pageElem.setAttribute("last-tick", SPA._ticks);
		let ticks = (SPA._ticks || 0) - lastTick;
		let add = Math.round(chance * ticks);
		elem.innerText = parseInt(elem.innerText) + add;
	};
};
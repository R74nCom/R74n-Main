let toyboxInit = () => {

}

let toyboxStyle = document.createElement("style");
toyboxStyle.innerHTML = `
.toybox.toy {
	position: absolute;
	cursor: grab;
	background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
	image-rendering: pixelated;
	image-rendering: -moz-crisp-edges;
	image-rendering: crisp-edges;
	z-index: 9999
}
.toybox.grabbed, .toybox.toy:active {
	cursor: grabbing;
}
`;
document.head.appendChild(toyboxStyle);

window.addEventListener("load", () => {
	let toyboxEntities = [];
	let toyboxState = {};
	let toyboxSession = {
		scale: 1000,
		fps: 60,
		windowWidth: window.outerWidth,
		windowHeight: window.outerHeight
	};
	window.addEventListener("resize", () => {
		toyboxSession.windowWidth = window.outerWidth;
		toyboxSession.windowHeight = window.outerHeight;

		toyboxEntities.forEach(entity => entityUpdate(entity));
	})

	function pageToPos(x, y) {
		return [
			toyboxSession.scale * (x / toyboxSession.windowWidth),
			y
		];
	}
	function pointerToPos(e) {
		// return [e.pageX, e.pageY];
		return [
			toyboxSession.scale * (e.pageX / toyboxSession.windowWidth),
			e.pageY
		];
	}

	function entityCreate(x, y) {
		let entity = {};
		entity.x = x;
		entity.y = y;
		entity.height = 50;
		entity.width = 50;
		toyboxEntities.push(entity);
		entityUpdate(entity);
	}
	function entityGrab(entity) {
		const elem = entity.elem;
		elem.classList.add("grabbed");
		toyboxSession.grabbing = entity;
	}
	function entityDrop(entity) {
		const elem = entity.elem;
		elem.classList.remove("grabbed");
		toyboxSession.grabbing = null;
	}
	function entityUpdate(entity) {
		if (entity.elem === undefined) {
			const elem = document.createElement("div");
			elem.classList.add("toybox");
			elem.classList.add("toy");
			entity.elem = elem;
			elem.style.backgroundImage = `url("${R74n.root}${"shapes/png/crustacean.png"}")`;
			document.body.appendChild(elem);

			elem.addEventListener("mousedown", (e) => {
				if (toyboxSession.grabbing) entityDrop(toyboxSession.grabbing);
				entityGrab(entity);
				toyboxSession.grabbingOrigin = [e.offsetX - e.target.clientWidth/2, e.offsetY - e.target.clientHeight/2];
				console.log(toyboxSession.grabbingOrigin)

				e.stopPropagation();
				e.preventDefault();
			})
		}

		let elem = entity.elem;
		// elem.style.width = (size / toyboxSession.scale * toyboxSession.windowWidth) + "px";
		// elem.style.height = (size / toyboxSession.scale * toyboxSession.windowHeight) + "px";
		elem.style.width = entity.width + "px";
		elem.style.height = entity.height + "px";
		elem.style.left = (entity.x * toyboxSession.windowWidth) / toyboxSession.scale - (entity.width / 2) + "px";
		// elem.style.top = (entity.y * toyboxSession.windowHeight) / toyboxSession.scale - (entity.height / 2) + "px";
		// elem.style.left = (entity.x) - (entity.width / 2) + "px";
		elem.style.top = (entity.y) - (entity.height / 2) + "px";
	}

	document.body.addEventListener("click", (e) => {
		// console.log(e.pageY);
		let pos = pointerToPos(e);
		// console.log(pos);

		// entityCreate(pos[0], pos[1]);
	});
	document.body.addEventListener("mouseup", (e) => {
		if (toyboxSession.grabbing) entityDrop(toyboxSession.grabbing);
	});
	document.body.addEventListener("mousemove", (e) => {
		if (toyboxSession.grabbing) {
			const entity = toyboxSession.grabbing;
			let pos = pointerToPos(e);
			entity.x = pos[0];
			entity.y = pos[1];
			if (toyboxSession.grabbingOrigin) {
				entity.x -= toyboxSession.grabbingOrigin[0];
				entity.y -= toyboxSession.grabbingOrigin[1];
			}
			entityUpdate(entity);
		}
	});

	let lastFrame = Date.now();
	toyboxSession.mspf = 1000/toyboxSession.fps;
	let toyboxFrame = () => {
		const now = Date.now();
		if (now - lastFrame < toyboxSession.mspf) {
			requestAnimationFrame(toyboxFrame);
			return;
		}
		lastFrame = Date.now();
		requestAnimationFrame(toyboxFrame);
	}
	toyboxFrame();

	entityCreate(100, 100);
	entityCreate(200, 200);
})
window.SPA = {
	preinit: () => {
		SPA.main = document.querySelector(".spa > .content");
		SPA.header = document.querySelector(".spa > header:first-child");
		SPA._paths = document.body.classList.contains("paths");
		SPA.pages = SPA.main.querySelectorAll(".page");
	},
	init: () => {
		SPA._loaded = true;
		if (!SPA.pages.length) SPA.pages = SPA.main.querySelectorAll(".page");
		if (SPA.pages.length) {
			SPA.currentPage = SPA.main.querySelector('.page[data-current="true"]');
			if (!SPA.currentPage) {
				SPA.currentPage = SPA.pages[0];
				SPA.currentPage.setAttribute("data-current","true");
			}
			SPA.finalPage = SPA.main.querySelector(".page.final");
		}
		if (!SPA._paths && SPA.currentPage) {
			SPA.main.addEventListener("scroll", (e) => {
				if (SPA.main.scrollTop === 0) {
					SPA.header.classList.remove("min");
				}
				else if (SPA.main.scrollTop >= SPA.main.clientHeight / 2 && !SPA.header.classList.contains("min")) {
					SPA.header.classList.add("min");
				}
				let diff = SPA.main.scrollTop / SPA.main.clientHeight - SPA._page;
				if (Math.abs(diff) > 0.1) {
					SPA._scrollDir = Math.sign(diff);
				}
				SPA.queueSnap();
			});
			SPA.main.addEventListener("scrollend", SPA.queueSnap);
			window.addEventListener("resize", () => {
				SPA.snap( SPA._page, true );
			});
		}
		SPA.controls = document.querySelector(".spa > .content > .controls");
		if (document.body.classList.contains("clicky")) {
			SPA.click = (e) => {
				if (SPA._clicked) return;
				SPA._clicked = true;
				var audio = new Audio('tap1.wav');
				audio.play();
				e.stopPropagation();
				e.stopImmediatePropagation();
			}
			SPA.unclick = (e) => {
				SPA._clicked = false;
				var audio = new Audio('tap2.wav');
				audio.play();
				e.stopPropagation();
				e.stopImmediatePropagation();
			}
			if (R74n.state.mobile) {
				document.body.addEventListener("touchstart", (e) => {
					SPA._clicked = false;
					SPA.click(e);
					e.stopPropagation();
					e.stopImmediatePropagation();
				})
				document.body.addEventListener("touchend", (e) => {
					SPA._clicked = false;
					e.stopPropagation();
					e.stopImmediatePropagation();
				});
			}
			else {
				document.body.addEventListener("mousedown", SPA.click);
				document.body.addEventListener("mouseup", SPA.unclick);
				document.body.addEventListener("contextmenu", (e) => {
					SPA._clicked = false;
				});
			}
		}
		let loading = SPA.main.querySelector(".loading");
		if (loading) {
			loading.remove();
		}
		let infoButton = document.querySelector(".spa > header .info");
		if (infoButton) {
			infoButton.addEventListener("click", SPA.info);
		}
		let infoX = document.querySelector(".spa #globalDialog-info");
		if (infoX) {
			infoX.addEventListener("click", () => {
				R74n.closeDialog("info");
			});
		}
		document.querySelectorAll("img").forEach((img) => {
			img.setAttribute("draggable","false");
			img.addEventListener("dragstart", ()=>false)
			img.addEventListener("contextmenu", (e)=>{
				e.preventDefault();
				return false;
			})
		})
		window.addEventListener("keydown", (e) => {
			if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
			if (R74n.state.dialog) return;
			let target = e.target;
			if (target.tagName === "input" || target.tagName === "textarea" || target.tagName === "select") {
				return;
			}
			let key = e.key;
			if (SPA.keybinds[key]) {
				let result = SPA.keybinds[key](e);
				if (result !== false) e.preventDefault();
			}
		})
		SPA.checkPage();
	},
	_loaded: false,
	_page: 0,
	_scrollDir: 0,
	_skippable: true,
	
	keybinds: {
		"ArrowDown": (e) => {
			if (!SPA.pages.length) return false;
			let btn = SPA.main.querySelector('.page[data-current="true"] .down');
			if (btn) {
				btn.click();
				return;
			}
			btn = SPA.main.querySelector('div.controls .right, div.controls .down');
			if (btn && !btn.classList.contains("hidden")) {
				btn.click();
				return;
			}
			if (!SPA._paths) SPA.snap(SPA._page + 1);
		},
		"ArrowUp": (e) => {
			if (!SPA.pages.length) return;
			let btn = SPA.main.querySelector('.page[data-current="true"] .up');
			if (btn) {
				btn.click();
				return;
			}
			btn = SPA.main.querySelector('div.controls .left, div.controls .up');
			if (btn && !btn.classList.contains("hidden")) {
				btn.click();
				return;
			}
			if (!SPA._paths) SPA.snap(SPA._page - 1);
		},
		"ArrowLeft": (e) => SPA.keybinds["ArrowUp"](e),
		"ArrowRight": (e) => SPA.keybinds["ArrowDown"](e),
	},

	tick: (callback, ms) => {
		setInterval(callback, ms);
	},

	snap: (pageNumber, fast) => {
		if (SPA._paths) {
			if (pageNumber-1 > SPA.pages.length || pageNumber < 1) return;
			let newPage = SPA.pages[pageNumber - 1];
			SPA.currentPage.setAttribute("data-current", "false");
			newPage.setAttribute("data-current", "true");
			SPA.currentPage = newPage;
			SPA.checkPage();
			if (SPA.onPage) {
				SPA.onPage(SPA.currentPage);
			}
			return;
		}
		if (fast) {
			SPA.main.style.scrollBehavior = "unset";
		}
		if (isNaN(pageNumber)) {
			pageNumber = Math.round(SPA.main.scrollTop / SPA.main.clientHeight);
		}
		if (pageNumber > 0) {
			if (!SPA.header.classList.contains("min")) setTimeout(() => {
				SPA.snap();
			}, 300);
			SPA.header.classList.add("min");
		}
		pageNumber = Math.max(0, pageNumber);
		pageNumber = Math.min(SPA.pages.length-1, pageNumber);
		SPA._page = pageNumber;
		SPA.main.scrollTop = pageNumber * SPA.main.clientHeight;
		SPA._scrollDir = 0;
		SPA.currentPage.setAttribute("data-current","false");
		let newPage = SPA.main.querySelector('.page[page="'+pageNumber+'"]');
		SPA.currentPage = newPage;
		SPA.currentPage.setAttribute("data-current","true");
		SPA.checkPage();
		if (fast) {
			SPA.main.style.scrollBehavior = "smooth";
		}
		else if (SPA.onpage) {
			SPA.onPage(SPA.currentPage);
		}
	},
	prev: () => {
		if (SPA._paths) {
			let index = [...SPA.pages].indexOf(SPA.currentPage);
			if (index <= 0) return;
			let prevPage = SPA.pages[index - 1];
			SPA.currentPage.setAttribute("data-current", "false");
			prevPage.setAttribute("data-current", "true");
			SPA.currentPage = prevPage;
			SPA.currentPage.focus();
			SPA.checkPage();
		}
		else {
			SPA.snap(SPA._page - 1);
		}
		if (SPA.onPage) {
			SPA.onPage(SPA.currentPage);
		}
	},
	next: () => {
		if (SPA._paths) {
			let index = [...SPA.pages].indexOf(SPA.currentPage);
			if (index == SPA.pages.length - 1) return;
			let nextPage = SPA.pages[index + 1];
			SPA.currentPage.setAttribute("data-current", "false");
			SPA.currentPage.setAttribute("data-done", "true");
			nextPage.setAttribute("data-current", "true");
			SPA.currentPage = nextPage;
			SPA.currentPage.focus();
			SPA.checkPage();
		}
		else {
			SPA.snap(SPA._page + 1);
		}
		if (SPA.onPage) {
			SPA.onPage(SPA.currentPage);
		}
	},
	checkPage: () => {
		if (SPA._paths) {
			let index = [...SPA.pages].indexOf(SPA.currentPage);
			if (index <= 0) SPA.header.classList.remove("min");
			else SPA.header.classList.add("min");

			if (!SPA.controls) return;

			if (index <= 0) {
				let up = SPA.controls.querySelector(".up");
				if (up) up.classList.add("hidden");
				let left = SPA.controls.querySelector(".left");
				if (left) left.classList.add("hidden");
			}
			else {
				let up = SPA.controls.querySelector(".up");
				if (up) up.classList.remove("hidden");
				let left = SPA.controls.querySelector(".left");
				if (left) left.classList.remove("hidden");
			}
			if (index >= SPA.pages.length - 1 ||
				(!SPA._skippable && SPA.currentPage.getAttribute("data-done") !== "true")
			) {
				let down = SPA.controls.querySelector(".down");
				if (down) down.classList.add("hidden");
				let right = SPA.controls.querySelector(".right");
				if (right) right.classList.add("hidden");
			}
			else {
				let down = SPA.controls.querySelector(".down");
				if (down) down.classList.remove("hidden");
				let right = SPA.controls.querySelector(".right");
				if (right) right.classList.remove("hidden");
			}

		}
	},

	_snapTimeout: null,
	queueSnap: () => {
		if (SPA._paths) return;
		if (SPA._snapTimeout) {
			clearTimeout(SPA._snapTimeout);
		}
		SPA._snapTimeout = setTimeout(SPA.snap, 500)
	},

	info: () => {
		let dialog = document.getElementById("globalDialog-info");
		if (!dialog) return;

		R74n.dialog("info");

		// dialog.classList.toggle("open");
	}
}
window.addEventListener("load", () => {
	if (SPA._loaded) return;
	SPA.preinit();
	if (SPA.onload) {
		SPA.onload();
		SPA.onload = undefined;
	}
	SPA.init();
})
window.addEventListener("DOMContentLoaded", () => {
	if (SPA._loaded) return;
	SPA.preinit();
	if (SPA.onload) {
		SPA.onload();
		SPA.onload = undefined;
	}
	SPA.init();
})
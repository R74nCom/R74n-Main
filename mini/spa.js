window.SPA = {
	init: () => {
		SPA.loaded = true;
		SPA.main = document.querySelector(".spa > .content");
		SPA.header = document.querySelector(".spa > header:first-child");
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
					e.stopPropagation();
					e.stopImmediatePropagation();
				})
				document.body.addEventListener("touchend", (e) => {
					SPA.click(e);
					e.stopPropagation();
					e.stopImmediatePropagation();
				});
			}
			else {
				document.body.addEventListener("mousedown", SPA.click);
				document.body.addEventListener("mouseup", SPA.unclick);
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
	},
	_loaded: false,
	_page: 0,
	_scrollDir: 0,

	tick: (callback, ms) => {
		setInterval(callback, ms);
	},

	snap: (pageNumber, fast) => {
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
		SPA._page = pageNumber;
		SPA.main.scrollTop = pageNumber * SPA.main.clientHeight;
		SPA._scrollDir = 0;
		if (fast) {
			SPA.main.style.scrollBehavior = "smooth";
		}
		else if (SPA.onpage) {
			SPA.onpage();
		}
	},
	next: () => {
		SPA.snap(SPA._page + 1);
	},

	_snapTimeout: null,
	queueSnap: () => {
		if (SPA._snapTimeout) {
			clearTimeout(SPA._snapTimeout);
		}
		SPA._snapTimeout = setTimeout(SPA.snap, 500)
	},

	info: () => {
		let dialog = document.getElementById("globalDialog-info");
		if (!dialog) return;

		dialog.classList.toggle("open");
	}
}
window.addEventListener("load", () => {
	if (!SPA._loaded) SPA.init();
	if (SPA.onload) {
		SPA.onload();
		SPA.onload = undefined;
	}
})
window.addEventListener("DOMContentLoaded", () => {
	if (!SPA._loaded) SPA.init();
	if (SPA.onload) {
		SPA.onload();
		SPA.onload = undefined;
	}
})
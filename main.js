(() => {
	const lightbox = document.getElementById("lightbox");
	const lbImg = lightbox.querySelector(".lightbox__img");
	const lbCaption = lightbox.querySelector(".lightbox__caption");
	const cards = [...document.querySelectorAll("[data-lightbox]")];
	let currentIndex = 0;

	function openLightbox(index) {
		currentIndex = index;
		const card = cards[index];
		const img = card.querySelector("img");
		const name =
			card.querySelector(".card__name")?.textContent ||
			img.alt ||
			card.querySelector("figcaption")?.textContent;

		lbImg.src = img.src;
		lbImg.alt = img.alt;
		lbCaption.textContent = name;
		lightbox.hidden = false;
		document.body.style.overflow = "hidden";
	}

	function closeLightbox() {
		lightbox.hidden = true;
		document.body.style.overflow = "";
		lbImg.src = "";
	}

	function navigate(dir) {
		currentIndex = (currentIndex + dir + cards.length) % cards.length;
		openLightbox(currentIndex);
	}

	cards.forEach((card, i) => {
		card.addEventListener("click", () => openLightbox(i));
	});

	lightbox
		.querySelector(".lightbox__close")
		.addEventListener("click", closeLightbox);
	lightbox
		.querySelector(".lightbox__prev")
		.addEventListener("click", () => navigate(-1));
	lightbox
		.querySelector(".lightbox__next")
		.addEventListener("click", () => navigate(1));

	lightbox.addEventListener("click", (e) => {
		if (e.target === lightbox) closeLightbox();
	});

	document.addEventListener("keydown", (e) => {
		if (lightbox.hidden) return;
		if (e.key === "Escape") closeLightbox();
		if (e.key === "ArrowLeft") navigate(-1);
		if (e.key === "ArrowRight") navigate(1);
	});

	const burger = document.querySelector(".nav__burger");
	const navList = document.querySelector(".nav__list");

	burger.addEventListener("click", () => {
		const open = navList.classList.toggle("is-open");
		burger.setAttribute("aria-expanded", open);
	});

	navList.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			navList.classList.remove("is-open");
			burger.setAttribute("aria-expanded", "false");
		});
	});

	const sections = document.querySelectorAll(".lab[id]");
	const navLinks = document.querySelectorAll(".nav__list a");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const id = entry.target.id;
				navLinks.forEach((link) => {
					link.style.color =
						link.getAttribute("href") === `#${id}`
							? "var(--purple-300)"
							: "";
				});
			});
		},
		{ rootMargin: "-40% 0px -50% 0px" },
	);

	sections.forEach((s) => observer.observe(s));
})();

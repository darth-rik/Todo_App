let state = true;
let toggle = document.querySelector(".toggle-mode");
let active = [];
let completed = [];

/******* Get elements  ********/
let input = document.querySelector(".input-value");
let insert = document.querySelector(".insert");
let activeButton = document.querySelectorAll(".active");
let completedButton = document.querySelectorAll(".complete");
let showallButton = document.querySelectorAll(".all");
let clearButton = document.querySelectorAll(".clear");

/** Functions */

//update items left

const updateItems = () => {
	document.querySelectorAll(".items-left").forEach((el) => {
		el.innerHTML = `${active.length} items left`;
	});
};

//check if task is completed

const checkCompleted = (e) => {
	if (e.target.classList.contains("circle-check")) {
		let el = e.target.closest(".text-field");
		e.target.classList.toggle("circle-checked");
		e.target.nextElementSibling.classList.toggle("checked");
		if (e.target.classList.contains("circle-checked")) {
			completed.push(el);

			active.splice(active.indexOf(el), 1);
		} else {
			active.splice(completed.indexOf(el), 0, el);
			completed.splice(completed.indexOf(el), 1);
		}
		updateItems();
	}
};

//Click active button

const clickActive = () => {
	if (active.length === 0) {
		return;
	}

	completed.forEach((el) => {
		el.classList.add("hide");
	});
	active.forEach((el) => {
		el.classList.remove("hide");
	});

	updateItems();
};

// Click completed button

const clickCompleted = () => {
	if (completed.length === 0) {
		return;
	}

	active.forEach((el) => {
		el.classList.add("hide");
	});
	completed.forEach((el) => {
		el.classList.remove("hide");
	});

	document.querySelector(
		".items-left"
	).innerHTML = `${completed.length} items left`;
};

//Click Show all button

const clickShowall = () => {
	completed.forEach((item) => {
		item.classList.remove("hide");
	});
	active.forEach((item) => {
		item.classList.remove("hide");
	});
	updateItems();
};
//Click Clear Completed Button

const clickClear = () => {
	completed.forEach((el) => {
		el.remove();
	});

	completed = [];

	clickShowall();
};

// Click delete button

const clickDelete = (e) => {
	if (e.target.closest("img")) {
		const el = e.target.closest(".text-field");

		if (el.firstElementChild.classList.contains("circle-checked")) {
			completed.splice(completed.indexOf(el), 1);
		} else {
			active.splice(active.indexOf(el), 1);
		}
		el.remove();

		clickShowall();
	}
};

/* Enter value and update ui */
input.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) {
		if (input.value !== "") {
			let html = `<div class="text-field "draggable= "true"  >
        <span class="circle-check "></span>
         <h3 >${input.value}</h3>
         <button class="delete "><img src="./images/icon-cross.svg" alt="" /></button>
	   </div>`;

			document.querySelector(".insert").insertAdjacentHTML("afterbegin", html);
			let textField = document.querySelector(".text-field");

			active.push(textField);
			updateItems();
			input.value = "";
		}
	}
});

// Features
insert.addEventListener("click", checkCompleted);

activeButton.forEach((item) => {
	item.addEventListener("click", clickActive);
});

completedButton.forEach((item) => {
	item.addEventListener("click", clickCompleted);
});

showallButton.forEach((item) => {
	item.addEventListener("click", clickShowall);
});

clearButton.forEach((item) => {
	item.addEventListener("click", clickClear);
});

insert.addEventListener("click", clickDelete);

// Drag and drop
new Sortable(insert, {
	animation: 350,
});

// Toggle dark mode
toggle.addEventListener("click", () => {
	if (state === true) {
		document.documentElement.setAttribute("data-theme", "dark");
		document.querySelector(".todos").classList.add("dark");
		if (screen.width >= 320 && screen.width < 700) {
			document.body.style.backgroundImage = "url(images/bg-mobile-dark.jpg)";
		} else {
			document.body.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
		}

		toggle.src = "./images/icon-sun.svg";
		state = false;
	} else {
		document.documentElement.setAttribute("data-theme", "light");
		document.querySelector(".todos").classList.remove("dark");
		if (screen.width >= 320 && screen.width < 700) {
			document.body.style.backgroundImage = "url(images/bg-mobile-light.jpg)";
		} else {
			document.body.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
		}
		toggle.src = "./images/icon-moon.svg";
		state = true;
	}
});

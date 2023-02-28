// Animate Setting Icon 
let settingIcon = document.querySelector(".settings-box .toggle-settings .setting-icon");
let color = ["#aaa", "#ff5e00"];
let i = 0;
function change() {
    settingIcon.style.color = color[i];
    i++;
    if (i > color.length - 1) {
        i = 0;
    }
    settingIcon.style.transition = "2s";
}
setInterval(change, 2000);




// Random background option
let backgroundOption = true;
// Variable to control the background interval
let backgroundIntercal;

// Check If There's Local Storage Random Background Item
let backgroundLocalStorageItem = localStorage.getItem("background_option");

if (backgroundLocalStorageItem !== null) {
    if (backgroundLocalStorageItem === true) {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // Remove active Class From All Spans
    document.querySelectorAll(".settings-box .settings-container .option-box .random-backgrounds span").forEach((ele) => {
        ele.classList.remove("active");
    });

    if (backgroundLocalStorageItem === "true") {
        document.querySelector(".settings-box .settings-container .option-box .random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".settings-box .settings-container .option-box .random-backgrounds .no").classList.add("active");
    }
}



// Toggle Spin Class On Icon
document.querySelector(".settings-box .toggle-settings .setting-icon").onclick = function () {
    this.classList.toggle("fa-spin")

    // Toggle Class Open On Main Setting Box
    document.querySelector(".settings-box").classList.toggle("open");
    document.querySelector(".settings-box .toggle-settings").style.marginRight = "-5px";
}




// Switch Colors
const colorsLi = document.querySelectorAll(".settings-box .settings-container .option-box .colors-list li");
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);
        handleActive(e);
    });
});



// Switch Random Background Option
const randomBackground = document.querySelectorAll(".settings-box .settings-container .option-box .random-backgrounds span");
randomBackground.forEach((span) => {
    span.addEventListener("click", (e) => {
        handleActive(e);

        if(e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomize();
            localStorage.setItem("background_option", true);

        } else {
            backgroundOption = false;
            clearInterval(backgroundIntercal);
            localStorage.setItem("background_option", false);
        }
    });
});



// Check If There's Local Storage Color Option
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach((ele) => {
        ele.classList.remove("active");

        // Add Active Class on Element With Data-Color === Local Storage Item
        if (ele.dataset.color === mainColor) {
            // Add Actove Class
            ele.classList.add("active");
        }
    })
}



// Animate Landing Page images
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let index = 1;


// Random Background Option
function randomize() {
    if (backgroundOption === true) {
        backgroundIntercal = setInterval(() => {
            landingPage.style.backgroundImage = `url("../imgs/${imgsArray[index++]}")`;
            if (index > 4) {
                index = 0;
            }
            landingPage.style.transition = "3s";
        }, 7000);
    }
}
randomize();



// Create Popup With The Image
let ourMenu = document.querySelectorAll(".menu .container .images-box img");
ourMenu.forEach(img => {
    img.addEventListener("click", (e) => {

        // Create Overly Element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        // Add The tile above the image
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }

        //Create The Image
        let popupImage = document.createElement("img");
        popupImage.src = img.src;

        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);


        // Create close button
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);

    });
});


// Close popup 
document.addEventListener("click", (e) => {
    if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
    }
})



// Bullets go to sections
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
// The navbar go to sections
let allLinks = document.querySelectorAll(".landing-page .links a");


// The function who take us to the terget section 
function scrollToTheTargetSection(elements) {
    elements.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}
scrollToTheTargetSection(allBullets);
scrollToTheTargetSection(allLinks);


// Handle Active State
function handleActive(e) {
    // Remove all active classes
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add active class to the target element
    e.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".scrolling-bullets span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalStorageItem = localStorage.getItem("scrolling_bullets");

if (bulletsLocalStorageItem !== null) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
    });
    if (bulletsLocalStorageItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".scrolling-bullets .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".scrolling-bullets .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            // setting in local storage
            localStorage.setItem("scrolling_bullets", "block");
        } else {
            bulletsContainer.style.display = "none";
            // setting in local storage
            localStorage.setItem("scrolling_bullets", "none");
        }
        handleActive(e);
    });
});


// Reset Button
document.querySelector(".reset-options").onclick = function () {
    
    // if i want to clear specific things
    localStorage.removeItem("background_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("scrolling_bullets");

    // Reload window
    window.location.reload();
} 



// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    // Stop propagation
    e.stopPropagation();
    this.classList.toggle("menu-active");
    links.classList.toggle("open");
}

// Closing toggle menu by Clicking Outside | Auto Close Sidebar When click on Link
window.addEventListener('click', (e) => {
    if (e.target != links && e.target != toggleBtn) {
        if (links.classList.contains("open")) {
            links.classList.toggle("open");
            toggleBtn.classList.toggle("menu-active");
        }
    }
})


// Scroll Up
let up = document.querySelector(".scroll");
window.onscroll = function () {
    if (window.scrollY >= 1000) {
        up.style.display = "block";
    } else {
        up.style.display = "none";
    }
};
up.onclick = function () {
    window.scrollTo ({
        left: 0,
        top: 0,
        behavior: "smooth",
    });
};

document.addEventListener("DOMContentLoaded", function () {
  const images = ["./imeges/1.jpg", "./imeges/2.jpg", "./imeges/3.jpg"];
  let currentIndex = 0;

  const sliderImage = document.getElementById("slider-image");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  function showImage(index) {
    sliderImage.src = images[index];
  }

  prevButton.addEventListener("click", function () {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    showImage(currentIndex);
  });

  showImage(currentIndex);

  function changePhoto() {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    showImage(currentIndex);
  }

  setInterval(changePhoto, 5000);
});

document.addEventListener("DOMContentLoaded", () => {
  const progressBarContainers = document.querySelectorAll(
    ".progress-bar-container"
  );

  const animateProgressBars = () => {
    progressBarContainers.forEach((container) => {
      const rect = container.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progressBar = container.querySelector(".progress");
        const percent = container.getAttribute("data-percent");
        progressBar.style.width = `${percent}%`;
      }
    });
  };

  window.addEventListener("scroll", animateProgressBars);
  window.addEventListener("load", animateProgressBars);
});

// recomendacia

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");

  function updateSlider(index) {
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.style.display = "flex";
      } else {
        slide.style.display = "none";
      }
    });

    buttons.forEach((button, idx) => {
      if (idx === index) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      updateSlider(index);
    });
  });
});

const links = document.querySelectorAll("nav a[id]");
const showLinks = document.getElementById("all");
const imgBox = document.querySelectorAll(".hover_container");

links.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = this.getAttribute("id");
    showCardBox(targetId);
  });
});

showLinks.addEventListener("click", function (event) {
  event.preventDefault();
  showLinksImgBox();
});

function showCardBox(targetId) {
  imgBox.forEach((box) => {
    if (box.id === targetId) {
      box.classList.add("focused");
      box.classList.remove("blurred");
      box.classList.remove("hidden");
    } else {
      box.classList.add("blurred");
      box.classList.remove("focused");
      box.classList.remove("hidden");
    }
  });
}

function showAllCardBox() {
  imgBox.forEach((box) => {
    box.classList.remove("blurred");
    box.classList.remove("focused");
    box.classList.remove("hidden");
  });
}

const listBtn = document.querySelectorAll(".list_btn");

listBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelector(".list_btn_color")
      ?.classList.remove("list_btn_color");
    btn.classList.add("list_btn_color");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const statusbar = document.createElement("span");
  statusbar.setAttribute("id", "statusbar");
  const formContainer = document.querySelector(".input_container");
  formContainer.appendChild(statusbar);

  const contactForm = document.getElementById("contact_form_container");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("your_name");
    const email = document.getElementById("email");
    const website = document.getElementById("website");
    const message = document.getElementById("message");

    let isValid = true;

    try {
      if (name.value.length < 5) {
        name.style.border = "4px solid #E93656";
        throw new Error("The name must be at least 5 letters long");
      } else {
        name.style.border = "4px solid green";
      }

      const validateEmail = (mail) => {
        return String(mail)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      const isValidateEmail = validateEmail(email.value);
      if (!isValidateEmail) {
        email.style.border = "4px solid #E93656";
        throw new Error("Email is not valid");
      } else {
        email.style.border = "4px solid green";
      }

      const validateWebsite = (web) => {
        return String(web)
          .toLowerCase()
          .match(
            /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
          );
      };

      const isValidateWebsite = validateWebsite(website.value);
      if (!isValidateWebsite) {
        website.style.border = "4px solid #E93656";
        throw new Error("Website is not valid");
      } else {
        website.style.border = "4px solid green";
      }

      if (message.value.length < 1 || message.value.length > 100) {
        message.style.border = "4px solid #E93656";
        throw new Error("Message should contain from 1 to 100 letters");
      } else {
        message.style.border = "4px solid green";
      }

      if (
        name.style.border === "4px solid green" &&
        email.style.border === "4px solid green" &&
        website.style.border === "4px solid green" &&
        message.style.border === "4px solid green"
      ) {
        const data = {
          message: message.value,
          website: website.value,
          name: name.value,
          email: email.value,
        };

        fetch("https://borjomi.loremipsum.ge/api/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            statusbar.textContent =
              "Thank you for getting in touch! We appreciate you contacting us.";
            statusbar.style.color = "green";
            statusbar.style.fontSize = "13px";
            setTimeout(() => {
              name.style.border = "none";
              name.value = "";
              email.style.border = "none";
              email.value = "";
              website.style.border = "none";
              website.value = "";
              message.style.border = "none";
              message.value = "";
              statusbar.textContent = "";
            }, 4000);
          })
          .catch((err) => {
            console.log(err);
            statusbar.textContent =
              "An error occurred while sending your message. Please try again.";
            statusbar.style.color = "red";
            statusbar.style.fontSize = "13px";
          });
      }
    } catch (error) {
      isValid = false;
      statusbar.textContent = error.message;
      statusbar.style.color = "red";
      statusbar.style.fontSize = "13px";
    }
  });
});

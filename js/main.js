function funcs() {
  fullPageScroll();
  headerDrop();
  sizes();
  titleCursor();
  cursor();
  if (isMobile()) {
    document.querySelector("body").classList.add("mobile");
  }
}

const cursor = () => {
  if (!isMobile()) {
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lifetime = 0;
      }
    }

    const cursorInit = (canvas) => {
      window.cursorColor = `rgba(240, 49, 232, 1)`;
      canvas.setAttribute("width", document.body.clientWidth);
      canvas.setAttribute("height", document.body.clientHeight);

      const startAnimation = () => {
        const ctx = canvas.getContext("2d");

        const points = [];

        const addPoint = (x, y) => {
          const point = new Point(x, y);
          points.push(point);
        };

        document.addEventListener(
          "mousemove",
          ({ clientX, clientY }) => {
            addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
          },
          false
        );

        const animatePoints = () => {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          const duration = (0.7 * (1 * 1000)) / 60; // Last 80% of a frame per point

          for (let i = 0; i < points.length; ++i) {
            const point = points[i];
            let lastPoint;

            if (points[i - 1] !== undefined) {
              lastPoint = points[i - 1];
            } else lastPoint = point;

            point.lifetime += 1;

            if (point.lifetime > duration) {
              // If the point dies, remove it.
              points.shift();
            } else {
              // Otherwise animate it:

              // As the lifetime goes on, lifePercent goes from 0 to 1.
              const lifePercent = point.lifetime / duration;
              const spreadRate = 7 * (1 - lifePercent);

              ctx.lineJoin = "round";
              ctx.lineWidth = spreadRate;

              ctx.strokeStyle = window.cursorColor;

              ctx.beginPath();

              ctx.moveTo(lastPoint.x, lastPoint.y);
              ctx.lineTo(point.x, point.y);

              ctx.stroke();

              ctx.closePath();
            }
          }
          requestAnimationFrame(animatePoints);
        };

        animatePoints();
      };

      window.addEventListener(
        "resize",
        () => {
          canvas.setAttribute("width", document.body.clientWidth);
          canvas.setAttribute("height", document.body.clientHeight);
        },
        false
      );

      if (matchMedia("(pointer:fine)").matches) {
        startAnimation();
      }
    };

    document.querySelectorAll(".cursor-bg").forEach((item) => {
      cursorInit(item);
    });
  }
};

const isMobile = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

const titleCursor = () => {
  if (!isMobile()) {
    const title = document.querySelectorAll(".cursor-title");
    const cursor = document.querySelector(".cursor");
    const innerCursor = document.querySelector(".inner-cursor");

    const followCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
      innerCursor.style.left = x + "px";
      innerCursor.style.top = y + "px";
    };

    title.forEach((item) => {
      item.addEventListener("mouseover", () => {
        window.cursorColor = `rgba(240, 49, 232, 0)`;
        cursor.classList.add("active");
        innerCursor.classList.add("active");
      });
    });
    title.forEach((item) => {
      item.addEventListener("mouseleave", () => {
        window.cursorColor = `rgba(240, 49, 232, 1)`;
        cursor.classList.remove("active");
        innerCursor.classList.remove("active");
      });
    });

    window.addEventListener("mousemove", followCursor);
  }
};

const preload = () => {
  let preloader = document.querySelector(".preloader");
  if (!isMobile()) {
    preloader.classList.add("active");
  }
  window.addEventListener("load", () => {
    if (isMobile()) {
      funcs();
    } else {
      setTimeout(() => {
        preloader.classList.add("hidden");
        setTimeout(() => {
          window.dispatchEvent(new Event("preload:hide"));
        }, 500);
      }, 1000);
    }
  });
};

window.addEventListener("DOMContentLoaded", preload);

window.addEventListener("preload:hide", () => {
  funcs();
  window.addEventListener("resize", () => {
    sizes();
  });
});

function fullPageScroll() {
  new fullpage(".js-fullpage", {
    navigation: true,
    scrollOverflow: true,
    scrollingSpeed: 600,
    licenseKey: "11473CB7-47134B2C-8C004205-B3837020",
    afterLoad: function (origin) {
      origin.item
        .querySelectorAll(".js-title-animation")
        .forEach(function (el, i) {
          titleAnimation(el);
        });
      fadeAnimation(origin.item.querySelectorAll(".js-fade-animation"));
    },
    onLeave: function (origin, destination) {
      destination.item
        .querySelectorAll(".js-title-animation")
        .forEach(function (el, i) {
          setTimeout(() => {
            titleAnimation(el);
          }, 300);
        });
      fadeAnimation(destination.item.querySelectorAll(".js-fade-animation"));
      if (destination.item.querySelector("video")) {
        destination.item.querySelector("video").play();
      }
    },
  });
  document.querySelectorAll(".js-fullpage-link").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      fullpage_api.moveTo(item.getAttribute("data-slide"));
    });
  });
}

function titleAnimation(title) {
  if (title) {
    if (!title.classList.contains("active")) {
      const words = title.textContent.split(" ");
      title.innerHTML = "";
      let delay = 0;
      words.forEach(function (el, i) {
        const word = document.createElement("span");
        title.append(word);
        word.classList.add("word", "word--" + (i + 1));
        title.querySelector(".word--" + (i + 1)).innerHTML = words[i].replace(
          /\S/g,
          '<span class="letter"><span class="letter-inner">$&</span></span>'
        );
        for (let j = 0; j < words[i].length; j++) {
          delay += 33;
          title
            .querySelector(".word--" + (i + 1))
            .querySelectorAll(".letter")
            [j].querySelector(".letter-inner").style.animationDelay =
            delay + "ms";
        }
      });
      title.classList.add("active");
    }
  }
}

function fadeAnimation(els) {
  if (els) {
    els.forEach((el) => {
      el.classList.add("active");
      el.style.transitionDelay = el.dataset.delay;
    });
  }
}

function headerDrop() {
  const btn = document.querySelector(".js-header-btn");
  const drop = document.querySelector(".header-drop");
  const headerLink = document.querySelectorAll(
    ".header-menu__link,.button.contact-us"
  );
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (drop.classList.contains("active")) {
      fullpage_api.setAllowScrolling(true);
      drop.classList.remove("active");
      btn.classList.remove("active");
    } else {
      fullpage_api.setAllowScrolling(false);
      drop.classList.add("active");
      btn.classList.add("active");
      drop.style.height = window.innerHeight + "px";
    }
  });
  headerLink.forEach((item) => {
    item.addEventListener("click", () => {
      if (drop.classList.contains("active")) {
        fullpage_api.setAllowScrolling(true);
        drop.classList.remove("active");
        btn.classList.remove("active");
      }
    });
  });
}

function sizes() {
  if (window.innerWidth < 769) {
    document.querySelector(".header-drop").style.height =
      window.innerHeight + "px";
  } else {
    document.querySelector(".header-drop").removeAttribute("style");
  }
}

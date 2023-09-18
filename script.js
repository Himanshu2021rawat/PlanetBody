gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();




const throttleFunction = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - prev > delay) {
      prev = now;
      return func(...args);
    }
  };
};

document.querySelector('.slide3_content').addEventListener("mousemove", throttleFunction((dets) => {
  let main = document.querySelector(".main");
  let div = document.createElement("div");
  let slide3_content = document.querySelector(".slide3_content")
  let imageurl = [
    "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHNwYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1581937019650-bb34507b7d64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHNwYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1537420327992-d6e192287183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2V8ZW58MHwxfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BhY2V8ZW58MHwxfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1507499739999-097706ad8914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BhY2V8ZW58MHwxfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1594683734152-0eccf2501041?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwYWNlfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1594683734152-0eccf2501041?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwYWNlfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1534841090574-cba2d662b62e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNwYWNlfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  ]

  let randomImgUrl = imageurl[Math.floor(Math.random()*imageurl.length)]
  div.classList.add("imagediv");
  div.style.left = dets.clientX + "px";
  div.style.top = dets.clientY + "px";
  let img = document.createElement("img");
  img.setAttribute("src",randomImgUrl);
  div.appendChild(img);
  slide3_content.appendChild(div);

  // console.log(div)

  //gsap Here:
 
  gsap.to(img,{
    y:0,
    duration:0.5,
    opacity:1,
  })
  gsap.to(img,{
    y:"100%",
    
    delay:1,
    opacity:0,
    
  })


  setTimeout(()=>{
    div.remove();
  },2000)

}, 300));




let moon = document.querySelector(".moon");
let sun = document.querySelector(".sun");
let header = document.querySelector(".header");
moon.addEventListener("click", function () {
  sun.style.display = "block";
  moon.style.display = "none";
  header.style.backgroundColor = "#2B1A1E";
  header.style.color = "white";
});
sun.addEventListener("click", function () {
  moon.style.display = "block";
  sun.style.display = "none";
  header.style.backgroundColor = "#D2305E";
  header.style.color = "black";
});

let video = document.querySelector(".video");
let cursor = document.querySelector(".cursor");
document.body.addEventListener("mousemove", function (dets) {
  cursor.style.left = dets.x + 10 + "px";
  cursor.style.top = dets.y + 10 + "px";
});

video.addEventListener("mouseenter", function () {
  cursor.style.width = "60px";
  cursor.style.height = "40px";
  cursor.style.borderRadius = "10px";
  cursor.style.backgroundColor = "#D2305E";
  cursor.style.mixBlendMode = "darken";
  cursor.style.color = "black";
  cursor.style.padding = "5px";
  cursor.innerHTML = "ALIVE";
});
video.addEventListener("mouseleave", function () {
  cursor.style.width = "20px";
  cursor.style.height = "20px";
  cursor.style.borderRadius = "50%";
  cursor.style.backgroundColor = "transparent";
  cursor.style.mixBlendMode = "difference";
  cursor.style.color = "";
  cursor.innerHTML = "";
});

//slide 3 background color
let outerDiv = document.querySelector(".main2");
let innerDiv = document.querySelector(".child");

innerDiv.addEventListener("mousemove", function (dets) {
  let whereCursr = innerDiv.getBoundingClientRect();
  // console.log(whereCursr);
  let insideposCursr = Math.floor(dets.clientX - whereCursr.left) + 2;
  // console.log(insideposCursr);
  if (insideposCursr < whereCursr.width / 2) {
    var redcolor = gsap.utils.mapRange(
      0,
      whereCursr.width / 2,
      255,
      0,
      insideposCursr
    );
    gsap.to(".child", {
      backgroundColor: `rgba(${redcolor},0,0)`,
      ease: Power4,
    });
  } else {
    var bluecolor = gsap.utils.mapRange(
      whereCursr.width / 2,
      whereCursr.width,
      0,
      255,
      insideposCursr
    );
    gsap.to(".child", {
      backgroundColor: `rgba(0,0,${bluecolor})`,
      color: "white",
      ease: Power4,
      
    });
  }
  innerDiv.innerHTML = `    <h1>PLANETS WE HAVE</h1>
    <div class="planets">
   
          <div><h2>Mercury </h2><img src="https://imgs.search.brave.com/EAF9BVPicRnAi76KxvsfTfhB5882fbrHgl1DAW_43LU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMi9NZXJj/dXJ5LVBsYW5ldC1Q/TkctSGlnaC1RdWFs/aXR5LUltYWdlLnBu/Zw" alt=""></div>
          <div><h2>Venus </h2><img src="https://www.pngall.com/wp-content/uploads/13/Mars-PNG-Picture.png" alt=""></div>
          <div><h2>Earth </h2><img src="https://www.pngall.com/wp-content/uploads/2016/06/Earth-Free-Download-PNG.png" alt=""></div>
          <div><h2>Mars </h2><img src="https://www.pngall.com/wp-content/uploads/13/Mars-PNG-HD-Image.png" alt=""></div>
          <div><h2>Jupiter </h2><img src="https://www.pngall.com/wp-content/uploads/13/Planet-PNG-Picture.png" alt=""></div>
          <div><h2>Saturn </h2><img src="https://imgs.search.brave.com/aNP78NNpILk6oSjy01D-yH7I07RE1ypFlJqRPUTW3B8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTg1YjJlZGJj/ZTI0YzQ3YjI3MGQu/cG5n" alt=""></div>
          <div><h2>Uranus </h2><img src="https://www.pngall.com/wp-content/uploads/13/Planet-PNG-Photo.png" alt=""></div>
          <div><h2>Neptune </h2><img src="https://www.pngall.com/wp-content/uploads/13/Planet-PNG-Image.png" alt=""></div>
         
  </div>`;
});





innerDiv.addEventListener("mouseleave", function () {
  gsap.to(".child", {
    backgroundColor: "white",
    color: "black",
  });
  innerDiv.innerHTML = "<h1> Why Don't You Hover Me ?</h1>";
});

//gsap code
let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".slide1",
    scroller: ".main",
    // markers: true,
    start: "top 60%",
    end: "top 20%",
    scrub: 2,
  },
});

let tl = gsap.timeline();
tl.from("nav h2,.darkmode .moon , .darkmode .sun", {
  y: -700,
  duration: 1,
  opacity: -1,
});

tl.from(".right .video", {
  y: -200,
  x: -1000,
  opacity: 0,
  duration: 1,
});
tl.to(".right .video", {
  y: -300,
  rotate: 360,
});

tl.from(".header>h1", {
  y: -100,
  x: 1000,
  opacity: 0,
});

tl2.to(".slide1", {
  backgroundColor: "#020000",
});

tl2.from(" .content video, .content img", {
  x: 100,
  scrub: 2,
  rotate: 360,
  duration: 1,
});
tl2.from(" .content marquee , .Head div", {
  x: -100,
  scrub: 2,
  opacity: 0,
});

let footer = document.querySelector("footer");
let divs = footer.querySelectorAll("div");

divs.forEach(div => {
    let imgs = div.querySelectorAll("img");
    div.addEventListener('mousemove', function(dets) {
        imgs.forEach(img => {
            img.style.display = "block";
            cursor.style.display = "none";
            img.style.left = (dets.clientX + 20)+"px"
            img.style.top = (dets.clientY + 20)+"px"
            gsap.to(img,{
              top:0,
              rotate:360,
              opacity:1,
              duration:0.3,
              
            })
        });
    });
    div.addEventListener('mouseleave', function() {
        imgs.forEach(img => {
            img.style.display = "none";
            cursor.style.display = "block"
   
        });
    });
});

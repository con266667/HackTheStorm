//TYPEWRITER

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 150 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 200;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.10em solid #2b2d30}";
    document.body.appendChild(css);
  };

//VARS

var body = document.getElementsByTagName("body")[0];

var aboutUs = document.getElementById("AboutUs");
var faq = document.getElementById("FAQ");
var sponsors = document.getElementById("Sponsors");
var contact = document.getElementById("Contact");
var hackthestorm = document.getElementById("HackTheStorm");
var logo = document.getElementById("Logo");

var home = document.getElementById("homeMob");
var aboutUsMob = document.getElementById("AboutUsMob");
var faqMob = document.getElementById("FAQMob");
var sponsorsMob = document.getElementById("SponsorsMob");
var contactMob = document.getElementById("Contact");
var menuButton = document.getElementById("menuButton");
var menu = document.getElementById("navMenu");

//RESPONSIVE

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

if(detectmob()){
    body.style.scrollSnapType = "none";
} else {
    body.style.scrollSnapType = "y mandatory";
}

//HEADER BUTTONS

aboutUs.onclick = function(){
    scrollToElement(document.getElementById("AboutUsSection"), 20);
}

faq.onclick = function(){
    scrollToElement(document.getElementById("FAQSection"), 20);
}

sponsors.onclick = function(){
    scrollToElement(document.getElementById("SponsorsSection"), 20);
}

contact.onclick = function(){
    window.location.href = "mailto:info@hackthestorm.com"
}

aboutUsMob.onclick = function(){
    scrollToElement(document.getElementById("AboutUsSection"), 15);
}

faqMob.onclick = function(){
    scrollToElement(document.getElementById("FAQSection"), 15);
}

sponsorsMob.onclick = function(){
    scrollToElement(document.getElementById("SponsorsSection"), 15);
}

contactMob.onclick = function(){
    window.location.href = "mailto:info@hackthestorm.com"
}

home.onclick = function(){
    scrollToElement(logo, 15);
}

hackthestorm.onclick = function(){
    scrollToElement(logo, 20);
}

logo.onclick = function(){
    scrollToElement(logo, 20);
}

var menuOpen = false;
menuButton.onclick = function(){
    if(!menuOpen){
        menuButton.style.transform = "rotate(90deg)";
        menu.classList.add("nav-open");
        menuOpen = true;
    } else {
        menu.classList.remove("nav-open")
        menuButton.style.transform = "none";
        menuOpen = false;
    }
}

function scrollToElement(pageElement, speed) { 
        var offset = (pageElement == document.getElementById("AboutUsSection"))?150:200;
        isAutoScrolling = true;   
        var i = window.scrollY;
        function loop(){
            
            setTimeout(function(){
                if(i < pageElement.offsetTop-offset){
                    window.scroll(0, i);
                    i=i+speed;
                    if(i < pageElement.offsetTop-offset){
                        loop();
                    } else {
                        if(detectmob() != true){
                            document.getElementsByTagName("body")[0].style.scrollSnapType = "y mandatory";
                        }
                        window.scroll(0, pageElement.offsetTop-offset);
                        isAutoScrolling = false;
                    }
                } else if(i > pageElement.offsetTop-offset){
                    window.scroll(0, i);
                    i=i-speed;
                    if(i > pageElement.offsetTop-offset){
                        loop();
                    } else {
                        if(detectmob() != true){
                            document.getElementsByTagName("body")[0].style.scrollSnapType = "y mandatory";
                        }
                        window.scroll(0, pageElement.offsetTop-offset);
                        isAutoScrolling = false;
                    }
                }
            }, 1);
        }

        document.getElementsByTagName("body")[0].style.scrollSnapType = "none";
        loop();
}

//GET CLOSEST SECTION(ABOUT, FAQ, SPONSORS)

window.onscroll = function(){
    switch(closest()){
        case document.getElementById("AboutUsSection"):
            removeAll();
            aboutUs.style.borderColor = "grey";
            break;
        case document.getElementById("FAQSection"):
            removeAll();
            faq.style.borderColor = "grey";
            break;
        case document.getElementById("SponsorsSection"):
            removeAll();
            sponsors.style.borderColor = "grey";
            break;
        default:
            removeAll();
    }
}

function removeAll(){
    aboutUs.style.borderColor = "transparent";
    faq.style.borderColor = "transparent";
    sponsors.style.borderColor = "transparent";
}

function closest(){
    var snaps = [logo, document.getElementById("AboutUsSection"), document.getElementById("FAQSection"), document.getElementById("SponsorsSection")]
    var snapvalues = [];
    for(var i = 0; i < snaps.length; i++){
    snapvalues[i] = snaps[i].offsetTop - 200;   
    }
    var closest = snapvalues.reduce(function(prev, curr) {
        return (Math.abs(curr - window.scrollY) < Math.abs(prev - window.scrollY) ? curr : prev);
    });
    return snaps[snapvalues.indexOf(closest)]
}

//DROPDOWN FAQ

var faqbutton = document.getElementsByClassName("dropdown");

for(var i = 0; i < faqbutton.length; i++){
    faqbutton[i].addEventListener("click", function(){
        var panel = this.nextElementSibling;
        for(var i2 = 0; i2 < faqbutton.length; i2++){
            if(faqbutton[i2].nextElementSibling != panel) {
                faqbutton[i2].childNodes[2].style.transform = "rotate(0deg)";
                faqbutton[i2].nextElementSibling.style.maxHeight = null;
            }
        }
        if (panel.style.maxHeight) {
            this.childNodes[2].style.transform = "rotate(0deg)";
            panel.style.maxHeight = null;
          } else {
            this.childNodes[2].style.transform = "rotate(180deg)";
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
    faqbutton[i].addEventListener("mouseover", function(){
        if(!detectmob()){
        this.childNodes[2].style.filter = "invert(100%)";}
    });
    faqbutton[i].addEventListener("mouseout", function(){
        this.childNodes[2].style.filter = null;
    });
}

//EMAIL

var getnotified = document.getElementById("get-notified");
var email = document.getElementById("field_0");
var mailList = document.getElementById("mail-list");
var hasExpanded = false;

getnotified.onclick = function(){
if(hasExpanded){
    if(ValidateEmail(email.value)){
    //signup
    console.log(email.value);
    mailList.style.opacity = "0";
    } else {
        //alert("Invalid Email");
        email.style.borderColor = "red";
        email.classList.add("wiggle");
        setTimeout(function(){
            email.classList.remove("wiggle");
        }, 500);
        
    }
} else {
        getnotified.type="submit";
        hasExpanded = true;
        email.style.marginLeft = "4.2%";
        email.style.opacity = "1";
        getnotified.style.width = "25%";
        email.style.width = detectmob()?"47%":"41%";
    }
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true
  }
    return false
}

//Animate On Scroll Lib
/*
AOS.init({
    duration: 600,
});
*/



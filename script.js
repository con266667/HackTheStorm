//TYPEWRITER

var pos = 0;
var turn = 0;
var data = ['Gain Skills','Make Friends','Develop Your Ideas','Have Fun!'];
var speed = 170;

setTimeout(typeWriter, speed);

function typeWriter() {
  if (pos < data[turn].length) {
    document.getElementById("demo").innerHTML += data[turn].charAt(pos);
    pos++;
    setTimeout(typeWriter, speed);
  } else {
  	setTimeout(erase, speed+100);
  }
}

function erase() {
	if (pos >= 0) {
      var str=data[turn].toString().substring(0, pos);
      document.getElementById("demo").innerHTML = str;
      pos--;
      setTimeout(erase, speed-100);
    } else {
      turn++;
      if(turn>=data.length) 
        turn=0;
      setTimeout(typeWriter, speed);
    }
}

//VARS

var body = document.getElementsByTagName("body")[0];

var aboutUs = document.getElementById("AboutUs");
var faq = document.getElementById("FAQ");
var sponsors = document.getElementById("Sponsors");
var contact = document.getElementById("Contact");
var hackthestorm = document.getElementById("HackTheStorm");
var logo = document.getElementById("Logo");

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
    console.log("Mobile");
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

hackthestorm.onclick = function(){
    scrollToElement(logo, 20);
}

logo.onclick = function(){
    scrollToElement(logo, 20);
}

function scrollToElement(pageElement, speed) { 
        isAutoScrolling = true;   
        var i = window.scrollY;
        function loop(){
            
            setTimeout(function(){
                if(i < pageElement.offsetTop-200){
                    window.scroll(0, i);
                    i=i+speed;
                    if(i < pageElement.offsetTop-200){
                        loop();
                    } else {
                        if(detectmob() != true){
                            document.getElementsByTagName("body")[0].style.scrollSnapType = "y mandatory";
                        }
                        window.scroll(0, pageElement.offsetTop-200);
                        isAutoScrolling = false;
                    }
                } else if(i > pageElement.offsetTop-200){
                    window.scroll(0, i);
                    i=i-speed;
                    if(i > pageElement.offsetTop-200){
                        loop();
                    } else {
                        if(detectmob() != true){
                            document.getElementsByTagName("body")[0].style.scrollSnapType = "y mandatory";
                        }
                        window.scroll(0, pageElement.offsetTop-200);
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
        this.childNodes[2].style.filter = "invert(100%)";
    });
    faqbutton[i].addEventListener("mouseout", function(){
        this.childNodes[2].style.filter = null;
    });
}

//EMAIL

var getnotified = document.getElementById("get-notified");
var email = document.getElementById("email");
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
        hasExpanded = true;
        mailList.style.marginLeft = "0";
        email.style.opacity = "1";
        getnotified.style.width = "30%";
        email.style.width = "39%";
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
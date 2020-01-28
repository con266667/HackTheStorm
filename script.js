var pos = 0;
var turn = 0;
var data = ['Gain Skills','Make Friends','Develop Your Ideas','Have Fun!'];
var speed = 170;

setTimeout(typeWriter, speed);

function typeWriter() {
  if (pos < data[turn].length) {
    document.getElementById("demo").innerHTML += data[turn].charAt(pos);
    console.log(data[turn].charAt(pos));
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

var aboutUs = document.getElementById("AboutUs");
var faq = document.getElementById("FAQ");
var sponsors = document.getElementById("Sponsors");
var contact = document.getElementById("Contact");
var hackthestorm = document.getElementById("HackTheStorm");
var logo = document.getElementById("Logo");

aboutUs.onclick = function(){
    scrollToElement(document.getElementById("AboutUsSection"));
}

faq.onclick = function(){
    scrollToElement(document.getElementById("FAQSection"));
}

sponsors.onclick = function(){
    scrollToElement(document.getElementById("SponsorsSection"));
}

contact.onclick = function(){
    window.location.href = "mailto:info@hackthestorm.com"
}

hackthestorm.onclick = function(){
    scrollToElement(logo);
}

logo.onclick = function(){
    scrollToElement(logo);
}

function scrollToElement(pageElement) {    
    var positionX = 0,         
        positionY = 0;    

    while(pageElement != null){        
        positionX += pageElement.offsetLeft;        
        positionY += pageElement.offsetTop;        
        pageElement = pageElement.offsetParent;        
        window.scrollTo(positionX, positionY-200);    
    }
}

var faqbutton = document.getElementsByClassName("dropdown");

for(var i = 0; i < faqbutton.length; i++){
    faqbutton[i].addEventListener("click", function(){
        var panel = this.nextElementSibling;
        if(panel.style.display == "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
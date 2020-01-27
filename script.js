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
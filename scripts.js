// Author: Noah Raissi

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('message').classList.remove('hidden');

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

document.getElementById('heart').style.cursor = 'help';
document.getElementById('heart').addEventListener('click', function() {
    window.open('https://noahraissi.com', '_blank');
});

var selectedPet;
var container = document.getElementById('animate');
var circles = [];

var emoji = {
  cat: '🐱',
  dog: '🐶',
  other: ['🐰', '🐹', '🐷', '🐸', '🦁']
};

document.getElementById('cat').addEventListener('change', function() {
  startAnimation('cat');
});

document.getElementById('dog').addEventListener('change', function() {
  startAnimation('dog');
});

document.getElementById('other').addEventListener('change', function() {
  startAnimation('other');
});

function startAnimation(pet) {
    clearCircles();
  selectedPet = pet;
  for (var i = 0; i < 15; i++) {
    addCircle(i * 150, [10 + 0, 300], getEmoji());
    addCircle(i * 150, [10 + 0, -300], getEmoji());
    addCircle(i * 150, [10 - 200, -300], getEmoji());
    addCircle(i * 150, [10 + 200, 300], getEmoji());
    addCircle(i * 150, [10 - 400, -300], getEmoji());
    addCircle(i * 150, [10 + 400, 300], getEmoji());
    addCircle(i * 150, [10 - 600, -300], getEmoji());
    addCircle(i * 150, [10 + 600, 300], getEmoji());
  }
}

function getEmoji() {
  if (selectedPet !== 'other') {
    return emoji[selectedPet];
  } else {
    return emoji.other[Math.floor(Math.random() * emoji.other.length)];
  }
}


function addCircle(delay, range, color) {
  setTimeout(function() {
    var c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
      x: -0.15 + Math.random() * 0.3,
      y: 1 + Math.random() * 1
    }, range);
    circles.push(c);
  }, delay);
}

function clearCircles() {
    for (var i in circles) {
      var el = circles[i].element;
      el.classList.add('fade-out');
      (function(el) {
        setTimeout(function() {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }, 1000);  // Remove after 1 second
      })(el);
    }
    circles = [];
  }
  
function Circle(x, y, c, v, range) {
  var _this = this;
  this.x = x;
  this.y = y;
  this.color = c;
  this.v = v;
  this.range = range;
  this.element = document.createElement('span');
  /*this.element.style.display = 'block';*/
  this.element.style.opacity = 0;
  this.element.style.position = 'absolute';
  this.element.style.fontSize = '26px';
  this.element.style.color = 'hsl('+(Math.random()*360|0)+',80%,50%)';
  this.element.innerHTML = c;
  container.appendChild(this.element);

  this.update = function() {
    if (_this.y > 800) {
      _this.y = 80 + Math.random() * 4;
      _this.x = _this.range[0] + Math.random() * _this.range[1];
    }
    _this.y += _this.v.y;
    _this.x += _this.v.x;
    this.element.style.opacity = 1;
    this.element.style.transform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
    this.element.style.webkitTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
    this.element.style.mozTransform = 'translate3d(' + _this.x + 'px, ' + _this.y + 'px, 0px)';
  };
}

function animate() {
  for (var i in circles) {
    circles[i].update();
  }
  requestAnimationFrame(animate);
}

animate();
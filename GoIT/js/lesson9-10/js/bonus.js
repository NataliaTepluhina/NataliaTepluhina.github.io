document.querySelector('.menu').addEventListener('mouseover', function(event){
    var target = event.target;
    if (target.className == 'dropdown' || target.className == 'menu__link') {
        var n;
        if (target.className == 'menu__link') {
            n = target.parentNode.querySelectorAll('.submenu');
        }
        else {
            n = target.querySelectorAll('.submenu');
        }
        n[0].style.height = '165px';
    }
});


document.querySelector('.submenu').addEventListener('mouseover', function(event){
    var target = event.target;
    var sub = target.parentNode.parentNode;
    if (target.className !== 'dropdown' && target.className !== 'menu__link' && sub.querySelector('.dropdown')) {
        var drop = sub.querySelector('.dropdown');
        drop.querySelector('.submenu').style.overflow = 'hidden';
        drop.querySelector('.submenu').style.height = 0;
    }
    else {
        sub.style.overflow = 'visible';
    }
    
});


document.querySelector('.menu').addEventListener('mouseleave', function(event){
    closeMenu ();
});

document.querySelector('.dropdown').addEventListener('mouseleave', function(event){
    closeSubmenu ();
});

function closeMenu () {
    var menu = document.querySelector('.menu');
    var subm = document.querySelectorAll('.submenu');
    for (var i = 0; i < subm.length; i++) {
        subm[i].style.overflow = 'hidden';
        subm[i].style.height = 0;
    }
}

function closeSubmenu () {
    var tar = event.target;
    var subm = tar.querySelectorAll('.submenu');
    for (var i = 0; i < subm.length; i++) {
        subm[i].style.overflow = 'hidden';
        subm[i].style.height = 0;
    }
}
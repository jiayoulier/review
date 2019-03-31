window.onload = function() {
    // 首页搜索
    search();
    //轮播图
    banner();
    //倒计时
    countDown();
}

function search() {
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;

    document.onscroll = function() {
        var opacity = 0;
        var scrollTop = getScroll().scrollTop;
        if(scrollTop < height) {
            opacity = scrollTop / height * 0.85;
        } else {
            opacity = 0.85;
        }

        searchBox.style.backgroundColor = 'rgba(201,21,35, '+opacity+')';
    }
}

function banner(){
    var banner = document.querySelector('.jd_banner');
    var imgBox = banner.querySelector('ul:first-of-type');
    var uu = banner.querySelector('ul:last-of-type');
    var first = imgBox.querySelector('li:first-of-type');
    var last = imgBox.querySelector('li:last-of-type');
    imgBox.insertBefore(last.cloneNode(true), first);
    imgBox.appendChild(first.cloneNode(true));

    var lis = imgBox.querySelectorAll('li');
    var dots = uu.querySelectorAll('li');
    var count = lis.length;
    var bannerWidth = banner.offsetWidth;
    imgBox.style.width = count * bannerWidth + 'px';
    for(var i = 0; i < lis.length; i++) {
        lis[i] .style.width = bannerWidth + 'px';
    }
    imgBox.style.left = - bannerWidth + 'px';

    var index = 1;

    window.onresize = function(){
        // alert(123)
        bannerWidth = banner.offSetWidth;
        imgBox.style.width = count * bannerWidth + 'px';
        for(var i = 0; i < lis.length; i++) {
            lis[i].style.width = bannerWidth + 'px';
        }
        imgBox.style.left =  - bannerWidth + 'px';
    }

    function addTransition() {
        imgBox.style.transition = 'left 0.5s linear';
        imgBox.style.webkitTransition = 'left 0.5s linear';
    }
    function removeTransition() {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    }
    function setLeft(left) {
        imgBox.style.left = left + 'px';
    }
    var setDots = function() {
        for(var i = 0; i < dots.length; i++) {
            dots[i].classList.remove('current');
        }
        // console.log(index);
        dots[index - 1].classList.add('current');
    }
    var timerId = setInterval(function(){
        index++;
        addTransition();
        setLeft(-index * bannerWidth);
        if(index >= count -1) {
            setTimeout(function() {
                index = 1;
                removeTransition();
                setLeft(-index * bannerWidth); 
            }, 500)        
        }          
    }, 2000)


    var startX,moveX,distanceX;
    var isMove = false;
    var isEnd = true;
    imgBox.addEventListener('touchstart', function(e){
        clearInterval(timerId);
        startX = e.targetTouches[0].clientX;
    })
    imgBox.addEventListener('touchmove', function(e) {
        if(isEnd) {
            moveX = e.targetTouches[0].clientX;
            distanceX  = moveX - startX;
            var translateX = distanceX + (-index * bannerWidth);
            removeTransition();
            setLeft(translateX);
            isMove = true;
        }
    })
    imgBox.addEventListener('touchend', function(e) {
        isEnd = false;
        if(isMove) {
            if(Math.abs(distanceX) < bannerWidth / 3) {
                addTransition();
                setLeft(-index * bannerWidth);
            } else {
                if(distanceX > 0) {
                    index--;
                }else {
                    index++;
                }
                addTransition();
                setLeft(-index * bannerWidth);
            }
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;


        timerId = setInterval(function() {
            index++;
            addTransition();
            setLeft(-index * bannerWidth);
        }, 2000);
    })

    imgBox.addEventListener('webkitTransitionEnd', function() {
        if(index == count - 1) {
            index = 1;
            removeTransition();
            setLeft(-index * bannerWidth);
        }else if(index == 0) {
            index = count -2;
            removeTransition();
            setLeft(-index * bannerWidth);
        }

        setDots();
        isEnd = true;

    })
  

}


function countDown() {
    var kill = document.querySelector('.kill_time');
    var spans = kill.querySelectorAll('span');

    var time = 2*60*60;
    var getTime = function() {
        time--;
        var h = Math.floor(time / 60 / 60);
        var m = Math.floor(time / 60 % 60);
        var s = Math.floor(time % 60);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = Math.floor(h%10);

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = Math.floor(m%10);

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = Math.floor(s%10);

        if(time <= 0) {
            clearInterval(timerId);
        }
   }
    getTime();
    var timerId = setInterval(getTime, 1000);        
}

function animate(element, target) {
    if (element.timerId) {
        clearInterval(element.timerId);
        element.timerId = null;
    }
    element.timerId = setInterval(function () {
        var step = 10;
        var current = element.offsetLeft;
        // 从400到800 执行动画
        // 从800到400 不执行动画
        // 判断当前的位置 > 目标位置 此时的step 应该小于0
        if (current > target) {
            step = - Math.abs(step);
        }


        if (Math.abs(current - target) < Math.abs(step)) {
            clearInterval(element.timerId);
            element.style.left = target + 'px';
            return;
        }
        current += step;
        element.style.left = current + 'px';
    }, 8)
}
window.addEventListener('load', function() {
    // 1.鼠标经过，左右按钮显示
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');

    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                arrow_r.click();
            }, 3000)
        })
        // 2.动态生成小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
        // 3. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            // 4. 点击小圆圈，移动图片 当然移动的是 ul 
            animate(ul, -index * focusWidth)
        })
    }
    // 给第一个li设置current样式
    ol.children[0].className = 'current';
    // 5.克隆第一张图片（li）放在ul的最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 6.点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0;
    // 节流阀，阻止动画事件连续触发
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            // 节流阀关闭
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                // 利用回调函数开启节流阀
                flag = true;
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    // 7.左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }

            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 8.自动播放轮播图
    var timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 3000);
    // 返回顶部功能
    var backTop = document.querySelector('.backTop');
    backTop.addEventListener('click', function() {
            animates(window, 0)
        })
        // 返回顶部功能的修改动画封装
    function animates(obj, target, callback) {
        // console.log(callback);  callback = function() {}  调用的时候 callback()

        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                // if (callback) {
                //     // 调用函数
                //     callback();
                // }
                // 与的短路运算
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            // obj.style.left =  window.pageYOffset + step + 'px';
            window.scroll(0, window.pageYOffset + step)

        }, 15);
    }
})
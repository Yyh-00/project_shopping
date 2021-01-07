$(function() {
        //1.全选按键模块
        getSum();
        $(".checkall").change(function() {
            $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"))
            if ($(this).prop("checked")) {
                $(".j-checkbox").parents(".cart-item").css("backgroundColor", "#fff4e8");
            } else {
                $(".j-checkbox").parents(".cart-item").css("backgroundColor", "#fff");
            }
        });
        $(".j-checkbox").change(function() {
            if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
                $(".checkall").prop("checked", true)
            } else {
                $(".checkall").prop("checked", false)
            }
            if ($(this).prop("checked")) {
                $(this).parents(".cart-item").css("backgroundColor", "#fff4e8");
            } else {
                $(this).parents(".cart-item").css("backgroundColor", "#fff");
            }
        });
        // 2.增减商品数量模块
        $(".increment").click(function() {
            var num = $(this).siblings(".itxt").val();
            num++;
            $(this).siblings(".itxt").val(num);
            //小计模块
            var p = $(this).parents(".p-num").siblings(".p-price").html();
            p = p.slice(1);
            var price = (p * num).toFixed(2);
            $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
            getSum();
        });
        $(".decrement").click(function() {
            var num = $(this).siblings(".itxt").val();
            num--;
            if (num <= 1) {
                num = 1
            }
            $(this).siblings(".itxt").val(num);
            //小计模块
            var p = $(this).parents(".p-num").siblings(".p-price").html();
            p = p.slice(1);
            var price = (p * num).toFixed(2);
            $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        });
        //3.用户修改文本框的值修改小计模块
        $(".itxt").change(function() {
            var num = $(this).val();
            var p = $(this).parents(".p-num").siblings(".p-price").html();
            p = p.slice(1);
            var price = (p * num).toFixed(2);
            $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        });
        //4.计算总计总和模块
        function getSum() {
            var count = 0; //计算总件数
            var money = 0; //计算总价
            var arr = [];
            var arr1 = [];
            $(".j-checkbox").change(function() {
                if ($(this).prop("checked")) {
                    var n = parseInt($(this).parent().siblings(".p-num").find(".itxt").val());
                    arr.push(n);
                    var m = parseFloat($(this).parent().siblings(".p-sum").text().slice(1));
                    arr1.push(m);
                } else {
                    arr.pop(n);
                    arr1.pop(m);
                }
                count = 0;
                $.each(arr, function(i, ele) {
                    count += arr[i];
                })
                $(".amount-sum em").text(count);
                money = 0;
                $.each(arr1, function(i, ele) {
                    money += arr1[i];
                })
                $(".price-sum em").text("￥" + money.toFixed(2));
            });
            $(".checkall").change(function() {
                if ($(this).prop("checked")) {
                    getSums();
                } else {
                    count = 0;
                    $(".amount-sum em").text(count);
                    money = 0;
                    $(".price-sum em").text("￥" + money.toFixed(2));
                }
            });

            function getSums() {
                $(".itxt").each(function(i, ele) {
                    count += parseInt($(ele).val());
                });
                $(".amount-sum em").text(count);
                $(".p-sum").each(function(i, ele) {
                    money += parseFloat($(ele).text().slice(1));
                });
                $(".price-sum em").text("￥" + money.toFixed(2));
            };
        };

        // 5.删除模块
        $(".p-action").click(function() {
            $(this).parent().remove();
            getSums();
        })
        $(".clear-all").click(function() {
            $(".cart-item").remove();
        })
        $(".remove-batch").click(function() {
            $(".j-checkbox:checked").parents(".cart-item").remove();
        })

    })
    // 存在bug：1.j-checkbox的checked为true时，点击+活-，getsum值和amount-sum值不变化，仍旧是原先的itxt值和单价。2.某一个j-checkbox的checked为true时，再点击全选，下面的getsum值和amount-sum值都会增加原先的所有量
    // 可以尝试吧3个j-chcekbox区分开来
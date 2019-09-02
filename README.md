## 安装

> use npm install
>
> 使用npm安装

```
npm install node-floatobj
```

> copy code
>
> 复制以下代码

```
var floatObj = function() {

    function dealNumber(num,digits){
        // var num2=num.toFixed(digits+1);
        // return  parseFloat(num2.substring(0,num2.lastIndexOf('.')+(digits+1)));
        var num2=num.toFixed(digits+2);
        //获取2位数的数字
        num2=parseFloat(num2.substring(0,num2.lastIndexOf('.')+(digits+1)));
        //弥补精度问题，乘以100，加上0.5
        num2 = parseInt(num2*100 + (num2>0?0.5:-0.5))/100;

        return num2;
    };

    function getFloatObj(num,digits){
        var str = num.toString();
        var len = str.length;
        var index = str.lastIndexOf(".");
        //计算出小数位
        var times = Math.pow(10,index>-1?len-(index+1):0)
        return {
            num:dealNumber(num * times,digits),
            times:times
        }
    }
 
    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, digits, op) {
        // console.log(a,b);
        var o1 = getFloatObj(a,digits)
        var o2 = getFloatObj(b,digits)
        // console.log(o1,o2);
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        // console.log(n1,n2,t1,t2);
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                // console.log(result);
                return dealNumber(result / max, digits);
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return dealNumber(result / max, digits);
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return dealNumber(result, digits);
            case 'divide':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 / n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 / (n2 * (t1 / t2))
                } else { // o1 小数位 小于 o2
                    result = (n1 * (t2 / t1)) / n2
                }
                return dealNumber(result, digits);
        }
    }
 
    // 加减乘除的四个接口,digits精度，保留几位小数
    function add(a, b, digits) {
        return operation(a, b, digits || 2, 'add')
    }
    function subtract(a, b, digits) {
        return operation(a, b, digits || 2, 'subtract')
    }
    function multiply(a, b, digits) {
        return operation(a, b, digits || 2, 'multiply')
    }
    function divide(a, b, digits) {
        return operation(a, b, digits || 2, 'divide')
    }
 
    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
};

//直接初始化使用
var floatObj = floatObj();
```

> [download](<https://github.com/ice-penguin/node_floatobj>) form GitHub
>
> 从github[下载](<https://github.com/ice-penguin/node_floatobj>)

## Introduce 模块说明

>改模块主要用于处理计算过程中的浮点数精度问题，对四则运算进行的一定程度的封装

## Sample example  使用说明 

```
var floatObj = require("node-floatobj")

/**
 * 加法 add(num1,num2,digits)
 * 减法 subtract(num1,num2,digits)
 * 乘法 multiply(num1,num2,digits)
 * 除法 divide(num1,num2,digits)
 *
 * num1,num2为数字,digits为精度，默认为2位数
 */
console.log(floatObj.add(1099.891,100.1));
console.log(floatObj.subtract(1099.891,100.1));
console.log(floatObj.multiply(1099.89,1000));
console.log(floatObj.divide(1099.89,100));

console.log(1098.89/100);
```


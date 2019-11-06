var floatObj = function() {

    function dealNumber(num,digits){
        // console.log(num,digits);
        // var num2=num.toFixed(digits+1);
        // return  parseFloat(num2.substring(0,num2.lastIndexOf('.')+(digits+1)));
        var num2=num.toFixed(digits+1);
        // console.log("num2",num2);
        //获取2位数的数字
        num2=parseFloat(num2.substring(0,num2.lastIndexOf('.')+(digits+1)));
        // console.log("num2",num2);
        //弥补精度问题，乘以100，加上0.5
        var uplevel = Math.pow(10,digits+1);
        num2 = parseInt(num2*uplevel + (num2>0?0.5:-0.5))/uplevel;
        // console.log("num2",num2);

        return num2;
    };

    function getFloatObj(num,digits){
        var str = num.toString();
        var len = str.length;
        var index = str.lastIndexOf(".");
        //计算出小数位
        var times = Math.pow(10,index>-1?len-(index+1):0)
        return {
            num:dealNumber(num * times,0),
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

module.exports = floatObj();
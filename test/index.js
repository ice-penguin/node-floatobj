var floatObj = require('../index');
console.log(floatObj);
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
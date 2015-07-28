# q.computed

> 给`Q.js`实现的简易版本`computed`

### 场景

有些时候指令可能需要由两个值才能决定，这时候computed就要出场了。

例如，我们有3个flag，`flag1`、`flag2`、`flag3`，但是实际上我们希望有一个flag满足：

`flag = flag1 || flag2 && flag3`

Q.js中实现是比较麻烦的，所以可以使用该q.computed来实现。

只需要：

```
/**
 * @param {Q} q 需要computed属性的vm
 * @param {key} key computed对应的key值
 * @param {Function} getter 当this为q的时候如何得到computed的值
 */
QComputed(q, 'flag', function () {
	return flag1 || flag2 && flag3;
})
```

OK，搞定！

### 注意

目前只是简单演示，请勿用在生产环境。
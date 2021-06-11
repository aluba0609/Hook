let {AsyncSeriesWaterfallHook} = require('tapable')//AsyncSeriesWaterfallHook 异步串行瀑布钩子
class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        }
    }
    tap() { //注册监听函数
        this.hooks.arch.tapAsync('node', (name,cb) => {
                setTimeout(() => {
                    console.log('node', name)
                    // cb('error','result') //会跳过下一个方法 直接打印end
                    cb(null,'result')
                }, 1000)
        })
        this.hooks.arch.tapAsync('react', (name,cb) => {
                setTimeout(() => {
                    console.log('react', name)
                    cb()
                }, 1000)
        })
    }
    start() {
        this.hooks.arch.callAsync('jw',()=>{
            console.log('end')
        })
    }
}

let l = new Lesson()
l.tap() //注册这两个时间
l.start(); //启动钩子
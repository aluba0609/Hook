let {
    AsyncSeriesHook
} = require('tapable')
//异步串行钩子 如下两个异步函数将串行执行，第一个挂载函数成功后，才开始执行第二个挂载函数

// AsyncSeriesBailHook 异步串行条件钩子
// 钩子函数的异步挂载函数按顺序执行，当第一个执行的resolve 返回一个非undefined的值的时候，后面的串行异步挂载函数将不执行，钩子的回调函数将立马执行。
class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tap() { //注册监听函数
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name)
                    resolve()
                }, 1000)
            })

        })
        this.hooks.arch.tapPromise('react', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name)
                    resolve()
                }, 1000)
            })
        })
    }
    start() {
        this.hooks.arch.promise('jw').then( () => {
            console.log('end')
        })
    }
}

let l = new Lesson()
l.tap() //注册这两个时间
l.start(); //启动钩子
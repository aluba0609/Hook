let {AsyncParallelHook}=require('tapable')

// AsyncParallelHook 异步并行钩子
// 会并发执行两个异步的挂载函数，等两个都执行结束了，钩子函数执行自己的cb
// AsyncParallelBailHook 异步并行条件钩子
// 两个挂载的异步函数虽然是异步执行的，但是只要有一个callback 传入一个非undefined的值，钩子函数便会执行自己的callback，还没有执行完成的挂载还是会接着走，不会被停止
class Lesson{
    constructor(){
        this.hooks={
            arch:new AsyncParallelHook(['name'])
        }
    }
    tap(){//注册监听函数
        this.hooks.arch.tapAsync('node',(name,cb)=>{
            setTimeout(()=>{
                console.log('node',name)
                cb()
            },1000)
        })
        this.hooks.arch.tapAsync('react',(name,cb)=>{
            setTimeout(()=>{
                console.log('react',name)
                cb()
            },1000)
        })
    }
    start(){
        this.hooks.arch.callAsync('jw',function(){
            console.log('end')
        });
    }
}

let l=new Lesson()
l.tap()//注册这两个时间
l.start();//启动钩子
class AsyncParallelHook{
    constructor(args){//args=>['name']
        this.tasks=[]
    }
    tapAsync(name,task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback=args.pop()//最终的函数
        let index=0
        let done=()=>{//类似promise.all
            index++
            if(index ==this.tasks.length){
                finalCallback();
            }
        }
        this.tasks.forEach((task)=>{
            task(...args,done)
        })
    }
}
let hook = new AsyncParallelHook(['name'])
hook.tapAsync('react',function(name,cb){
    setTimeout(()=>{
        console.log('react',name)
        cb()
    },1000)
    
})
hook.tapAsync('node',function(name,cb){
    setTimeout(()=>{
        console.log('node',name)
        cb()
    },1000)

})
hook.callAsync('jw',function(){
    console.log('end')
})
class AsyncParallelHook{
    constructor(args){//args=>['name']
        this.tasks=[]
    }
    tapPromise(name,task){
        this.tasks.push(task)
    }
    promise(...args){
        let tasks=this.tasks.map(task=>task(...args))
        return Promise.all(tasks)
    }
}
let hook = new AsyncParallelHook(['name'])
let total=0
hook.tapPromise('react',function(name){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name)
            resolve()
        }, 1000)
    })
})
hook.tapPromise('node',function(name){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name)
            resolve()
        }, 1000)
    })

})
hook.promise('jw').then(()=>{
    console.log('end')
})
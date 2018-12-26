module.exports = {
    configureWebpack:{
      devServer: {
          before(app){
            // app是一个express的实例
            app.get('/api/goods',function(req,res){
              res.json({
                list:[
                  {text:"百万年薪架构师",price:100},
                  {text:"Web全栈",price:80},
                  {text:"Java架构师",price:70},
                  {text:"Python爬虫",price:90}
                ]
              })
            })
          }
      }
    }
  }
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        const API_KEY = 'kaikeba'
        app.get('/api/authapi', function (req, res) {
          const { token } = req.headers
          if (!token) {
            return res.json({ code: -1 })
          }
          const [key, time] = token.split('-')
          const now = new Date().getTime()
          if (key === API_KEY && time > now) {
            return res.json({ code: 1, data: '校验通过没有过期' })
          } else {
            return res.json({ code: -1, message: '登录授权过期，请重新登录' })
          }
        })
        app.get('/api/login', function (req, res) {
          const { username, password } = req.query
          if (username === 'kkb' && password === '123') {
            res.json({
              code: 1,
              token: API_KEY + '-' + (new Date().getTime() + 1000 * 10)
            })
          } else {
            res.json({
              code: 0,
              message: '用户名或密码错误'
            })
          }
        })
        app.get('/api/logout', function (req, res) {
          res.json({
            code: -1
          })
        })
        app.get('/api/goods', function (req, res) {
          res.json({
            code: 1,
            slider: [
              {
                id: 21,
                img: '/img/01.jpg'
              },
              {
                id: 22,
                img: '/img/02.jpg'
              },
              {
                id: 23,
                img: '/img/03.jpg'
              },
              {
                id: 24,
                img: '/img/04.jpg'
              }
            ],
            data: {
              fe: [
                {
                  id: 1,
                  title: 'Vue2.x实战',
                  price: '100',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 2,

                  title: 'React16.x实战',
                  price: '120',
                  img: '/img/03.jpg',
                  count: 100
                },
                {
                  id: 3,

                  title: 'nodejs实战',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 4,

                  title: '前端工程化',
                  price: '110',
                  img: '/img/04.jpg',
                  count: 100
                },
                {
                  id: 5,

                  title: '面试',
                  price: '200',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 6,

                  title: '前端安全',
                  price: '30',
                  img: '/img/05.jpg',
                  count: 100
                }
              ],
              python: [

                {
                  id: 7,

                  title: 'Python基础语法',
                  price: '120',
                  img: '/img/03.jpg',
                  count: 101
                },
                {
                  id: 8,
                  title: 'Flask实战',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 9,
                  title: 'Django实战',
                  price: '110',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 10,
                  title: 'Python语法进阶',
                  price: '200',
                  img: '/img/04.jpg',
                  count: 100
                }
              ],
              java: [

                {
                  id: 11,
                  title: 'java入门实战',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 12,
                  title: 'spring boot实战',
                  price: '110',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 13,
                  title: 'Java高并发',
                  price: '30',
                  img: '/img/04.jpg',
                  count: 100
                }
              ],
              bigdata: [
                {
                  id: 14,
                  title: '大数据实战',
                  price: '200',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 15,
                  title: 'Hadoop实战',
                  price: '120',
                  img: '/img/03.jpg',
                  count: 100
                },
                {
                  id: 16,
                  title: 'Kafka平台',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },

              ],
              ai: [
                {
                  id: 17,
                  title: '算法实战',
                  price: '100',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 18,
                  title: '个性化推荐',
                  price: '120',
                  img: '/img/03.jpg',
                  count: 100
                },
                {
                  id: 19,
                  title: '机器学习',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 20,
                  title: 'AI实战',
                  price: '110',
                  img: '/img/05.jpg',
                  count: 100
                }
              ]
            },
            keys: ['fe', 'python', 'java', 'bigdata', 'ai']
          })
        })
        app.get('/api/check', function (req, res) {
          const username = req.query.username
          if (username === 'dsss') {
            res.json({ code: 1 })
          } else {
            res.json({ code: 0 })
          }
        })
      }
    }
  }
}

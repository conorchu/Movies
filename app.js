//載入express
const express = require('express')
const app = express()
const port = 3000

//載入Jason檔
const movieList = require('./movies.json')

//require handlebars
const exphbs = require('express-handlebars')

// setting template engine 樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files 告訴 Express 靜態檔案的位置
app.use(express.static('public'))


//routes setting 輸出的畫面
app.get('/', (req, res) => {
    res.render('index', { movies: movieList.results })
})

//Show內頁
//動態路由params
app.get('/movies/:movie_id', (req, res) => {
    
    const movie = movieList.results.filter(function(movie){
        return movie.id == req.params.movie_id
    })

    console.log('movie', movie)
    res.render('show', { movie: movie[0] })
})

//Query String 收尋
app.get('/search', (req, res) => {

    //找到movies裡title 對應到的keyword    
    const movies = movieList.results.filter((movie) => {
        return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
    })
    res.render('index', { movies: movies, keyword: req.query.keyword })
}) 

// start and listen on the Express server 啟動私服器
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
  })
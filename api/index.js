//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Videogame, Genre } = require('./src/db.js');
const axios = require('axios');
const { APIKEY } = process.env

// function principal(data) {

//   return {
//     id: data.id,
//     name: data.name,
//     genres: data.genres.map(g => g.name),
//     image: data.background_image
//   }
// }

function gameDetail(data) {
  return {
    id: data.id,
    name: data.name,
    genres: data.genres.map(g => g.name),
    image: data.background_image,
    description: data.description_raw,
    launchDate: data.released,
    rating: data.rating_top,
    platforms: data.platforms.map(p => p.platform.name)
  }
}

function genres(data) {
  return {
    id: data.id,
    name: data.name
  }
}

// https://api.rawg.io/api/games/${id}?key=${APIKEY}

server.get('/videogame/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      let allVideogames = await Videogame.findAll()
      let game = allVideogames.filter(g => g.id === id)
      if (game[0]) {
        res.json(game[0])
      } else {
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`)
          .then(r => {
            let g = gameDetail(r.data)
            res.json(g ? g : 'DONE')
          })
      }
    } else {
      let message = {message: 'send an id'}
      res.json(message)
    }
  } catch (error) {
    res.send(error)
  }

})

server.get('/videogames', async (req, res) => {

  const { name } = req.query
  let forName = []

  if (name) {

    try {
      let aux = await Videogame.findAll();
      let aux2 = aux.filter(e => e.name.includes(name));
      for (let i = 0; i < aux2.length; i++) {
        forName.push(aux2[i])
      }
      await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`)
        .then(r => {
          for (let i = 0; forName.length < 15; i++) {
            if (r.data.results[i]) {
              forName.push(gameDetail(r.data.results[i]))
            } else {
              break
            }
          }
        })
      res.json(forName ? forName : `no matches for: ${name}`)
    } catch (error) {
      res.json(error)
    }
  } else {
    try {
      let allPages = await Videogame.findAll();
      //inicializo mi variable con la url de la primer pagina
      let url = (`https://api.rawg.io/api/games?key=${APIKEY}`);

      while (allPages.length < 100) {
        await axios.get(url)
          .then(r => {
            url = r.data.next
            r.data.results.map(e => {
              return (allPages.push(gameDetail(e)))
            })
          })
      }

      res.json(allPages)


    } catch (error) {
      res.json(error);
    }
  }

});

server.get('/genres', async (req, res) => {
  try {
    await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`)
      .then(async r => {
        let gens = r.data.results.map(g => genres(g))
        res.json(gens)
      })
  } catch (error) {
    res.json(error)
  }
})

server.get('/platforms', async (req, res) => {

  try {
    await axios.get(`https://api.rawg.io/api/platforms?key=${APIKEY}`)
      .then(r => {
        let platforms = r.data.results.map(p => p.name)
        res.json(platforms)
      })

  } catch (error) {
    res.json(error)
  }

})

server.post('/videogames', async (req, res) => {
  const { name, description, launchDate, rating, platforms, image, genre } = req.body;

  try {
    var game = await Videogame.create({
      name: name,
      description: description,
      launchDate: launchDate,
      rating: rating,
      platforms: platforms,
      image: image,
      genre: genre,
    });

    let allGenres = await Genre.findAll({
      where: {
        name: genre
      }
    })

    let idGenres = allGenres.map(g => g.id)
    game.addGenre(idGenres)

    res.json(game)

  } catch (error) {
    res.json(error)
  }
})

// async function saveGenres() {

//   await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`)
//     .then(r => {
//       r.data.results.map(async (g) => {
//         await Genre.create({
//           id: g.id,
//           name: g.name,
//         })
//       })
//     })
// }

// saveGenres();

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('is listening at 3001'); // eslint-disable-line no-console
  });
});

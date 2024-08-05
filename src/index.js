const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const axios = require("axios");
// const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config();
// require("./config");
const api = require("./api");
// const authRoutes = require("./auth");
const middlewares = require("./middlewares");

const app = express();

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, //1day for authorized cookie
//     keys: [process.env.COOKIE_KEY],
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("👏👏👏👏👏👏 Mongo DB Atlas has been connected! 👏👏👏👏👏👏");
// });
// AIzaSyBoGacSo3I4Ns7Y756tGfw0YZueRclQZ8g google
//clientid 1090803691910-jmqgsf3e6u0rboqudlhdg28gc7b482di.apps.googleusercontent.com
//client-secret 4E6h8hGTNKocXYHqnudpZhiC
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});


///try

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
//getting token 
const getToken = async () => {
  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
    );
    const token = response.data.access_token;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "client-id": client_id,
      },
    };
      return token;
  } catch (error) {
      console.error('Error getting token', error);
      return null;
  }
};
//fetch 4 categories sterams 
const fetchStreams = async (token, category) => {
  try {
      const response = await axios.get('https://api.twitch.tv/helix/streams?first=5', {
          headers: {
            "client-id": client_id,
            'Authorization': `Bearer ${token}`
          },
          params: {
              game_id: category,
          }
      });
      return response.data.data;
  } catch (error) {
      console.error('Error fetching streams', error);
      return [];
  }
};
//fetch 8 Top games
const getTopGames = async (token, category) => {
  try {
      const response = await axios.get('https://api.twitch.tv/helix/games/top?first=8', {
          headers: {
            "client-id": client_id,
            'Authorization': `Bearer ${token}`
          },
      });
      return response.data.data;
  } catch (error) {
      console.error('Error fetching streams', error);
      return [];
  }
};

const fetchTopStreams = async (token, category)=>{
  try{
    const response = await axios.get('https://api.twitch.tv/helix/streams?first=2', {
      headers: {
        "client-id": client_id,
        'Authorization': `Bearer ${token}`
      },
      params: {
        game_id: category,
      }
    });
    
    return response.data.data;
  }catch(error){
    console.log("Error fetch top streams",error);
    return [];
  }
}


app.get('/streams', async (req, res) => {
  const token = await getToken();

  if (!token) {
      return res.status(500).json({ error: 'Failed to get token' });
  }

  const categories = {
      'Just Chatting': '509658',
      'Fortnite': '33214',
      'Fall Guys': '512980',
      'Minecraft': '27471'
  };

  const topGames = await getTopGames(token);
  const data = {
    topGames: {},
    categories: {}
  };

  for (const game of topGames) {
    data.topGames[game.name] = await fetchTopStreams(token,game.id);
  }

  for (const [category, id] of Object.entries(categories)) {
      data.categories[category] = await fetchStreams(token, id);
  }
  res.json(data);
}); 
///


app.use("/api/v1", api);
// app.use("/auth", authRoutes);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);



app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on ${process.env.PORT}...👀`);
});


module.exports = app;

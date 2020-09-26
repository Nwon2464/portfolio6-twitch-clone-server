const express = require("express");
const axios = require("axios");
const emojis = require("./emojis");
const _ = require("lodash");
// const Twitch = require("../schemas/twitch");
const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({
//     message: 'API - 👋🌎🌍🌏'
//   });
// });
//secret = 9dlqnz21f080c13zbajb908m8n4mb4

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
// let token = [];

router.get("/twitch", async (req, res, next) => {
  try {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
    );
    const token = response.data.access_token;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "client-id": client_id,
      },
    };

    if (token) {
      const getStreamsRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?first=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "client-id": client_id,
          },
        }
      );
      const newStreamsData = getStreamsRequest.data.data;
      // --------------------
      let allStreams = newStreamsData.slice();
      // console.log(allStreams);
      // console.log(b)
      // const aaa = await axios.get(
      //   "https://api.twitch.tv/helix/games/top",
      //   options
      // );
      // console.log(aaa.data.data);

      // "id": "39491526206",
      // "user_id": "26490481",
      // "user_name": "summit1g",
      // "game_id": "65632",

      // --------------------
      let URL1 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[0].user_id}`;
      let URL2 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[1].user_id}`;
      let URL3 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[2].user_id}`;
      let URL4 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[3].user_id}`;
      let URL5 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[4].user_id}`;

      let UserURL1 = `https://api.twitch.tv/helix/users?id=${newStreamsData[0].user_id}`;
      let UserURL2 = `https://api.twitch.tv/helix/users?id=${newStreamsData[1].user_id}`;
      let UserURL3 = `https://api.twitch.tv/helix/users?id=${newStreamsData[2].user_id}`;
      let UserURL4 = `https://api.twitch.tv/helix/users?id=${newStreamsData[3].user_id}`;
      let UserURL5 = `https://api.twitch.tv/helix/users?id=${newStreamsData[4].user_id}`;

      let UserTags1 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[0].user_id}`;
      let UserTags2 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[1].user_id}`;
      let UserTags3 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[2].user_id}`;
      let UserTags4 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[3].user_id}`;
      let UserTags5 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[4].user_id}`;

      // let UserTags9 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[8].user_id}`;
      // let UserTags10 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[9].user_id}`;

      const promise1 = axios.get(URL1, options);
      const promise2 = axios.get(URL2, options);
      const promise3 = axios.get(URL3, options);
      const promise4 = axios.get(URL4, options);
      const promise5 = axios.get(URL5, options);

      const promiseUser1 = axios.get(UserURL1, options);
      const promiseUser2 = axios.get(UserURL2, options);
      const promiseUser3 = axios.get(UserURL3, options);
      const promiseUser4 = axios.get(UserURL4, options);
      const promiseUser5 = axios.get(UserURL5, options);

      const promiseTag1 = axios.get(UserTags1, options);
      const promiseTag2 = axios.get(UserTags2, options);
      const promiseTag3 = axios.get(UserTags3, options);
      const promiseTag4 = axios.get(UserTags4, options);
      const promiseTag5 = axios.get(UserTags5, options);

      // const promiseTag9 = axios.get(UserTags9, options);
      // const promiseTag10 = axios.get(UserTags10, options);

      // await axios
      //   .all([promiseTag1, promiseTag2, promiseTag3, promiseTag4, promiseTag5])
      //   .then(
      //     axios.spread((...response) => {
      //       let a = [];
      //       response.map((data) =>
      //         a.push({
      //           tag: data.data.data.map((e) => e.tag_id),
      //           localization_names: data.data.data.map(
      //             (e) => e.localization_names["en-us"]
      //           ),
      //         })
      //       );

      //       console.log(a);
      //     })
      //   );

      // console.log(ll.data.data[0].localization_names["en-us"]);

      await axios
        .all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5,
          // promise6,
          // promise7,
          // promise8,

          promiseUser1,
          promiseUser2,
          promiseUser3,
          promiseUser4,
          promiseUser5,
          // promiseUser6,
          // promiseUser7,
          // promiseUser8,

          promiseTag1,
          promiseTag2,
          promiseTag3,
          promiseTag4,
          promiseTag5,
          // promiseTag6,
          // promiseTag7,
          // promiseTag8,
          // promiseTag10,
        ])
        .then(
          axios.spread((...response) => {
            let gameName = [];
            let imageUrl = [];
            let tags = [];

            response.map((data, i) => {
              tags.push({
                tag: data.data.data.map((e) => e.tag_id),
                localization_names: data.data.data.map(
                  (e) => e.localization_names
                ),
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("profile_image_url")) {
                  // console.log(res);
                  imageUrl.push({
                    description: res["description"],
                    profile_image_url: res["profile_image_url"],
                  });
                }
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("game_id")) {
                  // console.log(res);
                  gameName.push({ game_name: res.game_name });
                }
              });
            });
            const filterTags = tags.filter((e, i) => e.tag[0] !== undefined);

            _.merge(allStreams, filterTags);
            _.merge(allStreams, imageUrl);
            _.merge(allStreams, gameName);

            allStreams.map((e) => {
              if (e.localization_names.length !== 0) {
                e.localization_names.map((e) => {
                  // console.log(e["en-us"]);
                });
              }
            });
            res.send(
              // getStreams: getStreamsRequest.data.data,
              // getGameName: gameName,
              // getUsers: imageUrl,
              // getTags: filterTags,
              allStreams
            );
          })
        );
    }
  } catch (error) {
    next(error);
  }
});

router.get("/twitch/topgames", async (req, res) => {
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

    if (token) {
      const getStreamsRequest = await axios.get(
        "https://api.twitch.tv/helix/games/top?first=8",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "client-id": client_id,
          },
        }
      );

      const newStreamsData = getStreamsRequest.data.data;
      // --------------------

      // console.log(newStreamsData);

      let allStreams = newStreamsData.slice();
      let URL1 = `https://api.twitch.tv/helix/streams?game_id=${newStreamsData[0].id}`;
      let URL2 = `https://api.twitch.tv/helix/streams?game_id=${newStreamsData[1].id}`;
      let URL3 = `https://api.twitch.tv/helix/streams?game_id=${newStreamsData[2].id}`;
      let URL4 = `https://api.twitch.tv/helix/streams?game_id=${newStreamsData[3].id}`;
      let URL5 = `https://api.twitch.tv/helix/streams?game_id=${newStreamsData[4].id}`;
      let URL6 = `https://api.twitch.tv/helix/streams?game_id=${newStreamsData[5].id}`;
      let URL7 = `https://api.twitch.tv/helix/streams?game_id=${newStreamsData[6].id}`;
      let URL8 = `https://api.twitch.tv/helix/streams?game_id=${newStreamsData[7].id}`;

      const promise1 = axios.get(URL1, options);
      const promise2 = axios.get(URL2, options);
      const promise3 = axios.get(URL3, options);
      const promise4 = axios.get(URL4, options);
      const promise5 = axios.get(URL5, options);
      const promise6 = axios.get(URL6, options);
      const promise7 = axios.get(URL7, options);
      const promise8 = axios.get(URL8, options);

      await axios
        .all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5,
          promise6,
          promise7,
          promise8,
        ])
        .then(
          axios.spread((...response) => {
            let gameViewers = [];
            response.map((data, i) => {
              // console.log(data.data);
              gameViewers.push({
                gameViewers: data.data.data
                  .map((e) => e.viewer_count)
                  .reduce((acc, cur) => acc + cur, 0),
              });
            });
            _.merge(allStreams, gameViewers);

            res.send(allStreams);
          })
        );
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/twitch/streams", async (req, res) => {
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

    if (token) {
      const getStreamsRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?first=8",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "client-id": client_id,
          },
        }
      );

      // const { data } = getStreamsRequest.data;

      const newStreamsData = getStreamsRequest.data.data;
      // --------------------
      let allStreams = newStreamsData.slice();
      // console.log(allStreams);

      let URL1 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[0].user_id}`;
      let URL2 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[1].user_id}`;
      let URL3 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[2].user_id}`;
      let URL4 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[3].user_id}`;
      let URL5 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[4].user_id}`;

      let URL6 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[5].user_id}`;
      let URL7 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[6].user_id}`;
      let URL8 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[7].user_id}`;

      let UserURL1 = `https://api.twitch.tv/helix/users?id=${newStreamsData[0].user_id}`;
      let UserURL2 = `https://api.twitch.tv/helix/users?id=${newStreamsData[1].user_id}`;
      let UserURL3 = `https://api.twitch.tv/helix/users?id=${newStreamsData[2].user_id}`;
      let UserURL4 = `https://api.twitch.tv/helix/users?id=${newStreamsData[3].user_id}`;
      let UserURL5 = `https://api.twitch.tv/helix/users?id=${newStreamsData[4].user_id}`;
      let UserURL6 = `https://api.twitch.tv/helix/users?id=${newStreamsData[5].user_id}`;
      let UserURL7 = `https://api.twitch.tv/helix/users?id=${newStreamsData[6].user_id}`;
      let UserURL8 = `https://api.twitch.tv/helix/users?id=${newStreamsData[7].user_id}`;

      let UserTags1 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[0].user_id}`;
      let UserTags2 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[1].user_id}`;
      let UserTags3 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[2].user_id}`;
      let UserTags4 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[3].user_id}`;
      let UserTags5 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[4].user_id}`;

      let UserTags6 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[5].user_id}`;
      let UserTags7 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[6].user_id}`;
      let UserTags8 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[7].user_id}`;

      const promise1 = axios.get(URL1, options);
      const promise2 = axios.get(URL2, options);
      const promise3 = axios.get(URL3, options);
      const promise4 = axios.get(URL4, options);
      const promise5 = axios.get(URL5, options);
      const promise6 = axios.get(URL6, options);
      const promise7 = axios.get(URL7, options);
      const promise8 = axios.get(URL8, options);

      const promiseUser1 = axios.get(UserURL1, options);
      const promiseUser2 = axios.get(UserURL2, options);
      const promiseUser3 = axios.get(UserURL3, options);
      const promiseUser4 = axios.get(UserURL4, options);
      const promiseUser5 = axios.get(UserURL5, options);
      const promiseUser6 = axios.get(UserURL6, options);
      const promiseUser7 = axios.get(UserURL7, options);
      const promiseUser8 = axios.get(UserURL8, options);

      const promiseTag1 = axios.get(UserTags1, options);
      const promiseTag2 = axios.get(UserTags2, options);
      const promiseTag3 = axios.get(UserTags3, options);
      const promiseTag4 = axios.get(UserTags4, options);
      const promiseTag5 = axios.get(UserTags5, options);
      const promiseTag6 = axios.get(UserTags6, options);
      const promiseTag7 = axios.get(UserTags7, options);
      const promiseTag8 = axios.get(UserTags8, options);

      await axios
        .all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5,
          promise6,
          promise7,
          promise8,

          promiseUser1,
          promiseUser2,
          promiseUser3,
          promiseUser4,
          promiseUser5,
          promiseUser6,
          promiseUser7,
          promiseUser8,

          promiseTag1,
          promiseTag2,
          promiseTag3,
          promiseTag4,
          promiseTag5,
          promiseTag6,
          promiseTag7,
          promiseTag8,
          // promiseTag10,
        ])
        .then(
          axios.spread((...response) => {
            let gameName = [];
            let imageUrl = [];
            let tags = [];

            response.map((data, i) => {
              tags.push({
                tag: data.data.data.map((e) => e.tag_id),
                localization_names: data.data.data.map(
                  (e) => e.localization_names
                ),
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("profile_image_url")) {
                  // console.log(res);
                  imageUrl.push({
                    description: res["description"],
                    profile_image_url: res["profile_image_url"],
                  });
                }
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("game_id")) {
                  // console.log(res);
                  gameName.push({ game_name: res.game_name });
                }
              });
            });
            const filterTags = tags.filter((e, i) => e.tag[0] !== undefined);

            _.merge(allStreams, filterTags);
            _.merge(allStreams, imageUrl);
            _.merge(allStreams, gameName);

            allStreams.map((e) => {
              if (e.localization_names.length !== 0) {
                e.localization_names.map((e) => {});
              }
            });
            res.send(allStreams);
          })
        );
    }
  } catch (error) {
    console.log(error);
  }
});
// router.post("/twitch", async (req, res) => {
//   try {
//     console.log(req.body);
//     const response = await axios.get(
//       "https://api.twitch.tv/helix/users?id=44322889",
//       {
//         headers: {
//           Authorization: "Bearer " + req.body.data,
//           client_id,
//         },
//       }
//     );
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/twitch/minecraft", async (req, res) => {
  // 509658
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

    if (token) {
      const getStreamsRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?game_id=27471&first=9",
        options
      );

      const newStreamsData = getStreamsRequest.data.data;
      // --------------------
      let allStreams = newStreamsData.slice();

      let URL1 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[0].user_id}`;
      let URL2 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[1].user_id}`;
      let URL3 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[2].user_id}`;
      let URL4 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[3].user_id}`;
      let URL5 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[4].user_id}`;

      let URL6 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[5].user_id}`;
      let URL7 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[6].user_id}`;
      let URL8 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[7].user_id}`;

      let UserURL1 = `https://api.twitch.tv/helix/users?id=${newStreamsData[0].user_id}`;
      let UserURL2 = `https://api.twitch.tv/helix/users?id=${newStreamsData[1].user_id}`;
      let UserURL3 = `https://api.twitch.tv/helix/users?id=${newStreamsData[2].user_id}`;
      let UserURL4 = `https://api.twitch.tv/helix/users?id=${newStreamsData[3].user_id}`;
      let UserURL5 = `https://api.twitch.tv/helix/users?id=${newStreamsData[4].user_id}`;
      let UserURL6 = `https://api.twitch.tv/helix/users?id=${newStreamsData[5].user_id}`;
      let UserURL7 = `https://api.twitch.tv/helix/users?id=${newStreamsData[6].user_id}`;
      let UserURL8 = `https://api.twitch.tv/helix/users?id=${newStreamsData[7].user_id}`;

      let UserTags1 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[0].user_id}`;
      let UserTags2 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[1].user_id}`;
      let UserTags3 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[2].user_id}`;
      let UserTags4 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[3].user_id}`;
      let UserTags5 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[4].user_id}`;

      let UserTags6 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[5].user_id}`;
      let UserTags7 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[6].user_id}`;
      let UserTags8 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[7].user_id}`;

      const promise1 = axios.get(URL1, options);
      const promise2 = axios.get(URL2, options);
      const promise3 = axios.get(URL3, options);
      const promise4 = axios.get(URL4, options);
      const promise5 = axios.get(URL5, options);
      const promise6 = axios.get(URL6, options);
      const promise7 = axios.get(URL7, options);
      const promise8 = axios.get(URL8, options);

      const promiseUser1 = axios.get(UserURL1, options);
      const promiseUser2 = axios.get(UserURL2, options);
      const promiseUser3 = axios.get(UserURL3, options);
      const promiseUser4 = axios.get(UserURL4, options);
      const promiseUser5 = axios.get(UserURL5, options);
      const promiseUser6 = axios.get(UserURL6, options);
      const promiseUser7 = axios.get(UserURL7, options);
      const promiseUser8 = axios.get(UserURL8, options);

      const promiseTag1 = axios.get(UserTags1, options);
      const promiseTag2 = axios.get(UserTags2, options);
      const promiseTag3 = axios.get(UserTags3, options);
      const promiseTag4 = axios.get(UserTags4, options);
      const promiseTag5 = axios.get(UserTags5, options);
      const promiseTag6 = axios.get(UserTags6, options);
      const promiseTag7 = axios.get(UserTags7, options);
      const promiseTag8 = axios.get(UserTags8, options);

      await axios
        .all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5,
          promise6,
          promise7,
          promise8,

          promiseUser1,
          promiseUser2,
          promiseUser3,
          promiseUser4,
          promiseUser5,
          promiseUser6,
          promiseUser7,
          promiseUser8,

          promiseTag1,
          promiseTag2,
          promiseTag3,
          promiseTag4,
          promiseTag5,
          promiseTag6,
          promiseTag7,
          promiseTag8,
          // promiseTag10,
        ])
        .then(
          axios.spread((...response) => {
            let gameName = [];
            let imageUrl = [];
            let tags = [];

            response.map((data, i) => {
              tags.push({
                tag: data.data.data.map((e) => e.tag_id),
                localization_names: data.data.data.map(
                  (e) => e.localization_names
                ),
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("profile_image_url")) {
                  // console.log(res);
                  imageUrl.push({
                    profile_image_url: res["profile_image_url"],
                  });
                }
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("game_id")) {
                  // console.log(res);
                  gameName.push({ game_name: res.game_name });
                }
              });
            });
            const filterTags = tags.filter((e, i) => e.tag[0] !== undefined);

            _.merge(allStreams, filterTags);
            _.merge(allStreams, imageUrl);
            _.merge(allStreams, gameName);

            res.send(allStreams);
          })
        );
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/twitch/fortnite", async (req, res) => {
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

    if (token) {
      const getStreamsRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?game_id=33214&first=8",
        options
      );

      const newStreamsData = getStreamsRequest.data.data;
      // --------------------
      let allStreams = newStreamsData.slice();
      // console.log(allStreams);

      let URL1 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[0].user_id}`;
      let URL2 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[1].user_id}`;
      let URL3 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[2].user_id}`;
      let URL4 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[3].user_id}`;
      let URL5 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[4].user_id}`;

      let URL6 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[5].user_id}`;
      let URL7 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[6].user_id}`;
      let URL8 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[7].user_id}`;

      let UserURL1 = `https://api.twitch.tv/helix/users?id=${newStreamsData[0].user_id}`;
      let UserURL2 = `https://api.twitch.tv/helix/users?id=${newStreamsData[1].user_id}`;
      let UserURL3 = `https://api.twitch.tv/helix/users?id=${newStreamsData[2].user_id}`;
      let UserURL4 = `https://api.twitch.tv/helix/users?id=${newStreamsData[3].user_id}`;
      let UserURL5 = `https://api.twitch.tv/helix/users?id=${newStreamsData[4].user_id}`;
      let UserURL6 = `https://api.twitch.tv/helix/users?id=${newStreamsData[5].user_id}`;
      let UserURL7 = `https://api.twitch.tv/helix/users?id=${newStreamsData[6].user_id}`;
      let UserURL8 = `https://api.twitch.tv/helix/users?id=${newStreamsData[7].user_id}`;

      let UserTags1 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[0].user_id}`;
      let UserTags2 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[1].user_id}`;
      let UserTags3 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[2].user_id}`;
      let UserTags4 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[3].user_id}`;
      let UserTags5 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[4].user_id}`;

      let UserTags6 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[5].user_id}`;
      let UserTags7 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[6].user_id}`;
      let UserTags8 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[7].user_id}`;

      const promise1 = axios.get(URL1, options);
      const promise2 = axios.get(URL2, options);
      const promise3 = axios.get(URL3, options);
      const promise4 = axios.get(URL4, options);
      const promise5 = axios.get(URL5, options);
      const promise6 = axios.get(URL6, options);
      const promise7 = axios.get(URL7, options);
      const promise8 = axios.get(URL8, options);

      const promiseUser1 = axios.get(UserURL1, options);
      const promiseUser2 = axios.get(UserURL2, options);
      const promiseUser3 = axios.get(UserURL3, options);
      const promiseUser4 = axios.get(UserURL4, options);
      const promiseUser5 = axios.get(UserURL5, options);
      const promiseUser6 = axios.get(UserURL6, options);
      const promiseUser7 = axios.get(UserURL7, options);
      const promiseUser8 = axios.get(UserURL8, options);

      const promiseTag1 = axios.get(UserTags1, options);
      const promiseTag2 = axios.get(UserTags2, options);
      const promiseTag3 = axios.get(UserTags3, options);
      const promiseTag4 = axios.get(UserTags4, options);
      const promiseTag5 = axios.get(UserTags5, options);
      const promiseTag6 = axios.get(UserTags6, options);
      const promiseTag7 = axios.get(UserTags7, options);
      const promiseTag8 = axios.get(UserTags8, options);

      await axios
        .all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5,
          promise6,
          promise7,
          promise8,

          promiseUser1,
          promiseUser2,
          promiseUser3,
          promiseUser4,
          promiseUser5,
          promiseUser6,
          promiseUser7,
          promiseUser8,

          promiseTag1,
          promiseTag2,
          promiseTag3,
          promiseTag4,
          promiseTag5,
          promiseTag6,
          promiseTag7,
          promiseTag8,
          // promiseTag10,
        ])
        .then(
          axios.spread((...response) => {
            let gameName = [];
            let imageUrl = [];
            let tags = [];

            response.map((data, i) => {
              tags.push({
                tag: data.data.data.map((e) => e.tag_id),
                localization_names: data.data.data.map(
                  (e) => e.localization_names
                ),
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("profile_image_url")) {
                  imageUrl.push({
                    profile_image_url: res["profile_image_url"],
                  });
                }
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("game_id")) {
                  gameName.push({ game_name: res.game_name });
                }
              });
            });
            const filterTags = tags.filter((e, i) => e.tag[0] !== undefined);

            _.merge(allStreams, filterTags);
            _.merge(allStreams, imageUrl);
            _.merge(allStreams, gameName);

            allStreams.map((e) => {
              if (e.localization_names.length !== 0) {
                e.localization_names.map((e) => {});
              }
            });
            res.send(allStreams);
          })
        );
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/twitch/chat", async (req, res) => {
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

    if (token) {
      const getStreamsRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?game_id=509658&first=8",
        options
      );

      const newStreamsData = getStreamsRequest.data.data;
      // --------------------
      let allStreams = newStreamsData.slice();
      // console.log(allStreams);

      let URL1 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[0].user_id}`;
      let URL2 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[1].user_id}`;
      let URL3 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[2].user_id}`;
      let URL4 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[3].user_id}`;
      let URL5 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[4].user_id}`;

      let URL6 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[5].user_id}`;
      let URL7 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[6].user_id}`;
      let URL8 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[7].user_id}`;

      let UserURL1 = `https://api.twitch.tv/helix/users?id=${newStreamsData[0].user_id}`;
      let UserURL2 = `https://api.twitch.tv/helix/users?id=${newStreamsData[1].user_id}`;
      let UserURL3 = `https://api.twitch.tv/helix/users?id=${newStreamsData[2].user_id}`;
      let UserURL4 = `https://api.twitch.tv/helix/users?id=${newStreamsData[3].user_id}`;
      let UserURL5 = `https://api.twitch.tv/helix/users?id=${newStreamsData[4].user_id}`;
      let UserURL6 = `https://api.twitch.tv/helix/users?id=${newStreamsData[5].user_id}`;
      let UserURL7 = `https://api.twitch.tv/helix/users?id=${newStreamsData[6].user_id}`;
      let UserURL8 = `https://api.twitch.tv/helix/users?id=${newStreamsData[7].user_id}`;

      let UserTags1 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[0].user_id}`;
      let UserTags2 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[1].user_id}`;
      let UserTags3 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[2].user_id}`;
      let UserTags4 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[3].user_id}`;
      let UserTags5 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[4].user_id}`;

      let UserTags6 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[5].user_id}`;
      let UserTags7 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[6].user_id}`;
      let UserTags8 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[7].user_id}`;

      const promise1 = axios.get(URL1, options);
      const promise2 = axios.get(URL2, options);
      const promise3 = axios.get(URL3, options);
      const promise4 = axios.get(URL4, options);
      const promise5 = axios.get(URL5, options);
      const promise6 = axios.get(URL6, options);
      const promise7 = axios.get(URL7, options);
      const promise8 = axios.get(URL8, options);

      const promiseUser1 = axios.get(UserURL1, options);
      const promiseUser2 = axios.get(UserURL2, options);
      const promiseUser3 = axios.get(UserURL3, options);
      const promiseUser4 = axios.get(UserURL4, options);
      const promiseUser5 = axios.get(UserURL5, options);
      const promiseUser6 = axios.get(UserURL6, options);
      const promiseUser7 = axios.get(UserURL7, options);
      const promiseUser8 = axios.get(UserURL8, options);

      const promiseTag1 = axios.get(UserTags1, options);
      const promiseTag2 = axios.get(UserTags2, options);
      const promiseTag3 = axios.get(UserTags3, options);
      const promiseTag4 = axios.get(UserTags4, options);
      const promiseTag5 = axios.get(UserTags5, options);
      const promiseTag6 = axios.get(UserTags6, options);
      const promiseTag7 = axios.get(UserTags7, options);
      const promiseTag8 = axios.get(UserTags8, options);

      await axios
        .all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5,
          promise6,
          promise7,
          promise8,

          promiseUser1,
          promiseUser2,
          promiseUser3,
          promiseUser4,
          promiseUser5,
          promiseUser6,
          promiseUser7,
          promiseUser8,

          promiseTag1,
          promiseTag2,
          promiseTag3,
          promiseTag4,
          promiseTag5,
          promiseTag6,
          promiseTag7,
          promiseTag8,
          // promiseTag10,
        ])
        .then(
          axios.spread((...response) => {
            let gameName = [];
            let imageUrl = [];
            let tags = [];

            response.map((data, i) => {
              tags.push({
                tag: data.data.data.map((e) => e.tag_id),
                localization_names: data.data.data.map(
                  (e) => e.localization_names
                ),
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("profile_image_url")) {
                  imageUrl.push({
                    profile_image_url: res["profile_image_url"],
                  });
                }
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("game_id")) {
                  gameName.push({ game_name: res.game_name });
                }
              });
            });
            const filterTags = tags.filter((e, i) => e.tag[0] !== undefined);

            _.merge(allStreams, filterTags);
            _.merge(allStreams, imageUrl);
            _.merge(allStreams, gameName);

            allStreams.map((e) => {
              if (e.localization_names.length !== 0) {
                e.localization_names.map((e) => {});
              }
            });
            res.send(allStreams);
          })
        );
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/twitch/fallguys", async (req, res) => {
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

    if (token) {
      const getStreamsRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?game_id=512980&first=8",
        options
      );

      const newStreamsData = getStreamsRequest.data.data;
      // --------------------
      let allStreams = newStreamsData.slice();
      // console.log(allStreams);

      let URL1 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[0].user_id}`;
      let URL2 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[1].user_id}`;
      let URL3 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[2].user_id}`;
      let URL4 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[3].user_id}`;
      let URL5 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[4].user_id}`;

      let URL6 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[5].user_id}`;
      let URL7 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[6].user_id}`;
      let URL8 = `https://api.twitch.tv/helix/channels?broadcaster_id=${newStreamsData[7].user_id}`;

      let UserURL1 = `https://api.twitch.tv/helix/users?id=${newStreamsData[0].user_id}`;
      let UserURL2 = `https://api.twitch.tv/helix/users?id=${newStreamsData[1].user_id}`;
      let UserURL3 = `https://api.twitch.tv/helix/users?id=${newStreamsData[2].user_id}`;
      let UserURL4 = `https://api.twitch.tv/helix/users?id=${newStreamsData[3].user_id}`;
      let UserURL5 = `https://api.twitch.tv/helix/users?id=${newStreamsData[4].user_id}`;
      let UserURL6 = `https://api.twitch.tv/helix/users?id=${newStreamsData[5].user_id}`;
      let UserURL7 = `https://api.twitch.tv/helix/users?id=${newStreamsData[6].user_id}`;
      let UserURL8 = `https://api.twitch.tv/helix/users?id=${newStreamsData[7].user_id}`;

      let UserTags1 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[0].user_id}`;
      let UserTags2 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[1].user_id}`;
      let UserTags3 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[2].user_id}`;
      let UserTags4 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[3].user_id}`;
      let UserTags5 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[4].user_id}`;

      let UserTags6 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[5].user_id}`;
      let UserTags7 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[6].user_id}`;
      let UserTags8 = `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${newStreamsData[7].user_id}`;

      const promise1 = axios.get(URL1, options);
      const promise2 = axios.get(URL2, options);
      const promise3 = axios.get(URL3, options);
      const promise4 = axios.get(URL4, options);
      const promise5 = axios.get(URL5, options);
      const promise6 = axios.get(URL6, options);
      const promise7 = axios.get(URL7, options);
      const promise8 = axios.get(URL8, options);

      const promiseUser1 = axios.get(UserURL1, options);
      const promiseUser2 = axios.get(UserURL2, options);
      const promiseUser3 = axios.get(UserURL3, options);
      const promiseUser4 = axios.get(UserURL4, options);
      const promiseUser5 = axios.get(UserURL5, options);
      const promiseUser6 = axios.get(UserURL6, options);
      const promiseUser7 = axios.get(UserURL7, options);
      const promiseUser8 = axios.get(UserURL8, options);

      const promiseTag1 = axios.get(UserTags1, options);
      const promiseTag2 = axios.get(UserTags2, options);
      const promiseTag3 = axios.get(UserTags3, options);
      const promiseTag4 = axios.get(UserTags4, options);
      const promiseTag5 = axios.get(UserTags5, options);
      const promiseTag6 = axios.get(UserTags6, options);
      const promiseTag7 = axios.get(UserTags7, options);
      const promiseTag8 = axios.get(UserTags8, options);

      await axios
        .all([
          promise1,
          promise2,
          promise3,
          promise4,
          promise5,
          promise6,
          promise7,
          promise8,

          promiseUser1,
          promiseUser2,
          promiseUser3,
          promiseUser4,
          promiseUser5,
          promiseUser6,
          promiseUser7,
          promiseUser8,

          promiseTag1,
          promiseTag2,
          promiseTag3,
          promiseTag4,
          promiseTag5,
          promiseTag6,
          promiseTag7,
          promiseTag8,
          // promiseTag10,
        ])
        .then(
          axios.spread((...response) => {
            let gameName = [];
            let imageUrl = [];
            let tags = [];

            response.map((data, i) => {
              tags.push({
                tag: data.data.data.map((e) => e.tag_id),
                localization_names: data.data.data.map(
                  (e) => e.localization_names
                ),
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("profile_image_url")) {
                  imageUrl.push({
                    profile_image_url: res["profile_image_url"],
                  });
                }
              });
              data.data.data.map((res) => {
                if (res.hasOwnProperty("game_id")) {
                  gameName.push({ game_name: res.game_name });
                }
              });
            });
            const filterTags = tags.filter((e, i) => e.tag[0] !== undefined);

            _.merge(allStreams, filterTags);
            _.merge(allStreams, imageUrl);
            _.merge(allStreams, gameName);

            res.send(allStreams);
          })
        );
    }
  } catch (error) {
    console.log(error);
  }
});

// router.use("/emojis", emojis);

router.get("/twitch/streams/:id", async (req, res) => {
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

    if (token) {
      const getStreamsRequest = await axios.get(
        `https://api.twitch.tv/helix/streams?game_id=${req.params.id}&first=50`,
        options
      );

      const getTopGames = await axios.get(
        `https://api.twitch.tv/helix/games?id=${req.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "client-id": client_id,
          },
        }
      );

      const topGames = getTopGames.data.data;
      const sliced = getStreamsRequest.data.data.slice();
      const totalViews = getStreamsRequest.data.data
        .map((el) => el.viewer_count)
        .reduce((acc, curr) => {
          return acc + curr;
        });
      //
      const profileImage = getStreamsRequest.data.data.slice();
      console.log(topGames);
      let vr = profileImage.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/users?id=${e.user_id}`,
          options
        );
      });

      let imageResult = await axios.all(vr);
      let ta2 = [];
      imageResult.map((e) => {
        e.data.data.map((e) => {
          ta2.push({
            profile_image_url: e.profile_image_url,
            userTotalChannelViewCount: e.view_count,
            description: e.description,
          });
        });
      });
      // console.log(ta2);
      _.merge(sliced, ta2);
      //
      // let tags = [];
      let ar = getStreamsRequest.data.data.map((data) => {
        // console.log("------------>",data.tag_ids[0]);
        return axios.get(
          `https://api.twitch.tv/helix/tags/streams?tag_id=${data.tag_ids[0]}`,
          options
        );
      });
      let result = await axios.all(ar);
      let ta = [];
      result.map((e) => {
        e.data.data.map((e) => {
          ta.push({ tag: e.localization_names["en-us"] });
        });
      });
      _.merge(sliced, ta);
      res.json({ selectedGame: topGames, totalViews, streams: sliced });
    }
  } catch (e) {
    console.log(e);
  }
});
router.get("/twitch/streams/user/:id", async (req, res) => {
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

    if (token) {
      const getStreamsRequest = await axios.get(
        `https://api.twitch.tv/helix/videos?user_id=${req.params.id}&first=50`,
        options
      );

      // console.log(getStreamsRequest.data.data);
      // const getTopGames = await axios.get(
      //   `https://api.twitch.tv/helix/videos?id=${req.params.id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "client-id": client_id,
      //     },
      //   }
      // );
      res.json({ streams: getStreamsRequest.data.data });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/twitch/categories/all", async (req, res) => {
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

    if (token) {
      const getStreamsRequest = await axios.get(
        `https://api.twitch.tv/helix/games/top?first=50`,
        options
      );
      let topGames = getStreamsRequest.data.data.slice();
      res.json({ topGames });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
// /twitch/streams/req.params

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
            console.log(allStreams);
            res.send(allStreams);
          })
        );
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/twitch/streams/contents", async (req, res) => {
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
      const getJustChatRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?game_id=509658&first=8",
        options
      );

      const getFortNiteRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?game_id=33214&first=8",
        options
      );
      const getFallGuyRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?game_id=512980&first=8",
        options
      );
      const getMineCraftRequest = await axios.get(
        "https://api.twitch.tv/helix/streams?game_id=27471&first=9",
        options
      );
      const newJustChatRequest = getJustChatRequest.data.data.slice();

      const newFortNiteRequest = getFortNiteRequest.data.data.slice();
      const newFallGuyRequest = getFallGuyRequest.data.data.slice();
      const newMineCraftRequest = getMineCraftRequest.data.data.slice();

      let justChatStreams = newJustChatRequest.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/channels?broadcaster_id=${e.user_id}`,
          options
        );
      });

      let empty_just_chat = [];
      //
      let justChatFetched = await axios.all(justChatStreams);
      justChatFetched.map((e) => {
        e.data.data.map((e) => {
          empty_just_chat.push({ game_name: e.game_name });
        });
      });

      //justCHAT IMAGEURL FOLLWERS DESCRI
      let just_chat_profile_image_url_and_followers_andDescriptions = newJustChatRequest.map(
        (e) => {
          return axios.get(
            `https://api.twitch.tv/helix/users?id=${e.user_id}`,
            options
          );
        }
      );

      let empty_just_chat_profile_image_url_and_followers_andDescriptions = [];
      let just_chat_profile_image_url_and_followers_andDescriptionsFetched = await axios.all(
        just_chat_profile_image_url_and_followers_andDescriptions
      );
      just_chat_profile_image_url_and_followers_andDescriptionsFetched.map(
        (e) => {
          e.data.data.map((e) => {
            // console.log(e);
            empty_just_chat_profile_image_url_and_followers_andDescriptions.push(
              {
                description: e.description,
                profile_image_url: e.profile_image_url,
                followers: e.view_count,
              }
            );
          });
        }
      );
      //justchat TAGs
      let just_chat_tags = newJustChatRequest.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_just_chat_tag = [];
      //
      let just_chat_tags_fetched = await axios.all(just_chat_tags);
      just_chat_tags_fetched.map((e) => {
        empty_just_chat_tag.push({
          localization_names: e.data.data.map(
            (e) => e.localization_names["en-us"]
          ),
        });
      });

      let fortNiteStreams = newFortNiteRequest.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/channels?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_fortNite_streams = [];
      //
      let fortNiteStreams_fetched = await axios.all(fortNiteStreams);
      fortNiteStreams_fetched.map((e) => {
        e.data.data.map((e) => {
          empty_fortNite_streams.push({
            game_name: e.game_name,
          });
        });
      });
      //image followers dscription
      let fortNiteStreams_image_followers_description = newFortNiteRequest.map(
        (e) => {
          return axios.get(
            `https://api.twitch.tv/helix/users?id=${e.user_id}`,
            options
          );
        }
      );
      let empty_fortNiteStreams_image_followers_description = [];
      //
      let fortNiteStreams_image_followers_description_fetched = await axios.all(
        fortNiteStreams_image_followers_description
      );
      fortNiteStreams_image_followers_description_fetched.map((e) => {
        e.data.data.map((e) => {
          empty_fortNiteStreams_image_followers_description.push({
            description: e.description,
            profile_image_url: e.profile_image_url,
            followers: e.view_count,
          });
        });
      });

      //tags
      let fortNite_tags = newFortNiteRequest.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_fortNite_tags = [];
      //
      let fortNite_tags_fetched = await axios.all(fortNite_tags);
      fortNite_tags_fetched.map((e) => {
        empty_fortNite_tags.push({
          localization_names: e.data.data.map(
            (e) => e.localization_names["en-us"]
          ),
        });
      });

      ////////////////////////////////////////////////
      //Fallguy streams

      let FallGuyStreams = newFallGuyRequest.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/channels?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_FallGuyStreams = [];
      //
      let FallGuyStreams_fetched = await axios.all(FallGuyStreams);
      FallGuyStreams_fetched.map((e) => {
        e.data.data.map((e) => {
          empty_FallGuyStreams.push({
            game_name: e.game_name,
          });
        });
      });

      //
      let fallGuyStreams_image_followers_description = newFallGuyRequest.map(
        (e) => {
          return axios.get(
            `https://api.twitch.tv/helix/users?id=${e.user_id}`,
            options
          );
        }
      );
      let empty_fallGuyStreams_image_followers_description = [];
      //
      let fallGuyStreams_image_followers_description_fetched = await axios.all(
        fallGuyStreams_image_followers_description
      );
      fallGuyStreams_image_followers_description_fetched.map((e) => {
        e.data.data.map((e) => {
          empty_fallGuyStreams_image_followers_description.push({
            description: e.description,
            profile_image_url: e.profile_image_url,
            followers: e.view_count,
          });
        });
      });
      let fallGuy_tags = newFallGuyRequest.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_fallGuy_tag = [];
      //
      let fallGuy_tags_fetched = await axios.all(fallGuy_tags);
      fallGuy_tags_fetched.map((e) => {
        empty_fallGuy_tag.push({
          localization_names: e.data.data.map(
            (e) => e.localization_names["en-us"]
          ),
        });
      });

      ////////////////////////////////////////

      let minCraftStreams = newMineCraftRequest.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/channels?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_minCraftStreams = [];
      //
      let minCraftStreams_fetched = await axios.all(minCraftStreams);
      minCraftStreams_fetched.map((e) => {
        e.data.data.map((e) => {
          empty_minCraftStreams.push({
            game_name: e.game_name,
          });
        });
      });

      //
      let minCraft_image_followers_and_description = newMineCraftRequest.map(
        (e) => {
          return axios.get(
            `https://api.twitch.tv/helix/users?id=${e.user_id}`,
            options
          );
        }
      );
      let empty_minCraft_image_followers_and_description = [];
      //
      let minCraft_image_followers_and_description_fetched = await axios.all(
        minCraft_image_followers_and_description
      );
      minCraft_image_followers_and_description_fetched.map((e) => {
        e.data.data.map((e) => {
          empty_minCraft_image_followers_and_description.push({
            description: e.description,
            profile_image_url: e.profile_image_url,
            followers: e.view_count,
          });
        });
      });
      //
      let mineCraft_tags = newMineCraftRequest.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_mineCraft_tags = [];
      //
      let mineCraft_tags_fetched = await axios.all(mineCraft_tags);
      mineCraft_tags_fetched.map((e) => {
        empty_mineCraft_tags.push({
          localization_names: e.data.data.map(
            (e) => e.localization_names["en-us"]
          ),
        });
      });

      _.merge(newJustChatRequest, empty_just_chat);
      _.merge(newJustChatRequest, empty_just_chat_tag);
      _.merge(
        newJustChatRequest,
        empty_just_chat_profile_image_url_and_followers_andDescriptions
      );

      //      newFortNiteRequest newMineCraftRequest newFallGuyRequest
      _.merge(newMineCraftRequest, empty_minCraftStreams);
      _.merge(
        newMineCraftRequest,
        empty_minCraft_image_followers_and_description
      );
      _.merge(newMineCraftRequest, empty_mineCraft_tags);

      //
      _.merge(newFallGuyRequest, empty_FallGuyStreams);
      _.merge(
        newFallGuyRequest,
        empty_fallGuyStreams_image_followers_description
      );
      _.merge(newFallGuyRequest, empty_fallGuy_tag);
      //
      _.merge(newFortNiteRequest, empty_fortNite_streams);
      _.merge(
        newFortNiteRequest,
        empty_fortNiteStreams_image_followers_description
      );
      _.merge(newFortNiteRequest, empty_fortNite_tags);

      res.send({
        frontPage: {
          justChat: newJustChatRequest,
          fallGuy: newFallGuyRequest,
          fortNite: newFortNiteRequest,
          mineCraft: newMineCraftRequest,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/twitch/streams", async (req, res, next) => {
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
        options
      );
      const getTopGamesRequest = await axios.get(
        "https://api.twitch.tv/helix/games/top?first=8",
        options
      );

      const newStreamsData = getStreamsRequest.data.data.slice();
      const newTopGamesRequest = getTopGamesRequest.data.data.slice();
      ///////////////////////////
      //topgames

      let topGames = newTopGamesRequest.map((e) => {
        // console.log(e);
        return axios.get(
          `https://api.twitch.tv/helix/streams?game_id=${e.id}`,
          options
        );
      });
      let empty_topGames = [];
      //
      let topGames_fetched = await axios.all(topGames);
      topGames_fetched.map((e) => {
        empty_topGames.push({
          gameViewers: e.data.data
            .map((e) => e.viewer_count)
            .reduce((acc, cur) => acc + cur, 0),
        });
      });

      ///////////////////////////

      //To Get Game_NAME

      let game_name_data = newStreamsData.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/channels?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_game_name = [];
      //
      let game_name_fetched = await axios.all(game_name_data);
      game_name_fetched.map((e) => {
        e.data.data.map((e) => {
          // console.log(e);
          empty_game_name.push({ game_name: e.game_name });
        });
      });

      ///////////////////////////
      let profileImageUrlAndFollowersAndDescriptions = newStreamsData.map(
        (e) => {
          return axios.get(
            `https://api.twitch.tv/helix/users?id=${e.user_id}`,
            options
          );
        }
      );

      let emptyProfileImageUrlAndFollowersAndDescriptions = [];
      let profileImageUrlAndFollowersAndDescriptionsFected = await axios.all(
        profileImageUrlAndFollowersAndDescriptions
      );
      profileImageUrlAndFollowersAndDescriptionsFected.map((e) => {
        e.data.data.map((e) => {
          // console.log(e);
          emptyProfileImageUrlAndFollowersAndDescriptions.push({
            description: e.description,
            profile_image_url: e.profile_image_url,
            followers: e.view_count,
          });
        });
      });

      /////////////////////////////////////////////////

      let tags = newStreamsData.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/streams/tags?broadcaster_id=${e.user_id}`,
          options
        );
      });
      let empty_tags = [];

      let tags_fetched = await axios.all(tags);
      tags_fetched.map((e) => {
        empty_tags.push({
          localization_names: e.data.data.map(
            (e) => e.localization_names["en-us"]
          ),
        });
      });
      //////////////////////////////
      //justchat STREAMS
      //////////////////////////////////////////////////
      //FORTNITE STREAMS

      // console.log(empty_topGames);
      _.merge(newTopGamesRequest, empty_topGames);
      _.merge(newStreamsData, empty_game_name);
      _.merge(newStreamsData, emptyProfileImageUrlAndFollowersAndDescriptions);
      _.merge(newStreamsData, empty_tags);

      res.send({
        frontPage: {
          allStreams: newStreamsData,
          topGames: newTopGamesRequest,
        },
      });
    }
  } catch (e) {
    res.status(500);
    next(e);
  }
});

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
        options
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

      let vr = profileImage.map((e) => {
        return axios.get(
          `https://api.twitch.tv/helix/users?id=${e.user_id}`,
          options
        );
      });

      let empty_followers = [];
      //

      let imageResult = await axios.all(vr);
      let ta2 = [];
      imageResult.map((e) => {
        // e.data.data.map((e) => console.log(e.vi));
        empty_followers.push({
          totalFollow: e.data.data
            .map((e) => e.view_count)
            .reduce((acc, cur) => acc + cur, 0),
        });

        e.data.data.map((e) => {
          // console.log(e)
          ta2.push({
            profile_image_url: e.profile_image_url,
            description: e.description,
          });
        });
      });
      const totalF = empty_followers
        .map((e) => e.totalFollow)
        .reduce((acc, cur) => acc + cur, 0);

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
      res.json({
        totalFollowers: totalF,
        selectedGame: topGames,
        totalCurrentWatching: totalViews,
        streams: sliced,
      });
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
      const totalViews = getStreamsRequest.data.data
        .map((el) => el.view_count)
        .reduce((acc, curr) => {
          return acc + curr;
        });
      //

      res.json({
        streams: getStreamsRequest.data.data,
        totalFollowers: totalViews,
      });
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
      ///////////////////////////
      //topgames

      let imageChanged = topGames.map((e) => {
        // console.log(e);
        return axios.get(
          `https://api.twitch.tv/helix/streams?game_id=${e.id}`,
          options
        );
      });
      let empty_topGames = [];
      //
      let topGames_fetched = await axios.all(imageChanged);
      topGames_fetched.map((e) => {
        empty_topGames.push({
          gameViewers: e.data.data
            .map((e) => e.viewer_count)
            .reduce((acc, cur) => acc + cur, 0),
        });
      });
      _.merge(topGames, empty_topGames);
      res.json({ topGames });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
// /twitch/streams/req.params

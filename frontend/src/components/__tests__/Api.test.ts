import { expect, test } from "vitest";
import { assert } from "chai";
import { CryptohubApi } from "@/stores/CryptohubApi.ts";

const user = {
  user_id: "0123456",
  email: "toto@cryptohub.com",
  favorite: [{ name: "Bitcoin", coin_id: "bitcoin" }],
  notification: ["bitcoin add"],
};

const user2 = {
  user_id: "01234567",
  email: "testfav@cryptohub.com",
  favorite: [{ name: "Bitcoin", coin_id: "bitcoin" }],
  notification: ["bitcoin add"],
};

const user3 = {
  user_id: "0123456789",
  email: "testnotification@cryptohub.com",
  favorite: [{ name: "Bitcoin", coin_id: "bitcoin" }],
  notification: ["bitcoin add"],
};
/*
/cryptohub/api/getUser	user_id	user_object (see DB diagram)
/cryptohub/api/addUser	user_id, email	status code
/cryptohub/api/deleteUser	user_id	status code
/cryptohub/api/addFavorite	user_id,crypto_name	status code
/cryptohub/api/removeFavorite	user_id,crypto_name	status code
/cryptohub/api/changeEmail	user_id,new_email	status code
/cryptohub/api/addNotification	user_id,crypto_name,target_value	status code
/cryptohub/api/removeNotification	user_id,crypto_name	status code
/cryptohub/api/resetNotifications	user_id	status code
/cryptohub/api/getFavorites	user_id	String[]
/cryptohub/api/getNotifications	user_id	notification_object[]
    
    */

test("test : addUser", async function () {
  await CryptohubApi.addUser(
    user.user_id,
    user.email,
    user.favorite,
    user.notification
  ).then((responce) => {
    assert.equal(responce, 200);
  });
});

test("test : getUser", async function () {
  await CryptohubApi.getUser(user.user_id).then((responce) => {
    const res = JSON.parse(JSON.stringify(responce));
    assert.equal(res.user_id, user.user_id);
    assert.equal(res.email, user.email);
    assert.equal(res.favorite[0].name, user.favorite[0].name);
    assert.equal(res.favorite[0].coin_id, user.favorite[0].coin_id);
    assert.equal(res.notification[0], user.notification[0]);
  });
});

test("test : deleteUser", async function () {
  await CryptohubApi.deleteUser(user.user_id).then((responce) => {
    assert.equal(responce, 200);
  });
});

test("test : addFavorite", async function () {
  await CryptohubApi.addUser(
    user2.user_id,
    user2.email,
    user2.favorite,
    user.notification
  );
  const newfavorites = { 
    name: "etc",
    coin_id: "etc",
  }
  await CryptohubApi.addFavorite(user2.user_id,{newfavorites}).then((responce) => {
    assert.equal(responce, 200);
  });
});

test("test : getFavorites", async function () {
  await CryptohubApi.getFavorites(user2.user_id).then((responce) => {
    const res = JSON.parse(JSON.stringify(responce));
    assert.equal(res[0].favorite[0].name, user2.favorite[0].name);
    assert.equal(res[0].favorite[0].coin_id, user2.favorite[0].coin_id);

  });
});

test("test : removeFavorite", async function () {
  await CryptohubApi.removeFavorite(user2.user_id, "Bitcoin").then(
    (responce) => {
      assert.equal(responce, 200);
    }
  );
});

test("test : changeEmail", async function () {
  await CryptohubApi.changeEmail(user2.user_id, "testnewmail@crypto.fr").then(
    (responce) => {
      assert.equal(responce, 200);
    }
  );
});

// test("test : addNotification", async function () {
//   await CryptohubApi.addUser(
//     user3.user_id,
//     user3.email,
//     user3.favorite,
//     user3.notification
//   );
//   CryptohubApi.addNotification(user3.user_id, "TTC", 100).then((responce) => {
//     assert.equal(responce, 200);
//   });
// });

// test("test : getNotifications", function () {
//   CryptohubApi.getNotifications(user3.user_id).then((responce) => {
//     const res = JSON.parse(JSON.stringify(responce));
//     assert.equal(res, user3.notification);
//   });

//   test("test : removeNotification", function () {
//     CryptohubApi.removeNotification(user3.user_id, "TTC").then((responce) => {
//       assert.equal(responce, 200);
//     });
//   });

//   test("test : resetNotifications", function () {
//     CryptohubApi.resetNotifications(user3.user_id).then((responce) => {
//       assert.equal(responce, 200);
//     });
//   });
// });

test("test : deleteUser2", async function () {
  await CryptohubApi.deleteUser(user2.user_id).then((responce) => {
    assert.equal(responce, 200);
  });
});

test("test : deleteUser3", async function () {
  await CryptohubApi.deleteUser(user3.user_id).then((responce) => {
    assert.equal(responce, 200);
  });
});

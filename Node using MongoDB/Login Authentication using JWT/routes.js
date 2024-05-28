const UserRoute = require("./routes/UserRoute");
const routes = [
  {
    route: "/api/user",
    router: UserRoute,
  },
];
module.exports = routes;

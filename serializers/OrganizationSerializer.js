const JSONAPISerializer = require("json-api-serializer");
const mongoose = require("mongoose");
const Organization = mongoose.model("organizations");
const Address = mongoose.model("addresses");
const User = mongoose.model("users");

const Serializer = new JSONAPISerializer();

const organizationJSON = {
  whitelist: ["name", "code"],
  relationships: {
    _admins: {
      type: "admins",
      admins: async function (data) {
        console.log("WERWERWER");
        return {
          self: await User.find({ _id: { $all: data._admins } }),
        };
      },
    },
  },
};

Serializer.register("organization", organizationJSON);
Serializer.register("admins", {
  users: {
    self: function (data) {
      console.log("QQWEQWEQWE");
      let users = null;
      User.find({ _id: { $all: data._admins } }).then((data) => (users = data));
      return users;
    },
  },
});

exports.OrganizationSerializer = (data) => {
  return Serializer.serialize("organization", data, { count: 2 });
};

"use strict";
const mongoose = require("mongoose");
const Organization = mongoose.model("organizations");
const Address = mongoose.model("addresses");
const errorFormatter = require("../../utilities/errorFormatter");
const constants = require("../../utilities/appConstants");
const { skipPageRecords } = require("../../utilities/commonMangoose");

exports.create = async (req, res, next) => {
  const { name, code, email, contact, admins, address } = req.body;
  try {
    const organization = await new Organization({
      name,
      code,
      email,
      contact,
      _admins: admins,
    }).save();
    if (organization && address) {
      try {
        const newAddress = await new Address({ ...address }).save();
        if (newAddress) {
          organization._addressId = newAddress.id.toString();
          await organization.save();
        }
      } catch (exception) {
        await Organization.deleteOne({ _id: organization.id });
        return res.status(422).json({
          success: false,
          errors: errorFormatter(exception),
        });
      }
    }
    return res.status(200).json({ success: true, organization: organization });
  } catch (exception) {
    return res.status(422).json({
      success: false,
      errors: errorFormatter(exception),
    });
  }
};

exports.organizations = async (req, res, next) => {
  const page = skipPageRecords(req);
  const organizations = await Organization.find()
    .limit(constants.PER_PAGE)
    .skip(page);
  res.status(200).json({ success: true, organizations });
};

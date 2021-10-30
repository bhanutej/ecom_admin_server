"use strict";
const mongoose = require("mongoose");
const Organization = mongoose.model("organizations");
const Address = mongoose.model("addresses");
const User = mongoose.model("users");
const errorFormatter = require("../../utilities/errorFormatter");
const constants = require("../../utilities/appConstants");
const { skipPageRecords } = require("../../utilities/commonMangoose");
const {
  OrganizationSerializer,
} = require("../../serializers/OrganizationSerializer");

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

exports.organization = async (req, res, next) => {
  const { organization_id } = req.query;
  try {
    const organization = await _getOrganization(organization_id);
    res.status(200).json({
      success: true,
      organization: organization,
    });
  } catch (exception) {
    res.status(422).json({
      success: false,
      errors: errorFormatter(exception),
    });
  }
};

const _getOrganization = (organization_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const organization = await Organization.findOne({ _id: organization_id });

      const organizationJson = {
        id: organization._id.toString(),
        name: organization.name,
        code: organization.code,
        email: organization.email,
        contact: organization.contact,
      };

      const users = await User.find({
        _id: { $all: organization._admins },
      }).select({
        email: 1,
        role: 1,
        _id: 1,
      });
      const address = await Address.findOne({
        _id: organization._addressId,
      }).select({
        address_line_one: 1,
        address_line_two: 1,
        landmark: 1,
        zipcode: 1,
        city: 1,
        state: 1,
        country: 1,
        _id: 1,
      });
      organizationJson.users = users;
      organizationJson.address = address;
      resolve(organizationJson);
    } catch (exception) {
      reject(exception);
    }
  });
};

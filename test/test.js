"use strict";

var expect = require("chai").expect;
var nock = require("nock");

var EmonCMS = require("../lib/emoncms");

describe("#emoncms", function() {
  beforeEach(() => {
    nock("http://emoncms.org/")
      .get("/input/post")
      .reply(200, "{\"success\": true}");
  });

  it("should post full JSON data", function() {
    var emoncms = new EmonCMS("access", "http://emoncms.org/");
    emoncms.nodegroup = "test";
    emoncms.datatype = "fulljson";
    emoncms.post({
      payload: {
        amp: 0,
        wh: 0,
        temp1: 22.1
      }
    }).then((ret) => {
      expect(ret.success).to.equal(true);
    });
  });
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const commonDataRoutes = require("./MK1/commondata");
const hscommonDataRoutes = require("./HS/commondata");
const bscommonDataRoutes = require("./BS/commondata");
const etcommonDataRoutes = require("./ET/commondata");
const mk2commonDataRoutes = require("./MK2/commondata");
const loginRouter = require('./MK1/login'); 
const mk1auth = require('./MK1/auth');
const mk1logincredentials = require('./MK1/logincredentials');
const hs_Auth = require('./HS/auth');
const hs_boxstatus = require('./HS/box_status');
const hs_login = require('./HS/login');
const hs_logincredentials = require('./HS/logincredentials');
const hs_userrecord = require("./HS/user_records");
const bs_logincredentials = require('./BS/logincredentials');
const bs_Auth = require('./BS/auth');
const bs_boxstatus = require('./BS/box_status');
const bs_login = require('./BS/login');
const bs_userrecord = require('./BS/user_records');
const et_auth = require('./ET/auth');
const et_boxstatus = require('./ET/box_status');
const et_login = require('./ET/login');
const et_logincredentials = require('./ET/logincredentials');
const et_userecord = require('./ET/user_records');
const mk2_Auth = require('./MK2/auth');
const mk2_boxstatus = require('./MK2/box_status');
const mk2_login = require('./MK2/login');
const mk2_logincredentials = require('./MK2/logincredentials');
const mk2userrecord = require('./MK2/user_records');

const { router: mk1settings, setupWebSocket } = require('./MK1/settings');
const { router: hssettings } = require('./HS/settings');
const { router: bssettings } = require('./BS/settings');
const { router: etsettings } = require('./ET/settings');
const { router: mk2settings } = require('./MK2/settings');

const mk1userrecord = require('./MK1/user_records');
const { createDefaultUser: createMK1DefaultUser } = require('./MK1/user');
const { createDefaultUser: createHSDefaultUser } = require('./HS/user');
const { createDefaultUser: createBSDefaultUser } = require('./BS/user');
const { createDefaultUser: createETDefaultUser } = require('./ET/user');
const { createDefaultUser: createMK2DefaultUser } = require('./MK2/user');

createMK1DefaultUser();
createHSDefaultUser();
createBSDefaultUser();
createETDefaultUser();
createMK2DefaultUser();

const boxStatusRoute = require("./MK1/box_status");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", commonDataRoutes);
app.use("/api", hscommonDataRoutes);
app.use("/api", bscommonDataRoutes);
app.use("/api", etcommonDataRoutes);
app.use("/api", mk2commonDataRoutes);
app.use('/api', loginRouter);
app.use("/api", mk1settings);
app.use("/api", mk1userrecord);
app.use("/api", mk1auth);
app.use("/api", mk1logincredentials);
app.use("/api", boxStatusRoute);
app.use('/api', hs_Auth);
app.use('/api', mk2_Auth);
app.use("/api", hs_boxstatus);
app.use("/api", bs_boxstatus);
app.use("/api", et_boxstatus);
app.use("/api", mk2_boxstatus);
app.use("/api", hs_login);
app.use("/api", bs_login);
app.use("/api", et_login);
app.use("/api", mk2_login);
app.use("/api", hs_logincredentials);
app.use("/api", hssettings);
app.use("/api", bssettings);
app.use("/api", etsettings);
app.use("/api", mk2settings);
app.use("/api", hs_userrecord);
app.use("/api", bs_userrecord);
app.use('/api', bs_logincredentials);
app.use('/api', bs_Auth);
app.use('/api', et_auth);
app.use('/api', et_logincredentials);
app.use('/api', mk2_logincredentials);
app.use('/api', et_userecord);
app.use('/api', mk2userrecord);

app.use(express.text());

const HOST = "192.168.0.24";
const PORT = 4002;

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});

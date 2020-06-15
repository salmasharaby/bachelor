const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const moment = require("moment");
const nodemailer = require("nodemailer");

// // const Menu = require("../../models/Menu");
// // const Orders = require("../../models/Order");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "salmasharaby@gmail.com",
    pass: "salmas123"
  }
});

var mailOptions = {
  from: "salmasharaby@gmail.com",
  to: "salmasharaby@gmail.com",
  subject: "Your QR Code",
  text: "That was easy!"
};

// router.get("/", async (req, res) => {
//   try {
//     const result = await Orders.find();
//     res.json({ data: result });
//   } catch (error) {
//     res.json({ error: "Request Error" });
//   }
// });
// router.post("/submitOrder", async (req, res) => {
//   try {
//    var order_time =moment().format("LLL")
//     const { placed_by, order, total_calories, total_cost } = req.body;
//     const newOrder = await new Orders({
//       order_time: order_time,
//       order: order,
//       placed_by: placed_by,
//       total_cost: total_cost, //calculated in frontend
//       total_calories: total_calories //calculated in frontend
//     }).save();
//     mailOptions.to = placed_by;
//     var text = "You have Placed an Order at"+order_time+", Your Order Costs $"+total_cost+" and has "+total_calories+" KCAL" 
//     mailOptions.text = text

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//     res.json({ data: newOrder });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       error: `Request Error ` + error[0]
//     });
//   }
//   //Send Email
// });

 module.exports = router;
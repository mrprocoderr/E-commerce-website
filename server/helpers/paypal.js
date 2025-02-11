const paypal = require("paypal-rest-sdk")

paypal.configure({
  mode: "sandbox",
  client_id:
    "AQNA78H4bgZqtouE0hecxswmu6OmvpRAPQAfFcXaCPE9Y3jdJ_AvLvgd373IqMpzJ_uLFI1eEH8X89GZ",
  client_secret:
    "ENfyyO10TpD-fg6fdTGP33ZP9kOiwgim7iiZeB-rMIq-DBN2F5uhSi0vTEYMNsSJjtmJ45TIkHNAHgjp",
})

module.exports = paypal

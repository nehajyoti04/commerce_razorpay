(function($) {
  Drupal.behaviors.commerce_razorpay = {
    attach: function(context, settings) {


      // alert("inside file");
      // var rzp1 = new Razorpay(options);
      // rzp1.open();
      // e.preventDefault();


      // jquery extend function
      // $.extend({
      //   redirectPost: function(location, args) {
      //     var form = '';
      //     $.each(args, function(key, value) {
      //       console.log("value");
      //       console.log(value);
      //       // value = value.split('"').join('\"')
      //       form += '<input type="hidden" name="' + key + '" value="' + value + '">';
      //     });
      //     $('<form action="' + location + '" method="POST">' + form + '</form>').appendTo($(document.body)).submit();
      //   }
      // });


      var amount = settings.commerce_razorpay.amount;
      var key = settings.commerce_razorpay.key;
      var logo = settings.commerce_razorpay.logo;
      var order_id = settings.commerce_razorpay.order_id;
      var payment_id = '';
      // amount = 1500;
      // key = 'rzp_test_6VOiSPZ8ClqeCo';
      // order_id = 40;
      // logo = "/your_logo.png";



      // var options = {
      //   "key": key,
      //   "amount": amount,
      //   "name": "Merchant Name",
      //   "description": "Purchase Description",
      //   "image": logo,
      //   "prefill": {
      //     "name": "Harshil Mathur",
      //     "email": "harshil@razorpay.com"
      //   },
      //   "notes": {
      //     "address": "Hello World"
      //   },
      //   "theme": {
      //     "color": "#F37254"
      //   },
      //   "handler": function(response) {
      //     payment_id = response.razorpay_payment_id;
      //   },
      // };




      // var form = '';
      // $.each(options, function(key, value) {
      //   console.log("value");
      //   console.log(value);
      //   // value = value.split('"').join('\"')
      //   form += '<input type="hidden" name="' + key + '" value="' + value + '">';
      // });
      // // $('<form action="' + location + '" method="POST">' + form + '</form>').appendTo($(document.body)).submit();
      // $('<form action="' + location + '" method="POST">' + form + '</form>').appendTo($(document.body));


      // var redirect = '/capture-payment?payment_id='
      // payment_id;
      // $.redirectPost(redirect, {
      //   "key": key,
      //   "amount": amount,
      //   "name": "Merchant Name",
      //   "description": "Purchase Description",
      //   "image": logo,
      //   "prefill": {
      //     "name": "Harshil Mathur",
      //     "email": "harshil@razorpay.com"
      //   },
      //   "notes": {
      //     "address": "Hello World"
      //   },
      //   "theme": {
      //     "color": "#F37254"
      //   },
      //   "handler": function(response) {
      //     payment_id = response.razorpay_payment_id;
      //   },
      //   // src: "https://checkout.razorpay.com/v1/checkout.js",
      // });




      // Your javascript code here
      // alert("option" + settings.commerce_razorpay.amount);
      //
      //


      // var options = {
      //   "key": "YOUR_KEY_ID",
      //   "amount": "2000", // 2000 paise = INR 20
      //   "name": "Merchant Name",
      //   "description": "Purchase Description",
      //   "image": "/your_logo.png",
      //   "handler": function(response) {
      //     alert(response.razorpay_payment_id);
      //   },
      //   "prefill": {
      //     "name": "Harshil Mathur",
      //     "email": "harshil@razorpay.com"
      //   },
      //   "notes": {
      //     "address": "Hello World"
      //   },
      //   "theme": {
      //     "color": "#F37254"
      //   }
      // };
      // var rzp1 = new Razorpay(options);

      // document.getElementById('rzp-button1').onclick = function(e) {
      //   rzp1.open();
      //   e.preventDefault();
      // }


      var options = {
        // "key": "rzp_test_ipkgumBJtJrvd1",
        "key": key,
        "amount": amount, // 100 paise = INR 1
        "name": "Merchant Name",
        "description": "Purchase Description",
        "image": logo,
        "order_id": order_id,
        "handler": function(response) {

          alert(response.razorpay_payment_id);
          alert("order_id" + order_id);


          // Capture Payment here.
          // var htmlWidth = 300;
          // var data = {
          //   payment_id: response.razorpay_payment_id
          // };
          var payment_id = response.razorpay_payment_id;
          alert("window.location" + payment_id);



          window.location = '/capture-payment?payment_id=' + payment_id + '&amount=' +amount + '&order_id=' + order_id;
          // $.post('/capture-payment', data, function(returnData) {
          //   // alert('The server said ' + returnData);
          // });
          // $.post('/capture-payment', data);
          // $.ajax({
          //   type: "POST",
          //   url: "/capture-payment",
          //   data: {
          //     'width': htmlWidth
          //   },
          //   success: function(data) {
          //     console.log(data);
          //   }
          // })
          // $.ajax({
          //   type: "POST",
          //   // url: "/capture-payment?payment_id=" + response.razorpay_payment_id + "&amount=100",
          //   url: "/capture-payment",
          //   data: {
          //     payment_id: response.razorpay_payment_id,
          //     amount: 100
          //   },
          //   dataType: 'JSON',
          //   success: function(response) {
          //     console.log(response.blablabla);
          //     // put on console what server sent back...
          //   }
          // });
          // window.location.href = "/capture-payment?payment_id=" + response.razorpay_payment_id + "&amount=" + amount + "&order_id=" + order_id;
          $('razor-payment-id').val(response.razorpay_payment_id);

          // // Capture payment.
          // var request = require('request');

          // request({
          //   method: 'POST',
          //   url: 'https://' + key + ':HSFl7YizDJttZmxHi2a3123T@api.razorpay.com/v1/payments/' + response.razorpay_payment_id + '/capture',
          //   form: {
          //     amount: amount
          //   }
          // }, function(error, response, body) {
          //   console.log('Status:', response.statusCode);
          //   console.log('Headers:', JSON.stringify(response.headers));
          //   console.log('Response:', body);
          // });


          // var request = require("request");
          // request({
          //   method: "POST",
          //   url: "https://rzp_test_ipkgumBJtJrvd1:AYnJYk0QEcW0LKJLuARDQ3Ti@api.razorpay.com/v1/payments/" +response.razorpay_payment_id + "/capture",
          //   form: {
          //     amount: 500
          //   }
          // }, function (error, response, body) {
          //   console.log("Status:", response.statusCode);
          //   console.log("Headers:", JSON.stringify(response.headers));
          //   console.log("Response:", body);
          // });

        },
        "prefill": {
          "name": "Neha",
          "email": "neha.jyoti@yahoo.com"
        },
        "notes": {
          "address": "Hello World"
        },
        "theme": {
          "color": "#F37254"
        }
      };




      var rzp1 = new Razorpay(options);
      rzp1.open();

      document.getElementById("rzp-button1").onclick = function(e) {
        alert("on click");
        rzp1.open();
        e.preventDefault();
      }



      // $('div.payment-razor-form form', context).submit();
      // alert("file loaded");

      // $('div.payment-redirect-form form', context).submit() {
      //   alert("inside submit");
      // }







    }
  };
}(jQuery));

// jQuery(document).ready(function() {

// });

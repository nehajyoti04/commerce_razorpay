(function($) {
  Drupal.behaviors.commerce_razorpay = {
    attach: function(context, settings) {



      var amount = settings.commerce_razorpay.amount;
      var key = settings.commerce_razorpay.key;
      var logo = settings.commerce_razorpay.logo;
      var order_id = settings.commerce_razorpay.order_id;
      var commerce_order_id = settings.commerce_razorpay.commerce_order_id;
      var payment_id = '';
      var payment_settings = JSON.stringify(settings.commerce_razorpay.payment_settings);


      var options = {
        // "key": "rzp_test_ipkgumBJtJrvd1",
        "key": key,
        "amount": amount, // 100 paise = INR 1
        "name": "Merchant Name",
        "description": "Purchase Description",
        "image": logo,
        "order_id": order_id,
        "handler": function(response) {
          // alert("payment_settings");
          // console.log(payment_settings);


          var payment_id = response.razorpay_payment_id;

          window.location = '/capture-payment?payment_id=' + payment_id + '&amount=' + amount + '&order_id=' + commerce_order_id + '&payment_settings=' + payment_settings + '&response=' + JSON.stringify(response);
          $('razor-payment-id').val(response.razorpay_payment_id);


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

      // document.getElementById("rzp-button1").onclick = function(e) {
      //   alert("on click");
      //   rzp1.open();
      //   e.preventDefault();
      // }


    }
  };
}(jQuery));

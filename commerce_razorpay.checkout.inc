<?php

function commerce_razorpay_checkout_form() {
$form['hidden'] = array(
    '#type' => 'hidden',
    '#default_value' => 'Hidden Element',
  );

return $form;
}

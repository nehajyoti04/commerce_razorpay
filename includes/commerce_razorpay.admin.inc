<?php
use Razorpay\Api\Api;
/**
 * Form callback: allows the user to refun a prior capture.
 */
function commerce_razorpay_refund_form($form, &$form_state, $order, $transaction) {

  $form_state['order'] = $order;
  $form_state['transaction'] = $transaction;

  // Load and store the payment method instance for this transaction.
  $payment_method = commerce_payment_method_instance_load($transaction->instance_id);
  $form_state['payment_method'] = $payment_method;

  $default_amount = $transaction->amount;

  // Convert the price amount to a user friendly decimal value.
  $default_amount = commerce_currency_amount_to_decimal($default_amount, $transaction->currency_code);

  $description = implode('<br />', array(
    t('Captured: @amount', array('@amount' => commerce_currency_format($transaction->amount, $transaction->currency_code))),
  ));

  $form['amount'] = array(
    '#type' => 'textfield',
    '#title' => t('Refund amount'),
    '#description' => $description,
    '#default_value' => $default_amount,
    '#field_suffix' => check_plain($transaction->currency_code),
    '#size' => 16,
  );

  $form = confirm_form($form,
    t('What amount do you want to refund?'),
    'admin/commerce/orders/' . $order->order_id . '/payment',
    '',
    t('Refund'),
    t('Cancel'),
    'confirm'
  );

  return $form;
}

/**
 * Validate handler: ensure a valid amount is given.
 */
function commerce_razorpay_refund_form_validate($form, &$form_state) {
  $transaction = $form_state['transaction'];
  $amount = $form_state['values']['amount'];

  // Ensure a positive numeric amount has been entered for capture.
  if (!is_numeric($amount) || $amount <= 0) {
    form_set_error('amount', t('You must specify a positive numeric amount to refund.'));
  }

  // Ensure the amount is less than or equal to the authorization amount.
  if ($amount > commerce_currency_amount_to_decimal($transaction->amount, $transaction->currency_code)) {
    form_set_error('amount', t('You cannot refund more than you captured.'));
  }

  // If the authorization has expired, display an error message and redirect.
  if (time() - $transaction->created > 86400 * 30) {
    drupal_set_message(t('This authorization has passed its 30 day limit cannot be refunded.'), 'error');
    drupal_goto('admin/commerce/orders/' . $form_state['order']->order_id . '/payment');
  }
}

/**
 * Submit handler: process a prior authorization capture via AIM.
 */
function commerce_razorpay_refund_form_submit($form, &$form_state) {
  $order = $form_state['order'];
  $transaction = $form_state['transaction'];
  $amount = $form_state['values']['amount'];
  $payment_method = $form_state['payment_method'];
  // $charge = $amount;

  $data = commerce_razorpay_request_refund($order, $transaction, $payment_method, $amount);

  // $response = commerce_razorpay_refund_transaction($transaction, $amount, $order, $payment_method);

  $form_state['redirect'] = 'admin/commerce/orders/' . $form_state['order']->order_id . '/payment';
}

function commerce_razorpay_request_refund($order, $transaction, $payment_method, $amount='') {
  require 'libraries/razorpay-php/Razorpay.php';
  $key_id = $payment_method['settings']['key_id'];
  $key_secret = $payment_method['settings']['key_secret'];
  $api = new Api($key_id, $key_secret);
  $razorpay_payment_id = $order->data['razorpay_payment_id'];

  $payment = $api->payment->fetch($razorpay_payment_id);

  if($amount == '') {
    $refund = $payment->refund();
  } else {
    $refund = $payment->refund(array('amount' => $amount* 100)); // for partial refund
  }
  return $refund;
}

<?php

function commerce_razorpay_checkout_form() {
// drupal_add_js(drupal_get_path('module', 'commerce_razorpay') . '/commerce_razorpay.js');
// drupal_add_js('https://checkout.razorpay.com/v1/checkout.js');
$order = create_an_order();

print '<pre>'; print_r("order"); print '</pre>';
  print '<pre>'; print_r($order); print '</pre>'; exit;


$path1 = drupal_get_path('module', 'commerce_razorpay') . '/custom1.js';
$path1 = 'https://checkout.razorpay.com/v1/checkout.js';
$form['test'] = array(
    '#type' => 'markup',
    '#markup' => '<script src= "https://checkout.razorpay.com/v1/checkout.js"
    data-key="rzp_test_ipkgumBJtJrvd1"
    data-amount="5000"
    data-buttontext="Pay with Razorpay"
    data-name="Merchant Name"
    data-description="Purchase Description"
    data-image="https://your-awesome-site.com/your_logo.jpg"
    data-prefill.name="Harshil Mathur"
    data-prefill.email="support@razorpay.com"
    data-theme.color="#F37254"
    ></script>',
);
$form['hidden'] = array(
    '#type' => 'hidden',
    '#default_value' => 'Hidden Element',
  );

$form['message'] = array(
    '#type' => 'item',
    '#title' => t('Email address in use'),
    '#markup' => t('There is already an account associated with your GitHub email address. Type your !site account password to merge accounts.', array('!site' => variable_get('site_name'))),
  );
// $form['#action'] = '/purchase';
$form['submit'] = array(
    '#type' => 'submit',
    '#value' => 'Submit',
  );
$form['#submit'][] = 'commerce_razorpay_checkout_submit';
// dpm("form");
// dpm($form);

// $form['#attached']['js'] = drupal_add_js(drupal_get_path('module', 'commerce_razorpay') . '/commerce_razorpay.js');
// $form['#attached']['js'] =  '/commerce_razorpay.js';
return $form;
}

function commerce_razorpay_checkout_submit($form, &$form_state) {
  print '<pre>'; print_r("form"); print '</pre>';
  print '<pre>'; print_r($form); print '</pre>';exit;
  // $return_to = url('user/' . arg(1) . '/github', array('absolute' => TRUE));

  // $client_id = variable_get('github_connect_client_id');
  // $link = 'https://github.com/login/oauth/authorize?client_id=' . $client_id;

  $form_state['redirect'] = '/purchase';
}

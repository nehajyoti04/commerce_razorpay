CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Configuration

INTRODUCTION
------------
This module serve as Payment Gateway porvided by Razorpay.

REQUIREMENTS
------------

This module requires the following modules:

 * Commerce

INSTALLATION
------------

 * Install as you would normally install a contributed Drupal module. See:
   https://drupal.org/documentation/install/modules-themes/modules-7
   for further information.

 * Include : [require 'libraries/razorpay-php/Razorpay.php';] OR []
 [include 'libraries/razorpay-php/Razorpay.php';] in commerce_razorpay.module file if install without composer

 Installation with composer:
 1. Go to Module directory and run composer update.
 2. Instead of require 'libraries/razorpay-ph...' include : [include 'vendor/autoload.php'];
 in commerce_razorpay.module file.

CONFIGURATION
-------------

1.Extract the  zip file inside package folder and  place it in the path
DRUPAL_ROOT/libraries. OR you can download razorpay-php zip file from this link
https://github.com/razorpay/razorpay-php/releases/download/2.0.0/razorpay-php.zip
i.e latest release 2.0.0 razorpay-php.zip file.

1.2 Install the module.
2. Go to payment setting under store
2.1. enter the required keys provided to you by Razorpay.
2.2. For test purpose
3. Select Test or Production based on your use.

MAINTAINERS
-----------

Current maintainers:
 * Jyoti Bohra (nehajyoti) - https://www.drupal.org/u/nehajyoti.

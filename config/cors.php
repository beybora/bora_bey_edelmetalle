<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Hier definierst du, welche externen Origins (z. B. dein Nuxt-Frontend)
    | auf deine API zugreifen dürfen. Diese Konfiguration gilt z. B. für
    | REST-Anfragen, Sanctum oder andere APIs.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3001',
        'http://localhost:5173',
        'https://admin.beylabs.de',
        'https://beylabs.de',
    ],


    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];

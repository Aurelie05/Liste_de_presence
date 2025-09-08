<?php

return [

    'name' => env('APP_NAME', 'INPHB'),

    'env' => env('APP_ENV', 'production'),

    'debug' => (bool) env('APP_DEBUG', false),

    'url' => env('APP_URL', 'http://localhost'),

    'timezone' => 'UTC',

    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',

    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',

    'previous_keys' => [
        ...array_filter(
            explode(',', env('APP_PREVIOUS_KEYS', ''))
        ),
    ],

    'maintenance' => [
    'driver' => 'file', // ✅ Force le driver à "file"
    ],


    'providers' => [

        /*
         * Laravel Framework Service Providers...
         */
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class, // ✅ nécessaire pour éviter l'erreur "files"
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Barryvdh\DomPDF\ServiceProvider::class,
        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\RouteServiceProvider::class,

    ],

    'aliases' => [
    'PDF' => Barryvdh\DomPDF\Facade::class,
],

];

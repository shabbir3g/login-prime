<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit0eaeb5668eacbc4b0e90bd68a6ddbd85
{
    public static $prefixLengthsPsr4 = array (
        'L' => 
        array (
            'LoginPrime\\Includes\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'LoginPrime\\Includes\\' => 
        array (
            0 => __DIR__ . '/../..' . '/includes',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit0eaeb5668eacbc4b0e90bd68a6ddbd85::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit0eaeb5668eacbc4b0e90bd68a6ddbd85::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit0eaeb5668eacbc4b0e90bd68a6ddbd85::$classMap;

        }, null, ClassLoader::class);
    }
}

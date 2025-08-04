<?php

use Symfony\Component\AssetMapper\ImportMap\ImportMap;

// https://symfony.com/bundles/AssetMapperBundle/current/index.html#importing-modules
return function (ImportMap $map) {
    $map->import('@hotwired/turbo', ux: true);
    $map->import('@hotwired/stimulus', ux: true);
    $map->import('stimulus-controllers', 'assets/controllers.js');
};

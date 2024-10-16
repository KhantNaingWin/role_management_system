<?php

namespace App\Providers;

use App\Interfaces\AdminInterface;
use App\Interfaces\PermissionInterface;
use App\Interfaces\PostInterface;
use App\Interfaces\RoleInterface;
use App\Repositories\AdminRepository;
use App\Repositories\PermissionRepository;
use App\Repositories\PostRepository;
use App\Repositories\RoleRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AdminInterface::class,AdminRepository::class);
        $this->app->bind(PostInterface::class,PostRepository::class);
        $this->app->bind(RoleInterface::class,RoleRepository::class);
        $this->app->bind(PermissionInterface::class,PermissionRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

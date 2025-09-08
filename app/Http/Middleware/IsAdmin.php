<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Ici, on suppose que tu as un champ 'is_admin' dans ta table users
        if (!Auth::check() || !Auth::user()->is_admin) {
            abort(403, 'Non autorisé.');
        }

        return $next($request);
    }
}

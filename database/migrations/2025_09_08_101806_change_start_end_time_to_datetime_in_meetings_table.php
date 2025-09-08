<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('meetings', function (Blueprint $table) {
            // ⚠️ On modifie start_time et end_time en datetime
            $table->dateTime('start_time')->change();
            $table->dateTime('end_time')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('meetings', function (Blueprint $table) {
            // En cas de rollback, on remet en TIME
            $table->time('start_time')->change();
            $table->time('end_time')->change();
        });
    }
};

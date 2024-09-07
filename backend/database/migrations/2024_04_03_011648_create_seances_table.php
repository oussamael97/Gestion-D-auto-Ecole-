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
        Schema::create('seances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("candidat_id");
            $table->foreign('candidat_id')->references('id')->on("candidats");
            $table->string("Nom");
            $table->string("prenom");
            $table->string("telephone");
            $table->string("etat_de_seances")->default("en cours");
            $table->date("date_de_seances");
            $table->time("heure_de_seances");
            $table->unsignedBigInteger("moniteur_id");
            $table->foreign('moniteur_id')->references('id')->on("moniteurs");
            $table->unsignedBigInteger("service_id");
            $table->foreign('service_id')->references('id')->on("services");
            $table->unsignedBigInteger('index')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seances');
    }
};

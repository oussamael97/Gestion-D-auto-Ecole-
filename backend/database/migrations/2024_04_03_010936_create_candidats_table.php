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
        Schema::create('candidats', function (Blueprint $table) {
            $table->id();
            $table->string("nom");
            $table->string("prenom");
            $table->string("telephone");
            $table->string("motdepaasse");
            $table->enum("role",["admin","moniteur","client"]);
            $table->string("categorie")->default("B");
            $table->string("Etat_de_paiement")->default("pays");
            $table->integer('heure_de_conduite')->nullable();
            $table->unsignedBigInteger("service_id")->nullable();
            $table->foreign('service_id')->references('id')->on("services");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidats');
    }
};

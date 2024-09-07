<?php

namespace Database\Factories;

use App\Models\Candidats;
use App\Models\moniteurs;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\seances>
 */
class seancesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $candidat = Candidats::factory()->create();
        $moniteur = moniteurs::factory()->create();

        return [
            "candidat_id" => $candidat->id,
            "nom" => $candidat->nom,
            "prenom" => $candidat->prenom,
            "telephone" => $candidat->telephone,
            "moniteur_id" => $moniteur->id,
            "etat_de_seances"=>fake()->randomElement(["effectuer","en cours","confirmer","annuler"]),
            "date_de_seances"=>fake()->date(),
            "heure_de_seances"=>fake()->time(),
        ];
    }
}

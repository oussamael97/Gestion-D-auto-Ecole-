<?php

namespace Database\Factories;

use App\Models\Services;
use Illuminate\Support\Str;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\candidats>
 */
class candidatsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "nom"=>fake()->firstName(),
            "prenom"=>fake()->lastName(),
            "telephone"=>fake()->phoneNumber(),
            "motdepaasse"=>fake()->text(8),
            "role"=>fake()->randomElement(["client"]),
            "categorie"=>fake()->word(),
            "Etat_de_paiement"=>fake()->randomElement($array = array('payes', 'en cours', 'no payes')),
            "heure_de_conduite"=>fake()->randomDigit(),
            "service_id"=> Services::factory(), 
        ];
    }
}

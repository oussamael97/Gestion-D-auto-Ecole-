<?php

namespace Database\Factories;

use App\Models\Services;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\moniteurs>
 */
class moniteursFactory extends Factory
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
            "role"=>fake()->randomElement(["moniteur"]),
            "heure_de_travaille"=>fake()->randomDigit(),
            'service_id' => Services::factory()->create()->id,

        ];
    }
}

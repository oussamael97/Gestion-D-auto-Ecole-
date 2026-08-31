<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\utilisateurs>
 */
class utilisateursFactory extends Factory
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
            "role"=>fake()->randomElement(["admin"]),
        ];
    }
}

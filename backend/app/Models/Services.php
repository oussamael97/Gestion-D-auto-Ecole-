<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Candidats;
class Services extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $table = "services";

    public function moniteur(){
        return $this->hasMany(moniteurs::class);
    }
    public function candidat(){
        return $this->hasMany(Candidats::class);
    }
    public function seance(){
        return $this->hasMany(Seances::class);
    }
}

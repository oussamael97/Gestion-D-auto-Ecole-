<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\Services;

class moniteurs extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function candidat(){
        return $this->belongsToMany(Candidats::class,"seances")->withPivot("candidat_id","Nom","prenom","telephone","etat_de_seances","date_de_seances","heure_de_seances"
        ,"moniteur_id","index");
    }
    public function service(){
        return $this->belongsTo(Services::class,'service_id');
    }
    public function seance(){
        return $this->belongsToMany(Seances::class,"seance_id");
    }
}

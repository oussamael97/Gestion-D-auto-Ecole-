<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Seances extends Model
{
    use HasApiTokens, HasFactory;
       
 
    protected $guarded = [];
    public $table = "seances";
 
    public function service (){
        return $this->belongsTo(Services::class);
    }
    public function moniteur (){
        return $this->belongsTo(moniteurs::class);
    }
    public function candidat (){
        return $this->belongsTo(Candidats::class);
    }
    
    

}

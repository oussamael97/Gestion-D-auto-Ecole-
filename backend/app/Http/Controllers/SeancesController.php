<?php

namespace App\Http\Controllers;

use App\Models\Candidats;
use App\Models\moniteurs;
use App\Models\Seances;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeancesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $seance=Seances::all();
        if($seance->count() > 0){
            return response()->json([
                'status'=>200,
                'seances'=>$seance
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'seances'=>'Not found'
            ],404);
        }
    }
    public function enregistresecances(Request $request){
        
        // Validation des données du formulaire
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'date_de_seances' =>'required|date_format:Y-m-d',
            'heure_de_seances' =>'required|string|max:255',
            'nom_moniteur' => 'required|string|max:255',
            'index'=>'required'
        ]);

        // Trouver l'ID du moniteur en fonction du nom fourni
        $moniteur = moniteurs::where('nom', $validatedData['nom_moniteur'])->first();
        $candidat=Candidats::where('nom',$validatedData['nom'])->first();

        if (!$moniteur) {
            return response()->json(['error' => 'Moniteur not found'], 404);
        }
        
        //dd($request->all());
        // Création d'une nouvelle séance avec l'état "en cours"
        $seance = Seances::create([
            'candidat_id' => $candidat->id,
            'Nom' => $validatedData['nom'],
            'prenom' => $validatedData['prenom'],
            'telephone' => $validatedData['telephone'],
            'etat_de_seances' => 'en_cours',
            'date_de_seances' => $validatedData['date_de_seances'],
            'heure_de_seances' => $validatedData['heure_de_seances'],
            'moniteur_id' => $moniteur->id,
            'index' => $validatedData['index']
        ]);

            // Retourner une réponse appropriée
            return response()->json(['message' => 'Session reserved successfully'],201);
    }
    public function updateStatus(Request $request, Seances $seance)
{
    // Validation des données
    $validatedData = $request->validate([
        'etat_de_seances' => 'required|string|in:confirmer,annuler,effectuer',
    ]);

    // Mettre à jour l'état de la séance
    $seance->update(['etat_de_seances' => $validatedData['etat_de_seances']]);

    // Retourner une réponse appropriée
    return response()->json(['message' => 'Status updated successfully'], 200);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

            
    }

    /**
     * Display the specified resource.
     */
    public function show(Seances $seances)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seances $seances)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Seances $seances)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seances $seances)
    {
        //
    }
}

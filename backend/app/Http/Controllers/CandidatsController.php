<?php

namespace App\Http\Controllers;

use App\Models\Candidats;
use Illuminate\Http\Request;

class CandidatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidat=Candidats::all();
        if($candidat->count() > 0){
            return response()->json([
                'status'=>200,
                'candidat'=>$candidat
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'candidat'=>'Not found'
            ],404);
        }
    }
    public function getInformationsByUsername($username)
    {
        // Recherchez le candidat par nom d'utilisateur
        $candidat = Candidats::where('nom', $username)->first();

        if (!$candidat) {
            return response()->json(['message' => 'Candidat non trouvé'], 404);
        }

        // Retournez les informations du candidat
        return response()->json($candidat);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Candidats $candidats)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Candidats $candidats)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Candidats $candidats)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidats $candidats)
    {
        //
    }
}

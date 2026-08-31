<?php

namespace App\Http\Controllers;

use App\Models\moniteurs;
use Illuminate\Http\Request;

class MoniteursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $moniteur=moniteurs::all();
        if($moniteur->count() > 0){
            return response()->json([
                'status'=>200,
                'moniteur'=>$moniteur
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'moniteur'=>'Not found'
            ],404);
        }
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
    public function show(moniteurs $moniteurs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(moniteurs $moniteurs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, moniteurs $moniteurs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(moniteurs $moniteurs)
    {
        //
    }
}

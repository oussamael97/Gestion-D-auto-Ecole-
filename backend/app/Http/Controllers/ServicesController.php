<?php

namespace App\Http\Controllers;

use App\Models\Services;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Services::all();
        if ($services->count() > 0) {
            return response()->json([
                'status' => 200,
                'services' => $services
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'services' => 'Not found'
            ], 404);
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
    $request->validate([
        'Nom' => 'required|string|max:255',
        'Description' => 'required|string',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    $imagePath = $request->file('image')->store('images', 'public');

    $service = Services::create([
        'Nom' => $request->Nom,
        'Description' => $request->Description,
        'image' => $imagePath  
    ]);

    return response()->json([
        'status' => 201,
        'service' => $service
    ], 201);
}



    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $service = Services::find($id);
    if ($service) {
        return response()->json([
            'status' => 200,
            'service' => $service
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Service not found'
        ], 404);
    }
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Services $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $service = Services::find($id);
        if ($service) {
            $service->update($request->all());
            return response()->json([
                'status' => 200,
                'message' => 'Service updated successfully',
                'service' => $service
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Service not found'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $service = Services::find($id);
    if ($service) {
        $service->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Service deleted successfully'
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Service not found'
        ], 404);
    }
}

}

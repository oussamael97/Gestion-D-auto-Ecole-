<?php

namespace App\Http\Controllers;

use App\Models\Candidats;
use App\Models\moniteurs;
use App\Models\User;
use App\Models\utilisateurs;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function signup(Request $request){
        $validateur=$request->validate([
            'nom'=>'required',
            'prenom'=>'required',
            'telephone'=>'required',
            'motdepaasse'=>'required',
            'role' => 'required|string|in:client,moniteur,admin',
        ]);
           // Hasher le mot de passe
        $motDePasseHash = Hash::make($validateur['motdepaasse']);
        $user = User::create([
            'nom' => $validateur['nom'],
            'prenom' => $validateur['prenom'],
            'telephone' => $validateur['telephone'],
            'motdepaasse' => $motDePasseHash,
            'role' => $validateur['role'],
        ]);
          
        if ($validateur['role'] === 'client') {
            $client = Candidats::create([
                
                'nom'=>$request->nom,
                'prenom'=>$request->prenom,
                'telephone'=>$request->telephone,
                'motdepaasse'=>$motDePasseHash,
                'role'=>$request->role
            ]);
            $token=$user->createToken($user->nom.'_Token' )->plainTextToken;
            return response()->json([
               'status'=>200,
               'username'=>$user->nom,
               'token'=>$token,
               'message'=>'Registered Succssfully',
            ]);
    
        } elseif ($validateur['role'] === 'moniteur') {
            $moniteur = moniteurs::create([
                'nom'=>$request->nom,
                'prenom'=>$request->prenom,
                'telephone'=>$request->telephone,
                'motdepaasse'=>$motDePasseHash,
                'role'=>$request->role,
                'service_id' => $request->service_id ?? 1, // Use default if not provided

            ]);
            $token=$user->createToken($user->nom.'_Token' )->plainTextToken;
            return response()->json([
               'status'=>200,
               'username'=>$user->nom,
               'token'=>$token,
               'message'=>'Registered Succssfully',
            ]);
    
        } elseif ($validateur['role'] === 'admin') {
            $admin = utilisateurs::create([
                'nom'=>$request->nom,
                'prenom'=>$request->prenom,
                'telephone'=>$request->telephone,
                'motdepaasse'=>$motDePasseHash,
                'role'=>$request->role
            ]);
            $token=$user->createToken($user->nom.'_Token' )->plainTextToken;
            return response()->json([
               'status'=>200,
               'username'=>$user->nom,
               'token'=>$token,
               'message'=>'Registered Succssfully',
            ]);
    
        }    return response()->json(['message' => 'User registered successfully'],201);

    
    
    }
    
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|max:191',
            'motdepaasse' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::where('nom', $request->nom)->first();
    
            if (!$user) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Utilisateur invalide',
                ]);
            } else {
                if (Hash::check($request->motdepaasse, $user->motdepaasse)) {
                    // Utilisateur trouvé et mot de passe correct
                    $token = $user->createToken($user->nom . '_Token')->plainTextToken;
    
                    // Déterminer le rôle de l'utilisateur
                    $role = $user->role;
                    $prenom=$user->prenom;
                    $telephone=$user->telephone;
                    return response()->json([
                        'status' => 200,
                        'username' => $user->nom,
                        'role' => $role,
                        'token' => $token,
                        'prenom'=>$prenom,
                        'telephone'=>$telephone,
                        'message' => 'Utilisateur valide',
                    ]);
                } else {
                    // Mot de passe incorrect
                    return response()->json([
                        'status' => 401,
                        'message' => 'Mot de passe incorrect',
                    ]);
                }
            }
        }
    }
   

    public function logout(Request $request)
{
    Auth::logout();
    return response()->json(['message'=>"logout successfully"]);
    /* if ($request->user()) {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'status' => 200,
            'message' => 'Déconnexion réussie',
        ]);
    } else {
        return response()->json([
            'status' => 401,
            'message' => 'Aucun utilisateur authentifié',
        ]);
    } */
}

}

    


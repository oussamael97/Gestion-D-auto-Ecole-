<?php

namespace App\Http\Controllers;

use App\Models\Candidats;
use App\Models\moniteurs;
use App\Models\User;
use App\Models\utilisateurs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
//use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Support\Facades\Validator;

class UtilisateursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $utilisateur=User::all();
        if($utilisateur->count() > 0){
            return response()->json([
                'status'=>200,
                'utilisateur'=>$utilisateur
            ],200);
        }else{
            return response()->json([
                'status'=>404,
                'utilisateur'=>'Not found'
            ],404);
        }
    }
    public function show($id)
    {
        $utilisateur = User::find($id);

        if (!$utilisateur) {
            return response()->json([
                'status' => 404,
                'message' => 'Utilisateur non trouvé',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'utilisateur' => $utilisateur,
        ]);
    }
    public function getPaymentStatus($id)
    {
        $utilisateur = User::find($id);

        if (!$utilisateur || $utilisateur->role !== 'client') {
            return response()->json([
                'status' => 404,
                'message' => 'Utilisateur non trouvé ou non client',
            ], 404);
        }

        $candidat = Candidats::where('nom', $utilisateur->nom)->first();

        if (!$candidat) {
            return response()->json([
                'status' => 404,
                'message' => 'État de paiement non trouvé',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'etatPayment' => $candidat->Etat_de_paiement,
            'categorie'=>$candidat->categorie
        ]);
    }
    public function getMontantStatus($id)
    {
        $utilisateur = User::find($id);

        if (!$utilisateur || $utilisateur->role !== 'client') {
            return response()->json([
                'status' => 404,
                'message' => 'Utilisateur non trouvé ou non client',
            ], 404);
        }

        $candidat = Candidats::where('nom', $utilisateur->nom)->first();

        if (!$candidat) {
            return response()->json([
                'status' => 404,
                'message' => 'État de paiement non trouvé',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'montant' => $candidat->montant,
            'categorie'=>$candidat->categorie
        ]);
    }

    public function updatePaymentStatus(Request $request, $id)
    {
        $utilisateur = User::find($id);

        if (!$utilisateur || $utilisateur->role !== 'client') {
            return response()->json([
                'status' => 404,
                'message' => 'Utilisateur non trouvé ou non client',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'Etat_de_paiement' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 400);
        }

        $candidat = Candidats::where('nom', $utilisateur->nom)->first();

        if (!$candidat) {
            return response()->json([
                'status' => 404,
                'message' => 'État de paiement non trouvé',
            ], 404);
        }

        $candidat->Etat_de_paiement = $request->Etat_de_paiement;
        $candidat->save();

        return response()->json([
            'status' => 200,
            'message' => 'État de paiement mis à jour avec succès',
        ]);
    }
    public function updateMontantStatus(Request $request, $id)
    {
        $utilisateur = User::find($id);

        if (!$utilisateur || $utilisateur->role !== 'client') {
            return response()->json([
                'status' => 404,
                'message' => 'Utilisateur non trouvé ou non client',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'montant' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 400);
        }

        $candidat = Candidats::where('nom', $utilisateur->nom)->first();

        if (!$candidat) {
            return response()->json([
                'status' => 404,
                'message' => 'État de paiement non trouvé',
            ], 404);
        }

        $candidat->montant = $request->montant;
        $candidat->save();

        return response()->json([
            'status' => 200,
            'message' => 'Montant mis à jour avec succès',
        ]);
    }
   /*  public function login(Request $request)
        {
           
            $validator=Validator::make($request->all(),[
                'nom'=>'required|max:191',
                'motdepaasse'=>'required',
                
            ]);
            if($validator->fails()){
                return response()->json([
                    'validation_errors'=>$validator->messages(),
                ]);
            }
            else{
                
                    $user = utilisateurs::where('nom', $request->nom )->first();
 
                    if (! $user  ) {
                       return response()->json([
                        'status'=>401,
                        'message'=>'invalide user'
                       ]);
                    }
                else{
                    $token=$user->createToken($user->nom.'_Token')->plainTextToken;
                    return response()->json([
                        'status'=>200,
                        'username'=>$user->nom,
                        'token'=>$token,
                        'message'=>'valide user',
                    ]);
                }
            }
            
        }  */

       /*  public function register(Request $request){
            $validatedData=Validator::make($request->all(),[
                'nom'=>'required',
                'prenom'=>'required',
                'telephone'=>'required',
                'motdepaasse'=>'required'
            ]);
            if($validateur->fails()){
                return response()->json([
                    'validation_errors'=>$validateur->messages(),
                ]);
            }
            else{
                $user=utilisateurs::create([
                    'nom'=>$request->nom,
                    'prenom'=>$request->prenom,
                    'telephone'=>$request->telephone,
                    'motdepaasse'=>$request->motdepaasse,
                ]);
                 $token=$user->createToken($user->nom.'_Token' )->plainTextToken;
                 return response()->json([
                    'status'=>200,
                    'username'=>$user->nom,
                    'token'=>$token,
                    'message'=>'Registered Succssfully',
                 ]);
            }
        } */


        public function updatee(Request $request, $id)
        {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|max:191',
                'prenom' => 'required|max:191',
                'telephone' => 'required|max:15',
                'role' => 'required|max:50',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->messages(),
                ]);
            }
    
            $utilisateur = User::find($id);
    
            if (!$utilisateur) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Utilisateur non trouvé',
                ], 404);
            }
    
            $utilisateur->nom = $request->nom;
            $utilisateur->prenom = $request->prenom;
            $utilisateur->telephone = $request->telephone;
            $utilisateur->role = $request->role;
            $utilisateur->save();
    
            // Mettre à jour l'enregistrement associé dans la table associée en fonction du rôle
            switch ($request->role) {
                case 'client':
                    Candidats::where('nom', $utilisateur->nom)->update([
                        'nom' => $request->nom,
                        'prenom' => $request->prenom,
                        'telephone' => $request->telephone,
                        'role' => $request->role,
                    ]);
                    break;
                case 'moniteur':
                    moniteurs::where('nom', $utilisateur->nom)->update([
                        'nom' => $request->nom,
                        'prenom' => $request->prenom,
                        'telephone' => $request->telephone,
                        'role' => $request->role,
                    ]);
                    break;
                case 'admin':
                    utilisateurs::where('nom', $utilisateur->nom)->update([
                        'nom' => $request->nom,
                        'prenom' => $request->prenom,
                        'telephone' => $request->telephone,
                        'role' => $request->role,
                    ]);
                    break;
                // Ajouter d'autres cas pour d'autres rôles si nécessaire
                default:
                    // Ne rien faire pour d'autres rôles
                    break;
            }
    
            return response()->json([
                'status' => 200,
                'message' => 'Utilisateur mis à jour avec succès',
                'utilisateur' => $utilisateur,
            ]);
        }
    
        public function destroy($id)
        {
            try {
                $utilisateur = User::findOrFail($id);
                $role = $utilisateur->role;
    
                // Supprimer l'utilisateur du tableau principal
                $utilisateur->delete();
    
                // Supprimer l'enregistrement associé dans la table associée en fonction du rôle
                switch ($role) {
                    case 'client':
                        Candidats::where('nom', $utilisateur->nom)->delete();
                        break;
                    case 'moniteur':
                        moniteurs::where('nom', $utilisateur->nom)->delete();
                        break;
                    case 'admin':
                        utilisateurs::where('nom', $utilisateur->nom)->delete();
                        break;
                    // Ajouter d'autres cas pour d'autres rôles si nécessaire
                    default:
                        // Ne rien faire pour d'autres rôles
                        break;
                }
    
                return response()->json(['message' => 'Utilisateur supprimé avec succès'], 200);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Erreur lors de la suppression de l\'utilisateur'], 500);
            }
        }

    public function store(Request $request){
        $validatedData = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'telephone' => 'required',
            'role' => 'required',
            'motdepaasse' => 'required',
        ]);
    
        $motDePasseHash = Hash::make($validatedData['motdepaasse']);
        $user = User::create([
            'nom' => $validatedData['nom'],
            'prenom' => $validatedData['prenom'],
            'telephone' => $validatedData['telephone'],
            'motdepaasse' => $motDePasseHash,
            'role' => $validatedData['role'],
        ]);
          
        if ($validatedData['role'] === 'client') {
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
    
        } elseif ($validatedData['role'] === 'moniteur') {
            $moniteur = moniteurs::create([
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
    
        } elseif ($validatedData['role'] === 'admin') {
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
  
    

      
}

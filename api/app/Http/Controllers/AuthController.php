<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            return response()->json([
                'token' => $request->user()->createToken('authToken')->plainTextToken,
                'user' => $user
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->token()->revoke();
            return response()->json(['message' => 'Successfully logged out'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

    }

    public function verify(Request $request)
    {
        $isAdmin = $request->user()->isAdministrator == '1';
        return response()->json([
            'message' => 'Successfully logged in',
            'isAdmin' => $isAdmin
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string'
        ]);
        $user = $request->user();
        if (password_verify($request->current_password, $user->password)) {
            $user->password = bcrypt($request->new_password);
            $user->save();
            return response()->json([
                'message' => 'Password changed successfully',
                'success' => true
            ], 200);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}

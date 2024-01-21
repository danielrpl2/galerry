<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = Users::all();

        if ($users->count() > 0) {
            return response()->json([
                'status' => 200,
                'users' => $users,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Tidak Ditemukan',
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:100',
            'password' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'nama_lengkap' => 'required|string|max:100',
            'alamat' => 'required|string|max:200',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {
            $user = Users::create([
                'username' => $request->username,
                'password' => $request->password,
                'email' => $request->email,
                'nama_lengkap' => $request->nama_lengkap,
                'alamat' => $request->alamat,
            ]);

            if ($user) {
                return response()->json([
                    'status' => 200,
                    'message' => "Berhasil Menambah User",
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => "Gagal Menambah!",
                ], 500);
            }
        }
    }

    public function show($userid)
    {
        $user = Users::find($userid);
        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "User Tidak DItemukan!",
            ], 404);
        }
    }

    public function edit($userid)
    {
        $user = Users::find($userid);
        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "User Tidak Ditemukan!",
            ], 404);
        }
    }

    public function update(Request $request, int $userid)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:100',
            'password' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'nama_lengkap' => 'required|string|max:100',
            'alamat' => 'required|string|max:200',
        ]);

        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ], 422);
        } else {

            $user = Users::find($userid);

            if ($user) {

                $user->update([
                    'username' => $request->username,
                    'password' => $request->password,
                    'email' => $request->email,
                    'nama_lengkap' => $request->nama_lengkap,
                    'alamat' => $request->alamat,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => "Berhasil Update User",
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "User Tidak Ditemukan!",
                ], 404);
            }

        }
    }

    public function destroy($userid)
    {
        $user = Users::find($userid);
        if ($user) {
            $user->delete();
            return response()->json([
                'status' => 200,
                'message' => "User Berhasil Dihapus!",
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "User Tidak Ditemukan!",
            ], 404);
        }
    }
}

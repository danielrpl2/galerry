<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;

    protected $table = 'user';
    protected $primaryKey = 'userid'; 
    protected  $fillable = [
        // 'userid',
        'username',
        'password',
        'email',
        'nama_lengkap',
        'alamat'
    ];
}

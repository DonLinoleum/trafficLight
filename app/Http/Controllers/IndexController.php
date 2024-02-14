<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Logs;
use Carbon\Carbon;

class IndexController extends Controller
{
    /* Экшн возвращающий индексный шаблон  */
    public function index(Request $request)
    {
        return view('index');
    }

    /* Экшн отдающий все записи по логам  */
    public function getAll (Request $request)
    {
        $data = Logs::take(100)
            ->get()
            ->map(function($elem) {
        $formatted_data = 
        [   
            'created_at' => Carbon::parse($elem->created_at)->format("Y-m-d H:i:s"),
            'log' => $elem->log
        ];    
        return $formatted_data;
    });
    return response()->json(['data' => $data]);
    }

    /* Экшн принимающий запрос на добавление лога в БД и отдающий добавленную запись */
    public function addNewLog (Request $request)
    {
        $return_data = [];
        $log_text = $request->json()->all();
        if (!empty($log_text))
        {
            $logs_model = new Logs();
            $logs_model->log = $log_text['data'];
            $logs_model->save();
        
        $return_data = 
        [
            'created_at' => Carbon::parse($logs_model->created_at)->format("Y-m-d H:i:s"),
            'log' => $logs_model->log
        ];
        }
        return response()->json(['data'=> $return_data]);
    }
}

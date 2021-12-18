<?php

    //öncelikle db.php isimli dosyayı çalıştırarak database'e bağlantı kuruyoruz
    include('db.php');

    //çerezlerden table, auth ve fw değerlerini alıp tanımlıyoruz
    $table = $_COOKIE["table"];
    $auth = $_COOKIE["auth"];
    $fw = $_COOKIE["fw"];

    //eğer users tablosunda işlem yapılacaksa
    if($table == 'users'){
        //eğer kullanıcı yetkiliyse veya kendisiyle ilgili bir işlem yapıyorsa
        if($auth == 'true' || $fw == 'true'){
            
            //users tablosundaki tüm kullanıcıları seçip gönderiyoruz
            $result = mysqli_query($conn, "SELECT * FROM $table");
            $data = array();
            while($row = mysqli_fetch_assoc($result)){
                $data[] = $row;
            }
            echo json_encode($data);

        //eğer kullanıcı yetkili değilse ve kendisiyle ilgili bir işlem yapmıyorsa
        }else{
            echo json_encode(array("statusCode"=>201));
        }

    //eğer pets tablosunda işlem yapılacaksa
    }else if ($table == 'pets'){
        //pets tablosundaki tüm petleri seçip gönderiyoruz
        $result = mysqli_query($conn, "SELECT * FROM $table");
        $data = array();
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
        echo json_encode($data);
    }
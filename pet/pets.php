<?php

    include '../config/db.php';

    //boş bir dizi oluşturuyoruz
    $data = array();

    //url ile bize bir pkey gönderilmiş mi kontrol ediyoruz
    //users-deneme.php/?pkey= ...
    if(isset($_GET['pkey'])){
        $pkey = $_GET['pkey'];
        //daha sonra bu pkey değerine sahip kullanıcıların hepsini listeliyoruz
        $result = mysqli_query($conn, "SELECT * FROM pets WHERE pkey='$pkey'");
        //her peti önceden oluşturduğumuz boş dizine ekliyoruz
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
        //bulduğumuz petin id, token, uName, fName, lName, pw değerlerini alıyoruz
        $newsql = "SELECT id, pkey, pName, pType, uName FROM pets WHERE pkey='$pkey'";
    }else{
        //url ile bize id gönderilmediyse tüm kullanıcıları seçiyoruz
        $result = mysqli_query($conn, "SELECT * FROM pets");
        //seçtiğimiz kullanıcıların hepsini önceden oluşturduğumuz boş dizine ekliyoruz
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
        //her birinin id, token, uName, fName, lName, pw değerlerini alıyoruz
        $newsql = "SELECT id, pkey, pName, pType, uName FROM pets";
    }

    //bulunan kullanıcının veya kullanıcıların sayısını tanımlıyoruz
    $itemCount = count($data);

    //eğer bir sonuç bulduysa aşağıdaki işlemleri yapıyoruz
    if($itemCount > 0){
        
        //boş bir dizin oluşturuyoruz
        $petArr = array();
        //oluşturduğumuz dizinin içine pets diye ayrı bir dizin oluşturuyoruz
        $petArr["pets"] = array();
        //petCount diye ayrı bir dizin daha oluşturuyoruz
        $petArr["petCount"] = $itemCount;

        $secondResult = mysqli_query($conn, $newsql);

        if (mysqli_num_rows($secondResult) > 0) {

            while($row = mysqli_fetch_assoc($secondResult)) {
                //tüm petlerin sahip olduğu bilgileri liste halinde yazıyoruz
                $e = array(
                    "id" => $row["id"],
                    "pkey" => $row["pkey"],
                    "pName" => $row["pName"],
                    "pType" => $row["pType"],
                    "uName" => $row["uName"]
                );
                //bu bilgilerin her birini bir satır olarak petArr dizinindeki pets kısmına ekliyoruz
                array_push($petArr["pets"], $e);
            }
            //petArr dizinini sonuç olarak gönderiyoruz
            //echo json_encode($petArr);

            if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
                $deleteQuery="DELETE from pets WHERE pkey='$pkey'";
                mysqli_query($conn,$deleteQuery);
                http_response_code(200);
            } else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){

                $pName = $_GET['pName'];
                    $pType = $_GET['pType'];
                    $newPkey = $_GET['newPkey'];
                    $editQuery = "UPDATE pets SET pkey='$newPkey', pName='$pName', pType='$pType' WHERE pkey='$pkey'";
                    mysqli_query($conn ,$editQuery);
                    http_response_code(200);

            }
            //echo json_encode($userArr);
        }
    }

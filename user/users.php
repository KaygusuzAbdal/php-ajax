<?php

    include '../config/db.php';

    //boş bir dizi oluşturuyoruz
    $data = array();

    //url ile bize bir token gönderilmiş mi kontrol ediyoruz
    //users-deneme.php/?token= ...
    if(isset($_GET['token'])){
        $token = $_GET['token'];
        //daha sonra bu token değerine sahip kullanıcıların hepsini listeliyoruz
        $result = mysqli_query($conn, "SELECT * FROM users WHERE BINARY token='$token'");
        //her kullanıcıyı önceden oluşturduğumuz boş dizine ekliyoruz
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
        //bulduğumuz kullanıcının id, token, uName, fName, lName, pw değerlerini alıyoruz
        $newsql = "SELECT id, token, uName, fName, lName, pw FROM users WHERE BINARY token='$token'";
    }else{
        //url ile bize id gönderilmediyse tüm kullanıcıları seçiyoruz
        $result = mysqli_query($conn, "SELECT * FROM users");
        //seçtiğimiz kullanıcıların hepsini önceden oluşturduğumuz boş dizine ekliyoruz
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
        //her birinin id, token, uName, fName, lName, pw değerlerini alıyoruz
        $newsql = "SELECT id, token, uName, fName, lName, pw FROM users";
    }

    //bulunan kullanıcının veya kullanıcıların sayısını tanımlıyoruz
    $itemCount = count($data);
    //eğer bir sonuç bulduysa aşağıdaki işlemleri yapıyoruz
    if($itemCount > 0){
        
        //boş bir dizin oluşturuyoruz
        $userArr = array();
        //oluşturduğumuz dizinin içine users diye ayrı bir dizin oluşturuyoruz
        $userArr["users"] = array();
        //userCount diye ayrı bir dizin daha oluşturuyoruz
        $userArr["userCount"] = $itemCount;
        $secondResult = mysqli_query($conn, $newsql);
        if (mysqli_num_rows($secondResult) > 0) {

            while($row = mysqli_fetch_assoc($secondResult)) {
                //tüm kullanıcıların sahip olduğu bilgileri liste halinde yazıyoruz
                $e = array(
                    "id" => $row["id"],
                    "token" => $row["token"],
                    "uName" => $row["uName"],
                    "fName" => $row["fName"],
                    "lName" => $row["lName"]
                );
                //bu bilgilerin her birini bir satır olarak userArr dizinindeki users kısmına ekliyoruz
                array_push($userArr["users"], $e);
            }
            //userArr dizinini sonuç olarak gönderiyoruz

            if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){

                $authentication = $_GET['auth']; //true
                $fw = $_GET['fw']; //false

                if ($authentication == 'true'){
                    
                    $username = $_GET['uName'];

                    if($username === 'Ozlem'){
                        http_response_code(403);
                    }else{
                        $deleteQuery="DELETE from users WHERE BINARY token='$token'";
                        $checkDelete = mysqli_query($conn, $deleteQuery);
                        if($checkDelete){
                            http_response_code(200);
                        }else{
                            http_response_code(404);
                        }
                    }

                } else if ($fw == 'true'){

                    if(isset($_GET['uName'])){

                        $username = $_GET['uName'];

                        if($username === 'Ozlem'){
                            http_response_code(403);
                        }else{
                            $qdeleteQuery="DELETE from users WHERE token='$token'";
                            mysqli_query($conn,$qdeleteQuery);
                            http_response_code(200);
                        }

                    }
                }

            } else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){

                if(isset($_GET['fName']) && isset($_GET['lName'])){
                    $fName = $_GET['fName'];
                    $lName = $_GET['lName'];
                    $editQuery = "UPDATE users SET fName='$fName', lName='$lName' WHERE token='$token'";
                    mysqli_query($conn ,$editQuery);
                    http_response_code(200);
                }else{
                    http_response_code(400);
                }

            } else if ($_SERVER['REQUEST_METHOD'] === 'GET'){

                if(isset($_GET['uName'])){
                    $uName = $_GET['uName'];
                    $getQuery = "SELECT * FROM users WHERE BINARY uName='$uName'";
                    $selectUser = mysqli_query($conn ,$getQuery);
                    $getuserdata = array();
                    while($userrow = mysqli_fetch_assoc($selectUser)){
                        $getuserdata = $userrow;
                    }
                    echo json_encode($getuserdata);
                    http_response_code(200);
                }
            }
            //echo json_encode($userArr);
        }
    }else{
        http_response_code(404);
    }

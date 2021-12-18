function login(event: Event , token : String): void{
    event.preventDefault();
    //username and password values ​​entered as input
    const tryName = (document.getElementById("loginUname") as HTMLFormElement).value;
    const tryPassword = (document.getElementById("loginPword") as HTMLFormElement).value;
    //database transaction request
    $.ajax({
        url: "authentication/login.php", //PHP file for login process
        type: "POST",
        data: {                     //send the username 
            uName: tryName,        //and password to the PHP file
            pw: tryPassword
        },
        cache: false,
        success: function(dataResult: any){
            //in this function, results are turned into JSON
            dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                //register form and login modal is closed
                document.getElementById("exampleModalCenter").click();
                document.getElementById("registerForm").style.display = "none";
                //navbar is modified for showing user information and options
                document.getElementById("userinfo").innerHTML = `
                <li class="nav-item dropdown dropdown-user">
                    <a role="button" aria-expanded="false" aria-haspopup="true" href="#" target="_self" class="nav-link dropdown-toggle d-flex align-items-center dropdown-user-link" id="User_toggle" onclick="openUserDropDown(this)">
                        <div class="d-sm-flex d-none user-nav">
                            <p class="mb-0 ml-1" id="navbarUname" data-uname="`+ dataResult.username +`">`+ dataResult.username +`</p>
                        </div>
                    </a>
                    <ul tabindex="-1" class="dropdown-menu dropdown-menu-right" data-target="User_toggle">
                        <li role="presentation">
                            <a href="#" data-uname="`+ dataResult.username +`" onclick="userSetting(this)" class="dropdown-item d-flex align-items-center">
                                <span>Settings</span>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" onclick="logout()" class="dropdown-item d-flex align-items-center">
                                <span>Logout</span>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" data-uname="`+ dataResult.username +`" onclick="deleteAccount(this)" class="dropdown-item d-flex align-items-center text-danger" style="color:#dc3545!important;">
                                <span>Delete my account</span>
                            </a>
                        </li>
                    </ul>
                </li>
                `;
                //pets table is visible ve and username is written into user name part in the table
                (document.getElementById("uNameForPet") as HTMLFormElement).value = dataResult.username;
                document.getElementById("yourPets").style.display = "block";
                //token and auth is defined in the javascript file
                token = dataResult.token;
                auth = dataResult.auth;
                //token and auth informations are saved as cookies
                document.cookie = "token=" + token + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                document.cookie = "auth=" + auth + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                document.cookie = "fw=; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                document.cookie = "username=" + dataResult.username + "; expires=Thu, 15 Jun 2023 12:00:00 UTC; path=/";
                if(auth){ // if user is authenticated ( admin) 
                    //users and pets tables are shown without any filter
                    document.getElementById("secret").style.display = "block";
                    renderList("pets");
                    setTimeout(() => renderList("users"), 10);
                }else{
                    //only pets table is shown and filtered
                    renderList("pets");
                    hideOtherPets(dataResult.username);
                }
                //success and error messages are hidden
                document.getElementById("registerSuccess").style.display="none";
                document.getElementById("loginErrorArea").style.display="none";
            }
            else if(dataResult.statusCode==422){ // if password or username is wrong
                //error message is shown to the user
                document.getElementById("loginErrorArea").style.display="block";
                document.getElementById("loginErrorArea").innerHTML = `<p class="text-danger px-4">incorrect username or password</p>`;
            }
        }
    });
}
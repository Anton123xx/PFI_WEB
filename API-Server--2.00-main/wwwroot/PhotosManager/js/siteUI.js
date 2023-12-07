//import validation from '.validation';


let loggedUser = JSON.parse(sessionStorage.getItem("user"));
let contentScrollPosition = 0;
let loginMessage = "";
let connected = false;/////
let isAdmin = false;/////

console.log(loggedUser);

if (loggedUser == undefined || loggedUser === null) {
    loggedUser = {};
    loggedUser.Id = 0;
    Email = "";
    //loginMessage = "login puceau";
    EmailError = "Vous devez mettre un email";
    passwordError = "Vous devez mettre un password";
}
else
{
    Email = "";
    EmailError = "connecter";
    passwordError = "Vous devez mettre un password";
    connected = true;
}


async function getLoggedUser()
{
    return await API.retrieveLoggedUser();
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Views rendering
function showWaitingGif() {
    eraseContent();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='images/Loading_icon.gif' /></div>'"));
}
function eraseContent() {
    $("#content").empty();
}
function saveContentScrollPosition() {
    contentScrollPosition = $("#content")[0].scrollTop;
}
function restoreContentScrollPosition() {
    $("#content")[0].scrollTop = contentScrollPosition;
}
let currentPage = "";
function UpdateHeader(viewtitle, page) {
    checkAuthorizations();
    $("#header").empty();
    currentPage = page;
    function dropDownMenu() {
        //let connected = true;
        if (connected) {
            if (isAdmin) {
                return `<div class="dropdown ms-auto dropdownLayout">
                <div data-bs-toggle="dropdown" aria-expanded="false">
                <i class="cmdIcon fa fa-ellipsis-vertical"></i>
                </div>
                <div class="dropdown-menu noselect">
                <span class="dropdown-item" id="manageUserCm">
                <i class="menuIcon fas fa-user-cog mx-2"></i>
                Gestion des usagers
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="logoutCmd">
                <i class="menuIcon fa fa-sign-out mx-2"></i>
                Déconnexion
                </span>
                <span class="dropdown-item" id="editProfilMenuCmd">
                <i class="menuIcon fa fa-user-edit mx-2"></i>
                Modifier votre profil
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="listPhotosMenuCmd">
                <i class="menuIcon fa fa-image mx-2"></i>
                Liste des photos
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="sortByDateCmd">
                <i class="menuIcon fa fa-check mx-2"></i>
                <i class="menuIcon fa fa-calendar mx-2"></i>
                Photos par date de création
                </span>
                <span class="dropdown-item" id="sortByOwnersCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-users mx-2"></i>
                Photos par créateur
                </span>
                <span class="dropdown-item" id="sortByLikesCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-user mx-2"></i>
                Photos les plus aiméés
                </span>
                <span class="dropdown-item" id="ownerOnlyCmd">
                <i class="menuIcon fa fa-fw mx-2"></i>
                <i class="menuIcon fa fa-user mx-2"></i>
                Mes photos
                </span>
                <div class="dropdown-divider"></div>
                <span class="dropdown-item" id="aboutCmd">
                <i class="menuIcon fa fa-info-circle mx-2"></i>
                À propos...
                </span>
                </div>
                </div>`;
            }
            return `<div class="dropdown ms-auto dropdownLayout">
            <div data-bs-toggle="dropdown" aria-expanded="false">
            <i class="cmdIcon fa fa-ellipsis-vertical"></i>
            </div>
            <div class="dropdown-menu noselect">
           
            <span class="dropdown-item" id="logoutCmd">
            <i class="menuIcon fa fa-sign-out mx-2"></i>
            Déconnexion
            </span>
            <span class="dropdown-item" id="editProfilMenuCmd">
            <i class="menuIcon fa fa-user-edit mx-2"></i>
            Modifier votre profil
            </span>
            <div class="dropdown-divider"></div>
            <span class="dropdown-item" id="listPhotosMenuCmd">
            <i class="menuIcon fa fa-image mx-2"></i>
            Liste des photos
            </span>
            <div class="dropdown-divider"></div>
            <span class="dropdown-item" id="sortByDateCmd">
            <i class="menuIcon fa fa-check mx-2"></i>
            <i class="menuIcon fa fa-calendar mx-2"></i>
            Photos par date de création
            </span>
            <span class="dropdown-item" id="sortByOwnersCmd">
            <i class="menuIcon fa fa-fw mx-2"></i>
            <i class="menuIcon fa fa-users mx-2"></i>
            Photos par créateur
            </span>
            <span class="dropdown-item" id="sortByLikesCmd">
            <i class="menuIcon fa fa-fw mx-2"></i>
            <i class="menuIcon fa fa-user mx-2"></i>
            Photos les plus aiméés
            </span>
            <span class="dropdown-item" id="ownerOnlyCmd">
            <i class="menuIcon fa fa-fw mx-2"></i>
            <i class="menuIcon fa fa-user mx-2"></i>
            Mes photos
            </span>
            <div class="dropdown-divider"></div>
            <span class="dropdown-item" id="aboutCmd">
            <i class="menuIcon fa fa-info-circle mx-2"></i>
            À propos...
            </span>
            </div>
            </div>`;
        } else {
            return ``;
        }
    }
    if(connected){
        $("#header").html(`<span title="Liste des photos" id="listPhotosCmd">
        <img src="images/PhotoCloudLogo.png" class="appLogo">
         </span>
        <span class="viewTitle">${viewtitle}
        <div class="cmdIcon fa fa-plus" id="newPhotoCmd" title="Ajouter une photo"></div>
        </span>
        <div class="headerMenusContainer">
        <span>&nbsp;</span> <!--filler-->
        
        <img class="avatar" alt="Avatar" src="${loggedUser.Avatar }">
        <div class="dropdown ms-auto dropdownLayout">
        <!-- Articles de menu -->
        ${dropDownMenu()}
        </div>
        </div>
        `);
    }else{
        $("#header").html(`<span title="Liste des photos" id="listPhotosCmd">
        <img src="images/PhotoCloudLogo.png" class="appLogo">
         </span>
        <span class="viewTitle">${viewtitle}
        <div class="cmdIcon fa fa-plus" id="newPhotoCmd" title="Ajouter une photo"></div>
        </span>
        <div class="headerMenusContainer">
        <span>&nbsp;</span> <!--filler-->
        <div class="dropdown ms-auto dropdownLayout">
        <!-- Articles de menu -->
        ${dropDownMenu()}
        </div>
        </div>
        `);
    }
   
    if(loggedUser !== undefined || loggedUser !== null){
        $('#editProfilMenuCmd').on("click",renderEditProfil);
        $('#logoutCmd').on("click", function(event){
            connected = false;
            isAdmin = false;
            event.preventDefault();// empêcher le fureteur de soumettre une requête de soumission
            API.logout(); // commander la création au service API
            renderLoginForm();
            loggedUser = undefined;
            
        });
    }

    
    
}
function renderAbout() {
    timeout();
    saveContentScrollPosition();
    eraseContent();
    UpdateHeader("À propos...", "about");

    $("#content").append(
        $(`
            <div class="aboutContainer">
                <h2>Gestionnaire de photos</h2>
                <hr>
                <p>
                    Petite application de gestion de photos multiusagers à titre de démonstration
                    d'interface utilisateur monopage réactive.
                </p>
                <p>
                    Auteur: Nicolas Chourot
                </p>
                <p>
                    Collège Lionel-Groulx, automne 2023
                </p>
            </div>
        `))
}

$(() => {
    //renderAbout();
    //renderSite();



   renderLoginForm();
  


});


function renderSite() {
    loggedUser = RecheckLoggedUser();
    eraseContent(); // effacer le conteneur #content
    UpdateHeader("Liste de photo", "photos");
    $("#newPhotoCmd").hide(); // camouffler l’icone de commande d’ajout de photo
    $("#content").append('');
}


function renderCreateProfil() {
    loggedUser = RecheckLoggedUser();
    noTimeout(); // ne pas limiter le temps d’inactivité
    eraseContent(); // effacer le conteneur #content
    UpdateHeader("Inscription", "createProfil"); // mettre à jour l’entête et menu
    $("#newPhotoCmd").hide(); // camouffler l’icone de commande d’ajout de photo
    $("#content").append(`
    <form class="form" id="createProfilForm"'>
<fieldset>
<legend>Adresse ce courriel</legend>
<input type="email"
class="form-control Email"
name="Email"
id="Email"
placeholder="Courriel"
required
RequireMessage = 'Veuillez entrer votre courriel'
InvalidMessage = 'Courriel invalide'
CustomErrorMessage ="Ce courriel est déjà utilisé"/>
<input class="form-control MatchedInput"
type="text"
matchedInputId="Email"
name="matchedEmail"
id="matchedEmail"
placeholder="Vérification"
required
RequireMessage = 'Veuillez entrez de nouveau votre courriel'
InvalidMessage="Les courriels ne correspondent pas" />
</fieldset>
<fieldset>
<legend>Mot de passe</legend>
<input type="password"
class="form-control"
name="Password"
id="Password"
placeholder="Mot de passe"
required
RequireMessage = 'Veuillez entrer un mot de passe'
InvalidMessage = 'Mot de passe trop court'/>
<input class="form-control MatchedInput"
type="password"
matchedInputId="Password"
name="matchedPassword"
id="matchedPassword"
placeholder="Vérification" required
InvalidMessage="Ne correspond pas au mot de passe" />
</fieldset>
<fieldset>
<legend>Nom</legend>
<input type="text"
class="form-control Alpha"
name="Name"
id="Name"
placeholder="Nom"
required
RequireMessage = 'Veuillez entrer votre nom'
InvalidMessage = 'Nom invalide'/>
</fieldset>
<fieldset>
<legend>Avatar</legend>
<div class='imageUploader'
newImage='true'
controlId='Avatar'
imageSrc='images/no-avatar.png'
waitingImage="images/Loading_icon.gif">
</div>
</fieldset>
<input type='submit' name='submit' id='saveUserCmd' value="Enregistrer" class="form-control btn-primary">
</form>
<div class="cancel">
<button class="form-control btn-secondary" id="abortCmd">Annuler</button>
</div>
    `);
    $('#loginCmd').on('click', renderLoginForm); // call back sur clic
    initFormValidation();
    initImageUploaders();
    $('#abortCmd').on('click', renderLoginForm); // call back sur clic
    // ajouter le mécanisme de vérification de doublon de courriel
    addConflictValidation(API.checkConflictURL(), 'Email', 'saveUser');
    // call back la soumission du formulaire
    $('#createProfilForm').on("submit", function (event) {
        let profil = getFormData($('#createProfilForm'));
        delete profil.matchedPassword;
        delete profil.matchedEmail;
        event.preventDefault();// empêcher le fureteur de soumettre une requête de soumission
        showWaitingGif(); // afficher GIF d’attente
        API.register(profil); // commander la création au service API
    });
}


function renderEditProfil() {
    loggedUser = RecheckLoggedUser();
    loggedUser = JSON.parse(sessionStorage.getItem("user"));
    noTimeout(); // ne pas limiter le temps d’inactivité
    eraseContent(); // effacer le conteneur #content
    UpdateHeader("Inscription", "editProfil"); // mettre à jour l’entête et menu
    $("#newPhotoCmd").hide(); // camouffler l’icone de commande d’ajout de photo
    $("#content").append(`
    <form class="form" id="editProfilForm"'>
    <input type="hidden" name="Id" id="Id" value="${loggedUser.Id}"/>
    <fieldset>
    <legend>Adresse ce courriel</legend>
    <input type="email"
    class="form-control Email"
    name="Email"
    id="Email"
    placeholder="Courriel"
    required
    RequireMessage = 'Veuillez entrer votre courriel'
    InvalidMessage = 'Courriel invalide'
    CustomErrorMessage ="Ce courriel est déjà utilisé"
    value="${loggedUser.Email}" >
    <input class="form-control MatchedInput"
    type="text"
    matchedInputId="Email"
    name="matchedEmail"
    id="matchedEmail"
    placeholder="Vérification"
    required
    RequireMessage = 'Veuillez entrez de nouveau votre courriel'
    InvalidMessage="Les courriels ne correspondent pas"
    value="${loggedUser.Email}" >
    </fieldset>
    <fieldset>
    <legend>Mot de passe</legend>
    <input type="password"
    class="form-control"
    name="Password"
    id="Password"
    placeholder="Mot de passe"
    InvalidMessage = 'Mot de passe trop court' >
    <input class="form-control MatchedInput"
    type="password"
    matchedInputId="Password"
    name="matchedPassword"
    id="matchedPassword"
    placeholder="Vérification"
    InvalidMessage="Ne correspond pas au mot de passe" >
    </fieldset>
    <fieldset>
    <legend>Nom</legend>
    <input type="text"
    class="form-control Alpha"
    name="Name"
    id="Name"
    placeholder="Nom"
    required
    RequireMessage = 'Veuillez entrer votre nom'
    InvalidMessage = 'Nom invalide'
    value="${loggedUser.Name}" >
    </fieldset>
    <fieldset>
    <legend>Avatar</legend>
    <div class='imageUploader'
    newImage='false'
    controlId='Avatar'
    imageSrc='${loggedUser.Avatar}'
    waitingImage="images/Loading_icon.gif">
    </div>
    </fieldset>
    <input type='submit'
    name='submit'
    id='saveUserCmd'
    value="Enregistrer"
    class="form-control btn-primary">
    </form>
    <div class="cancel">
    <button class="form-control btn-secondary" id="abortCmd">Annuler</button>
    </div>
    <div class="cancel"> <hr>
    <button class="form-control btn-warning" id="effacerCompte">Effacer le compte</button>
    </a>
    </div>
    `);
    initFormValidation();
    initImageUploaders();
    $('#abortCmd').on('click', renderSite); // call back sur clic

    $('#effacerCompte').on('click', renderConfirmationRetraitDeCompte); // call back sur clic
    // ajouter le mécanisme de vérification de doublon de courriel
    addConflictValidation(API.checkConflictURL(), 'Email', 'saveUser');
    // call back la soumission du formulaire
    $('#editProfilForm').on("submit", function (event) {
        let profil = getFormData($('#editProfilForm'));
        delete profil.matchedPassword;
        delete profil.matchedEmail;
        event.preventDefault();// empêcher le fureteur de soumettre une requête de soumission
        showWaitingGif(); // afficher GIF d’attente
        API.modifyUserProfil(profil); // commander la création au service API
    });

    
}
;


function renderLoginForm() {
    if(!connected){
        loggedUser = RecheckLoggedUser();
        console.log(loggedUser);
        if(loginMessage == ""){
            if(connected){
                loginMessage = loggedUser.Name;
            }else{
                loginMessage = "";
            }
        }
    
        noTimeout(); // ne pas limiter le temps d’inactivité
        eraseContent(); // effacer le conteneur #content
        UpdateHeader("Connexion", "login"); // mettre à jour l’entête et menu
        $("#newPhotoCmd").hide(); // camouffler l’icone de commande d’ajout de photo
        $("#content").append(`
        <h3>${loginMessage}</h3>
        <form class="form" id="loginForm">
        <input type='email'
        name='Email'
        class="form-control"
        required
        RequireMessage = 'Veuillez entrer votre courriel'
        InvalidMessage = 'Courriel invalide'
        placeholder="adresse de courriel"
        value='${Email}'>
        <span style='color:red'>${EmailError}</span>
        <input type='password'
        name='Password'
        placeholder='Mot de passe'
        class="form-control"
        required
        RequireMessage = 'Veuillez entrer votre mot de passe'>
        <span style='color:red'>${passwordError}</span>
        <input type='submit' name='submit' value="Entrer" class="form-control btn-primary">
        </form>
        <div class="form">
        <hr>
        <button class="form-control btn-info" id="createProfilCmd">Nouveau compte</button>
        </div>
        `);
        $('#createProfilCmd').on('click', renderCreateProfil); // call back sur clic
        initFormValidation();
        initImageUploaders();
        $('#abortCmd').on('click', renderLoginForm); // call back sur clic
        // ajouter le mécanisme de vérification de doublon de courriel
        addConflictValidation(API.checkConflictURL(), 'Email', 'saveUser');
        // call back la soumission du formulaire
        $('#loginForm').on("submit", function (event) {
            let profil = getFormData($('#loginForm'));
            event.preventDefault();// empêcher le fureteur de soumettre une requête de soumission
            showWaitingGif();
            let result = API.login(profil.Email,profil.Password)
            if( result != null)
            {
                
                connected = true;
            } 
            else
            {
                if(API.currentStatus == 481)
                {
                   EmailError = "faekfmael";
                   renderLoginForm();
                }

                if(API.currentStatus == 482)
                {
                    passwordError = "fekamfol";
                    renderLoginForm();
                }

                
            }
           
        });
    }else{
        renderSite();
    }
    
}

function renderConfirmationRetraitDeCompte() {
    loggedUser = RecheckLoggedUser();
    let message = "Voulez-vous vraiment effacer votre compte?"

    noTimeout(); // ne pas limiter le temps d’inactivité
    eraseContent(); // effacer le conteneur #content
    UpdateHeader("Connexion", "login"); // mettre à jour l’entête et menu
    $("#newPhotoCmd").hide(); // camouffler l’icone de commande d’ajout de photo
    $("#content").append(`
    <h3>${message}</h3>
    <div class="cancel">
    <button class="form-control btn-secondary" style="background-color: red;border: none;height: 70px;" id="delete">Effacer mon compte</button>
    </div>
    <div class="espace"></div>
    <div class="cancel">
    <button class="form-control btn-secondary" id="abortCmd">Annuler</button>
    </div>
    `);
    initFormValidation();
    initImageUploaders();
    $('#abortCmd').on('click', renderEditProfil); // call back sur clic
    // ajouter le mécanisme de vérification de doublon de courriel
    addConflictValidation(API.checkConflictURL(), 'Email', 'saveUser');
    // call back la soumission du formulaire
    
    $('#delete').on('click', function(event){
        API.unsubscribeAccount(loggedUser.Id);
        event.preventDefault();// empêcher le fureteur de soumettre une requête de soumission
        showWaitingGif(); // afficher GIF d’attente
        API.logout();
        connected = false;
    });
}

function getFormData($form) {
    const removeTag = new RegExp("(<[a-zA-Z0-9]+>)|(</[a-zA-Z0-9]+>)", "g");
    var jsonObject = {};
    $.each($form.serializeArray(), (index, control) => {
        jsonObject[control.name] = control.value.replace(removeTag, "");
    });
    return jsonObject;
}

function checkAuthorizations(){

    loggedUser = RecheckLoggedUser();
    if(loggedUser !== undefined && loggedUser !== null){
        if(connected){

            if(loggedUser.Authorizations.readAccess === 2 && loggedUser.Authorizations.writeAccess === 2){
                isAdmin = true;
                connected = true;
            }
            if(loggedUser.Authorizations.readAccess === 1 && loggedUser.Authorizations.writeAccess === 1){
                isAdmin = false;
                connected = true;
            }
            
            if(loggedUser.Authorizations.readAccess === 0 && loggedUser.Authorizations.writeAccess === 0){
                connected = false;
                isAdmin = false;
            }
        }
    }
}

function RecheckLoggedUser(){
    return JSON.parse(sessionStorage.getItem("user"));
}






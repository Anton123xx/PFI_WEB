import AccountsController from "../controllers/AccountsController";
import Token from "../models/token";
import TokensManager from "../tokensManager";


function renderCreateProfil() {
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
        createProfil(profil); // commander la création au service API
    });
}

function createProfil(profil)
{
    
    AccountsController.register(profil);
   // {"Id": 0, "Name": "...", "Email": "...", "Password": "..."}
}

function editProfil()
{
    AccountsController.modify(profil);
}

function deleteProfil()
{
    AccountsController.deleteProfil(profil);
}






function renderLoginForm() {
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
    delete profil.matchedPassword;
    delete profil.matchedEmail;
    event.preventDefault();// empêcher le fureteur de soumettre une requête de soumission
    showWaitingGif(); // afficher GIF d’attente
    login(profil); // commander la création au service API
    });
    }


    function login(profil)
    {
        //TokensManager.login(profil);
        AccountsController.login(profil);
    }

    
    function logout(profil)
    {
        //TokensManager.login(profil);
        AccountsController.logout(profil);
    }
import { enregistrerNom } from './firebaseApp.js';


//attendre que la page charge completement
window.addEventListener("load", ()=>
{
  var nom_courant;
  var existe = false;
  let formule = document.getElementById('formule');

  //Listener sur le boutton soumettre qui enregistre le nom dans une variable globale et enregistrer dans Firebase
  formule.addEventListener('submit', function(event)
  {
    event.preventDefault();//Evité la page de se rafra[ichir

    nom_courant = document.getElementById('username').value;


    enregistrerNom(nom_courant);
  });

  //Listener sur le bouton 'retour a l'accueil'  qui enregistre le nom dans le ol de classement si il n'est pas deja present et different de null
  let accuil = document.getElementById("accueil")
  accueil.addEventListener("click", ()=>
  {
    if (nom_courant)
    {
      let classement = document.getElementById('classement');
      let nom_tab = classement.querySelectorAll('li');
      let exite = false;

      nom_tab.forEach( (n) =>
      {
        if(n.textContent === nom_courant)
        {
           existe = true;
        }
      });

      if(!existe)
      {
        let newli = document.createElement('li');
        newli.textContent = nom_courant;
        classement.appendChild(newli);
      }
      nom_courant = null;
    }
  });
});

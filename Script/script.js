
    let valider = () => {
        const firstname = document.formulaire.firstname.value;
        const lastname = document.formulaire.lastname.value;
        const email = document.formulaire.email.value;
      
        if (!firstname) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Prénom invalide !'
          });
        } else if (!lastname) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Nom de famille invalide !'
          });
        } else if (!email) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Email invalide !'
          });
        } else {
            alertFormulaire();
          formulaire.reset();
        }
      }


    let articles = {
        MacBookPro : 3250,
        Iphone14Pro : 1650,
        AppleWatch : 450,
        AirPodsMax : 650,
    }

    
    let panier = {
    
    }


    let ajouter = (item) => {
        if (panier[item]) {
            panier[item]++
            alertAddPanier();
 
        }
        else{
            panier[item] = 1
            alertAddPanier();
        }
        
        refreshPanier();
    }


    let retirer = (item) => {
        if (!panier[item]) {
            return;
        }
        else if(panier[item] == 1){
            delete panier[item]
        }
        else{
            panier[item]--
        }
    
        refreshPanier()
    }


    let refreshPanier = () => {
        let tabPanier = document.getElementById("Panier")
        tabPanier.innerHTML = ""
        let prixTotal = 0
        let totalArticles = 0;
        for (const prop in panier) {
            tabPanier.appendChild(createPanierRow(prop, articles[prop], panier[prop]))
            prixTotal += articles[prop] * panier[prop];
            totalArticles += parseInt(panier[prop]);

        }
    
        tabPanier.appendChild(createPanierRow("Total", prixTotal, totalArticles))

        totalArticles =+ parseInt(nbrLabel);

    }


    let createPanierRow = (nomLabel, prixLabel, nbrLabel) => {
        let tr = document.createElement("tr");
        let nom = document.createElement("td")
        let prix = document.createElement("td")
        let nbr = document.createElement("td")
    
        nom.innerHTML = nomLabel;
        prix.innerHTML = prixLabel;
        nbr.innerHTML = nbrLabel;
    
        tr.appendChild(nom)
        tr.appendChild(prix)
        tr.appendChild(nbr)

        if (nomLabel.includes("Total")) {
            tr.style.border = "2px solid black"; 
            prix.style.borderTop = "2px solid black"; 
        }
    

        return tr;
    }


    let createArticleRow = (nomLabel, prixLabel) => {
        let tabArticles = document.getElementById("Articles")
        let tr = document.createElement("tr")
        let nom = document.createElement("td")
        let prix = document.createElement("td")
        nom.innerHTML = nomLabel;
        prix.innerHTML = prixLabel
        tr.appendChild(nom);
        tr.appendChild(prix);
        tr.innerHTML += `<button class="btn" onclick="ajouter('${nomLabel}')"> Ajouter </button>`
        tr.innerHTML += `<button class="btn-red" onclick="alertDeletePanier('${nomLabel}')"> Retirer </button>`
        
        return tr;
    }
    
    
    for (const prop in articles) {
        let tabArticles = document.getElementById("Articles")
        tabArticles.appendChild(createArticleRow(prop, articles[prop]));
    }

    
    let alertAddPanier = () => {
        Swal.fire({
            title: 'OK',
            text: 'Article ajouté avec succès à votre panier',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
    }


    let alertDeletePanier = (item) => {
        if (!panier[item]) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cet article n\'est plus dans votre panier!',
              })
        } else{
        Swal.fire({
          title: 'Voulez-vous vraiment supprimer cet article?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, Supprimer !'
        }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire(
                  'Supprimé !',
                  'Votre article a été supprimé.',
                  'success'
                  )
                  retirer(item);
            }
        })
        }
    };


    let alertFormulaire = () => {
        const f = document.formulaire;
        Swal.fire({
          title: "Formulaire d'inscription validé",
          text: "Un email de confirmation va être envoyé à l'adresse suivante: " + f.email.value,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      }

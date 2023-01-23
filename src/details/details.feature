Feature: endpoint qui permet de retourner les informations d’un joueur grâce à son ID.

  Les détails du joueur dont l'id est fourni sont retournés
  Outre le nom, le prénom, son nom court, son sexe, son pays, sa photo sont retournés.
  Des données numériques sont également renvoyées, telles que son classement, ses points, son poids, sa taille, et ses derniers résultats.

  Scenario: player details
    Given a collection of players in the database
    When the player endpoint is queried with GET and a shortname in the path
    Then a json object of the player details is returned

    Example: GET /details/N.DJO
        {
            "shortname": "N.DJO",
            "firstname": "Novak",
            "lastname": "Djokovic",
            "sex": "M",
            "country": {
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
                "code": "SRB",
                "_id": "63ce4af0501055c34ef4aaf8"
            },
            "picture": "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
            "data": {
                "rank": 2,
                "points": 2542,
                "weight": 80000,
                "height": 188,
                "age": 31,
                "last": [
                    1,
                    1,
                    1,
                    1,
                    1
                ]
            }
        }

Feature: endpoint qui retourne des statistiques 

    Le Pays qui a le plus grand ratio de parties gagnéLe ou les meilleurs pays ex-aequo sont retournés
    L'IMC moyen de tous les joueurs est retourné
    La médiane de la taille de tous les joueurs est retournée

  Scenario: top country
    Given a collection of players in the database
    When the stats endpoint is queried with GET
    Then a json of stats is returned

    Example: GET /stats
        {
            "country": {
                "bestWinRatio": [
                    {
                        "code": "SRB",
                        "ratio": 1
                    }
                ]
            },
            "player": {
                "averageBMI": 23.4,
                "medianHeight": 185
            }
        }

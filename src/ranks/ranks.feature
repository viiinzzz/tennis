Feature: endpoint qui retourne les joueurs

  La liste doit être triée du meilleur au moins bon.

  Scenario: list players
    Given a collection of players in the database
    When the players endpoint is queried with GET
    Then a json list of item players shall be returned ordered by player's rank, by sex

    Example: GET /ranks
        {
            "Male": [
                {
                    "rank": 1,
                    "firstname": "Rafael",
                    "lastname": "Nadal"
                },
                {
                    "rank": 2,
                    "firstname": "Novak",
                    "lastname": "Djokovic"
                },
                {
                    "rank": 21,
                    "firstname": "Stan",
                    "lastname": "Wawrinka"
                }
            ],
            "Female": [
                {
                    "rank": 10,
                    "firstname": "Serena",
                    "lastname": "Williams"
                },
                {
                    "rank": 52,
                    "firstname": "Venus",
                    "lastname": "Williams"
                }
            ]
        }

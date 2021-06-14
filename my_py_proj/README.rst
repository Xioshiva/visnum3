Labo 3 vision numerique

Pour lancer le code en premier il faut, installer docker puis, lancer docker dans le root du projet avec:
"sudo docker-compose up"
Puis aller dans "/my_py_projet"
Et lancer le serveur uvicorn avec:
"uvicorn main:app --reload"
Ignorez tous les messages d'erreurs lier a tensorflow.

Puis ouvrez sur internet localhost:8069 et la vous pourrez tester l'application.

L'application marche pas super bien mais y a un semblant, j'imagine il faut beaucoup d'entrenement pour que ca marche bien.

Le canvas JavaScript est un peu beuge aussi et l'interface web est ameliorable.
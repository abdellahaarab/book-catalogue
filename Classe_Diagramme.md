## Diagramme de Classe



```
+-----------------+           +------------------+
|      Book       |           |    BookController     |
+-----------------+           +------------------+
| - title: String |           | + getAllBooks()      |
| - author: String|           | + getBookById()     |
| - image: String |           | + showCreateForm()  |
| - description: String      | + createBook()      |
| - publicationDate: Date    | + showEditForm()    |
| - pageCount: Number        | + updateBook()      |
| - createdAt: Date          | + deleteBook()      |
+-----------------+           +------------------+
         |                               |
         |                               |
         |                               |
         |                               |
         |                               |
         |                               |
+-----------------+           +------------------+
|   BookRoutes    |           |     Database     |
+-----------------+           +------------------+
| + /books        |           | + connectToDatabase() |
| + /books/:id    |           +------------------+
| + /books/new    |
| + /books/:id/edit|
| + /books/:id    |
| + /books/:id    |
| + /books/:id    |
+-----------------+
```

Dans ce diagramme de classe, nous avons la classe `Book` représentant un livre avec ses attributs tels que `title`, `author`, `image`, `description`, `publicationDate`, `pageCount`, et `createdAt`. Cette classe est associée à la classe `BookController`, qui gère les opérations CRUD liées aux livres telles que `getAllBooks()`, `getBookById()`, `showCreateForm()`, `createBook()`, `showEditForm()`, `updateBook()`, et `deleteBook()`. La classe `BookController` utilise la classe `Book` pour interagir avec la base de données et effectuer les opérations nécessaires.

De plus, nous avons la classe `BookRoutes` qui gère les routes liées aux livres, telles que `/books`, `/books/:id`, `/books/new`, `/books/:id/edit`, etc. Elle est associée à la classe `BookController` pour appeler les fonctions appropriées lorsqu'une route est atteinte.

Enfin, nous avons la classe `Database` qui fournit une fonction `connectToDatabase()` pour établir la connexion avec la base de données.

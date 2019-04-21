# DashboardApp

DashboardApp es un organizador de tareas, las cuales se pueden situar en diferentes boards, y diferentes listas:
* To Do para las tareas por hacer
* Doing las tareas que se están realizando
* Done para las tareas terminadas

## Installation
Dashboard app requiere npm
Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.
Material Design components for Angular [Angular Material](https://material.angular.io/)
Para instalar las dependencias del entorno del proyecto:
```sh
npm install
```
### Fake REST API 
Se utiliza Fake REST API como API provisional por medio de un json, nos da la funcionalidad de usar un json como base de datos.
Para instalar esta API se requiere:
```sh
npm install -g json-server
```
Para inicializar el servicio es necesario ejecutar:
```sh
json-server info.json
```
El archivo info.json se encuentra en el directorio src/server/info.json.
DashboardApp guarda todos los cambios realizados generados en este json.

Ver documentacion [JSON Server] (https://github.com/Moon-Land/json-server)

### Development server
Primero se corre el json-server:
```sh
json-server info.json
```
El servicio se despliega en `http://localhost:3000/`

Posteriormente se corre el servidor de desarrollo:
```sh
ng serve --open
```
### Modificacion de json propuesto
Se realizo una modificacion al prototipo de json propuesto en los requerimientos, para soportar multiples boards y cambios de tarea entre board.
Se agregó identificadores a cada board, task y tag para poder relacionarse entre sí, ya que un board con un determinado identificador contiene task y a su vez éstas contienen tags.
```sh
{
  "boards": [
    {
      "id": 1,
      "name": "Evolutionary Computing",
      "createdAt": "2019-05-19 00:00:01"
    },
    {
      "id": 2,
      "name": "Desarrollo de Sistemas Distribuidos",
      "createdAt": "2019-05-19 00:00:02"
    }
  ],
  "tasks": [
    {
      "id_board": 1,
      "title": "Practica Swarm",
      "description": "Elaborar un algoritmo genetico.",
      "complete": false,
      "priorityName": "medium",
      "priorityValue": 3,
      "createdAt": "2019/04/20 20:14:28",
      "status": "ToDo",
      "id": 1
    }
  ]
   "tags": [
    {
      "id_tarea": 2,
      "color": "#4CEB82",
      "name": "introduccion",
      "id": 1
    },
    {
      "id_tarea": 2,
      "color": "#747709",
      "name": "conclusion",
      "id": 2
    },
}
```

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

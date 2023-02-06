# Desafio 16 Coderhouse
Información adicional sobre el desafio de balanceador de carga
# Aspectos a considerar 😔
+ El archivo generado por ```--prof``` quedó procesado y guardado con el nombre ```artillery/result-log.txt```
+ Las pruebas realizadas con **Artillery** quedaron guardadas en el archivo ```artillery/result-test.txt```
+ En el archivo ```logs/error.log``` quedan guardadas las excepciones al momento de consumir un servicio, además de el intento de ingresar a rutas no existentes.
+ En el archivo ```logs/warn.log``` quedan guardadas las alertas (en este caso mucho menos que los errores) de no envio de forma correcta de datos para los servicios.
+ Se agregan las capas de rutas, controladores y persistencia (en este caso dentro de la carpeta dao)
+ Se crearon las clases DAO de UserDAO y ProductsDAO donde se trabaja directamente metodos para acceder a la base de datos.
+ Se utilizo el patron **Factory Method** para establecer la conexion a la base de datos en los archivos DAO (en este caso solo a la base de datos MongoDB), dentro de estos archivos en el constructor solo se le asigna el nombre de la colección que va a trabajar.
# Comandos de ejecución
#### Comandos para ejecutar aplicación sin pm2
+ Ejecución en modo **cluster**: ```node src/app.js --port=8081 --modo=CLUSTER```
+ Ejecución en modo **fork**: ```node src/app.js --port=8081 --modo=FORK```
+ Ejecutar pruebas con **Mocha**: ```npm run mocha```
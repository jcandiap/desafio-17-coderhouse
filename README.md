# Desafio 14 Coderhouse
Información adicional sobre el desafio de balanceador de carga
# Aspectos a considerar 😔
+ El archivo generado por ```--prof``` quedó procesado y guardado con el nombre ```artillery/result-log.txt```
+ Las pruebas realizadas con **Artillery** quedaron guardadas en el archivo ```artillery/result-test.txt```
+ En el archivo ```logs/error.log``` quedan guardadas las excepciones al momento de consumir un servicio, además de el intento de ingresar a rutas no existentes.
+ En el archivo ```logs/warn.log``` quedan guardadas las alertas (en este caso mucho menos que los errores) de no envio de forma correcta de datos para los servicios.
+ Se agregan las capas de rutas, controladores y persistencia (en este caso dentro de la carpeta dao)
+ Ignorar las clases **BaseDAO** y **UserDAO** ya que estas las cree viendo el siguiente desafio 🤦🏻‍♂️ las dejo de todas formas para poder continuar desde ahí.
+ Cualquier comentario favor hacermelo saber ya que por no fijarme comence haciendo el desafio 15 siendo que era el 14 y puede que se me haya colado algo por ahí 😅.
# Comandos de ejecución
#### Comandos para ejecutar aplicación sin pm2
+ Ejecución en modo **cluster**: ```node src/app.js --port=8081 --modo=CLUSTER```
+ Ejecución en modo **fork**: ```node src/app.js --port=8081 --modo=FORK```
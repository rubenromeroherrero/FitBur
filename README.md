# **Fitbur App**

## **Plataforma para hacer un seguimiento de tu ejercicio físico**

## 1.- Esta plataforma va a constar de las siguientes entidades:

- `.Usuarios` - Los cuales, van a poder signup en la app y hacer login. - Van a requerir de los siguientes datos
  personales:

  - **UserId**
  - **Email**
  - **Password** - encriptada
  - **Name**
  - **Edad**
  - **Peso**
  - **Altura**

- `.Rutina` - Cada usuario, podrá registrar diariamente su rutina/actividad realizada (caminar, fullbody (gym))
  La rutina podrá estar formada por cero, una o ninguna actividad. Los datos que recogeremos en este campo serán:

  - **RutinaId** - privado
  - **Título** - publico/requerido (caminar, fullbody (gym))
  - **Descripción/comentario** - opcional
  - **Día** - obligatorio
  - **Duración** - obligatorio
  - **Distancia** - (km), opcional (sólo en determinadas actividades)
  - **Lugar** - opcional (gym, ciudad, parque, etc)
  - **Estado** - obligatorio// podrá ser pública o privada, si desea que lo puedan ver los demás usuarios

- `.Ejercicios` - Cada rutina podrá estar compuesta de diferentes actividades.

  - **EjercicioId** - privado
  - **Nombre** - requerido
  - **Series** - requerido
  - **Repeticiones** - requerido
  - **Descanso** - requerido

- `.Comentarios` - Dentro de cada rutina, los usuarios podrán realizar comentarios, dando su opinión y valoración

  - **ComentarioId** - privado
  - **Título** - publico/no requerido
  - **Contenido** - publico/requerido
  - **Valoración** - publico/requerido (0-5 puntos)
  - **UserId** - publico/requerido (extraemos el nickname del UserId)

## 2.-Modelo negocio:

- Idea Javier => en el front un formulario, en el cual introducir los datos del usuario. En función de los datos
  introducidos, mostrarle la rutina aconsejada. Esas rutinas estarían implementadas en nuestra DB.

- Un usuario podrá:
  - **1** - Hacer signUp y login para poder registrarse y acceder a la plataforma
  - **2** - Editar su contenido/ datos personales introducidos, excepto el id (requerimos que sea la persona)
  - **3** - Eliminar usuario
  - **4** - Crear una rutina
  - **5** - Editar una rutina (excepto id)
  - **6** - Eliminar una rutina o todas
  - **7** - Crear ejercicios para la rutina
  - **8** - Editar esos ejercicios para la rutina (excepto el id)
  - **9** - Eliminar actividades, una o todas
  - **10** - Crear un comentario en una rutina de otro usuario
  - **11** - Editar un comentario
  - **12** - Eliminar un comentario

## 3.- Librerías requeridas para este proyecto:

- Dependencias:

  - **A)** - express (express-generator)
  - **B)** - sequelize
  - **C)** - dotenv
  - **D)** - mysql2
  - **E)** - joi
  - **F)** - jsonwebtoken
  - **G)** - morgan

- Dependencias de desarrollador:
  - **A)** - nodemon (-D)

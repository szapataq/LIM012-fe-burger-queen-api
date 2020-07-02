# Conceptos aprendidos en el proyecto

#### Sprint #1 25/06/2020 - 02/07/2020

- [ ] [Node.js](https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction)
    Node (o más correctamente: Node.js) es un entorno que trabaja en tiempo de ejecución, de código abierto, multi-plataforma, que permite a los desarrolladores crear toda clase de herramientas de lado servidor y aplicaciones en JavaScript. La ejecución en tiempo real está pensada para usarse fuera del contexto de un explorador web (es decir, ejecutarse directamente en una computadora o sistema operativo de servidor). Como tal, el entorno omite las APIs de JavaScript específicas del explorador web y añade soporte para APIs de sistema operativo más tradicionales que incluyen HTTP y bibliotecas de sistemas de ficheros.

- [ ] [REST](https://platzi.com/clases/1638-api-rest/21611-que-significa-rest-y-que-es-una-api-restful/)
    REST es un acrónimo de Representational State Transfer o transferencia de estado representacional, le agrega una capa muy delgada de complejidad y abstracción a HTTP. Mientras que HTTP es transferencia de archivos, REST es un protocolo que se basa en la transferencia de recursos.
    
    Una API *RESTful* es una API diseñada con los conceptos de REST:

    - **Recurso:** todo dentro de una API RESTful debe ser un recurso.

    - **URI:** los recursos en REST siempre se manipulan a partir de la URI, identificadores universales de recursos.
    
    - **Acción:** todas las peticiones a tu API RESTful deben estar asociadas a uno de los verbos de HTTP: GET para obtener un recurso, POST para escribir un recurso, PUT para modificar un recurso y DELETE para borrarlo.
    
    REST es muy útil cuando:

    - Las interacciones son simples.
    - Los recursos de tu hardware son limitados.

    No conviene cuando las interacciones son muy complejas.

    En resumen una peticion rest se basa en decir cual es el recurso sobre el que queremos realizar alguna accion, cual es la accion que queremos realizar y el URI es lo qu enos permite identificar exactamente cual es efecticvmente el recurso sobre el que vamos a actuar. Una peticion REST completa se basa en una URL que a diferencia del URI incluye el dominio, el protocolo... y un verbo HTTP que son get, put, delete... que mapean las acciones básicas como obtener un recurso, crear uno nuevo, eliminarlo, modificarlo, entre otros.

- [ ] [Variables de Entorno](https://es.wikipedia.org/wiki/Variable_de_entorno)

    Una variable de entorno es una variable dinámica que puede afectar al comportamiento de los procesos en ejecución en un ordenador.
    
    Son parte del entorno en el que se ejecuta un proceso. Por ejemplo, un proceso en ejecución puede consultar el valor de la variable de entorno TEMP para descubrir una ubicación adecuada para almacenar archivos temporales, o la variable HOME o USERPROFILE para encontrar la estructura de directorios propiedad del usuario que ejecuta el proceso.
    
    Fueron introducidas en su forma moderna en 1979 con la versión 7 de Unix, por lo que están incluidas en todos los sabores y variantes del sistema operativo Unix a partir de ese momento, incluyendo Linux y macOS. Desde PC DOS 2.0 en 1982, todos los sistemas operativos de Microsoft, incluyendo Microsoft Windows y OS/2, también las han incluido como una característica, aunque con sintaxis, uso y nombres de variables estándar algo diferentes.

    [Se utilizan](https://platzi.com/clases/1759-fundamentos-node/25186-variables-de-entorno/) para los valores que no deben ir dentro del software, como credenciales: claves, tokens.
    Para crearlas accedemos al processo. ```const variableDeEntorno = process.env.NOMBREDELAVARIABLEDEENTORNO```
    Se les puede dar un valor por defecto con la expresión or || y defirnir el valor que queremos darle por defecto.
    Buenas prácticas, las variables de entorno se escriben en mayúsculas porque se basan en el estándar de los servidores de linux antiguos y de como funcionaban las configuraciones casi todas las variables de entorno que estan fuera se escribían en mayúscula y si son 2 palabras se separan con _ ```MI_WEB```.
  
    [Como usar las variables de entorno para diferente ambientes](https://platzi.com/clases/1646-backend-nodejs/22255-variables-de-entorno-cors-y-https/)
    
    Ya vimos cómo en nuestro ambiente local podemos hacer uso de las variables de entorno usando el archivo .env y la librería dotenv. Generalmente lo que se recomienda es usar el mismo para los diferentes ambientes como Staging (Pruebas) y Producción.
    
    Para ello se debe acceder al servidor remoto:
    
    Duplicar el archivo .env.example y renombrarlo por .env.
    Cargar las respectivos valores de las variables de entorno.
    Usar valores y servicios diferentes para cada ambiente, esto quiere decir que las credenciales de desarrollo, staging y producción deben ser completamente diferente.
    Si se quiere tener un backup de estos valores se recomienda usar las notas seguras de aplicaciones como 1Password o LastPass.
    Como lo hemos dicho antes no se debe hacer commit del archivo .env y este debe estar en el .gitignore, ademas se recomienda manejar solo un archivo .env. Más información: https://github.com/motdotla/dotenv#faq
    
    **Cuando no es posible acceder al servidor remoto**
    
    Algunos servicios como Heroku o Now no nos permiten acceder a un servidor remoto pues la administración del servidor es controlada por los mismos servicios, sin embargo cada servicio tiene sus mecanismos para establecer las variables de entorno:
    
    - Configuración de variables de entorno en Heroku
    - Configuración de variables de entorno en Now

    **Variables de entorno de forma nativa**

    El uso del archivo .env junto con la biblioteca dotenv es un mecanismo que nos facilita la configuración de variables de entorno pero si por alguna razón las quisiéramos cargar de manera nativa, es decir desde el sistema operativo recomiendo este tutorial de Digital Ocean

- [ ] [dotenv](https://www.npmjs.com/package/dotenv)
    Dotenv es un módulo de dependencia cero que carga variables de entorno de un .envarchivo a process.env. El almacenamiento de la configuración en el entorno separado del código se basa en la metodología de la aplicación The Twelve-Factor.

- [ ] [encodeURIComponent](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/encodeURIComponent)
    El método encodeURIComponent() codifica un componente URI (Identificador Uniforme de Recursos) al reemplazar cada instancia de ciertos caracteres por una, dos, tres o cuatro secuencias de escape que representan la codificación UTF-8 del carácter (solo serán cuatro secuencias de escape para caracteres compuestos por dos carácteres "sustitutos").
    
    Usado en las variables de entorno USER y PASSWORD, garantiza que si por alguna razon hay algunos caracteres especiales estos no vayan a generar problemas al momento de conectarnos.

    Ejemplo encodeURIComponent(' ')
    Ejemplo decodeUriComponent(%20)

- [ ] [Patron Singleton](https://platzi.com/clases/1642-javascript-profesional/22186-patron-singleton-y-casos-de-uso/)
    En ingeniería de software, [singleton](https://es.wikipedia.org/wiki/Singleton) o instancia única es un patrón de diseño que permite restringir la creación de objetos pertenecientes a una clase o el valor de un tipo a un único objeto.
    Su intención consiste en garantizar que una clase solo tenga una instancia y proporcionar un punto de acceso global a ella.
   
    Se usa para que cada vez que nos cocnectemos a la base de datos no se cree un nuevo cliente (conexión) sino que si el clienete ya esta creado y la conexcon ya esta abierta se use esa misma conexión para evitar que se sature de muchas conexiones y nos genere un error.

- [ ] [Middlewares](https://expressjs.com/es/guide/using-middleware.html)

    Las funciones de middleware son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada next.
    
    Las funciones de middleware pueden realizar las siguientes tareas:
    
    - Ejecutar cualquier código.
    - Realizar cambios en la solicitud y los objetos de respuesta.
    - Finalizar el ciclo de solicitud/respuestas.
    - Invocar la siguiente función de middleware en la pila.

    Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar next() para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.
    
    Una aplicación Express puede utilizar los siguientes tipos de middleware:
    - Middleware de nivel de aplicación.
    - Middleware de nivel de direccionador.
    - Middleware de manejo de errores.
    - Middleware incorporado.
    - Middleware de terceros
    
    Puede cargar middleware de nivel de aplicación y de nivel de direccionador con una vía de acceso de montaje opcional. También puede cargar una serie de funciones de middleware a la vez, lo que crea una subpila del sistema de middleware en un punto de montaje.

    [Que es un middleware, capa de manejo de errores](https://platzi.com/clases/1646-backend-nodejs/22038-que-es-un-middleware-capa-de-manejo-de-errores-usa/)
    [Middlewares de express](https://platzi.com/clases/1015-nodejs-2015/3761-middlewares-de-express/)    
    [Middlewares populares](https://platzi.com/clases/1437-express-js/15742-middlewares-populares/)

- [ ] [JWT](https://platzi.com/blog/introduccion-json-web-tokens/)

    JSON Web Token (JWT) es un estándar abierto (RFC-7519) basado en JSON para crear un token que sirva para enviar datos entre aplicaciones o servicios y garantizar que sean válidos y seguros.
    
    El caso más común de uso de los JWT es para manejar la autenticación en aplicaciones móviles o web. Para esto cuando el usuario se quiere autenticar manda sus datos de inicio del sesión al servidor, este genera el JWT y se lo manda a la aplicación cliente, luego en cada petición el cliente envía este token que el servidor usa para verificar que el usuario este correctamente autenticado y saber quien es.
    
    Este igual no es el único caso de uso para JWT, es posible usarlo para transferir cualquier datos entre servicios de nuestra aplicación y asegurarnos de que sean siempre válido. Por ejemplo si tenemos un servicio de envío de email otro servicio podría enviar una petición con un JWT junto al contenido del mail o cualquier otro dato necesario y que estemos seguros que esos datos no fueron alterados de ninguna forma.

- [ ] [MongoDB](https://platzi.com/clases/1646-backend-nodejs/22033-creacion-de-una-bd-en-mongoatlas/)

- [ ] [Conexión con MongoDB](https://platzi.com/clases/1646-backend-nodejs/22035-conexion-a-mongoatlas-una-instancia-de-mongodb/)

- [ ] [Clases js](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes)
    Las clases de javascript, introducidas en ECMAScript 2015, son una mejora sintáctica sobre la herencia basada en prototipos de JavaScript. La sintaxis de las clases no introduce un nuevo modelo de herencia orientada a objetos en JavaScript. Las clases de JavaScript proveen una sintaxis mucho más clara y simple para crear objetos y lidiar con la herencia.
    
    **Definiendo clases**
    Las clases son "funciones especiales", como las expresiones de funciones y declaraciones de funciones, la sintaxis de una clase tiene dos componentes: expresiones de clases y declaraciones de clases.

    **Declaración de clases**
     Una manera de definir una clase es mediante una declaración de clase. Para declarar una clase, se utiliza la palabra reservada class y un nombre para la clase "Rectangulo".

    ```
    class Rectangulo {
        constructor(alto, ancho) {
          this.alto = alto;
          this.ancho = ancho;
        }
    }
    ```

    **Constructor**
    El método constructor es un método especial para crear e inicializar un objeto creado con una clase. Solo puede haber un método especial con el nombre "constructor" en una clase. Si esta contiene mas de una ocurrencia del método constructor, se arrojará un Error SyntaxError.

    Un constructor puede usar la palabra reservada super para llamar al constructor de una superclase

- [ ] [Express](https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction)
    [!](https://medium.com/@aarnlpezsosa/introducci%C3%B3n-a-express-js-a1ebe16dbcf4)

- [ ] [HTTP Request](https://expressjs.com/es/4x/api.html#req)
    [!](https://medium.com/@aarnlpezsosa/introducci%C3%B3n-a-express-js-a1ebe16dbcf4)
    El objeto request es el primer parámetro que recibe el callback dentro del método get de express, este objeto proporciona toda la información referente a la petición: como url, parámetros, método, headers enviados por el cliente, etc.
    
- [ ] [req.query](http://expressjs.com/es/api.html#req.query) 

- [ ] [HTTP Response]()
    El objeto response es el segundo parámetro que recibe el callback dentro del método get de express, este objeto representa la respuesta HTTP que express envía al cliente. Proporciona diversos métodos y propiedades que facilitan el envío de respuestas al cliente como son:
    - res.send()
    - res.sendFile()
    - res.sendStatus()
    - res.render()
    - res.json()
    - res.jsonp()
    - res.set()

- [ ] [HTTP Headers](https://developer.mozilla.org/es/docs/Web/HTTP/Headers)
    Las cabeceras (en inglés headers) HTTP permiten al cliente y al servidor enviar información adicional junto a una petición o respuesta. Una cabecera de petición esta compuesta por su nombre (no sensible a las mayusculas) seguido de dos puntos ':', y a continuación su valor (sin saltos de línea). Los espacios en blanco a la izquierda del valor son ignorados.

    Las Cabeceras pueden ser agrupadas de acuerdo a sus contextos:
    - **Cabecera general:** Cabeceras que se aplican tanto a las peticiones como a las respuestas, pero sin relación con los datos que finalmente se transmiten en el cuerpo.
    - **Cabecera de consulta:** Cabeceras que contienen más información sobre el contenido que va a obtenerse o sobre el cliente.
    - **Cabecera de respuesta:** Cabeceras que contienen más información sobre el contenido, como su origen o el servidor (nombre, versión, etc.).
    - **Cabecera de entidad:** Cabeceras que contienen más información sobre el cuerpo de la entidad, como el tamaño del contenido o su tipo MIME.

    **[Las cabeceras HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Messages)** para respuestas siguen también la misma estructura como cualquier otra cabecera: una cadena de texto, que no diferencia entre mayusculas y minúsculas, seguida por dos puntos (':') y un valor cuya estructura depende del tipo de cabecera. Toda la cabecera incluido su valor, se ha de expresar en una única línea. 

    - [Establecer Headers personalizados](https://expressjs.com/es/4x/api.html#setHeaders)
    
- [ ] [HTTP Body](https://expressjs.com/es/4x/api.html#req.body)
    Contiene pares de datos clave-valor enviados en el cuerpo de la solicitud. De forma predeterminada, está undefinedy se completa cuando utiliza middleware de análisis de cuerpo como express.json()o express.urlencoded().

    [body](https://developer.mozilla.org/es/docs/Web/HTTP/Messages), la última parte del mensaje de respuesta el es 'cuerpo'. No todas las respuestas tienen uno, respuestas con un código de estado como 201 o 204 normalmente prescinden de él.

    De forma general, los cuerpos se pueden diferenciar en tres categorias:

    - Cuerpos con un único dato, consisten en un simple archivo, de longitud conocida y definido en las cabeceras: Content-Type y Content-Length.
    - Cuerpos con un único dato, consisten en un simple archivo, de longitud desconocida, y codificado en partes, indicadas con Transfer-Encoding valor chunked (que significa: 'partido' en inglés).
    - Cuerpos con múltiples datos, consisten de varios datos, cada uno con una sección distinta de información. Este caso es relativamente raro y poco común.

- [ ] [Línea de estado](https://developer.mozilla.org/es/docs/Web/HTTP/Messages)
    La línea de inicio de una respuesta HTTP, se llama la línea de estado, y contienen la siguiente información:
    - La versión del protocolo, normalmente HTTP/1.1.
    - Un código de estado, indicando el éxito o fracaso de la petición. Códigos de estado muy comunes son:  200, 404, o 302.
    - Un texto de estado, que es una breve descripción, en texto, a modo informativo, de lo que significa el código de estado, con el fin de que una persona pueda interpretar el mensaje HTTP.
    
    Una línea de estado típica es por ejemplo:  HTTP/1.1 404 Not Found.

- [ ] [Verbos HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)
    HTTP define un conjunto de métodos de petición para indicar la acción que se desea realizar para un recurso determinado. Aunque estos también pueden ser sustantivos, estos métodos de solicitud a veces son llamados HTTP verbs. Cada uno de ellos implementan una semántica diferente, pero algunas características similares son compartidas por un grupo de ellos: ej. un request method puede ser safe, idempotent, o cacheable.

    **GET**
    El método GET  solicita una representación de un recurso específico. Las peticiones que usan el método GET sólo deben recuperar datos.
    
    **HEAD**
    El método HEAD pide una respuesta idéntica a la de una petición GET, pero sin el cuerpo de la respuesta.
    
    **POST**
    El método POST se utiliza para enviar una entidad a un recurso en específico, causando a menudo un cambio en el estado o efectos secundarios en el servidor.
    
    **PUT**
    El modo PUT reemplaza todas las representaciones actuales del recurso de destino con la carga útil de la petición.
    
    **DELETE**
    El método DELETE borra un recurso en específico.
    
    **CONNECT**
    El método CONNECT establece un túnel hacia el servidor identificado por el recurso.
    
    **OPTIONS**
    El método OPTIONS es utilizado para describir las opciones de comunicación para el recurso de destino.
    
    **TRACE**
    El método TRACE  realiza una prueba de bucle de retorno de mensaje a lo largo de la ruta al recurso de destino.
    
    **PATCH**
    El método PATCH  es utilizado para aplicar modificaciones parciales a un recurso.

- [ ] [Postman](https://openwebinars.net/blog/que-es-postman/)
    Postman es una herramienta que se utiliza, sobre todo, para el testing de API REST, aunque también admite otras funcionalidades que se salen de lo que engloba el testing de este tipo de sistemas.
    
    Gracias a esta herramienta, además de testear, consumir y depurar API REST, podremos monitorizarlas, escribir pruebas automatizadas para ellas, documentarlas, mockearlas, simularlas, etc.

- [ ] [bcrypt](https://solidgeargroup.com/password-nodejs-mongodb-bcrypt/)
    [Bcrypt](https://www.npmjs.com/package/bcrypt) es una función de hashing de passwords diseñado por Niels Provos y David Maxieres, basado en el cifrado de Blowfish. Se usa por defecto en sistemas OpenBSD y algunas distribuciones Linux y SUSE. Lleva incorporado un valor llamado salt, que es un fragmento aleatorio que se usará para generar el hash asociado a la password, y se guardará junto con ella en la base de datos. Así se evita que dos passwords iguales generen el mismo hash y los problemas que ello conlleva, por ejemplo, ataque por fuerza bruta a todas las passwords del sistema a la vez.

    Para cifrar
    hashSync(data, salt)
    data - [REQUERIDO] - los datos a cifrar.
    salt- [REQUERIDO] - la sal que se utilizará para descifrar la contraseña. si se especifica como un número, se generará una sal con el número especificado de rondas y se usará (ver ejemplo en Uso ).

    Para comparar
    compareSync(data, encrypted)
    data - [REQUERIDO] - datos para comparar.
    encrypted - [REQUERIDO] - datos para comparar.

- [ ] [Códigos de status HTTP]()
- [ ] [Encodings y JSON]()
- [ ] [CORS]()
- [ ] [MongoDB]()
- [ ] [Instalación]()
- [ ] [Connection String]()
- [ ] [Comandos/Queries de creación, lectura, modificación y eliminación]()

- [] []()
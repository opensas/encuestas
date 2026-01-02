# Ejemplo de integración del sistema de encuestas con el portal de empleo

El objetivo de este documento es describir la integración del sistema de encuestas con el portal de empleo, brindando ejemplos de las distintas opciones disponibles.

## Paso 1 - envío de mail

Se envía un mail a la persona que debe responder la encuesta.

El mail contiene un link, mediante el cual podrá acceder al portal de empleo para autenticarse, darse de alta en caso de no existir como usuario, y luego responder al encuesta.

```html
Estimado beneficiario, por favor responda la siguiente encuesta haciendo click en este link

<a href="https://trabajo.gob.ar/portal-empleo/encuesta/upep">Contestar encuesta</a>
```

## Paso 2 - autenticación o alta en el portal de empleo

Luego de hacer click en el link, el beneficiario abre una explorador en la siguiente URL:

https://trabajo.gob.ar/portal-empleo/encuesta/upep

> nota, también puede implementarse mediante querystring, por ejemplo https://trabajo.gob.ar/portal-empleo?responder-encuesta-upep

Si no está autenticado - el portal debe guardar en memoria (session o similar) el path al cual se dirigía el usuario: `/encuesta/upep` - autenticar usuario o registrarlo en case de no existir como usuario del portal - volver a redireccionar a /encuesta/[codigo_encuesta]

## Paso 3 - verificar si la encuesta ya fue respondida

Si está autenticado - con el beneficiario_id el portal verifica si beneficiario_id ya respondió codigo_encuesta - si la respondió, puede mostrase un cartel indicando que la encuesta ya fue respondida,
o dejarlo redirigir el usuario a /portal-empleo

## Paso 4 - enviar al usuario al sistema de encuestas

En caso de que la encuesta na haya sido respondida por el beneficiario, se enviará al usuario a responder la encuesta, ya sea redirigiéndolo o abriendo un pop-up.

Ejemplo de redireccionamiento / popup:

```
REDIRECT / popup https://trabajo.gob.ar/encuestas/upep?
	callback=https://trabajo.gob.ar/portal-empleo/api/encuesta/respuesta
	redirect=https://trabajo.gob.ar/portal-empleo/redirect?param1=val1&paramX=valX
	reference=beneficiario_id
```

## Paso 5 - devolución de la respuesta

El sistema de encuestas soporta ciertos parámetros que le permiten indicar cómo retornar la información de la encuesta respondida

`callback`: una vez finalizada la encuesta efectua un POST al url indicada en el parámetro `callback` con la información de la respuesta, o la descripción del error.

`redirect`: una vez finalizada la encuesta, redireccionada al usuario al url indicada en el parámetro `redirect` con la información de la respuesta, o la descripción del error.

El sistema de encuesta también puede detectar si el explorador fue abierto como un pop-up (mediante `window.open('https://trabajo.gob.ar/encuestas/upep...')`) en suyo caso emitirá un mensaje con el contenido de la respuesta

> Nota: Si la ventana fue abierta como un popup, el sistema encuestas intentará cerrarla con `window.opener.close()`

5.1. devolución mediante redirect

```
REDIRECT https://trabajo.gob.ar/portal-empleo/redirect?
	param1=val1&paramX=valX&
	reference=beneficiario_999874&
	answer_id=answ_advf-wert-12dr-345d
```

la aplicación consumidora consulta la API

```
GET https://trabajo.gob.ar/encuestas/api/answer/answ_advf-wert-12dr-345d

o bien

GET https://trabajo.gob.ar/encuestas/api/answer?reference=beneficiario_999874
```

5.22. devolución mediante callback

el sistemas de encuestas envía la información ejecutando una llamada POST a callback

```json
POST https://trabajo.gob.ar/portal-empleo/api/encuesta/respuesta

{
	"error": "error explanation", // null si no hubo ningún error
	"data": {  // null si hubo algún error
		"id": "answ_advf-wert-12dr-345d",
		"reference": "beneficiario_999874",
		"params": {
			"formato": "json",
			"param1": "val1",
			"paramX": "valX"
		},
		"answers": [
			{ "code": "P1", "answer": "Muy satisfecho" },
			{ "code": "P2", "answer": { "Registro en el Portal Empleo": "Regular", "Búsqueda de la oferta": "Buena","Postulación a la oferta": "Mala" },
		]

	}
		"survey": {
			"id": "answ_advf-wert-12dr-345d",
			"survey_id": "surv_defs-wsd4-er34-fd23",
			"reference": "beneficiario_999874",
			"code": "vat",
			"title": "Evaluación de participantes de Volver al Trabajo (VAT)",
			"description": "Encuesta online para evaluar ...",
			"questions": [
				{
					"id": "preg_1",
					"code": "P1",
					"title": "¿Cuán satisfecho estás con el programa de capacitación?",
					"kind": "single",
					"options": [ "Muy satisfecho", "Satisfecho", "Indistinto", "Insatisfecho", "Muy insatisfecho" ],
					"answer": "Muy satisfecho"
				},
				{
					"id": "preg_2",
					"code": "P2",
					"title": "¿Cómo fue tu experiencia en relación a los siguientes aspectos de la gestión programa de capacitación?",
					"kind": "grid-single",
					"items": [ "Registro en el Portal Empleo", "Búsqueda de la oferta", "Postulación a la oferta" ],
					"options": [
						"Buena",
						"Regular",
						"Mala"
					],
					"answer": {
						"Registro en el Portal Empleo": "Regular",
						"Búsqueda de la oferta": "Buena",
						"Postulación a la oferta": "Mala"
					}
				}
			]
		}
	}
	}
```

5.3. devolución mediante window.opener

El sistemas de encuestas envía la información emitiendo un mensaje para la ventana padre

```javascript
if (!windows.opener) return;

window.opener.postMessage(
	{
		"error": "error explanation", // null si no hubo ningún error
		"data": {  // null si hubo algún error
		{
			id: 'answ_advf-wert-12dr-345d',
			reference: 'beneficiario_999874',
			// ...
		}
	}.
	'https://trabajo.gob.ar/encuestas' // origin
);
```

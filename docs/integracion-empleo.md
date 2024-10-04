# cuerpo del mail

```html
Estimado beneficiario, contes Estimado

<a href="https://trabajo.gob.ar/portal-empleo/encuesta/upep">Contestar encuesta</a>
```

# Portal empleo

/encuesta/[codigo_encuesta]

Si no está autenticado - guardar "en memoria" (la session) el codigo_encuesta que quiere responder - autenticar usuario o registralo! - volver a /encuesta/[codigo_encuesta]

si está autenticado - beneficiario_id - verificar si beneficiario_id ya respondió codigo_encuesta - si la respondio no haces mas nada, y redirigis a portal-empleo/ - si no la respondió

```
REDIRECT / popup https://trabajo.gob.ar/encuestas?
	encuesta=upep&
	redirect=https://trabajo.gob.ar/portal-empleo/cb?formato=json&param1=val1&paramX=valX
	callback=https://trabajo.gob.ar/portal-empleo/api/encuesta/respuesta
	referencia=beneficiario_id
```

Nota:

redirect: redirecciona al usuario a esa página
callback: hace un POST a callback con un JSON con la respuesta
cierra la ventana

- usuario completa la encuesta

Devolución del resultado

- 1. devolución mediante redirect

```
REDIRECT https://trabajo.gob.ar/portal-empleo/cb?
	formato=json&param1=val1&paramX=valX&
	reference=beneficiario_999874&
	respuesta_id=answ_advf-wert-12dr-345d&
```

la aplicación consumidora consulta la API

```
GET https://trabajo.gob.ar/encuestas/api/encuestas/answ_advf-wert-12dr-345d

o bien

GET https://trabajo.gob.ar/encuestas/api/encuestas?referencia=beneficiario_999874
```

- 1. devolución mediante callback

el sistemas de encuestas envia la información ejecutando una llamada POST a callback

```json
POST https://trabajo.gob.ar/portal-empleo/api/encuesta/respuesta

{
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
```

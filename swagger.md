# API REST - Proyecto Colas - Municipalidad de Villa El Salvador
Aquí se encuentran todos los servicios del proyecto de Colas de la MuniVES

## Version: 1.0.0

### /

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ticket

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| TicketDto | body |  | Yes | [TicketDto](#ticketdto) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /ticket/{idticket}/asignar/{idventanilla}

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| idventanilla | path |  | Yes | number |
| idticket | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ticket/{id}/urgente

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ticket/{idticket}/estado/{idestado}

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| idestado | path |  | Yes | number |
| idticket | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /ticket/{idticket}/derivar/{idventanilla}

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| idventanilla | path |  | Yes | number |
| idticket | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /ticket/{idticket}/tematica/tramite

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| idticket | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /detestadoticket

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ventanilla

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| VentanillaDTO | body |  | Yes | [VentanillaDTO](#ventanilladto) |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /ventanilla/usuario/{idusuario}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| idusuario | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ventanilla/{id}/ultimoestado

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ventanilla/ultimoestado

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ventanilla/vista

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ventanilla/{id}/usuario/{idusuario}

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| idusuario | path |  | Yes | number |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ventanilla/{id}/{tipo}

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| tipo | path |  | Yes | string |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /ventanilla/{id}/estado/{idestado}

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| idestado | path |  | Yes | number |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /detestadoventanilla

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /usuario/{nombreUsuario}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| nombreUsuario | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /usuario

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /administrado/{dni}

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| dni | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /sistradoc/areas

#### GET
##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /rentas/contribuyente

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### Models


#### TicketDto

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| idadministrado | number |  | Yes |
| idtematica | number |  | Yes |
| idtipoticket | number |  | Yes |
| preferencial | boolean |  | Yes |
| urgente | boolean |  | Yes |
| idtramite | number |  | Yes |

#### VentanillaDTO

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
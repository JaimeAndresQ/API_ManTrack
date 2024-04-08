import swaggerJSDoc, { OAS3Definition , OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.1',
    info: {
        title: 'Documentación de API Mantrack',
        description: 'Esta es una Api encargada de realizar las diferentes peticiones a la base de datos relacional',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:80'
        },
        {
            url: '192.168.1.9:80'
        }
    ],
    components:{
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        },
        schemas: {

            usuario: {
                type: 'object',
                required: ['id_usuario_correo', 'usu_contrasena', 'usu_rol',  'usu_estado', 'fk_id_persona'],
                properties: {
                    id_usuario_correo: {
                        type: 'string',
                    },
                    usu_contrasena: {
                        type: 'string'
                    },
                    usu_rol: {
                        type: 'string'
                    },
                    usu_estado: {
                        type: 'number'
                    },
                    fk_id_persona: {
                        type: 'number'
                    }
                }
            },

            persona: {
                type: 'object',
                required: ['id_persona', 'pe_nombres', 'pe_apellidos', 'pe_telefono', 'pe_fecha_nacimiento'],
                properties: {
                    id_persona: {
                        type: 'number',
                    },
                    pe_nombres: {
                        type: 'string'
                    },
                    pe_apellidos: {
                        type: 'string'
                    },
                    pe_telefono: {
                        type: 'number'
                    },
                    pe_fecha_nacimiento: {
                        type: 'string',
                        format: 'date'
                    }
                }
            },

            vehiculo: {
                type: 'object',
                required: ['id_vehiculo', 'veh_marca', 'veh_modelo', 'veh_linea', 'veh_color', 'veh_capacidad', 'veh_clase_vehiculo', 'veh_cilindraje', 'veh_tipo_combustible', 'veh_numero_motor', 'veh_numero_chasis', 'veh_vin', 'veh_ciudad_registro', 'veh_fecha_matricula'],
                properties: {
                    id_vehiculo: {
                        type: 'string',
                        maxLength: 6
                    },
                    veh_marca: {
                        type: 'string'
                    },
                    veh_modelo: {
                        type: 'integer'
                    },
                    veh_linea: {
                        type: 'string'
                    },
                    veh_color: {
                        type: 'string'
                    },
                    veh_capacidad: {
                        type: 'string'
                    },
                    veh_clase_vehiculo: {
                        type: 'string'
                    },
                    veh_cilindraje: {
                        type: 'integer'
                    },
                    veh_tipo_combustible: {
                        type: 'string'
                    },
                    veh_numero_motor: {
                        type: 'string'
                    },
                    veh_numero_chasis: {
                        type: 'string'
                    },
                    veh_vin: {
                        type: 'string'
                    },
                    veh_ciudad_registro: {
                        type: 'string'
                    },
                    veh_fecha_matricula: {
                        type: 'string',
                        format: 'date'
                    }
                }
            }
            
            
        }
    }
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['src/routes/user.routes.ts'],
};

export default swaggerJSDoc(swaggerOptions)
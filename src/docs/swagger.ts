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
            },
            mantenimiento: {
                type: 'object',
                required: ['id_mantenimiento', 'man_tipo_mantenimiento', 'man_descripcion', 'man_duracion_estimada', 'fk_id_categoria'],
                properties: {
                    id_mantenimiento: {
                        type: 'integer',
                    },
                    man_tipo_mantenimiento: {
                        type: 'string',
                    },
                    man_descripcion: {
                        type: 'string',
                    },
                    man_duracion_estimada: {
                        type: 'integer',
                    },
                    fk_id_categoria: {
                        type: 'integer',
                    }
                }
            },
        
            categoria: {
                type: 'object',
                required: ['id_categoria', 'cat_nombre'],
                properties: {
                    id_categoria: {
                        type: 'integer',
                    },
                    cat_nombre: {
                        type: 'string',
                    }
                }
            },
        
            orden_trabajo: {
                type: 'object',
                required: ['id_orden_trabajo', 'ord_descripcion', 'ord_observaciones', 'ord_fecha_realizacion', 'ord_estado', 'ord_tiempo_estimado', 'ord_tiempo_ejecucion', 'fk_id_usuario_correo', 'fk_id_vehiculo', 'fk_id_categoria'],
                properties: {
                    id_orden_trabajo: {
                        type: 'integer',
                    },
                    ord_descripcion: {
                        type: 'string',
                    },
                    ord_observaciones: {
                        type: 'string',
                    },
                    ord_fecha_realizacion: {
                        type: 'string',
                        format: 'date-time'
                    },
                    ord_estado: {
                        type: 'string',
                    },
                    ord_tiempo_estimado: {
                        type: 'integer',
                    },
                    ord_tiempo_ejecucion: {
                        type: 'integer',
                    },
                    ord_tipo_mantenimiento: {
                        type: 'string',
                    },
                    fk_id_usuario_correo: {
                        type: 'string',
                        maxLength: 60,
                    },
                    fk_id_vehiculo: {
                        type: 'string',
                        maxLength: 6,
                    },
                    fk_id_categoria: {
                        type: 'integer',
                    }
                }
            },

            plan_mantenimiento: {
                type: 'object',
                required: ['id_plan_mantenimiento', 'pl_nombre', 'pl_fecha_realizacion_estimada', 'pl_estado'],
                properties: {
                    id_plan_mantenimiento: {
                        type: 'integer',
                    },
                    pl_nombre: {
                        type: 'string',
                    },
                    pl_fecha_realizacion_estimada: {
                        type: 'string',
                        format: 'date'
                    },
                    pl_estado: {
                        type: 'integer'
                    }
                }
            },


            plan_mantenimiento_tiene_vehiculo: {
                type: 'object',
                required: ['fk_id_vehiculo', 'fk_id_plan_mantenimiento'],
                properties: {
                    fk_id_vehiculo: {
                        type: 'string',
                        maxLength: 6
                    },
                    fk_id_plan_mantenimiento: {
                        type: 'integer',
                    }
                }
            },

            plan_mantenimiento_tiene_mantenimiento: {
                type: 'object',
                required: ['fk_id_mantenimiento', 'fk_id_plan_mantenimiento'],
                properties: {
                    fk_id_mantenimiento: {
                        type: 'integer',
                    },
                    fk_id_plan_mantenimiento: {
                        type: 'integer',
                    }
                }
            }       
        }
    }
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['src/routes/*.routes.ts'],
};

export default swaggerJSDoc(swaggerOptions)
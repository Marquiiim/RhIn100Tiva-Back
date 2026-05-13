const z = require('zod')

const taskValidateSchema = z.object({
    name: z.string()
        .min(3, 'Task deve ter no mínimo 3 caracteres')
        .max(100, 'Task deve ter no máximo 100 caracteres')
        .trim()
        .refine(str => str !== '', 'Task não pode ser vazio'),

    description: z.string()
        .max(500, 'Descrição muito longa')
        .optional()
        .default('')
})

const idSchema = z.coerce.number({
    required_error: 'Id é obrigatório',
    invalid_type_error: 'Id deve ser um número'
}).int('Id inválido')
    .positive('Id inválido')

module.exports = {
    taskValidateSchema,
    idSchema
}
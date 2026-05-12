const z = require('zod')

const toAdd = z.string()
    .min(3, 'Task deve ter no mínimo 3 caracteres')
    .max(100, 'Task deve ter no máximo 100 caracteres')
    .trim()
    .refine(str => str !== '', 'Task não pode ser vazio')

module.exports = {
    toAdd
}
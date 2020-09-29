import State from '../models/State.js'
import City from '../models/City.js'

class StateController {

    async index(req, res) {
        let { filter, sort } = req.query

        filter = filter ? { name : { $regex: `^${filter}.*`, $options: 'i'} }: {}
        sort   = sort === 'asc' || sort === 'desc' ? sort : 'asc'
        
        try {
            await State.find(filter).sort({ name: sort })
                .then((states) => {
                    return res.status(200).json(states)
                })
                .catch(() => {
                    return res.status(404).json({ 
                        message: 'Não foram encontrados estados' ,
                    })
                })
        }
        catch {
            return res.status(500).json({ message:  'Não foi possível processar a requisição' })
        }
    }

    async show(req, res) {
        const { id } = req.params

        try {
            await State.findById(id)
                .then((state) => {
                    return res.status(200).json({ data: state });
                })
                .catch(() => {
                    return res.status(404).json({
                        message: 'Não foi possível encontrar o estado'
                    })
                })
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição' })
        }
    }

    async store(req, res) {
        const { name, abbreviation } = req.body;
        
        if (await State.findOne({ name : name })) {
            return res.status(401).json({ message: `Não foi possível processar a requisição, já existe um estado com o nome: ${name}` })
        }

        if (await State.findOne({ abbreviation : abbreviation })) {
            return res.status(401).json({ message: `Não foi possível processar a requisição, já existe um estado com a sigla: ${abbreviation}` })
        }

        try {
            await State.create({ name, abbreviation})
                .then((state) => {
                    return res.status(201).json(state)
                })
                .catch((err) => {
                    return res.status(400).json({ message: err })
                })
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { name, abbreviation } = req.body

        if (await State.findOne({ name : name })) {
            return res.status(401).json({ message: `Não foi possível processar a requisição, já existe um estado com o nome: ${name}` })
        }

        if (await State.findOne({ abbreviation : abbreviation })) {
            return res.status(401).json({ message: `Não foi possível processar a requisição, já existe um estado com a sigla: ${abbreviation}` })
        }

        try {
            await State.findByIdAndUpdate(id, { name, abbreviation, updatedAt: Date.now() })
                .then((state) => {
                    return res.status(200).json(state)
                })
                .catch((error) => {
                    return res.status(400).json({ message: 'Não foi posssível alterar o estado' })
                })  
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição' })
        }
    }

    async remove(req, res) {
        const { id } = req.params

        if (await City.findOne({ state: id })) {
            return res.status(401).json({ message: 'Não foi possível processar a requisição, pois existe uma cidade relacionada ao estado'})
        }

        try {
            await State.findByIdAndDelete(id)
                .then(() => {
                    return res.status(204).send()
                })
                .catch(() => {
                    return res.status(400).json({ message: 'Não foi possível excluir o estado' })
                })
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição' })
        }
    }

}

export default new StateController();

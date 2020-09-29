import City from '../models/City.js';

class CityController {

    async index(req, res) {
        let { filter, sort } = req.query

        filter = filter ? { name : { $regex: `^${filter}`, $options: 'i'} }: {}
        sort   = sort === 'asc' || sort === 'desc' ? sort : 'asc'

        try {
            await City.find(filter).sort({ name: sort }).populate({ path: 'state'})
                .then((cities) => {
                    return res.status(200).json(cities)
                })
                .catch(() => {
                    return res.status(404).json({ message: 'Não foi possível encontrar cidades'})
                })
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição'})
        }
    }

    async show(req, res) {
        const { id } = req.params

        try {
            await City.findById(id)
                .then((city) => {
                    return res.status(200).json(city);
                })
                .catch(() => {
                    return res.status(404).json({
                        message: 'Não foi possível encontrar a cidade'
                    })
                })
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição' })
        }
    }

    async store(req, res) {
        const { name, state} = req.body;

        if (await City.findOne({ name : name, state: state })) {
            return res.status(401).json({ message: `Não foi possível processar a requisição, já existe uma cidade com o nome: ${name} para o estado`})
        }

        try {
            await City.create({ name, state })
                .then((city) => {
                    return res.status(201).json(city)
                })
                .catch(() => {
                    return res.status(400).json({ message: 'Não foi possível incluir a cidade'})
                })
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { name, state } = req.body

        if (await City.findOne({ name : name, state: state })) {
            return res.status(401).json({ message: `Não foi possível processar a requisição, já existe uma cidade com o nome: ${name} para o estado`})
        }

        try {
            await City.findByIdAndUpdate(id, { name, state, updatedAt: Date.now() })
                .then((city) => {
                    return res.status(200).json(city)
                })
                .catch(() => {
                    return res.status(400).json({ message: 'Não foi posssível alterar a cidade' })
                })  
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição' })
        }
    }

    async remove(req, res) {
        const { id } = req.params

        try {
            await City.findByIdAndDelete(id)
                .then(() => {
                    return res.status(204).send()
                })
                .catch(() => {
                    return res.status(400).json({ message: 'Não foi possível excluir a cidade' })
                })
        }
        catch {
            return res.status(500).json({ message: 'Não foi possível processar a requisição' })
        }
    }

}

export default new CityController();


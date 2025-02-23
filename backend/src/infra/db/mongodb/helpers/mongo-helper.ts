import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = { 
    client: null as MongoClient,

    async connect(url: string) {
        this.client = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },

    async disconnect() {
        await this.client.close()
    },

    getCollection (name: string): Collection {
        return this.client.db().collection(name)
    },

    map: (collection: any): any => {
        const { _id, ...collectionWithoutId } = collection
        return Object.assign({}, collectionWithoutId, { id: _id })
    }
}


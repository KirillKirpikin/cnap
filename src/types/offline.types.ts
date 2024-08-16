export interface IOffline {
    _id: string,
    title: string,
    img: string
}

export interface IOfflineCreate extends Omit<IOffline, '_id' | 'img'> {}
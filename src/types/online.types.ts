export interface IOnline {
    _id: string,
    title: string,
    img: string,
}

export interface IOnlineCreate extends Omit<IOnline, '_id' | 'img'>{}
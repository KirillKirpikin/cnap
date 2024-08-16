export interface IOfflineCnapInfo{
    _id: string,
    serviseCenterName: string,
    serviceCenterGuid: string,
    serviceGuid: string
}

export interface IOfflineServ {
    _id: string,
    title: string,
    subject: string,
    cost: string,
    dedline: string,
    documents: string,
    acts: string,
    method : string,
    result : string,
    linkToOnline : string,
    methodOfObtaining : string,
    offlineId: string
    cnap:IOfflineCnapInfo[]; 
}

export interface IOfflineServCreate extends Omit<IOfflineServ, '_id'> {}